import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { auth } from '../lib/firebase';
import { supabase } from '../lib/supabase';
import { SEO } from '../components/SEO';
import { Tag, X } from 'lucide-react';

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const API_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:5000';

export function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    pincode: ''
  });

  const [phoneCode, setPhoneCode] = useState('+91');
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount_type: string; discount_value: number } | null>(null);
  const [promoStatus, setPromoStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);

  useEffect(() => {
    if (cartItems.length === 0 && !paymentComplete) {
      navigate('/shop');
    }

    // Auth Pre-fill
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user?.email) {
        setForm((prev) => ({ ...prev, email: user.email || '' }));
      }
    });
    return () => unsubscribe();
  }, [cartItems, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleApplyPromo = async () => {
    if (!promoInput.trim()) return;
    setIsApplyingPromo(true);
    try {
      const code = promoInput.toUpperCase().trim();
      const response = await fetch(`${API_URL}/api/validate-promo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) {
        setPromoStatus({ type: 'error', message: 'Invalid or expired code' });
        setAppliedPromo(null);
        return;
      }

      const data = await response.json();

      setAppliedPromo({
        code: data.code,
        discount_type: data.discount_type,
        discount_value: data.discount_value
      });
      setPromoStatus({ type: 'success', message: `Code ${code} applied successfully!` });
      setPromoInput('');

    } catch (err: any) {
      setPromoStatus({ type: 'error', message: 'Error applying promo code' });
    } finally {
      setIsApplyingPromo(false);
    }
  };

  let calculatedDiscountAmount = 0;
  if (appliedPromo) {
    if (appliedPromo.discount_type === 'percent') {
      calculatedDiscountAmount = Math.round((cartTotal * appliedPromo.discount_value) / 100);
    } else if (appliedPromo.discount_type === 'flat') {
      calculatedDiscountAmount = Math.round(appliedPromo.discount_value);
    }
  }

  const finalTotal = Math.round(Math.max(0, cartTotal - calculatedDiscountAmount));

  const removePromoCode = () => {
    setAppliedPromo(null);
    setPromoInput('');
    setPromoStatus(null);
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.street || !form.city || !form.state || !form.pincode) {
      alert("Please complete the shipping form first.");
      return;
    }

    const orderPayload = {
      user_id: auth.currentUser?.uid || 'guest',
      customer_email: form.email,
      items_ordered: cartItems,
      shipping_address: {
        street: form.street,
        city: form.city,
        state: form.state,
        pincode: form.pincode,
        phone: `${phoneCode}${form.phone}`
      },
      subtotal: cartTotal,
      promo_code_used: appliedPromo?.code || null,
      discount_applied: calculatedDiscountAmount,
      total_amount: finalTotal,
    };

    setIsProcessing(true);

    try {
      const res = await loadRazorpayScript();
      if (!res) {
        alert('Razorpay SDK failed to load. Are you online?');
        return;
      }

      const backendResponse = await fetch(`${API_URL}/api/create-razorpay-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cartItems, promoCode: appliedPromo?.code })
      });

      if (!backendResponse.ok) {
        throw new Error('Failed to create Razorpay order in backend');
      }

      const order = await backendResponse.json();

      const options = {
        key: 'rzp_test_SZKGXlopXPdrnk',
        amount: order.amount,
        currency: 'INR',
        name: 'WAYO',
        description: 'WAYO Band Pre-order',
        order_id: order.id,
        handler: async function (response: any) {
          console.log("PAYMENT SUCCESS:", response);
          try {
            // Step A: Verify signature securely on Node backend
            const verifyRes = await fetch(`${API_URL}/api/verify-payment`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                user_id: auth.currentUser?.uid || 'guest',
                customer_email: form.email,
                items_ordered: cartItems,
                shipping_address: { street: form.street, city: form.city, state: form.state, pincode: form.pincode, phone: form.phone },
                subtotal: cartTotal,
                promo_code_used: appliedPromo?.code || null,
                discount_applied: calculatedDiscountAmount || 0,
                total_amount: finalTotal
              })
            });

            if (!verifyRes.ok) throw new Error('Payment verification failed');
            const verifyData = await verifyRes.json();

            if (verifyData.success) {
              // Step B: Backend order insertion to bypass RLS securely

              // Step C: Clean Up & Ship to Success Portal
              setPaymentComplete(true);
              clearCart();
              navigate('/order-success');
            }
          } catch (err) {
            console.error(err);
            alert("Payment verification error! Check orders.");
          }
        },
        prefill: {
          name: form.name,
          email: form.email,
          contact: form.phone
        },
        theme: {
          color: '#E04E39'
        }
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();

    } catch (err: any) {
      console.error(err);
      alert(err.message || 'Error occurred during checkout initialization');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main className="min-h-screen bg-wayo-cream selection:bg-wayo-coral selection:text-white">
      <SEO title="Checkout" description="Complete your secure WAYO order." path="/checkout" />
      <div className="max-w-7xl mx-auto px-4 pt-40 pb-12 sm:px-6 lg:px-8">

        <h1 className="text-3xl font-extrabold text-wayo-dark font-display mb-8">Checkout</h1>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Left Column: Shipping Form */}
          <div className="w-full lg:w-3/5">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-wayo-dark mb-6">Contact & Shipping Details</h2>
              <form id="checkout-form" onSubmit={handleCheckout} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-bold text-gray-700">Full Name</label>
                    <input
                      type="text" name="name" required value={form.name} onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-wayo-coral focus:ring-1 focus:ring-wayo-coral outline-none transition-colors"
                      placeholder=""
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-bold text-gray-700">Email Address</label>
                    <input
                      type="email" name="email" required value={form.email} onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-wayo-coral focus:ring-1 focus:ring-wayo-coral outline-none transition-colors bg-white disabled:bg-gray-50"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-bold text-gray-700">Phone Number</label>
                  <div className="flex gap-3">
                    <select
                      value={phoneCode}
                      onChange={(e) => setPhoneCode(e.target.value)}
                      className="w-24 px-3 py-3 rounded-xl border border-gray-200 focus:border-wayo-coral outline-none bg-white font-medium text-gray-700 disabled:bg-gray-50"
                    >
                      <option value="+91">+91</option>
                      <option value="+1">+1</option>
                      <option value="+44">+44</option>
                    </select>
                    <input
                      type="tel" name="phone" required value={form.phone} onChange={handleInputChange}
                      className="flex-grow w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-wayo-coral focus:ring-1 focus:ring-wayo-coral outline-none transition-colors"
                      placeholder="9876543210"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 mt-2">
                  <label className="text-sm font-bold text-gray-700">Street Address</label>
                  <input
                    type="text" name="street" required value={form.street} onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-wayo-coral focus:ring-1 focus:ring-wayo-coral outline-none transition-colors"
                    placeholder="House/Apartment, Street Name"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-bold text-gray-700">City</label>
                    <input
                      type="text" name="city" required value={form.city} onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-wayo-coral focus:ring-1 focus:ring-wayo-coral outline-none transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-bold text-gray-700">State</label>
                    <select
                      name="state" required value={form.state} onChange={(e) => handleInputChange(e as any)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-wayo-coral focus:ring-1 focus:ring-wayo-coral outline-none transition-colors bg-white font-medium"
                    >
                      <option value="" disabled>Select State</option>
                      <option value="Andhra Pradesh">Andhra Pradesh</option>
                      <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                      <option value="Assam">Assam</option>
                      <option value="Bihar">Bihar</option>
                      <option value="Chhattisgarh">Chhattisgarh</option>
                      <option value="Goa">Goa</option>
                      <option value="Gujarat">Gujarat</option>
                      <option value="Haryana">Haryana</option>
                      <option value="Himachal Pradesh">Himachal Pradesh</option>
                      <option value="Jharkhand">Jharkhand</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Kerala">Kerala</option>
                      <option value="Madhya Pradesh">Madhya Pradesh</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Manipur">Manipur</option>
                      <option value="Meghalaya">Meghalaya</option>
                      <option value="Mizoram">Mizoram</option>
                      <option value="Nagaland">Nagaland</option>
                      <option value="Odisha">Odisha</option>
                      <option value="Punjab">Punjab</option>
                      <option value="Rajasthan">Rajasthan</option>
                      <option value="Sikkim">Sikkim</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Telangana">Telangana</option>
                      <option value="Tripura">Tripura</option>
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                      <option value="Uttarakhand">Uttarakhand</option>
                      <option value="West Bengal">West Bengal</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Jammu & Kashmir">Jammu & Kashmir</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-bold text-gray-700">Pincode</label>
                    <input
                      type="text" name="pincode" required value={form.pincode} onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-wayo-coral focus:ring-1 focus:ring-wayo-coral outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="mt-8">
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full bg-wayo-dark text-white py-4 rounded-2xl font-bold text-lg hover:bg-gray-800 transition-all shadow-lg hover:-translate-y-0.5 disabled:opacity-75 disabled:hover:translate-y-0"
                  >
                    {isProcessing ? "Securely connecting..." : "Proceed to Payment"}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="w-full lg:w-2/5">
            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col gap-6 sticky top-28">
              <h2 className="text-xl font-bold text-wayo-dark">Order Summary</h2>

              <div className="flex flex-col gap-4">
                {cartItems.map((item) => (
                  <div key={`${item.id}-${item.hasExtraBand}`} className="flex gap-4 p-3 bg-wayo-cream/30 rounded-2xl border border-gray-100">
                    <div className="w-16 h-16 bg-white rounded-xl overflow-hidden border border-gray-100 flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col flex-grow justify-center">
                      <div className="flex justify-between items-start">
                        <div className="flex flex-col">
                          <h4 className="font-bold text-wayo-dark text-[15px]">{item.name}</h4>
                          <span className="text-xs font-semibold text-gray-500">{item.model} • {item.color}</span>
                          {item.hasExtraBand && <span className="text-[10px] font-bold text-yellow-700 mt-0.5">+ Extra Band</span>}
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="font-extrabold text-wayo-dark text-sm">₹{item.price}</span>
                          <span className="text-xs font-bold text-gray-400">Qty: {item.quantity}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-6 flex flex-col gap-2 relative">
                {!appliedPromo ? (
                  <>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="relative flex-grow">
                        <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Promo code"
                          value={promoInput}
                          onChange={(e) => setPromoInput(e.target.value)}
                          disabled={isApplyingPromo}
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-wayo-coral focus:ring-1 focus:ring-wayo-coral outline-none transition-colors uppercase font-bold disabled:bg-gray-50 disabled:text-gray-400"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={handleApplyPromo}
                        disabled={isApplyingPromo || !promoInput.trim()}
                        className="bg-gray-100 text-wayo-dark hover:bg-gray-200 px-6 py-3 rounded-xl font-bold transition-colors shadow-sm disabled:opacity-75 disabled:cursor-not-allowed min-w-[100px] flex justify-center items-center"
                      >
                        {isApplyingPromo ? (
                          <div className="w-5 h-5 border-2 border-wayo-dark border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          'Apply'
                        )}
                      </button>
                    </div>
                    {promoStatus && promoStatus.type === 'error' && (
                      <div className="text-sm font-bold mb-2 text-red-500">
                        {promoStatus.message}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="bg-green-50 text-green-700 px-4 py-3 rounded-xl flex justify-between items-center mb-4 border border-green-100 shadow-sm transition-all duration-300">
                    <span className="font-bold text-[14px]">✓ Promo "{appliedPromo.code}" Applied</span>
                    <button onClick={removePromoCode} className="text-green-800 hover:bg-green-200 w-7 h-7 rounded-full flex items-center justify-center transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}

                <div className="flex justify-between items-center text-gray-600 font-bold text-sm">
                  <span>Subtotal</span>
                  <span>₹{cartTotal}</span>
                </div>

                {appliedPromo && (
                  <div className="flex justify-between items-center text-green-600 font-bold text-sm">
                    <span>Discount ({appliedPromo.code})</span>
                    <span>-₹{calculatedDiscountAmount}</span>
                  </div>
                )}

                <div className="flex justify-between items-center text-gray-600 font-bold text-sm">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4 flex justify-between items-center mt-2">
                <span className="text-lg font-bold text-wayo-dark">Total</span>
                <span className="text-2xl font-extrabold text-wayo-dark">₹{finalTotal}</span>
              </div>

            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
