import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { getApp } from "firebase/app";

function Admin({ orders }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const uniqueClients = new Set(orders.map((o) => o.phone)).size;
  const totalOrders = orders.length;
  const todayStr = new Date().toLocaleDateString("uz-UZ");
  const todayOrders = orders.filter((o) =>
    o.timestamp?.includes(todayStr),
  ).length;
  const serviceTypes = Array.from(new Set(orders.map((o) => o.serviceType)));

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      (o.userName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (o.phone || "").includes(searchTerm) ||
      (o.brand || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (o.model || "").toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = filterType === "all" || o.serviceType === filterType;

    return matchesSearch && matchesType;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-24 md:py-32 relative">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 relative z-10 gap-6">
        <div>
          <div className="inline-flex items-center space-x-2 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100 mb-4">
            <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-pulse"></span>
            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600">Admin Panel</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-slate-900">
            Tizim Boshqaruvi
          </h1>
        </div>
        <div className="flex items-center gap-3 bg-emerald-50 text-emerald-600 px-5 py-3 rounded-2xl font-bold text-sm border border-emerald-100 shadow-sm">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
          Jonli monitoring faol
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8 relative z-10">
        <div className="lg:col-span-3 space-y-8">
          <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-xl border border-slate-100 flex flex-col md:flex-row gap-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-slate-50 to-transparent pointer-events-none"></div>
            <div className="flex-1 relative z-10">
              <i className="fa-solid fa-search absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 text-lg"></i>
              <input
                type="text"
                placeholder="Mijoz, telefon yoki mashina bo'yicha qidirish..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-6 py-4 rounded-2xl bg-white border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none font-medium transition-all shadow-sm placeholder:text-slate-400"
              />
            </div>
            <div className="relative z-10 md:w-64">
              <i className="fa-solid fa-filter absolute left-6 top-1/2 -translate-y-1/2 text-slate-400"></i>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full pl-12 pr-10 py-4 rounded-2xl bg-white border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none font-medium transition-all shadow-sm appearance-none cursor-pointer"
              >
                <option value="all">Barcha xizmatlar</option>
                {serviceTypes.map((type, idx) => (
                  <option key={idx} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <i className="fa-solid fa-chevron-down absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-xs"></i>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center text-xl">
                  <i className="fa-solid fa-list-ul"></i>
                </div>
                <h2 className="text-2xl font-black tracking-tight text-slate-900">
                  So'rovlar ro'yxati
                </h2>
              </div>
              <span className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-sm">
                {filteredOrders.length} ta natija
              </span>
            </div>

            {filteredOrders.length === 0 ? (
              <div className="p-20 text-center">
                <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center text-4xl text-slate-300 mx-auto mb-6">
                  <i className="fa-solid fa-inbox"></i>
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-2">
                  Natija topilmadi
                </h3>
                <p className="text-slate-500 font-medium">Boshqa qidiruv so'zini kiritib ko'ring.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/80 text-slate-400 text-[10px] uppercase tracking-widest font-black">
                      <th className="p-6 pl-8">Mijoz</th>
                      <th className="p-6">Transport</th>
                      <th className="p-6">Xizmat turi</th>
                      <th className="p-6 pr-8 text-right">Harakat</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {filteredOrders.map((order) => (
                      <tr
                        key={order.id}
                        className="group hover:bg-slate-50/80 transition-colors cursor-pointer"
                        onClick={() => setSelectedOrder(order)}
                      >
                        <td className="p-6 pl-8">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-sm">
                              {order.userName ? order.userName.charAt(0).toUpperCase() : "U"}
                            </div>
                            <div>
                              <div className="font-bold text-slate-900 text-base mb-1">
                                {order.userName}
                              </div>
                              <div className="text-sm text-slate-500 font-medium">
                                {order.phone}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="p-6">
                          <div className="font-bold text-slate-900 text-base mb-1 uppercase tracking-wide">
                            {order.brand} {order.model}
                          </div>
                          <div className="text-xs text-slate-500 font-bold uppercase tracking-widest">
                            {order.timestamp}
                          </div>
                        </td>
                        <td className="p-6">
                          <span className="inline-flex px-4 py-1.5 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-indigo-100">
                            {order.serviceType}
                          </span>
                        </td>
                        <td className="p-6 pr-8 text-right">
                          <button className="w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-400 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-all flex items-center justify-center shadow-sm group-hover:shadow-md ml-auto">
                            <i className="fa-solid fa-chevron-right"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl hover:-translate-y-1 transition-transform duration-500">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-[60px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-[60px] pointer-events-none"></div>
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay pointer-events-none"></div>
            
            <div className="relative z-10 space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <i className="fa-solid fa-users text-xl"></i>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">
                    Jami Mijozlar
                  </div>
                  <div className="text-4xl font-black tracking-tighter">{uniqueClients}</div>
                </div>
              </div>
              
              <div className="h-px bg-white/10"></div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <i className="fa-solid fa-clipboard-list text-xl"></i>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">
                    Jami Buyurtmalar
                  </div>
                  <div className="text-4xl font-black tracking-tighter">{totalOrders}</div>
                </div>
              </div>
              
              <div className="h-px bg-white/10"></div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-500/20 text-indigo-400 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-indigo-500/30">
                  <i className="fa-solid fa-calendar-day text-xl"></i>
                </div>
                <div>
                  <div className="text-[10px] text-indigo-400 font-black uppercase tracking-widest mb-1">
                    Bugungi
                  </div>
                  <div className="text-4xl font-black tracking-tighter text-indigo-400">
                    {todayOrders}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-slate-100">
            <h3 className="text-xl font-black tracking-tight text-slate-900 mb-6 flex items-center gap-3">
              <i className="fa-solid fa-download text-slate-400"></i> Eksport
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-6 rounded-[1.5rem] bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all duration-300 flex flex-col items-center justify-center gap-3 font-bold text-sm border border-emerald-100 hover:shadow-lg hover:shadow-emerald-600/20 group">
                <i className="fa-solid fa-file-excel text-3xl group-hover:scale-110 transition-transform"></i> Excel
              </button>
              <button className="p-6 rounded-[1.5rem] bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all duration-300 flex flex-col items-center justify-center gap-3 font-bold text-sm border border-red-100 hover:shadow-lg hover:shadow-red-600/20 group">
                <i className="fa-solid fa-file-pdf text-3xl group-hover:scale-110 transition-transform"></i> PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      {selectedOrder && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[200] flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-[3rem] p-10 md:p-12 max-w-2xl w-full shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-[60px] pointer-events-none"></div>
            
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-8 right-8 w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors z-10"
            >
              <i className="fa-solid fa-times text-lg"></i>
            </button>

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center text-2xl">
                  <i className="fa-solid fa-file-invoice"></i>
                </div>
                <div>
                  <h2 className="text-3xl font-black tracking-tighter text-slate-900">
                    Buyurtma tafsilotlari
                  </h2>
                  <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mt-1">
                    ID: {selectedOrder.id}
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-10 mt-10">
                <div className="space-y-8">
                  <div className="bg-slate-50 p-6 rounded-[1.5rem] border border-slate-100">
                    <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-2 flex items-center gap-2">
                      <i className="fa-solid fa-user"></i> Mijoz ma'lumotlari
                    </div>
                    <div className="text-xl font-black text-slate-900 mb-1">
                      {selectedOrder.userName}
                    </div>
                    <div className="text-slate-600 font-medium flex items-center gap-2">
                      <i className="fa-solid fa-phone text-xs"></i> {selectedOrder.phone}
                    </div>
                  </div>
                  
                  <div className="bg-slate-50 p-6 rounded-[1.5rem] border border-slate-100">
                    <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-2 flex items-center gap-2">
                      <i className="fa-solid fa-car"></i> Avtomobil
                    </div>
                    <div className="text-xl font-black text-slate-900 uppercase tracking-wide">
                      {selectedOrder.brand} {selectedOrder.model}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-8">
                  <div className="bg-slate-50 p-6 rounded-[1.5rem] border border-slate-100">
                    <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-3 flex items-center gap-2">
                      <i className="fa-solid fa-wrench"></i> Xizmat turi
                    </div>
                    <div className="inline-flex px-4 py-2 bg-indigo-100 text-indigo-700 text-xs font-black uppercase tracking-widest rounded-xl border border-indigo-200 shadow-sm">
                      {selectedOrder.serviceType}
                    </div>
                  </div>
                  
                  <div className="bg-slate-50 p-6 rounded-[1.5rem] border border-slate-100">
                    <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-2 flex items-center gap-2">
                      <i className="fa-solid fa-clock"></i> Vaqti
                    </div>
                    <div className="text-slate-900 font-bold">
                      {selectedOrder.timestamp}
                    </div>
                  </div>
                </div>
              </div>

              {selectedOrder.note && (
                <div className="mb-10 bg-amber-50 p-6 rounded-[1.5rem] border border-amber-100">
                  <div className="text-[10px] text-amber-600 font-black uppercase tracking-widest mb-2 flex items-center gap-2">
                    <i className="fa-solid fa-comment-alt"></i> Izoh
                  </div>
                  <p className="text-amber-900 font-medium leading-relaxed">
                    {selectedOrder.note}
                  </p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={`tel:${selectedOrder.phone}`}
                  className="flex-1 bg-slate-900 text-white h-16 rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center hover:bg-indigo-600 transition-all duration-300 shadow-xl shadow-slate-900/20 hover:shadow-indigo-600/30 gap-3 group"
                >
                  <i className="fa-solid fa-phone group-hover:animate-bounce"></i> Qo'ng'iroq qilish
                </a>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="flex-1 bg-emerald-500 text-white h-16 rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center hover:bg-emerald-600 transition-all duration-300 shadow-xl shadow-emerald-500/20 gap-3 group"
                >
                  <i className="fa-solid fa-check-circle group-hover:scale-110 transition-transform"></i> Bajarildi
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function AdminCheck({ orders, currentUser, showToast, setCurrentView }) {
  const [isVerifying, setIsVerifying] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const verifyAdmin = async () => {
      if (!currentUser?.uid) {
        setCurrentView("home");
        return;
      }
      try {
        const db = getFirestore(getApp());
        const q = query(
          collection(db, "users"),
          where("uid", "==", currentUser.uid),
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          if (userData.isAdmin === true) {
            setIsAdmin(true);
          } else {
            showToast("Ruxsat yo'q! Siz admin emassiz.", "error");
            setCurrentView("home");
          }
        } else {
          showToast("Foydalanuvchi topilmadi.", "error");
          setCurrentView("home");
        }
      } catch (error) {
        console.error("Admin verification error:", error);
        showToast("Xatolik yuz berdi.", "error");
        setCurrentView("home");
      } finally {
        setIsVerifying(false);
      }
    };

    verifyAdmin();
  }, [currentUser, setCurrentView, showToast]);

  if (isVerifying) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <div className="w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center mb-6 relative">
          <div className="absolute inset-0 border-4 border-slate-100 rounded-2xl"></div>
          <div className="absolute inset-0 border-4 border-indigo-600 rounded-2xl border-t-transparent animate-spin"></div>
          <i className="fa-solid fa-shield-alt text-indigo-600 text-xl"></i>
        </div>
        <p className="text-slate-500 font-black uppercase tracking-widest text-xs">
          Xavfsizlik tekshiruvi...
        </p>
      </div>
    );
  }

  if (isAdmin) {
    return <Admin orders={orders} />;
  }

  return null;
}

export { AdminCheck };
export default Admin;
