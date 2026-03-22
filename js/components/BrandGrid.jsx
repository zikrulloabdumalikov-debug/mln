import React, { useState, useEffect, useRef } from "react";
import { CAR_DATA } from "../data.js";

function BrandLogo({ brand }) {
  if (brand === "chevrolet") {
    return (
      <div className="bg-[#1a1a1a] rounded-3xl w-[100px] h-[100px] flex items-center justify-center shadow-xl shadow-black/20 group-hover:shadow-2xl group-hover:shadow-black/30 transition-all duration-500">
        <svg
          width="60"
          height="60"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="group-hover:scale-110 transition-transform duration-500"
        >
          <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#CD9834" />
          <path d="M2 17L12 22L22 17V7L12 12L2 7V17Z" fill="#CD9834" />
        </svg>
      </div>
    );
  }
  if (brand === "kia") {
    return (
      <div className="bg-[#1a1a1a] rounded-3xl w-[100px] h-[100px] flex items-center justify-center shadow-xl shadow-black/20 group-hover:shadow-2xl group-hover:shadow-black/30 transition-all duration-500">
        <svg
          width="75"
          height="38"
          viewBox="0 0 100 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="group-hover:scale-110 transition-transform duration-500"
        >
          <ellipse
            cx="50"
            cy="25"
            rx="45"
            ry="20"
            stroke="white"
            strokeWidth="4"
          />
          <text
            x="50"
            y="32"
            fill="white"
            fontSize="24"
            fontWeight="bold"
            textAnchor="middle"
            fontFamily="sans-serif"
          >
            KIA
          </text>
        </svg>
      </div>
    );
  }
  if (brand === "liauto") {
    return (
      <div className="bg-[#1a1a1a] rounded-3xl w-[100px] h-[100px] flex flex-col items-center justify-center shadow-xl shadow-black/20 group-hover:shadow-2xl group-hover:shadow-black/30 transition-all duration-500">
        <div className="group-hover:scale-110 transition-transform duration-500 flex flex-col items-center">
          <span className="text-white font-bold text-[40px] leading-none">
            Li
          </span>
          <span className="text-white font-bold text-[12px] tracking-widest mt-1">
            AUTO
          </span>
        </div>
      </div>
    );
  }
  return null;
}

