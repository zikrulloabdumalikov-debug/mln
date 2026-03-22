import React from "react";
import { CONTENT } from "../content.js";

export default function QuickServices({ onSelect }) {
  const services = [
    {
      id: "express",
      title: CONTENT.services.express.title,
      desc: CONTENT.services.express.desc,
      icon: "fas fa-bolt",
      color: "blue",
      view: "express",
      cta: CONTENT.services.express.cta,
    },
    {
      id: "fuel",
      title: CONTENT.services.fuel.title,
      desc: CONTENT.services.fuel.desc,
      icon: "fas fa-gas-pump",
      color: "indigo",
      view: "fuel",
      cta: CONTENT.services.fuel.cta,
    },
  ];

  return (
    <div className="py-20 md:py-32 max-w-7xl mx-auto px-4 md:px-8 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="text-center mb-16 md:mb-24 relative z-10">
        <div className="inline-flex items-center space-x-2 bg-blue-50 px-3 py-1 rounded-full border border-blue-100 mb-6">
          <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse"></span>
          <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">Tezkor Xizmatlar</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 mb-6">
          Vaqtingizni tejaymiz
        </h2>
        <p className="text-lg md:text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
          Bizning tezkor xizmatlarimiz sizning vaqtingizni va asabingizni tejaydi. Yo'lda qolmang, biz doim yoningizdamiz.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto relative z-10">
        {services.map((s) => (
          <div
            key={s.id}
            onClick={() => onSelect(s.view)}
            className="group p-8 md:p-12 bg-white rounded-[2.5rem] md:rounded-[3rem] border border-slate-100 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer flex flex-col items-start text-left relative overflow-hidden"
          >
            <div className={`absolute top-0 right-0 w-64 h-64 bg-${s.color}-500/10 rounded-full blur-[60px] pointer-events-none group-hover:bg-${s.color}-500/20 transition-colors duration-500`}></div>
            
            <div
              className={`w-20 h-20 bg-${s.color}-50 text-${s.color}-600 rounded-3xl flex items-center justify-center mb-10 group-hover:bg-${s.color}-600 group-hover:text-white transition-colors duration-500 shadow-sm relative z-10`}
            >
              <i className={`${s.icon} text-3xl`}></i>
            </div>
            <h3 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 mb-4 relative z-10">
              {s.title}
            </h3>
            <p className="text-slate-500 font-medium leading-relaxed mb-10 flex-grow text-lg relative z-10">
              {s.desc}
            </p>
            <div
              className={`mt-auto text-${s.color}-600 font-black text-sm uppercase tracking-widest flex items-center gap-3 group-hover:translate-x-2 transition-transform duration-300 relative z-10`}
            >
              {s.cta} <i className="fas fa-arrow-right"></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
