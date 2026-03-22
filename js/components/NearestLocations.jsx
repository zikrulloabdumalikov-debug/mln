import React from "react";
import { CONTENT } from "../content.js";

const loc = CONTENT.locations;

function NearestLocations() {
  return (
    <div className="py-20 md:py-32 bg-slate-50 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-16 md:mb-24">
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse"></span>
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">Bizning Manzil</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900">
              Sizga Yaqinmiz.
            </h2>
          </div>
          <p className="text-lg md:text-xl text-slate-500 font-medium max-w-md leading-relaxed">
            Sizga eng yaqin xizmat ko'rsatish markazimiz.
          </p>
        </div>

        <div className="max-w-6xl mx-auto bg-white rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[60px] pointer-events-none"></div>
          
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 relative z-10">
            <div className="space-y-10 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-10">
                  <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center shadow-sm border border-blue-100/50">
                    <i className="fas fa-map-marker-alt text-3xl"></i>
                  </div>
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 text-xs font-black uppercase tracking-widest rounded-full border border-emerald-100">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Ochiq
                  </span>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 mb-4">
                    {loc.map_region}
                  </h3>
                  <p className="text-slate-500 font-medium leading-relaxed text-lg">
                    {loc.map_address}
                  </p>
                </div>

                <div className="flex items-center text-slate-700 font-bold text-lg bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mr-4 shadow-sm text-blue-600">
                    <i className="far fa-clock text-xl"></i>
                  </div>
                  08:00 — 22:00
                </div>
              </div>

              <div className="pt-10 border-t border-slate-100">
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Telefon</p>
                <a href={`tel:${loc.phone}`} className="text-3xl md:text-4xl font-black text-slate-900 hover:text-blue-600 transition-colors block mb-8 tracking-tight">
                  {loc.phone_display}
                </a>
                <a href={`tel:${loc.phone}`} className="inline-flex items-center justify-center w-full h-16 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-blue-500 hover:scale-[1.02] transition-all duration-300 shadow-xl shadow-blue-600/30 gap-3">
                  <i className="fas fa-phone-alt"></i> Hozir Qo'ng'iroq Qilish
                </a>
              </div>
            </div>

            <div className="h-[400px] md:h-auto min-h-[400px] rounded-[2rem] overflow-hidden border-2 border-slate-100 shadow-inner group relative">
              <div className="absolute inset-0 bg-slate-900/5 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none"></div>
              <iframe
                src={loc.map_src}
                width="100%"
                height="100%"
                frameBorder="0"
                allowFullScreen={true}
                className="grayscale hover:grayscale-0 transition-all duration-700 w-full h-full object-cover relative z-0"
                title="Yandex Map"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LocationsPreview({ onViewAll }) {
  return (
    <div className="py-20 md:py-32 bg-slate-50 overflow-hidden relative">
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-16 md:mb-24">
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse"></span>
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">Bizning Manzil</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900">
              Sizga Yaqinmiz.
            </h2>
          </div>
          <p className="text-lg md:text-xl text-slate-500 font-medium max-w-md leading-relaxed">
            Sizga eng yaqin xizmat ko'rsatish markazimiz.
          </p>
        </div>

        <div
          onClick={onViewAll}
          className="max-w-6xl mx-auto bg-white rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-12 shadow-xl hover:shadow-2xl border border-slate-100 cursor-pointer group hover:-translate-y-2 transition-all duration-500 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[60px] pointer-events-none group-hover:bg-blue-500/10 transition-colors duration-500"></div>
          
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 relative z-10">
            <div className="space-y-10 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-10">
                  <div className="w-20 h-20 bg-slate-50 text-slate-400 rounded-3xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-sm group-hover:shadow-xl group-hover:shadow-blue-600/30">
                    <i className="fas fa-map-marker-alt text-3xl"></i>
                  </div>
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 text-xs font-black uppercase tracking-widest rounded-full border border-emerald-100">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Ochiq
                  </span>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                    {loc.map_region}
                  </h3>
                  <p className="text-slate-500 font-medium leading-relaxed text-lg">
                    {loc.map_address}
                  </p>
                </div>

                <div className="flex items-center text-slate-700 font-bold text-lg bg-slate-50 p-4 rounded-2xl border border-slate-100 group-hover:bg-blue-50/50 transition-colors duration-300">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mr-4 shadow-sm text-blue-600">
                    <i className="far fa-clock text-xl"></i>
                  </div>
                  08:00 — 22:00
                </div>
              </div>

              <div className="pt-10 border-t border-slate-100">
                <div className="text-blue-600 font-black uppercase tracking-widest text-sm flex items-center gap-3 group-hover:translate-x-2 transition-transform duration-300">
                  Filiallarni ko'rish <i className="fas fa-arrow-right"></i>
                </div>
              </div>
            </div>

            <div className="h-[300px] md:h-auto min-h-[300px] rounded-[2rem] overflow-hidden border-2 border-slate-100 shadow-inner group-hover:shadow-xl transition-shadow duration-500 relative">
              <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none"></div>
              <iframe
                src={loc.map_src}
                width="100%"
                height="100%"
                frameBorder="0"
                allowFullScreen={true}
                className="grayscale group-hover:grayscale-0 transition-all duration-700 w-full h-full object-cover relative z-0"
                title="Yandex Map"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { NearestLocations, LocationsPreview };
export default NearestLocations;
