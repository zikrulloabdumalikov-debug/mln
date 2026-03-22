import React from "react";
import { CONTENT } from "../content.js";

export default function Benefits({ onAboutClick }) {
  const colors = ["blue", "indigo", "emerald", "amber"];

  const benefits = CONTENT.benefits.items.map((item, index) => ({
    id: index,
    title: item.title,
    desc: item.desc,
    icon: `fa-solid ${item.icon}`,
    color: colors[index % colors.length],
  }));

  return (
    <div className="py-20 md:py-32 max-w-7xl mx-auto px-4 md:px-8 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="text-center mb-16 md:mb-24 relative z-10">
        <div className="inline-flex items-center space-x-2 bg-blue-50 px-3 py-1 rounded-full border border-blue-100 mb-6">
          <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse"></span>
          <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">Nega Biz?</span>
        </div>
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-slate-900 mb-6">
          {CONTENT.benefits.title}
        </h2>
        <p className="text-lg md:text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
          Bizning afzalliklarimiz va sizga taqdim etadigan qulayliklarimiz.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 mb-20 md:mb-32 relative z-10">
        {benefits.map((benefit) => (
          <div
            key={benefit.id}
            className="group p-8 md:p-10 bg-white rounded-[2.5rem] md:rounded-[3rem] border border-slate-100 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 relative overflow-hidden flex flex-col items-center text-center"
          >
            <div className={`absolute top-0 right-0 w-32 h-32 bg-${benefit.color}-500/10 rounded-full blur-[40px] pointer-events-none group-hover:bg-${benefit.color}-500/20 transition-colors duration-500`}></div>
            <div
              className={`w-20 h-20 md:w-24 md:h-24 bg-${benefit.color}-50 text-${benefit.color}-600 rounded-[2rem] flex items-center justify-center mb-8 group-hover:bg-${benefit.color}-600 group-hover:text-white transition-colors duration-500 shadow-sm relative z-10 group-hover:scale-110`}
            >
              <i className={`${benefit.icon} text-3xl md:text-4xl`}></i>
            </div>
            <h3 className="text-2xl font-black tracking-tight text-slate-900 mb-4 relative z-10">
              {benefit.title}
            </h3>
            <p className="text-slate-500 font-medium leading-relaxed relative z-10 flex-grow">
              {benefit.desc}
            </p>
          </div>
        ))}
      </div>

      <div
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
          onAboutClick();
        }}
        className="relative bg-slate-900 text-white rounded-[3rem] md:rounded-[4rem] p-12 md:p-20 text-center group hover:-translate-y-2 transition-all duration-500 cursor-pointer overflow-hidden shadow-2xl z-10"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay pointer-events-none"></div>
        
        <div className="relative z-10">
          <h3 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-10 max-w-5xl mx-auto leading-[1.1]">
            {CONTENT.benefits.cta_title}
          </h3>
          <p className="text-2xl md:text-3xl text-slate-400 italic font-medium mb-16 max-w-4xl mx-auto leading-relaxed">
            "{CONTENT.benefits.cta_quote}"
          </p>
          <button className="bg-white text-slate-900 rounded-3xl px-12 py-6 font-black uppercase tracking-widest text-sm group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 inline-flex items-center gap-4 shadow-xl shadow-white/10 group-hover:shadow-blue-600/30 group-hover:scale-105">
            Batafsil o'qish uchun bosing
            <i className="fa-solid fa-arrow-right group-hover:translate-x-2 transition-transform"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
