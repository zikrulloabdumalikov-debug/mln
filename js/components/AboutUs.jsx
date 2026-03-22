import React from 'react';

const AboutUs = ({ onCheckStatus }) => {
  return (
    <div className="bg-white">

      {/* BLOK 1 */}
      <div className="pt-32 pb-16 md:pb-24 px-4 md:px-8 bg-slate-50 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="inline-flex items-center space-x-3 bg-white px-5 py-2 rounded-full border border-slate-200 mb-10 shadow-sm">
            <span className="w-2.5 h-2.5 bg-blue-600 rounded-full animate-pulse"></span>
            <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">Bizning Falsafa</span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-slate-900 leading-[1.05] mb-16">
            Million KM — <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">bu sizning yutug'ingiz!</span>
          </h1>
          <div className="bg-slate-900 text-white p-10 md:p-20 rounded-[3rem] md:rounded-[4rem] shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 blur-[100px] rounded-full group-hover:bg-blue-600/30 transition-all duration-700"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/20 blur-[100px] rounded-full group-hover:bg-indigo-600/30 transition-all duration-700"></div>
            <div className="relative z-10">
              <i className="fas fa-quote-left text-6xl md:text-8xl text-white/5 absolute -top-8 -left-8 md:-top-12 md:-left-12 transform -rotate-12"></i>
              <p className="text-2xl md:text-5xl font-black leading-[1.2] tracking-tight italic relative z-10">
                "Buzilishning oldini olish — <br className="hidden md:block" />
                xarajat emas, eng katta tejashdir."
              </p>
              <div className="mt-12 inline-block px-6 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-blue-400 font-bold uppercase tracking-widest text-xs md:text-sm">
                Ertangi kunga investitsiya
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BLOK 2 */}
      <div className="py-20 md:py-32 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 leading-[1.1]">
              Nega bu haqiqat? <br />
              <span className="text-slate-400">Raqamlar va faktlar bilan</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
            <div className="bg-slate-900 text-white p-10 md:p-12 rounded-[2.5rem] md:rounded-[3rem] flex flex-col justify-between min-h-[360px] group hover:-translate-y-2 transition-all duration-500 shadow-xl">
              <div>
                <div className="text-6xl md:text-8xl font-black tracking-tighter mb-6 text-white/10 group-hover:text-white/20 transition-colors duration-500">3-5x</div>
                <h3 className="text-2xl font-black uppercase tracking-wide mb-6">Qimmatroq ta'mirlash</h3>
              </div>
              <p className="text-slate-400 font-medium leading-relaxed text-base md:text-lg">
                Dvigatel buzilgandan keyin ta'mirlash xarajati oddiy moy almashtirish xarajatidan 3 dan 5 martagacha qimmat tushadi. Oldini olish — doimo arzonroq.
              </p>
            </div>
            <div className="bg-blue-600 text-white p-10 md:p-12 rounded-[2.5rem] md:rounded-[3rem] flex flex-col justify-between min-h-[360px] group hover:-translate-y-2 transition-all duration-500 shadow-2xl shadow-blue-600/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="relative z-10">
                <div className="text-6xl md:text-8xl font-black tracking-tighter mb-6 text-white/30 group-hover:text-white/40 transition-colors duration-500">10k</div>
                <h3 className="text-2xl font-black uppercase tracking-wide mb-6">Xavfsiz interval</h3>
              </div>
              <p className="text-blue-100 font-medium leading-relaxed text-base md:text-lg relative z-10">
                Avtomobil zavodi tomonidan belgilangan moy almashtirish muddati. Bu muddat o'tgach dvigatel ichida aşınma 40% ga oshadi.
              </p>
            </div>
            <div className="bg-indigo-900 text-white p-10 md:p-12 rounded-[2.5rem] md:rounded-[3rem] flex flex-col justify-between min-h-[360px] group hover:-translate-y-2 transition-all duration-500 shadow-2xl shadow-indigo-900/20 relative overflow-hidden">
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
              <div className="relative z-10">
                <div className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-white/20 group-hover:text-white/30 transition-colors duration-500">1M km</div>
                <h3 className="text-2xl font-black uppercase tracking-wide mb-6">Bizning kafolat</h3>
              </div>
              <p className="text-indigo-200 font-medium leading-relaxed text-base md:text-lg relative z-10">
                O'z vaqtida xizmat olgan mijozlarning dvigatellarida bizning monitoring davomida hech qanday kritik muammo kuzatilmagan.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* BLOK 3 */}
      <div className="py-20 md:py-32 px-4 md:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 md:mb-24">
            <span className="inline-block py-1.5 px-5 rounded-full bg-blue-50 text-blue-600 text-sm font-bold tracking-widest uppercase border border-blue-100 mb-6">Biz Haqimizda</span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900">
              Biz shunchaki ustaxona emasmiz
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
            <div className="space-y-12">
              <h3 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 leading-[1.05]">
                "Sifat — bu <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">tasodif emas.</span>"
              </h3>
              <div className="space-y-6 text-lg md:text-xl text-slate-600 font-medium leading-relaxed">
                <p>Million KM — bu sizning avtomobilingiz uchun "shifoxona". Biz kasallikni davolamaymiz, biz uning oldini olamiz. Har bir detalga e'tibor beramiz. Har bir xizmatdan keyin raqamli hisobot beramiz.</p>
                <p>Biz 2020-yildan beri O'zbekistonda faqat original moy va ehtiyot qismlar bilan ishlaymiz. Har bir usta bizning 6 oylik sertifikatsiya dasturidan o'tgan.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8 border-t border-slate-200">
                {[
                  { icon: "fa-shield-halved", text: "Sertifikatlangan ustalar" },
                  { icon: "fa-oil-can", text: "Faqat original mahsulotlar" },
                  { icon: "fa-mobile-screen-button", text: "Raqamli monitoring" },
                  { icon: "fa-award", text: "1 000 000 km kafolat" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center space-x-5 bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-xl shrink-0">
                      <i className={`fas ${item.icon}`}></i>
                    </div>
                    <span className="font-bold text-slate-900 text-sm md:text-base">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6 md:gap-8">
              {[
                { val: "25K+", label: "Mijozlar", color: "blue" },
                { val: "100%", label: "Kafolat", color: "indigo" },
                { val: "24/7", label: "Qo'llab-quvvatlash", color: "emerald" },
                { val: "3 yil", label: "Bozorda", color: "amber" }
              ].map((stat, i) => (
                <div key={i} className={`bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-slate-100 flex flex-col justify-center items-center text-center aspect-square hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden`}>
                  <div className={`absolute inset-0 bg-${stat.color}-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  <div className="relative z-10">
                    <div className="text-4xl md:text-6xl font-black text-slate-900 mb-4 tracking-tighter group-hover:scale-110 transition-transform duration-500">{stat.val}</div>
                    <div className={`text-xs md:text-sm font-bold text-${stat.color}-600 uppercase tracking-widest`}>{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* BLOK 4 */}
      <div className="py-20 md:py-32 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 mb-6">
              Kafolat tizimi qanday ishlaydi?
            </h2>
            <p className="text-lg md:text-2xl text-slate-500 font-medium max-w-3xl mx-auto">
              3 ta oddiy qadam — va dvigatelingiz 1,000,000 km himoyalangan
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 relative">
            <div className="hidden md:block absolute top-16 left-[30%] text-slate-200 text-5xl"><i className="fas fa-chevron-right"></i></div>
            <div className="hidden md:block absolute top-16 right-[30%] text-slate-200 text-5xl"><i className="fas fa-chevron-right"></i></div>
            
            {[
              { num: "01", icon: "fa-calendar-check", title: "Yozilasiz", text: "Telefon, sayt yoki mini-chat orqali qulay vaqtni tanlab yozilasiz. Kutish yo'q — jadval sizga mos keladi." },
              { num: "02", icon: "fa-oil-can", title: "Xizmat bajariladi", text: "Sertifikatlangan usta original moy va filtr bilan 20-45 daqiqada xizmat ko'rsatadi. Siz kuzatishingiz mumkin." },
              { num: "03", icon: "fa-shield-halved", title: "Kafolat beriladi", text: "Raqamli kafolat xati yuboriladi. Keyingi xizmatgacha muammo bo'lsa — bepul ko'ramiz. Bu va'da emas, shartnoma." }
            ].map((step, i) => (
              <div key={i} className="text-center relative group">
                <div className="w-32 h-32 mx-auto bg-slate-50 rounded-[2rem] flex items-center justify-center text-4xl text-slate-400 mb-10 border-2 border-slate-100 group-hover:border-blue-500 group-hover:text-blue-600 group-hover:bg-blue-50 transition-all duration-500 relative shadow-sm group-hover:shadow-xl group-hover:shadow-blue-500/20 group-hover:-translate-y-2">
                  <i className={`fas ${step.icon}`}></i>
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center text-sm font-black border-4 border-white shadow-md">
                    {step.num}
                  </div>
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-6">{step.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed text-base md:text-lg px-4">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BLOK 5 */}
      <div className="bg-slate-900 py-20 md:py-24 px-4 md:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 blur-[100px] rounded-full"></div>
        
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left relative z-10">
          <div className="max-w-3xl">
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-8">Hoziroq boshlang</h2>
            <p className="text-slate-300 text-xl md:text-2xl font-medium leading-relaxed">
              Avtomobilingizni tekshirib, siz uchun eng mos xizmat variantini toping. Bepul status tekshiruvi — 1 daqiqa.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row w-full md:w-auto gap-6 shrink-0">
            <button onClick={onCheckStatus} className="px-10 py-6 bg-white text-slate-900 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-slate-100 hover:scale-105 transition-all duration-300 shadow-xl">
              Statusni tekshirish
            </button>
            <a href="tel:+998770200107" className="px-10 py-6 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-blue-500 hover:scale-105 transition-all duration-300 shadow-xl shadow-blue-600/30 flex items-center justify-center">
              <i className="fas fa-phone-alt mr-3 text-lg"></i> Qo'ng'iroq qilish
            </a>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AboutUs;
