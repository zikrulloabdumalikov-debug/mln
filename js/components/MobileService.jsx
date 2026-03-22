import React, { useState } from "react";

export default function MobileService({ type, user, onOrder, onOpenAuth }) {
  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    location: "",
    note: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      onOpenAuth();
      return;
    }
    onOrder({
      serviceType: type === "fuel" ? "YOQILG'I YETKAZISH" : "EXPRESS SERVIS",
      userName: formData.name,
      phone: formData.phone,
      note: `Manzil: ${formData.location}. Izoh: ${formData.note}`,
    });
  };

  const isFuel = type === "fuel";

  return (
    <div className="py-20 md:py-32 bg-slate-50 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[80px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 md:gap-24 items-center">
          <div className="animate-fade-right">
            <div className="inline-flex items-center space-x-2 bg-blue-50 px-3 py-1 rounded-full border border-blue-100 mb-8">
              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse"></span>
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">Tezkor Yordam</span>
            </div>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-slate-900 mb-10 leading-[1.05]">
              Sizga <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Yordam</span> Kerakmi?
            </h2>
            <p className="text-xl md:text-2xl text-slate-500 font-medium leading-relaxed max-w-lg mb-12">
              {isFuel
                ? "Yoqilg'i tugab qoldimi? Xavotir olmang, biz siz turgan joyga kerakli yoqilg'ini yetkazib beramiz."
                : "Avtomobilingiz yo'lda buzildimi? Bizning ko'chma ustaxonamiz sizga yordamga shoshilmoqda."}
            </p>
            
            <div className="flex flex-col gap-8">
              <div className="flex items-center gap-6 bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <i className="fa-solid fa-bolt text-2xl"></i>
                </div>
                <div>
                  <h4 className="text-xl font-black text-slate-900 mb-1">Tezkor yetib borish</h4>
                  <p className="text-base text-slate-500 font-medium">Toshkent bo'ylab 30 daqiqada</p>
                </div>
              </div>
              <div className="flex items-center gap-6 bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  <i className="fa-solid fa-headset text-2xl"></i>
                </div>
                <div>
                  <h4 className="text-xl font-black text-slate-900 mb-1">24/7 Aloqa</h4>
                  <p className="text-base text-slate-500 font-medium">Istalgan vaqtda yordamga tayyormiz</p>
                </div>
              </div>
            </div>
          </div>

          <div className="animate-fade-left relative group">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-indigo-600/20 rotate-3 rounded-[3rem] md:rounded-[4rem] blur-2xl group-hover:rotate-6 transition-transform duration-700"></div>
            <form
              onSubmit={handleSubmit}
              className="relative bg-white p-10 md:p-14 rounded-[3rem] md:rounded-[4rem] border border-slate-100 shadow-2xl space-y-8"
            >
              <div className="text-center mb-10">
                <h3 className="text-3xl font-black text-slate-900 mb-3">So'rov qoldirish</h3>
                <p className="text-base text-slate-500 font-medium">Ma'lumotlaringizni kiriting, biz tezda aloqaga chiqamiz</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-black text-slate-400 mb-3 uppercase tracking-widest pl-4">
                    Ismingiz
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-8 py-5 rounded-3xl bg-slate-50 border-2 border-slate-100 focus:border-blue-500 focus:bg-white outline-none font-medium text-slate-900 transition-all text-lg"
                    placeholder="Ismingizni kiriting"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-400 mb-3 uppercase tracking-widest pl-4">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-8 py-5 rounded-3xl bg-slate-50 border-2 border-slate-100 focus:border-blue-500 focus:bg-white outline-none font-medium text-slate-900 transition-all text-lg"
                    placeholder="+998"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-400 mb-3 uppercase tracking-widest pl-4">
                    Manzil
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                      className="w-full pl-8 pr-16 py-5 rounded-3xl bg-slate-50 border-2 border-slate-100 focus:border-blue-500 focus:bg-white outline-none font-medium text-slate-900 transition-all text-lg"
                      placeholder="Qayerdasiz?"
                    />
                    <button type="button" className="absolute right-6 top-1/2 -translate-y-1/2 text-blue-600 hover:text-blue-700 transition-colors bg-blue-50 w-10 h-10 rounded-full flex items-center justify-center hover:bg-blue-100">
                      <i className="fa-solid fa-location-crosshairs text-lg"></i>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-400 mb-3 uppercase tracking-widest pl-4">
                    Izoh
                  </label>
                  <textarea
                    rows="3"
                    value={formData.note}
                    onChange={(e) =>
                      setFormData({ ...formData, note: e.target.value })
                    }
                    className="w-full px-8 py-5 rounded-3xl bg-slate-50 border-2 border-slate-100 focus:border-blue-500 focus:bg-white outline-none font-medium text-slate-900 transition-all resize-none text-lg"
                    placeholder="Qo'shimcha ma'lumot (ixtiyoriy)"
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                className="w-full h-16 bg-blue-600 text-white font-black rounded-3xl uppercase tracking-widest text-sm hover:bg-blue-500 hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-xl shadow-blue-600/30 mt-10 flex items-center justify-center gap-3 group"
              >
                Yuborish
                <i className="fa-solid fa-paper-plane group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
