import React from "react";
import { CONTENT } from "../content.js";

export default function ServiceInfo({ onSelectModel, onBack }) {
  const info = CONTENT.infoModal;

  return (
    <div className="animate-fade-in pb-20 max-w-6xl mx-auto px-4 sm:px-6 pt-24">
      <div className="bg-white rounded-[2.5rem] md:rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[80px] pointer-events-none"></div>
        
        <div className="bg-white/90 backdrop-blur-xl px-6 md:px-12 py-8 border-b border-slate-100 flex items-center justify-between sticky top-0 z-20">
          <div>
            <div className="inline-flex items-center space-x-2 bg-blue-50 px-3 py-1 rounded-full border border-blue-100 mb-3">
              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse"></span>
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">{info.tagline}</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-slate-900 leading-tight">
              {info.title}
            </h2>
          </div>
          <button
            onClick={onBack}
            className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center transition-all duration-300 hover:rotate-90 shrink-0"
          >
            <i className="fa-solid fa-times text-xl text-slate-400 hover:text-slate-900"></i>
          </button>
        </div>

        <div className="p-6 md:p-12 space-y-16 md:space-y-24 relative z-10">
          <div className="max-w-4xl">
            <h3 className="text-2xl md:text-4xl font-black tracking-tight text-slate-900 mb-6">{info.intro.title}</h3>
            <p className="text-slate-600 leading-relaxed text-lg md:text-xl font-medium">
              {info.intro.text}
            </p>
          </div>

          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px bg-slate-200 flex-grow"></div>
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] shrink-0">
                Tariflarni taqqoslash
              </h3>
              <div className="h-px bg-slate-200 flex-grow"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
              <div className="bg-slate-50 border border-slate-200 rounded-[2rem] p-8 md:p-10 flex flex-col hover:shadow-lg transition-shadow duration-300">
                <div className="mb-8">
                  <h4 className="text-2xl font-black tracking-tight text-slate-900 mb-2">
                    {info.comparison.oneTime.title}
                  </h4>
                  <p className="text-slate-500 font-medium text-sm">Standart xizmat ko'rsatish</p>
                </div>
                
                <ul className="space-y-5 mb-10 flex-grow">
                  {info.comparison.oneTime.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-4 text-slate-700 font-medium">
                      <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                        <i className="fa-solid fa-check text-[10px]"></i>
                      </div>
                      <span className="leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-auto pt-8 border-t border-slate-200">
                  <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl font-bold text-sm mb-4 border border-emerald-100">
                    <i className="fa-solid fa-shield-check"></i>
                    {info.comparison.oneTime.guarantee}
                  </div>
                  <div className="text-2xl font-black text-slate-900">
                    {info.comparison.oneTime.price}
                  </div>
                </div>
              </div>

              <div className="bg-slate-900 text-white rounded-[2rem] p-8 md:p-10 flex flex-col relative overflow-hidden shadow-2xl transform md:-translate-y-4">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 blur-[60px] rounded-full pointer-events-none"></div>
                <div className="absolute top-6 right-6 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-[10px] font-black px-4 py-2 rounded-xl uppercase tracking-widest shadow-lg shadow-blue-500/30">
                  {info.comparison.yearly.badge}
                </div>
                
                <div className="mb-8 relative z-10">
                  <h4 className="text-2xl font-black tracking-tight text-white mb-2">
                    {info.comparison.yearly.title}
                  </h4>
                  <p className="text-slate-400 font-medium text-sm">To'liq xotirjamlik paketi</p>
                </div>
                
                <ul className="space-y-5 mb-10 flex-grow relative z-10">
                  {info.comparison.yearly.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-4 text-slate-200 font-medium">
                      <div className="w-6 h-6 rounded-full bg-white/10 text-yellow-400 flex items-center justify-center shrink-0 mt-0.5">
                        <i className="fa-solid fa-star text-[10px]"></i>
                      </div>
                      <span className="leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-auto pt-8 border-t border-slate-700 relative z-10">
                  <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-xl font-bold text-sm mb-4 border border-emerald-500/30">
                    <i className="fa-solid fa-shield-check"></i>
                    {info.comparison.yearly.guarantee}
                  </div>
                  <div className="text-2xl font-black text-white">
                    {info.comparison.yearly.price}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-4 mb-10">
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] shrink-0">
                {info.steps.title}
              </h3>
              <div className="h-px bg-slate-200 flex-grow"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {info.steps.items.map((step, idx) => (
                <div key={idx} className="bg-slate-50 rounded-[2rem] p-8 border border-slate-100 hover:bg-white hover:shadow-xl transition-all duration-300 group">
                  <div className="w-16 h-16 bg-white text-blue-600 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-sm border border-slate-100 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    <i className={step.icon}></i>
                  </div>
                  <h4 className="text-xl font-black text-slate-900 mb-3">{step.title}</h4>
                  <p className="text-base text-slate-500 font-medium leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-4 mb-10">
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] shrink-0">
                {info.faq.title}
              </h3>
              <div className="h-px bg-slate-200 flex-grow"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {info.faq.items.map((item, index) => (
                <div key={index} className="bg-slate-50 rounded-[2rem] p-8 border border-slate-100">
                  <h4 className="text-lg font-black text-slate-900 flex gap-4 mb-4">
                    <span className="text-blue-600 shrink-0"><i className="fa-solid fa-circle-question"></i></span> 
                    <span className="leading-tight">{item.q}</span>
                  </h4>
                  <p className="text-slate-600 text-base font-medium leading-relaxed pl-9">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-slate-900 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[100px] pointer-events-none"></div>
          
          <div className="relative z-10 max-w-2xl text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-black text-white mb-2">Tayyormisiz?</h3>
            <p className="text-slate-300 font-medium text-lg">
              {info.cta.text}
            </p>
          </div>
          <button
            onClick={onSelectModel}
            className="relative z-10 w-full md:w-auto bg-blue-600 text-white rounded-2xl px-10 py-6 font-black uppercase tracking-widest text-sm hover:bg-blue-500 hover:scale-105 transition-all duration-300 shadow-xl shadow-blue-600/30 whitespace-nowrap flex items-center justify-center gap-3 group"
          >
            {info.cta.button}
            <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
