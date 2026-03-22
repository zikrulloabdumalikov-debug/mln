import React from 'react';
import { CAR_DATA } from '../data.js';

const StatusChecker = ({ showToast, onRegister, onOneTime }) => {
  const [brand, setBrand] = React.useState('');
  const [model, setModel] = React.useState('');
  const [year, setYear] = React.useState('');
  const [km, setKm] = React.useState('');
  const [result, setResult] = React.useState(null);

  const brands = [
    { key: 'chevrolet', label: 'Chevrolet' },
    { key: 'kia', label: 'Kia' },
    { key: 'liauto', label: 'Li Auto' }
  ];

  const formatKm = (val) => {
    const num = val.replace(/\D/g, '');
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };

  const handleCheck = () => {
    if (!brand || !model || !year || !km) { showToast("Barcha maydonlarni to'ldiring", "error"); return; }
    const limits = CAR_DATA[brand]?.[model];
    if (!limits) { showToast("Model topilmadi", "error"); return; }
    const currentYear = new Date().getFullYear();
    const carAge = currentYear - parseInt(year);
    const carKm = parseInt(km.replace(/\D/g, ''));
    const ageOk = carAge <= limits.maxAge;
    const kmOk = carKm <= limits.maxKm;
    setResult({ isEligible: ageOk && kmOk, ageOk, kmOk, carAge, carKm, limits, brand, model, year, priceOneTime: limits.priceOneTime });
  };

  return (
    <div className="py-16 md:py-24 px-6 md:px-12 bg-white rounded-[32px] md:rounded-[48px] shadow-2xl border border-slate-100 max-w-4xl mx-auto relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[60px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-[60px] pointer-events-none"></div>

      <div className="text-center mb-12 relative z-10">
        <div className="inline-flex items-center space-x-2 bg-blue-50 px-3 py-1 rounded-full border border-blue-100 mb-6">
          <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse"></span>
          <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">Tekshiruv</span>
        </div>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter text-slate-900 mb-4">Moslikni aniqlash</h2>
        <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">Avtomobilingiz kafolat dasturimizga mos kelishini tekshiring.</p>
      </div>

      <div className="space-y-8 relative z-10">
        <div>
          <label className="block text-xs font-black text-slate-400 mb-4 uppercase tracking-widest">1. Avtomobil brendi</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {brands.map(b => (
              <button
                key={b.key}
                onClick={() => { setBrand(b.key); setModel(''); setResult(null); }}
                className={`h-16 rounded-2xl font-bold text-lg transition-all duration-300 ${brand === b.key ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20 scale-[1.02]' : 'bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100'}`}
              >
                {b.label}
              </button>
            ))}
          </div>
        </div>

        {brand && (
          <div className="animate-fade-up">
            <label className="block text-xs font-black text-slate-400 mb-4 uppercase tracking-widest mt-8">2. Model</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Object.keys(CAR_DATA[brand]).map(m => (
                <button
                  key={m}
                  onClick={() => { setModel(m); setResult(null); }}
                  className={`h-12 rounded-xl font-bold text-sm transition-all duration-300 ${model === m ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20 scale-[1.02]' : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'}`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        )}

        {model && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-up mt-8">
            <div>
              <label className="block text-xs font-black text-slate-400 mb-4 uppercase tracking-widest">3. Ishlab chiqarilgan yil</label>
              <input
                type="number"
                value={year}
                onChange={e => { setYear(e.target.value); setResult(null); }}
                placeholder="2024"
                className="w-full h-16 px-6 rounded-2xl bg-slate-50 border border-slate-200 font-bold text-xl text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-slate-300"
              />
            </div>
            <div>
              <label className="block text-xs font-black text-slate-400 mb-4 uppercase tracking-widest">4. Hozirgi probeg (km)</label>
              <input
                type="text"
                value={formatKm(km)}
                onChange={e => { setKm(e.target.value); setResult(null); }}
                placeholder="15 000"
                className="w-full h-16 px-6 rounded-2xl bg-slate-50 border border-slate-200 font-bold text-xl text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-slate-300"
              />
            </div>
          </div>
        )}

        {model && (
          <button
            onClick={handleCheck}
            className="w-full h-16 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-blue-600/20 hover:bg-blue-700 active:scale-[0.98] transition-all mt-10 flex items-center justify-center gap-3 group"
          >
            Tekshirish
            <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
          </button>
        )}

        {result && (
          <div className={`mt-10 p-8 md:p-10 rounded-[2rem] border-2 animate-fade-up ${result.isEligible ? 'bg-emerald-50 border-emerald-100' : 'bg-red-50 border-red-100'}`}>
            <div className="flex items-start md:items-center space-x-5 mb-8">
              <div className={`w-14 h-14 shrink-0 rounded-2xl flex items-center justify-center text-2xl text-white shadow-lg ${result.isEligible ? 'bg-emerald-500 shadow-emerald-500/30' : 'bg-red-500 shadow-red-500/30'}`}>
                <i className={`fas ${result.isEligible ? 'fa-check' : 'fa-times'}`}></i>
              </div>
              <div>
                <h3 className={`text-2xl md:text-3xl font-black tracking-tight mb-2 ${result.isEligible ? 'text-emerald-900' : 'text-red-900'}`}>
                  {result.isEligible ? "Tabriklaymiz! Kafolatga mos." : "Afsuski, kafolatga mos emas."}
                </h3>
                <p className={`text-sm md:text-base font-medium ${result.isEligible ? 'text-emerald-700' : 'text-red-700'}`}>
                  {!result.isEligible && `Maksimal yosh: ${result.limits.maxAge} yil, Maksimal probeg: ${result.limits.maxKm.toLocaleString()} km`}
                  {result.isEligible && "Sizning avtomobilingiz Million KM kafolat dasturiga ulanish uchun barcha talablarga javob beradi."}
                </p>
              </div>
            </div>

            {result.isEligible ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="bg-white p-6 md:p-8 rounded-[1.5rem] border border-emerald-100 shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="font-bold text-slate-900 mb-2 text-lg">1 martalik xizmat</h4>
                  <p className="text-3xl font-black text-slate-900 mb-6">{result.priceOneTime.toLocaleString()} <span className="text-base text-slate-500 font-medium">UZS</span></p>
                  <button onClick={() => onOneTime(result.brand, result.model)} className="w-full py-4 bg-slate-100 text-slate-900 font-bold rounded-xl hover:bg-slate-200 transition-colors text-sm uppercase tracking-wider">Yozilish</button>
                </div>
                <div className="bg-slate-900 p-6 md:p-8 rounded-[1.5rem] relative overflow-hidden group shadow-xl shadow-slate-900/20 hover:-translate-y-1 transition-all duration-300">
                  <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-bl-xl z-10">Tavsiya etiladi</div>
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <h4 className="font-bold text-white mb-2 text-lg relative z-10">1 yillik kafolat</h4>
                  <p className="text-3xl font-black text-white mb-6 relative z-10">15% <span className="text-base text-white/60 font-medium">chegirma</span></p>
                  <button onClick={() => onRegister(result.brand, result.model)} className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-500 transition-colors text-sm uppercase tracking-wider shadow-lg shadow-blue-600/20 relative z-10">Kafolatga ulanish</button>
                </div>
              </div>
            ) : (
              <div className="mt-8 bg-white p-6 md:p-8 rounded-[1.5rem] border border-red-100 shadow-sm">
                <h4 className="font-bold text-slate-900 mb-2 text-lg">1 martalik xizmat</h4>
                <p className="text-3xl font-black text-slate-900 mb-6">{result.priceOneTime.toLocaleString()} <span className="text-base text-slate-500 font-medium">UZS</span></p>
                <button onClick={() => onOneTime(result.brand, result.model)} className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20 text-sm uppercase tracking-wider">Bir martalik xizmatga yozilish</button>
              </div>
            )}
            
            <button onClick={() => setResult(null)} className="mt-8 text-xs font-black text-slate-400 hover:text-slate-900 uppercase tracking-widest flex items-center justify-center w-full transition-colors">
              <i className="fas fa-redo mr-2"></i> Qayta tekshirish
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatusChecker;
