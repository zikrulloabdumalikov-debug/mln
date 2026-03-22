import React, { useState, useEffect, useRef } from "react";

export default function Navbar({
  currentView,
  setView,
  user,
  onLogout,
  onLoginClick,
  showBack,
  onBack,
}) {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNav = (view, hash = "") => {
    setView(view);
    setIsMobileMenuOpen(false);
    setIsUserDropdownOpen(false);
    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - 100;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header>
      <nav
        className={`fixed top-0 w-full z-[105] transition-all duration-500 ${scrolled ? "py-3 md:py-5 px-4 md:px-8" : "py-6 md:py-10 px-4 md:px-8"}`}
      >
        <div
          className={`max-w-7xl mx-auto h-16 md:h-20 flex justify-between items-center transition-all duration-500 rounded-full px-6 md:px-8 ${scrolled ? "bg-white/80 backdrop-blur-xl shadow-lg border border-slate-200/50" : "bg-transparent"}`}
        >
          <div className="flex items-center">
            {showBack && (
              <button
                onClick={onBack}
                className="bg-slate-100/80 backdrop-blur-md rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center hover:bg-slate-200 transition-colors mr-4 shadow-sm"
              >
                <i className="fa-solid fa-arrow-left text-slate-700"></i>
              </button>
            )}
            <span
              className="font-black tracking-tighter text-slate-900 text-xl md:text-2xl cursor-pointer hover:text-blue-600 transition-colors flex items-center gap-2"
              onClick={() => handleNav("home")}
            >
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-sm">
                <i className="fa-solid fa-car-side"></i>
              </div>
              Million KM
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => handleNav("home")}
              className={`text-sm font-bold transition-all hover:-translate-y-0.5 ${currentView === 'home' ? 'text-blue-600' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Bosh sahifa
            </button>
            <button
              onClick={() => handleNav("home", "#brands")}
              className={`text-sm font-bold transition-all hover:-translate-y-0.5 text-slate-600 hover:text-slate-900`}
            >
              Modellar
            </button>
            <button
              onClick={() => handleNav("home", "#locations")}
              className={`text-sm font-bold transition-all hover:-translate-y-0.5 text-slate-600 hover:text-slate-900`}
            >
              Filiallar
            </button>
            <button
              onClick={() => handleNav("about")}
              className={`text-sm font-bold transition-all hover:-translate-y-0.5 ${currentView === 'about' ? 'text-blue-600' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Biz haqimizda
            </button>

            <div className="h-6 w-px bg-slate-200"></div>

            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="bg-slate-900 text-white w-12 h-12 rounded-full font-black flex items-center justify-center hover:scale-105 transition-transform shadow-md"
                >
                  {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                </button>
                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-4 bg-white rounded-3xl shadow-2xl w-72 border border-slate-100 overflow-hidden animate-fade-in py-4">
                    <div className="px-6 py-4 border-b border-slate-50 mb-2 bg-slate-50/50">
                      <div className="font-black text-slate-900 truncate text-lg">
                        {user.name}
                      </div>
                      <div className="text-sm text-slate-500 font-medium">{user.phone}</div>
                    </div>
                    <div className="px-3 space-y-1">
                      <button
                        onClick={() => handleNav("cabinet")}
                        className="w-full text-left px-4 py-3 hover:bg-slate-50 rounded-2xl text-sm font-bold text-slate-700 hover:text-blue-600 flex items-center gap-3 transition-colors"
                      >
                        <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center"><i className="fa-solid fa-car-side"></i></div>
                        Shaxsiy kabinet
                      </button>
                      {user.isAdmin && (
                        <button
                          onClick={() => handleNav("admin")}
                          className="w-full text-left px-4 py-3 hover:bg-slate-50 rounded-2xl text-sm font-bold text-slate-700 hover:text-indigo-600 flex items-center gap-3 transition-colors"
                        >
                          <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center"><i className="fa-solid fa-user-shield"></i></div>
                          Admin panel
                        </button>
                      )}
                      <div className="h-px bg-slate-100 my-2 mx-4"></div>
                      <button
                        onClick={() => {
                          onLogout();
                          setIsUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-3 hover:bg-red-50 rounded-2xl text-sm font-bold text-red-600 flex items-center gap-3 transition-colors"
                      >
                        <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center"><i className="fa-solid fa-sign-out-alt"></i></div>
                        Chiqish
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onLoginClick}
                className="bg-slate-900 text-white h-12 px-8 rounded-full font-black uppercase tracking-widest text-xs hover:bg-blue-600 hover:scale-105 active:scale-95 transition-all duration-300 shadow-md hover:shadow-blue-600/30"
              >
                Kirish
              </button>
            )}
          </div>

          <div className="md:hidden flex items-center gap-3">
            {!user && (
              <button
                onClick={onLoginClick}
                className="bg-slate-900 text-white h-10 px-6 rounded-full font-black uppercase tracking-widest text-[10px] shadow-md"
              >
                Kirish
              </button>
            )}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${isMobileMenuOpen ? "bg-slate-900 text-white rotate-90" : "bg-white text-slate-900 shadow-md border border-slate-100"}`}
            >
              <i
                className={`fa-solid ${isMobileMenuOpen ? "fa-times" : "fa-bars"} text-lg`}
              ></i>
            </button>
          </div>
        </div>
      </nav>

      <div className={`fixed inset-0 z-[104] md:hidden transition-all duration-500 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
        <div className={`absolute inset-x-4 top-24 pb-8 px-6 bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 transition-all duration-500 flex flex-col gap-2 ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
          <div className="pt-8 space-y-2">
            <button
              onClick={() => handleNav("home")}
              className={`w-full p-4 rounded-2xl font-black text-lg text-left transition-all duration-300 ${currentView === "home" ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30 translate-x-2" : "text-slate-900 hover:bg-slate-50"}`}
            >
              Bosh sahifa
            </button>
            <button
              onClick={() => handleNav("home", "#brands")}
              className="w-full p-4 rounded-2xl font-black text-lg text-left text-slate-900 hover:bg-slate-50 transition-colors"
            >
              Modellar
            </button>
            <button
              onClick={() => handleNav("home", "#locations")}
              className="w-full p-4 rounded-2xl font-black text-lg text-left text-slate-900 hover:bg-slate-50 transition-colors"
            >
              Filiallar
            </button>
            <button
              onClick={() => handleNav("about")}
              className={`w-full p-4 rounded-2xl font-black text-lg text-left transition-all duration-300 ${currentView === "about" ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30 translate-x-2" : "text-slate-900 hover:bg-slate-50"}`}
            >
              Biz haqimizda
            </button>

            {user && (
              <>
                <div className="h-px bg-slate-100 my-6 mx-4"></div>
                <div className="text-xs font-black text-slate-400 uppercase tracking-widest px-4 mb-4">
                  Profil
                </div>
                <button
                  onClick={() => handleNav("cabinet")}
                  className="w-full p-4 rounded-2xl font-black text-lg text-left text-slate-900 hover:bg-slate-50 transition-colors flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center"><i className="fa-solid fa-car-side"></i></div>
                  Shaxsiy kabinet
                </button>
                {user.isAdmin && (
                  <button
                    onClick={() => handleNav("admin")}
                    className="w-full p-4 rounded-2xl font-black text-lg text-left text-slate-900 hover:bg-slate-50 transition-colors flex items-center gap-4"
                  >
                    <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center"><i className="fa-solid fa-user-shield"></i></div>
                    Admin panel
                  </button>
                )}
                <button
                  onClick={() => {
                    onLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full p-4 rounded-2xl font-black text-lg text-left bg-red-50 text-red-600 mt-4 flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center"><i className="fa-solid fa-sign-out-alt"></i></div>
                  Chiqish
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
