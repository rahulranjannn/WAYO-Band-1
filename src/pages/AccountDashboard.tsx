import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { auth } from '../lib/firebase';
import { signOut, onAuthStateChanged, User, sendEmailVerification } from 'firebase/auth';
import { Package, User as UserIcon, Settings, Plus, AlertCircle } from 'lucide-react';
import { SEO } from '../components/SEO';

export function AccountDashboard() {
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'settings'>('profile');
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    if (tab === 'profile' || tab === 'orders' || tab === 'settings') {
      setActiveTab(tab);
    }
  }, [location.search]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user && activeTab === 'orders') {
      fetchOrders();
    }
  }, [user, activeTab]);

  const fetchOrders = async () => {
    if (!user) return;
    setLoadingOrders(true);
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.uid)
        .order('created_at', { ascending: false });
        
      if (!error && data) {
        setOrders(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingOrders(false);
    }
  };

  if (user === undefined) return null; // loading
  if (user === null) return <Navigate to="/" />;

  const handleSignOut = () => {
    signOut(auth);
  };

  return (
    <main className="min-h-screen bg-white pt-28 pb-20">
      <SEO title="My Account" description="Manage your WAYO account and view orders." path="/account" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-wayo-dark font-display mb-8">My Account</h1>
        
        {/* Tabs */}
        <div className="flex border-b border-gray-100 mb-8 overflow-x-auto hide-scrollbar gap-2">
          <button 
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 px-4 py-4 font-bold text-sm whitespace-nowrap border-b-2 transition-colors ${activeTab === 'profile' ? 'border-wayo-dark text-wayo-dark' : 'border-transparent text-gray-400 hover:text-wayo-dark'}`}
          >
            <UserIcon className="w-5 h-5" /> Profile
          </button>
          <button 
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-2 px-4 py-4 font-bold text-sm whitespace-nowrap border-b-2 transition-colors ${activeTab === 'orders' ? 'border-wayo-dark text-wayo-dark' : 'border-transparent text-gray-400 hover:text-wayo-dark'}`}
          >
            <Package className="w-5 h-5" /> Orders
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 px-4 py-4 font-bold text-sm whitespace-nowrap border-b-2 transition-colors ${activeTab === 'settings' ? 'border-wayo-dark text-wayo-dark' : 'border-transparent text-gray-400 hover:text-wayo-dark'}`}
          >
            <Settings className="w-5 h-5" /> Settings
          </button>
        </div>

        {/* Content */}
        {activeTab === 'profile' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            {user && !user.emailVerified && (
              <div className="bg-[#FFF8F8] border border-[#FFEAEA] rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm mb-6">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-wayo-coral flex-shrink-0" />
                  <p className="text-[15px] font-bold text-wayo-dark">Your email is not verified.</p>
                </div>
                <button 
                  onClick={async () => {
                    try {
                      await sendEmailVerification(user);
                      alert('Verification sent! Please check your Spam folder.');
                    } catch (err: any) {
                      alert(err.message || 'Error sending verification email');
                    }
                  }}
                  className="bg-white border border-gray-200 text-wayo-coral px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-gray-50 transition-colors whitespace-nowrap shadow-sm hover:shadow"
                >
                  Resend Email
                </button>
              </div>
            )}
            
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
              <h2 className="text-xl font-bold text-wayo-dark mb-4">Account Details</h2>
              <div className="text-gray-800 font-bold mb-1">{user.displayName || 'Customer'}</div>
              <div className="text-gray-500 font-medium text-sm mb-4">{user.email}</div>
              <div className="inline-block bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-bold border border-green-100">Connected</div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col min-h-[240px]">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold text-wayo-dark">Addresses</h2>
                <button className="text-wayo-dark hover:text-wayo-coral font-bold text-sm flex items-center gap-1 transition-colors px-3 py-1.5 rounded-lg hover:bg-gray-50">
                  <Plus className="w-4 h-4" /> Add
                </button>
              </div>
              <div className="flex-grow flex flex-col items-center justify-center text-gray-400 bg-gray-50/50 rounded-xl border border-dashed border-gray-200">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-3 text-gray-300 shadow-sm border border-gray-100">
                  <AlertCircle className="w-5 h-5 opacity-50" />
                </div>
                <p className="font-medium text-sm text-gray-400">(i) No addresses added</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            {loadingOrders ? (
               <div className="bg-white rounded-2xl p-8 sm:p-12 border border-gray-100 flex justify-center py-24 shadow-[0_2px_10px_rgba(0,0,0,0.02)]"><div className="w-8 h-8 border-4 border-wayo-coral border-t-transparent rounded-full animate-spin"></div></div>
            ) : orders.length > 0 ? (
               <div className="space-y-4">
                 {orders.map(order => (
                   <div key={order.id} className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                     <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                        <div>
                          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 mt-1">Order #{order.id?.substring(0, 8) || 'PREORDER'}</p>
                          <p className="font-extrabold text-wayo-dark text-xl">Total: ₹{order.total_amount}</p>
                        </div>
                        <div className="bg-green-50 text-green-700 px-4 py-1.5 rounded-full text-xs font-bold border border-green-100 uppercase">
                          {order.payment_status || 'Paid'}
                        </div>
                     </div>
                     <div className="flex flex-col gap-4">
                       {(order.items_ordered || []).map((item: any, i: number) => (
                         <div key={i} className="flex gap-4 items-center bg-gray-50/50 p-3 rounded-xl border border-gray-100">
                           <div className="w-16 h-16 rounded-xl bg-white flex items-center justify-center overflow-hidden border border-gray-100">
                             <img src={item.image || '/logo2.webp'} alt={item.name} className="w-full h-full object-cover" />
                           </div>
                           <div className="flex flex-col">
                              <p className="font-bold text-wayo-dark text-[15px]">{item.name}</p>
                              <p className="text-sm text-gray-500 font-medium">{item.color} • Qty {item.quantity}</p>
                           </div>
                         </div>
                       ))}
                     </div>
                   </div>
                 ))}
               </div>
            ) : (
              <div className="bg-white rounded-2xl p-8 sm:p-12 border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col items-center justify-center min-h-[50vh] text-center">
                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6 text-gray-300">
                  <Package className="w-10 h-10 opacity-50" />
                </div>
                <h2 className="text-2xl font-bold text-wayo-dark mb-3">No orders yet.</h2>
                <p className="text-gray-500 font-medium mb-10 max-w-sm">Go to store to place an order. Your recent purchases and tracking details will appear here.</p>
                <a href="/shop" className="bg-wayo-dark text-white px-10 py-3.5 rounded-xl font-bold text-sm hover:bg-gray-800 transition-colors shadow-md">
                  Continue Shopping
                </a>
              </div>
            )}
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
              <div>
                <h2 className="text-lg font-bold text-wayo-dark mb-2">Sign out of all devices</h2>
                <p className="text-gray-500 text-sm font-medium">Protect your account if you lost a device or noticed suspicious activity.</p>
              </div>
              <button 
                onClick={handleSignOut}
                className="bg-white border-2 border-red-100 text-red-600 px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-red-50 hover:border-red-200 transition-all whitespace-nowrap"
              >
                Sign out
              </button>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
