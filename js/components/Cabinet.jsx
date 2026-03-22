import React, { useState, useEffect } from "react";
import { collection, query, where, onSnapshot, addDoc, deleteDoc, doc, updateDoc, serverTimestamp } from "firebase/firestore";

export default function Cabinet({ db, user, showToast, onOrder }) {
  const [cars, setCars] = useState([]);
  const [orders, setOrders] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [updateKm, setUpdateKm] = useState("");
  const [activeCarId, setActiveCarId] = useState(null);
  
  const [newCar, setNewCar] = useState({
    brand: 'Chevrolet',
    model: '',
    year: 2024,
    plateNumber: '',
    currentKm: '',
    lastServiceKm: '',
    dailyKm: ''
  });

  useEffect(() => {
    if (!user) return;

    const qCars = query(collection(db, "cars"), where("userUid", "==", user.uid));
    const unsubscribeCars = onSnapshot(qCars, (snapshot) => {
      const carsData = [];
      snapshot.forEach((doc) => carsData.push({ id: doc.id, ...doc.data() }));
      setCars(carsData);
    });

    const qOrders = query(collection(db, "orders"), where("userUid", "==", user.uid));
    const unsubscribeOrders = onSnapshot(qOrders, (snapshot) => {
      const ordersData = [];
      snapshot.forEach((doc) => ordersData.push({ id: doc.id, ...doc.data() }));
      // Sort by createdAt descending
      ordersData.sort((a, b) => {
        const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
        const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
        return timeB - timeA;
      });
      setOrders(ordersData);
    });

    return () => {
      unsubscribeCars();
      unsubscribeOrders();
    };
  }, [db, user]);

  const formatWithSpaces = (val) => {
    if (!val) return '';
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  const calculateHealth = (car) => {
    const limit = 10000;
    const current = Number(car.currentKm) || 0;
    const last = Number(car.lastServiceKm) || current;
    const diff = current - last;
    
    let percentage = Math.max(0, 100 - (diff / limit) * 100);
    if (percentage > 100) percentage = 100;
    
    let status = 'Ideal';
    let color = 'text-emerald-500';
    let bgColor = 'bg-emerald-500';
    
    if (percentage < 30) {
      status = 'Zudlik bilan';
      color = 'text-red-500';
      bgColor = 'bg-red-500';
    } else if (percentage < 60) {
      status = 'Yaqinda';
      color = 'text-amber-500';
      bgColor = 'bg-amber-500';
    }
    
    return { percentage, status, color, bgColor, remaining: limit - diff };
  };

  const predictServiceDate = (car) => {
    const { remaining } = calculateHealth(car);
    const daily = Number(car.dailyKm) || 0;
    if (daily <= 0 || remaining <= 0) return 'Noma\'lum';
    
    const daysLeft = Math.ceil(remaining / daily);
    const date = new Date();
    date.setDate(date.getDate() + daysLeft);
    
    return date.toLocaleDateString('uz-UZ', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const handleAddCar = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "cars"), {
        ...newCar,
        userUid: user.uid,
        createdAt: serverTimestamp(),
      });
      setIsAddModalOpen(false);
      setNewCar({ brand: 'Chevrolet', model: '', year: 2024, plateNumber: '', currentKm: '', lastServiceKm: '', dailyKm: '' });
      showToast("Mashina qo'shildi", "success");
    } catch (error) {
      showToast("Xatolik yuz berdi", "error");
    }
  };

  const handleDeleteCar = async (id) => {
    if (window.confirm("Rostdan ham o'chirmoqchimisiz?")) {
      try {
        await deleteDoc(doc(db, "cars", id));
        showToast("Mashina o'chirildi", "success");
      } catch (error) {
        showToast("Xatolik yuz berdi", "error");
      }
    }
  };

  const openUpdateModal = (car) => {
    setActiveCarId(car.id);
    setUpdateKm(car.currentKm);
    setIsUpdateOpen(true);
  };

  const submitUpdateKm = async (e) => {
    e.preventDefault();
    if (!updateKm || isNaN(updateKm)) return;
    
    try {
      await updateDoc(doc(db, "cars", activeCarId), {
        currentKm: parseInt(updateKm, 10),
        updatedAt: serverTimestamp()
      });
      setIsUpdateOpen(false);
      showToast("Probeg yangilandi", "success");
    } catch (error) {
      showToast("Xatolik yuz berdi", "error");
    }
  };

  const requestService = (car) => {
    onOrder(car.brand, car.model);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-24 md:py-32 relative">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 relative z-10">
        <div>
          <div className="inline-flex items-center space-x-2 bg-blue-50 px-3 py-1 rounded-full border border-blue-100 mb-4">
            <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse"></span>
            <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">Shaxsiy Garaj</span>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-slate-900">Mening Avtomobillarim</h2>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="h-14 md:h-16 px-8 md:px-10 bg-slate-900 text-white rounded-full font-black uppercase tracking-widest text-xs md:text-sm hover:bg-blue-600 hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl shadow-slate-900/20 hover:shadow-blue-600/30 flex items-center group"
        >
          <i className="fas fa-plus mr-3 group-hover:rotate-90 transition-transform duration-300"></i> Qo'shish
        </button>
      </div>

      {cars.length === 0 ? (
        <div className="bg-white rounded-[2.5rem] md:rounded-[3rem] p-12 md:p-20 text-center border border-slate-100 shadow-xl relative overflow-hidden mb-20">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-transparent pointer-events-none"></div>
          <div className="w-24 h-24 md:w-32 md:h-32 bg-slate-50 rounded-full flex items-center justify-center text-4xl md:text-5xl text-slate-300 mx-auto mb-8 relative z-10 shadow-inner">
            <i className="fas fa-car"></i>
          </div>
          <h3 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 relative z-10 tracking-tight">Garajingiz bo'sh</h3>
          <p className="text-lg text-slate-500 font-medium mb-10 max-w-md mx-auto relative z-10">Birinchi avtomobilingizni qo'shing va xizmatlardan foydalaning.</p>
          <button onClick={() => setIsAddModalOpen(true)} className="px-10 py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20 relative z-10">Avtomobil qo'shish</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 mb-20 relative z-10">
          {cars.map((car) => {
            const health = calculateHealth(car);
            return (
              <div key={car.id} className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-slate-100 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden flex flex-col">
                <div className="absolute top-0 right-0 w-40 h-40 bg-slate-50 rounded-bl-[100px] -z-10 group-hover:bg-blue-50 transition-colors duration-500"></div>
                
                <div className="flex justify-between items-start mb-8">
                  <div className="flex items-center space-x-5">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-slate-900 text-white rounded-2xl md:rounded-[1.5rem] flex items-center justify-center text-2xl md:text-3xl shadow-lg group-hover:scale-110 transition-transform duration-500">
                      <i className="fas fa-car-side"></i>
                    </div>
                    <div>
                      <h4 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight mb-2">{car.brand} {car.model}</h4>
                      <div className="flex items-center space-x-2">
                        <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold">{car.year}</span>
                        <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold uppercase tracking-wider">{car.plateNumber}</span>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => handleDeleteCar(car.id)} className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors shadow-sm">
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </div>

                <div className="mb-8 p-6 md:p-8 bg-slate-50 rounded-[2rem] border border-slate-100 flex-grow">
                  <div className="flex justify-between items-end mb-6">
                    <div>
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Moy resursi</p>
                      <p className={`text-4xl md:text-5xl font-black tracking-tighter ${health.color}`}>{health.percentage.toFixed(0)}%</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Holati</p>
                      <p className={`text-xs font-black px-4 py-1.5 rounded-full bg-white border border-slate-200 uppercase tracking-wider shadow-sm ${health.color}`}>{health.status}</p>
                    </div>
                  </div>
                  <div className="w-full h-4 bg-slate-200 rounded-full overflow-hidden mb-6 shadow-inner">
                    <div className={`h-full rounded-full ${health.bgColor} transition-all duration-1000 relative`} style={{ width: `${health.percentage}%` }}>
                      <div className="absolute inset-0 bg-white/20 w-full h-full animate-[shimmer_2s_infinite]"></div>
                    </div>
                  </div>
                  <div className="flex justify-between text-xs md:text-sm font-bold text-slate-500">
                    <span>Qoldi: <span className="text-slate-900">{formatWithSpaces(health.remaining)} km</span></span>
                    <span>Taxminiy: <span className="text-slate-900">{predictServiceDate(car)}</span></span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 md:gap-6 mb-8">
                  <div className="p-5 rounded-[1.5rem] border border-slate-100 bg-white shadow-sm">
                    <p className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Hozirgi probeg</p>
                    <p className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">{formatWithSpaces(car.currentKm)} <span className="text-sm text-slate-500 font-medium">km</span></p>
                  </div>
                  <div className="p-5 rounded-[1.5rem] border border-slate-100 bg-white shadow-sm">
                    <p className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest mb-2">So'nggi servis</p>
                    <p className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">{car.lastServiceKm ? formatWithSpaces(car.lastServiceKm) : '---'} <span className="text-sm text-slate-500 font-medium">km</span></p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button onClick={() => requestService(car)} className="flex-1 h-14 md:h-16 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs md:text-sm hover:bg-blue-700 active:scale-95 transition-all shadow-xl shadow-blue-600/20 flex items-center justify-center gap-2 group/btn">
                    Servisga yozilish
                    <i className="fas fa-arrow-right group-hover/btn:translate-x-1 transition-transform"></i>
                  </button>
                  <button onClick={() => openUpdateModal(car)} className="w-14 h-14 md:w-16 md:h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center hover:bg-black active:scale-95 transition-all shadow-xl shadow-slate-900/20 group/sync">
                    <i className="fas fa-sync-alt group-hover/sync:rotate-180 transition-transform duration-500"></i>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-600">
            <i className="fas fa-history text-xl"></i>
          </div>
          <h3 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter">Buyurtmalar Tarixi</h3>
        </div>
        
        {orders.length === 0 ? (
          <div className="bg-white rounded-[2.5rem] p-10 text-center border border-slate-100 shadow-sm">
            <p className="text-slate-500 font-medium text-lg">Hali buyurtmalar yo'q.</p>
          </div>
        ) : (
          <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-100">
                <thead className="bg-slate-50/50">
                  <tr>
                    <th className="px-8 py-6 text-left text-xs font-black text-slate-400 uppercase tracking-widest">Sana</th>
                    <th className="px-8 py-6 text-left text-xs font-black text-slate-400 uppercase tracking-widest">Xizmat</th>
                    <th className="px-8 py-6 text-left text-xs font-black text-slate-400 uppercase tracking-widest">Mashina</th>
                    <th className="px-8 py-6 text-left text-xs font-black text-slate-400 uppercase tracking-widest">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-50">
                  {orders.map((order) => {
                    const dateStr = order.createdAt?.toMillis ? new Date(order.createdAt.toMillis()).toLocaleDateString("uz-UZ", { day: 'numeric', month: 'long', year: 'numeric' }) : "Noma'lum";
                    return (
                      <tr key={order.id} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="px-8 py-6 whitespace-nowrap text-sm font-bold text-slate-900">{dateStr}</td>
                        <td className="px-8 py-6 whitespace-nowrap text-sm font-bold text-slate-900">{order.serviceType}</td>
                        <td className="px-8 py-6 whitespace-nowrap text-sm font-medium text-slate-500">{order.brand} {order.model}</td>
                        <td className="px-8 py-6 whitespace-nowrap">
                          <span className={`px-4 py-2 inline-flex text-[10px] font-black uppercase tracking-widest rounded-full shadow-sm ${order.status === "completed" ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-amber-50 text-amber-600 border border-amber-100"}`}>
                            {order.status === "completed" ? "Bajarildi" : "Kutilmoqda"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Add Car Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[200] bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-12 w-full max-w-3xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[60px] pointer-events-none"></div>
            <button onClick={() => setIsAddModalOpen(false)} className="absolute top-6 right-6 md:top-8 md:right-8 w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors z-10">
              <i className="fas fa-times text-lg"></i>
            </button>
            
            <div className="flex items-center gap-4 mb-8 relative z-10">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-2xl">
                <i className="fas fa-car"></i>
              </div>
              <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Mashina qo'shish</h3>
            </div>
            
            <form onSubmit={handleAddCar} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Brend</label>
                  <select required value={newCar.brand} onChange={e => setNewCar({...newCar, brand: e.target.value})} className="w-full h-14 px-5 rounded-2xl bg-slate-50 border border-slate-200 font-bold text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all">
                    <option value="Chevrolet">Chevrolet</option>
                    <option value="Kia">Kia</option>
                    <option value="Li Auto">Li Auto</option>
                    <option value="Hyundai">Hyundai</option>
                    <option value="Toyota">Toyota</option>
                    <option value="Boshqa">Boshqa</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Model</label>
                  <input type="text" required value={newCar.model} onChange={e => setNewCar({...newCar, model: e.target.value})} placeholder="Masalan: Tracker" className="w-full h-14 px-5 rounded-2xl bg-slate-50 border border-slate-200 font-bold text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-slate-300" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Yil</label>
                  <input type="number" required value={newCar.year} onChange={e => setNewCar({...newCar, year: e.target.value})} placeholder="2024" className="w-full h-14 px-5 rounded-2xl bg-slate-50 border border-slate-200 font-bold text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-slate-300" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Davlat Raqami</label>
                  <input type="text" required value={newCar.plateNumber} onChange={e => setNewCar({...newCar, plateNumber: e.target.value})} placeholder="01 A 123 AA" className="w-full h-14 px-5 rounded-2xl bg-slate-50 border border-slate-200 font-bold text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all uppercase placeholder:text-slate-300 placeholder:normal-case" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Hozirgi Probeg (km)</label>
                  <input type="number" required value={newCar.currentKm} onChange={e => setNewCar({...newCar, currentKm: e.target.value})} placeholder="15000" className="w-full h-14 px-5 rounded-2xl bg-slate-50 border border-slate-200 font-bold text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-slate-300" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Kunlik yurish (taxminan km)</label>
                  <input type="number" required value={newCar.dailyKm} onChange={e => setNewCar({...newCar, dailyKm: e.target.value})} placeholder="50" className="w-full h-14 px-5 rounded-2xl bg-slate-50 border border-slate-200 font-bold text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-slate-300" />
                </div>
              </div>
              <button type="submit" className="w-full h-16 bg-blue-600 text-white font-black uppercase tracking-widest text-sm rounded-2xl hover:bg-blue-700 active:scale-[0.98] transition-all mt-8 shadow-xl shadow-blue-600/20">
                Saqlash
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Update KM Modal */}
      {isUpdateOpen && (
        <div className="fixed inset-0 z-[200] bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-[2.5rem] p-10 w-full max-w-sm shadow-2xl relative text-center overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/5 rounded-full blur-[40px] pointer-events-none"></div>
            <button onClick={() => setIsUpdateOpen(false)} className="absolute top-6 right-6 w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors z-10">
              <i className="fas fa-times"></i>
            </button>
            
            <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-[1.5rem] flex items-center justify-center text-3xl mx-auto mb-6 relative z-10 shadow-inner">
              <i className="fas fa-tachometer-alt"></i>
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-2 tracking-tight relative z-10">Probegni yangilash</h3>
            <p className="text-sm text-slate-500 font-medium mb-8 relative z-10">Hozirgi aniq probegni kiriting</p>
            
            <form onSubmit={submitUpdateKm} className="relative z-10">
              <input 
                type="number" 
                required 
                autoFocus
                value={updateKm} 
                onChange={e => setUpdateKm(e.target.value)} 
                className="w-full h-16 px-6 rounded-2xl bg-slate-50 border border-slate-200 font-black text-2xl text-center text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none mb-6 transition-all" 
              />
              <button type="submit" className="w-full h-16 bg-slate-900 text-white font-black uppercase tracking-widest text-sm rounded-2xl hover:bg-black active:scale-[0.98] transition-all shadow-xl shadow-slate-900/20">
                Yangilash
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