function BrandModels({ brand, onOrder, onOpenAuth, user }) {
  const [selectedModel, setSelectedModel] = useState(null);
  const [tariffType, setTariffType] = useState(null);
  const [yearlyCount, setYearlyCount] = useState(3);
  const checkoutRef = useRef(null);

  const brandData = CAR_DATA[brand?.toLowerCase()];
  const models = brandData ? Object.keys(brandData) : [];

  useEffect(() => {
    if (selectedModel && checkoutRef.current) {
      setTimeout(() => {
        checkoutRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 300);
    }
  }, [selectedModel]);

  const calculateYearlyPrice = (basePrice, count) => basePrice * count;

  const submitOrder = () => {
    if (!user) {
      onOpenAuth();
      return;
    }
    if (!brand || !selectedModel || !tariffType) return;

    const basePrice = brandData[selectedModel].priceOneTime;
    const finalPrice =
      tariffType === "one-time"
        ? basePrice
        : calculateYearlyPrice(basePrice, yearlyCount);
    const serviceTypeName =
      tariffType === "one-time"
        ? "1 MARTALIK XIZMAT"
        : `1 YILLIK TARIF (${yearlyCount} marta)`;

    onOrder({
      brand,
      model: selectedModel,
      serviceType: serviceTypeName,
      tariffType,
      servicesCount: tariffType === "one-time" ? 1 : yearlyCount,
      totalPrice: finalPrice,
      note: "",
    });

    setSelectedModel(null);
    setTariffType(null);
  };

  if (!brandData) return null;

  return (
    <div className="space-y-12 max-w-7xl mx-auto px-4 md:px-8 py-12">
      <div className="bg-slate-900 p-8 md:p-16 lg:p-20 rounded-[3rem] md:rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay pointer-events-none"></div>
        
        <div className="relative z-10">
          <div className="inline-flex items-center space-x-2 bg-white/10 px-4 py-1.5 rounded-full border border-white/20 mb-8 backdrop-blur-md">
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
            <span className="text-xs font-black uppercase tracking-widest text-white">Premium Tanlov</span>
          </div>
          <h3 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-16 capitalize leading-none">
            {brand} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">To'plami</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {models.map((model) => (
              <div
                key={model}
                onClick={() => {
                  setSelectedModel(model);
                  setTariffType(null);
                }}
                className={`p-8 md:p-10 rounded-[2.5rem] border cursor-pointer transition-all duration-500 flex flex-col h-full relative overflow-hidden group ${
                  selectedModel === model
                    ? "bg-white/10 border-blue-500 ring-4 ring-blue-500/20 shadow-2xl shadow-blue-500/20 transform -translate-y-2"
                    : "bg-white/5 border-white/10 hover:bg-white/10 hover:-translate-y-2 hover:shadow-xl hover:border-white/20"
                }`}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-white/10 transition-colors duration-500"></div>
                
                <div className="flex justify-between items-start mb-8 relative z-10">
                  <h4 className="text-3xl font-black tracking-tight">{model}</h4>
                  {selectedModel === model && (
                    <span className="bg-blue-600 text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-lg shadow-blue-600/40 animate-fade-in">
                      Tanlangan
                    </span>
                  )}
                </div>
                <p className="text-slate-400 text-base font-medium leading-relaxed mb-10 flex-grow relative z-10">
                  {brandData[model].desc}
                </p>
                <div className="pt-8 border-t border-white/10 mt-auto relative z-10">
                  <div className="text-xs text-slate-500 uppercase tracking-widest mb-3 font-black">
                    Bazaviy narx
                  </div>
                  <div className="text-blue-400 font-black text-3xl md:text-4xl tracking-tight">
                    {brandData[model].priceOneTime.toLocaleString()} <span className="text-xl text-slate-500 font-medium">so'm</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedModel && (
        <div
          ref={checkoutRef}
          className="bg-white p-8 md:p-16 lg:p-20 rounded-[3rem] md:rounded-[4rem] shadow-2xl border border-slate-100 animate-fade-up relative overflow-hidden"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>
          
          <div className="text-center mb-16 relative z-10">
            <div className="inline-flex items-center space-x-2 bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100 mb-6">
              <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
              <span className="text-xs font-black uppercase tracking-widest text-blue-600">Xizmat Turini Tanlang</span>
            </div>
            <h3 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900">
              <span className="capitalize">{brand}</span> {selectedModel}
            </h3>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 mb-16 relative z-10">
            {/* 1 Martalik */}
            <div
              onClick={() => setTariffType("one-time")}
              className={`p-10 md:p-12 rounded-[3rem] border-2 cursor-pointer transition-all duration-500 flex flex-col group ${
                tariffType === "one-time"
                  ? "border-slate-900 bg-slate-50 shadow-2xl scale-[1.02]"
                  : "border-slate-100 hover:border-slate-300 hover:shadow-xl hover:-translate-y-1"
              }`}
            >
              <div className="flex justify-between items-center mb-10">
                <h4 className="text-3xl font-black uppercase tracking-tight text-slate-900">
                  1 Martalik
                </h4>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${tariffType === "one-time" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-300 group-hover:bg-slate-200"}`}>
                  <i className="fas fa-check"></i>
                </div>
              </div>
              <ul className="space-y-6 mb-12 flex-grow">
                <li className="flex items-center gap-5 text-slate-700 font-medium text-lg">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm shrink-0"><i className="fa-solid fa-check"></i></div>
                  Modelga mos moy
                </li>
                <li className="flex items-center gap-5 text-slate-700 font-medium text-lg">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm shrink-0"><i className="fa-solid fa-check"></i></div>
                  Original filtrlar
                </li>
                <li className="flex items-center gap-5 text-slate-700 font-medium text-lg">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm shrink-0"><i className="fa-solid fa-check"></i></div>
                  Dvigatel nazorati
                </li>
                <li className="flex items-center gap-5 text-slate-700 font-medium text-lg">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm shrink-0"><i className="fa-solid fa-check"></i></div>
                  Bepul avtomoyka
                </li>
                <li className="flex items-center gap-5 text-slate-400 font-medium text-lg mt-8 pt-8 border-t border-slate-200">
                  <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center text-sm shrink-0"><i className="fa-solid fa-times"></i></div>
                  Million KM kafolati yo'q
                </li>
              </ul>
              <div className="pt-10 border-t border-slate-200">
                <div className="text-sm text-slate-500 uppercase tracking-widest font-black mb-3">Jami to'lov</div>
                <div className="text-5xl font-black text-slate-900 tracking-tight">
                  {brandData[selectedModel].priceOneTime.toLocaleString()}{" "}
                  <span className="text-2xl text-slate-500 font-medium">so'm</span>
                </div>
              </div>
            </div>

            {/* Yillik */}
            <div
              onClick={() => setTariffType("yearly")}
              className={`p-10 md:p-12 rounded-[3rem] border-2 cursor-pointer transition-all duration-500 flex flex-col relative overflow-hidden group ${
                tariffType === "yearly"
                  ? "border-blue-600 bg-blue-50/50 shadow-2xl shadow-blue-600/20 scale-[1.02]"
                  : "border-blue-100 hover:border-blue-300 hover:shadow-xl hover:-translate-y-1"
              }`}
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] font-black px-6 py-3 rounded-bl-3xl uppercase tracking-widest shadow-lg shadow-blue-600/30 z-10">
                Tavsiya etiladi
              </div>
              
              <div className="flex justify-between items-center mb-10 relative z-10">
                <h4 className="text-3xl font-black uppercase tracking-tight text-blue-900">
                  1 Yillik Tarif
                </h4>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${tariffType === "yearly" ? "bg-blue-600 text-white shadow-lg shadow-blue-600/40" : "bg-blue-100 text-blue-300 group-hover:bg-blue-200"}`}>
                  <i className="fas fa-check"></i>
                </div>
              </div>
              
              <ul className="space-y-6 mb-12 flex-grow relative z-10">
                <li className="flex items-center gap-5 text-blue-900 font-bold text-lg">
                  <div className="w-8 h-8 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center text-sm shrink-0"><i className="fa-solid fa-star"></i></div>
                  Har safar bepul avtomoyka
                </li>
                <li className="flex items-center gap-5 text-blue-900 font-bold text-lg">
                  <div className="w-8 h-8 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center text-sm shrink-0"><i className="fa-solid fa-star"></i></div>
                  1 000 000 KM kafolati
                </li>
                <li className="flex items-center gap-5 text-blue-900 font-bold text-lg">
                  <div className="w-8 h-8 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center text-sm shrink-0"><i className="fa-solid fa-star"></i></div>
                  Doimiy monitoring
                </li>
                <li className="flex items-center gap-5 text-blue-900 font-bold text-lg">
                  <div className="w-8 h-8 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center text-sm shrink-0"><i className="fa-solid fa-star"></i></div>
                  Telegram yopiq guruh
                </li>
              </ul>
              
              <div className="pt-10 border-t border-blue-200 flex items-center justify-between relative z-10">
                <span className="font-black text-blue-800 uppercase tracking-widest text-sm">Konfiguratsiya qilish</span>
                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center animate-bounce shadow-sm">
                  <i className="fa-solid fa-arrow-down"></i>
                </div>
              </div>
            </div>
          </div>

          {tariffType === "yearly" && (
            <div className="bg-slate-900 rounded-[3rem] p-10 md:p-16 text-white mb-16 animate-fade-in shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay pointer-events-none"></div>
              
              <div className="grid md:grid-cols-2 gap-16 items-center relative z-10">
                <div>
                  <h4 className="text-3xl font-black mb-6">Xizmatlar soni</h4>
                  <p className="text-slate-400 text-lg mb-10 leading-relaxed font-medium">
                    Yil davomida necha marta moy almashtirmoqchisiz? Avtomobilingizdan foydalanish jadalligiga qarab tanlang.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    {[3, 4, 5, 6, 8, 10, 12].map((num) => (
                      <button
                        key={num}
                        onClick={() => setYearlyCount(num)}
                        className={`w-20 h-20 rounded-3xl font-black text-2xl transition-all duration-300 flex items-center justify-center ${
                          yearlyCount === num
                            ? "bg-blue-600 text-white scale-110 shadow-2xl shadow-blue-600/40 border-2 border-blue-400"
                            : "bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10 hover:-translate-y-1"
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="bg-white/5 rounded-[3rem] p-10 md:p-12 border border-white/10 text-center backdrop-blur-md shadow-xl">
                  <div className="text-sm text-slate-400 uppercase tracking-widest font-black mb-6">
                    Jami Yillik To'lov
                  </div>
                  <div className="text-6xl md:text-7xl font-black text-white mb-4 tracking-tighter">
                    {calculateYearlyPrice(
                      brandData[selectedModel].priceOneTime,
                      yearlyCount,
                    ).toLocaleString()}
                  </div>
                  <div className="text-slate-400 font-medium text-xl">so'm</div>
                  
                  <div className="mt-10 pt-10 border-t border-white/10 flex justify-between items-center text-base">
                    <span className="text-slate-400 font-medium">1 ta xizmat narxi:</span>
                    <span className="text-white font-bold">{brandData[selectedModel].priceOneTime.toLocaleString()} so'm</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="text-center relative z-10">
            <button
              onClick={submitOrder}
              disabled={!tariffType}
              className={`px-16 py-8 rounded-3xl font-black uppercase tracking-widest text-base transition-all duration-300 w-full md:w-auto min-w-[350px] flex items-center justify-center gap-4 mx-auto group ${
                tariffType
                  ? "bg-blue-600 text-white hover:bg-blue-500 hover:scale-[1.02] active:scale-95 shadow-2xl shadow-blue-600/30 cursor-pointer"
                  : "bg-slate-100 text-slate-400 cursor-not-allowed"
              }`}
            >
              {tariffType ? (
                <>
                  Tasdiqlash va Band qilish
                  <i className="fa-solid fa-arrow-right group-hover:translate-x-2 transition-transform"></i>
                </>
              ) : (
                "Tarifni tanlang"
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function BrandGrid({ onBrandSelect, onInfoSelect, user }) {
  const brands = [
    { id: "chevrolet", name: "Chevrolet" },
    { id: "kia", name: "Kia" },
    { id: "liauto", name: "Li Auto" },
  ];

  return (
    <div className="py-20 md:py-32 max-w-7xl mx-auto px-4 md:px-8 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="text-center mb-16 md:mb-24 relative z-10">
        <div className="inline-flex items-center space-x-2 bg-blue-50 px-3 py-1 rounded-full border border-blue-100 mb-6">
          <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse"></span>
          <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">Avtomobillar</span>
        </div>
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-slate-900 mb-8">
          Brendni Tanlang
        </h2>
        <p className="text-lg md:text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
          O'zingizga mos brendni tanlang va bizning maxsus xizmatlarimizdan foydalaning.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative z-10">
        {brands.map((brand) => (
          <div
            key={brand.id}
            className="bg-white p-10 md:p-14 rounded-[3rem] border border-slate-100 shadow-xl hover:shadow-2xl group hover:-translate-y-2 transition-all duration-500 flex flex-col items-center text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-50/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            
            <div
              onClick={() => onBrandSelect(brand.id)}
              className="mb-12 transform group-hover:scale-110 transition-transform duration-500 cursor-pointer relative z-10"
            >
              <BrandLogo brand={brand.id} />
            </div>
            
            <h3
              onClick={() => onBrandSelect(brand.id)}
              className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 mb-12 cursor-pointer relative z-10 group-hover:text-blue-600 transition-colors duration-300"
            >
              {brand.name}
            </h3>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center relative z-10 mt-auto">
              <button
                onClick={() => onBrandSelect(brand.id)}
                className="bg-slate-900 text-white hover:bg-blue-600 px-8 py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-colors flex-1 shadow-xl shadow-slate-900/20 hover:shadow-blue-600/30"
              >
                Modellarni ko'rish
              </button>
              <button
                onClick={onInfoSelect}
                className="bg-white border-2 border-slate-200 text-slate-600 hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center transition-all shrink-0 shadow-sm hover:shadow-md"
                title="Ma'lumot"
              >
                <i className="fa-solid fa-info-circle text-2xl"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export { BrandGrid, BrandModels };
export default BrandGrid;
