import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { SEO } from '../components/SEO';
import { Loader2, LogOut, RefreshCw } from 'lucide-react';

export function AdminDashboard() {
  const navigate = useNavigate();
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  
  const [orders, setOrders] = useState<any[]>([]);
  const [promos, setPromos] = useState<any[]>([]);
  const [waitlist, setWaitlist] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  
  const [activeTab, setActiveTab] = useState<'orders' | 'promos' | 'waitlist' | 'contacts' | 'reviews'>('orders');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user || user.email !== "rahulranjannn333@gmail.com") {
        navigate('/');
      } else {
        setIsAuthLoading(false);
        fetchAllData();
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const fetchAllData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/admin/data');
      if (res.ok) {
        const data = await res.json();
        setOrders(data.orders || []);
        setPromos(data.promos || []);
        setWaitlist(data.waitlist || []);
        setContacts(data.contacts || []);
        setReviews(data.reviews || []);
      }
    } catch (err) {
      console.error('Failed to fetch secure data payload matrix:', err);
    }
    setIsLoading(false);
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const res = await fetch('http://localhost:5000/api/admin/update-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, newStatus })
      });
      if (!res.ok) throw new Error('Failed to update natively');
      
      setOrders((prev) => 
        prev.map(o => o.id === orderId ? { ...o, shipping_status: newStatus } : o)
      );
      alert('Order status updated successfully!');
    } catch (error) {
      alert("Failed to update order status.");
      console.error(error);
    }
  };

  if (isAuthLoading) {
    return <div className="min-h-screen flex items-center justify-center pt-28 font-bold text-wayo-dark">Authenticating WAYO Admin...</div>;
  }

  const totalRevenue = orders.reduce((sum, order) => sum + (order.total_amount || 0), 0);
  const totalOrders = orders.length;
  const averageOrderValue = Math.round(totalOrders > 0 ? (totalRevenue / totalOrders) : 0);

  const tabs = [
    { id: 'orders', label: 'Orders' },
    { id: 'promos', label: 'Promo Codes' },
    { id: 'waitlist', label: 'Waitlist' },
    { id: 'contacts', label: 'Contact Queries' },
    { id: 'reviews', label: 'Product Reviews' }
  ];

  return (
    <main className="min-h-screen bg-wayo-cream selection:bg-wayo-coral selection:text-white">
      <SEO title="Admin Command Center" description="Manage WAYO orders." path="/admin" />
      <div className="max-w-7xl mx-auto px-4 pt-40 pb-12 sm:px-6 lg:px-8">
        
        <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-extrabold text-wayo-dark font-display">WAYO Command Center</h1>
            <button onClick={fetchAllData} className="p-2 bg-white border border-gray-100 shadow-sm hover:bg-gray-50 text-wayo-dark rounded-full transition-colors group">
              <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin text-wayo-coral' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
            </button>
          </div>
          <button onClick={handleLogout} className="px-5 py-2.5 bg-white border border-gray-100 shadow-sm text-wayo-dark hover:bg-red-50 hover:border-red-100 hover:text-red-600 font-bold rounded-xl transition-colors flex items-center gap-2">
            <LogOut className="w-4 h-4"/> Sign Out
          </button>
        </div>
        
        {/* Sub-navigation */}
        <div className="flex flex-wrap gap-2 mb-8 bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
                activeTab === tab.id 
                  ? 'bg-wayo-dark text-white shadow-md' 
                  : 'text-gray-500 hover:text-wayo-dark hover:bg-gray-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab: ORDERS */}
        {activeTab === 'orders' && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            {/* Metrics Bar */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col justify-center">
                <span className="text-gray-400 font-bold text-sm uppercase tracking-wider mb-2">Total Revenue</span>
                <span className="text-3xl font-extrabold text-wayo-coral">₹{totalRevenue.toLocaleString()}</span>
              </div>
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col justify-center">
                <span className="text-gray-400 font-bold text-sm uppercase tracking-wider mb-2">Total Orders</span>
                <span className="text-3xl font-extrabold text-wayo-dark">{totalOrders}</span>
              </div>
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col justify-center">
                <span className="text-gray-400 font-bold text-sm uppercase tracking-wider mb-2">Avg. Order Value</span>
                <span className="text-3xl font-extrabold text-wayo-dark">₹{averageOrderValue.toLocaleString()}</span>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="table-auto w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-gray-500 uppercase text-xs font-semibold">
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4">Order ID</th>
                      <th className="px-6 py-4">Customer</th>
                      <th className="px-6 py-4">Items</th>
                      <th className="px-6 py-4">Total Paid</th>
                      <th className="px-6 py-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {isLoading ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-8 text-center text-gray-500 font-bold">
                          Loading secure data matrix...
                        </td>
                      </tr>
                    ) : orders.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-8 text-center text-gray-500 font-bold text-lg">
                          No Orders found yet.
                        </td>
                      </tr>
                    ) : (
                      orders.map((order) => {
                        const dateObj = new Date(order.created_at);
                        const formattedDate = dateObj.toLocaleDateString() + ' ' + dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                        
                        const itemsArr = Array.isArray(order.items_ordered) ? order.items_ordered : [];
                        const itemsSummary = itemsArr.map((item: any) => 
                          `${item.quantity}x ${item.name}${item.hasExtraBand ? ' (+Extra Band)' : ''}`
                        ).join(', ');

                        return (
                          <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium">{formattedDate}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-wayo-dark">#{String(order.id).substring(0, 8).toUpperCase()}</td>
                            <td className="px-6 py-4 text-sm text-gray-600 font-medium">
                               <span className="font-bold text-wayo-dark">{order.customer_email || 'Guest'}</span>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-600 font-medium max-w-xs truncate" title={itemsSummary}>
                              {itemsSummary}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-extrabold text-green-700">₹{order.total_amount}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <select 
                                value={order.shipping_status || 'processing'}
                                onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                                className="bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-sm font-bold text-wayo-dark focus:border-wayo-coral focus:ring-1 focus:ring-wayo-coral outline-none cursor-pointer hover:bg-gray-50 transition-colors shadow-sm"
                              >
                                <option value="processing">Processing</option>
                                <option value="shipped">Shipped</option>
                                <option value="delivered">Delivered</option>
                              </select>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab: PROMOS */}
        {activeTab === 'promos' && (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="overflow-x-auto">
                <table className="table-auto w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-gray-500 uppercase text-xs font-semibold">
                      <th className="px-6 py-4">Code</th>
                      <th className="px-6 py-4">Type</th>
                      <th className="px-6 py-4">Value</th>
                      <th className="px-6 py-4">Active Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {promos.length === 0 ? (
                       <tr><td colSpan={4} className="px-6 py-8 text-center text-gray-500 font-bold text-lg">No Promo Codes found yet.</td></tr>
                    ) : promos.map(promo => (
                      <tr key={promo.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-extrabold text-wayo-coral tracking-wider">{promo.code}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-700 capitalize">{promo.discount_type}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-wayo-dark">
                          {promo.discount_type === 'percent' ? `${promo.discount_value}%` : `₹${promo.discount_value}`}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold">
                          {promo.is_active ? <span className="text-green-600 bg-green-50 px-3 py-1 rounded-full">Active</span> : <span className="text-red-500 bg-red-50 px-3 py-1 rounded-full">Inactive</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
            </div>
          </div>
        )}

        {/* Tab: WAITLIST */}
        {activeTab === 'waitlist' && (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="overflow-x-auto">
                <table className="table-auto w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-gray-500 uppercase text-xs font-semibold">
                      <th className="px-6 py-4">Name</th>
                      <th className="px-6 py-4">Email</th>
                      <th className="px-6 py-4">Phone</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {waitlist.length === 0 ? (
                       <tr><td colSpan={3} className="px-6 py-8 text-center text-gray-500 font-bold text-lg">No Waitlist found yet.</td></tr>
                    ) : waitlist.map(entry => (
                      <tr key={entry.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-wayo-dark">{entry.name || '—'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-wayo-dark">{entry.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-600">{entry.phone || '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
            </div>
          </div>
        )}

        {/* Tab: CONTACTS */}
        {activeTab === 'contacts' && (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="overflow-x-auto">
                <table className="table-auto w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-gray-500 uppercase text-xs font-semibold">
                      <th className="px-6 py-4 w-48">Date Recieved</th>
                      <th className="px-6 py-4">Customer</th>
                      <th className="px-6 py-4">Message Snippet</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {contacts.length === 0 ? (
                       <tr><td colSpan={3} className="px-6 py-8 text-center text-gray-500 font-bold text-lg">No Contact Queries found yet.</td></tr>
                    ) : contacts.map(query => {
                      const d = new Date(query.created_at);
                      return (
                      <tr key={query.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-600">{d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                        <td className="px-6 py-4 text-sm font-medium text-wayo-dark">
                          <div className="flex flex-col">
                            <span className="font-bold">{query.name}</span>
                            <span className="text-gray-500 text-xs">{query.email}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-600 max-w-sm truncate" title={query.message}>{query.message}</td>
                      </tr>
                    )})}
                  </tbody>
                </table>
            </div>
          </div>
        )}

        {/* Tab: REVIEWS */}
        {activeTab === 'reviews' && (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="overflow-x-auto">
                <table className="table-auto w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-gray-500 uppercase text-xs font-semibold">
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4">User Name</th>
                      <th className="px-6 py-4">Rating</th>
                      <th className="px-6 py-4">Comment</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {reviews.length === 0 ? (
                       <tr><td colSpan={4} className="px-6 py-8 text-center text-gray-500 font-bold text-lg">No Product Reviews found yet.</td></tr>
                    ) : reviews.map(review => {
                      const d = new Date(review.created_at);
                      return (
                      <tr key={review.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-600">{d.toLocaleDateString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-wayo-dark">{review.reviewer_name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                           <div className="flex gap-1 text-wayo-yellow">
                             {[...Array(5)].map((_, i) => (
                               <svg key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'text-gray-200 fill-current'}`} viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                             ))}
                           </div>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-600 w-full">{review.review_text}</td>
                      </tr>
                    )})}
                  </tbody>
                </table>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
