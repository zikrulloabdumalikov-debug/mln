import React from "react";
import { CONTENT } from "../content.js";

export default function Hero({ user, onStart, onStatusCheck }) {
  return (
    <div className="relative min-h-[90vh] md:min-h-screen flex flex-col items-center justify-center overflow-hidden pt-32 md:pt-0 px-4 md:px-8 bg-slate-50">
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-white/60 rounded-full blur-[150px]"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay"></div>
      </div>

      <div className="relative z-10 text-center max-w-5xl mx-auto space-y-10 md:space-y-16">
        <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-xl px-4 py-2 rounded-full border border-blue-100 shadow-sm animate-fade-up">
          <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
          <span className="text-xs font-black uppercase tracking-widest text-blue-600">Yangi Avlod Avtoservisi</span>
        </div>
        
        <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-[7rem] font-black tracking-tighter text-slate-900 leading-[1.05] animate-fade-up" style={{ animationDelay: "100ms" }}>
          {CONTENT.hero.title_line1}
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">{CONTENT.hero.title_line2}</span>
        </h1>

        <p
          className="text-lg sm:text-xl md:text-3xl text-slate-600 font-medium max-w-4xl mx-auto leading-relaxed animate-fade-up"
          style={{ animationDelay: "200ms" }}
        >
          {CONTENT.hero.subtitle}
        </p>

        <div
          className="flex flex-col sm:flex-row justify-center items-center gap-6 pt-10 animate-fade-up"
          style={{ animationDelay: "300ms" }}
        >
          <button
            onClick={onStart}
            className="w-full sm:w-auto bg-slate-900 text-white px-12 md:px-16 py-6 rounded-3xl font-black uppercase tracking-widest text-sm md:text-base shadow-2xl shadow-slate-900/20 hover:bg-blue-600 hover:shadow-blue-600/30 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-4 group"
          >
            {user ? CONTENT.hero.cta_auth : CONTENT.hero.cta_guest}
            <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
          </button>

          <button
            onClick={onStatusCheck}
            className="w-full sm:w-auto bg-white text-slate-900 px-12 md:px-16 py-6 rounded-3xl font-black uppercase tracking-widest text-sm md:text-base border-2 border-slate-200 hover:border-blue-600 hover:text-blue-600 transition-all duration-300 flex items-center justify-center group shadow-sm hover:shadow-xl"
          >
            <i className="fa-solid fa-play-circle text-blue-600 mr-4 text-2xl group-hover:scale-110 transition-transform"></i>
            {CONTENT.hero.cta_secondary}
          </button>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce text-slate-400 hover:text-blue-600 transition-colors cursor-pointer w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-md border border-slate-100">
        <i className="fa-solid fa-chevron-down text-xl"></i>
      </div>
    </div>
  );
}
