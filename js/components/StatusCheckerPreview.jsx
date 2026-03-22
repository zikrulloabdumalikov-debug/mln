import React from "react";

export default function StatusCheckerPreview({ onCheck }) {
  return (
    <div className="py-16 md:py-24 px-6 md:px-16 bg-slate-900 rounded-[3rem] md:rounded-[4rem] text-white relative overflow-hidden shadow-2xl shadow-blue-900/20 text-center my-20">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[80px]"></div>
        <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] bg-indigo-600/20 rounded-full blur-[80px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto space-y-10">
        <div className="inline-flex items-center gap-3 bg-white/10 border border-white/20 px-5 py-2.5 rounded-full shadow-sm backdrop-blur-md">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
          <span className="text-xs font-black text-white uppercase tracking-widest">
            Holatni Tekshirish
          </span>
        </div>

        <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[1.1]">
          Avtomobilingiz <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Kafolatda</span> mi?
        </h2>

        <p className="text-lg md:text-xl text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed">
          Mashinangizning holatini tekshiring va Million KM kafolat dasturiga
          ulanish imkoniyatini bilib oling.
        </p>

        <div className="pt-8">
          <button
            onClick={onCheck}
            className="bg-blue-600 text-white px-12 py-6 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-blue-600/30 hover:bg-blue-500 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center mx-auto gap-4 group"
          >
            Hozir tekshirish
            <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
