import React, { useState, useEffect, useCallback, useRef } from "react";
import { createRoot } from "react-dom/client";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { signInAnonymously } from "firebase/auth";
import { db, auth } from "./firebase.js";
import { sendTelegramNotification } from "./data.js";
import { CONTENT } from "./content.js";

import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import AboutUs from "./components/AboutUs.jsx";
import Benefits from "./components/Benefits.jsx";
import { BrandGrid, BrandModels } from "./components/BrandGrid.jsx";
import QuickServices from "./components/QuickServices.jsx";
import MobileService from "./components/MobileService.jsx";
import {
  NearestLocations,
  LocationsPreview,
} from "./components/NearestLocations.jsx";
import { AdminCheck } from "./components/Admin.jsx";
import ServiceInfo from "./components/ServiceInfo.jsx";
import StatusCheckerPreview from "./components/StatusCheckerPreview.jsx";
import StatusChecker from "./components/StatusChecker.jsx";
import Cabinet from "./components/Cabinet.jsx";
import AIConsultant from "./components/AIConsultant.jsx";

window.sanitize = (str) => {
  if (!str) return "";
  return String(str).replace(/[<>]/g, "");
};
window.sendTelegramNotification = sendTelegramNotification;

function App() {
  const [currentView, setCurrentView] = useState("home");
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [toast, setToast] = useState(null);
  const scrollYRef = useRef(0);
  const [loginForm, setLoginForm] = useState({
    name: "",
    phone: "",
    password: "",
  });

  const showToast = useCallback((message, type = "success") => {
    setToast({ message, type, isExiting: false });
    setTimeout(() => {
      setToast((prev) => (prev ? { ...prev, isExiting: true } : null));
      setTimeout(() => setToast(null), 500);
    }, 3500);
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("million_km_user");
    setCurrentUser(null);
    setCurrentView("home");
  }, []);

  useEffect(() => {
    if (currentView === "home") {
      window.scrollTo({ top: scrollYRef.current, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentView]);

  const goToView = (view) => {
    if (currentView === "home") {
      scrollYRef.current = window.scrollY;
    }
    setCurrentView(view);
  };

  const goBack = () => {
    setCurrentView("home");
  };

  useEffect(() => {
    const initAuth = async () => {
      try {
        const localUserStr = localStorage.getItem("million_km_user");
        if (localUserStr) {
          const localUser = JSON.parse(localUserStr);
          await signInAnonymously(auth);
          const q = query(
            collection(db, "users"),
            where("uid", "==", localUser.uid),
          );
          const querySnapshot = await getDocs(q);
          if (!querySnapshot.empty) {
            const data = querySnapshot.docs[0].data();
            setCurrentUser({
              uid: localUser.uid,
              name: data.name,
              phone: data.phone,
              isAdmin: data.isAdmin || false,
            });
          } else {
            localStorage.removeItem("million_km_user");
          }
        } else {
          await signInAnonymously(auth);
        }
      } catch (error) {
        console.error(error);
        const localUserStr = localStorage.getItem("million_km_user");
        if (localUserStr) setCurrentUser(JSON.parse(localUserStr));
      }
    };
    initAuth();
  }, []);

  useEffect(() => {
    if (currentUser?.isAdmin) {
      const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const ordersData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(ordersData);
      });
      return () => unsubscribe();
    }
  }, [currentUser]);

  const addOrder = async (orderData) => {
    try {
      const newOrder = {
        userUid: currentUser?.uid || "guest",
        userName: window.sanitize(
          orderData.userName || currentUser?.name || "Anonim",
        ),
        phone: window.sanitize(orderData.phone || currentUser?.phone || ""),
        brand: window.sanitize(orderData.brand || ""),
        model: window.sanitize(orderData.model || ""),
        serviceType: window.sanitize(orderData.serviceType || ""),
        note: window.sanitize(orderData.note || ""),
        tariffType: orderData.tariffType || null,
        servicesCount: orderData.servicesCount || 1,
        totalPrice: orderData.totalPrice || 0,
        isGarageRequest: orderData.isGarageRequest || false,
        createdAt: serverTimestamp(),
        timestamp: new Date().toLocaleString("uz-UZ"),
      };
      await addDoc(collection(db, "orders"), newOrder);

      let message = newOrder.isGarageRequest
        ? `🚘 <b>SERVISGA YOZILISH (GARAJ)</b>\n\n`
        : `📦 <b>YANGI BUYURTMA</b>\n\n`;
      message += `👤 <b>Mijoz:</b> ${newOrder.userName}\n📞 <b>Telefon:</b> ${newOrder.phone}\n`;
      if (newOrder.brand)
        message += `🚗 <b>Avto:</b> ${newOrder.brand} ${newOrder.model}\n`;
      message += `🛠 <b>Xizmat:</b> ${newOrder.serviceType}\n`;
      if (newOrder.totalPrice)
        message += `💰 <b>Narx:</b> ${newOrder.totalPrice.toLocaleString()} so'm\n`;
      if (newOrder.note) message += `📝 <b>Izoh:</b> ${newOrder.note}\n`;
      message += `📅 <b>Sana:</b> ${newOrder.timestamp}`;

      await window.sendTelegramNotification(message);
      showToast("Buyurtmangiz qabul qilindi!");
    } catch (error) {
      console.error(error);
      showToast("Xatolik yuz berdi", "error");
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!loginForm.name || !loginForm.phone) {
      showToast("Iltimos, barcha maydonlarni to'ldiring", "error");
      return;
    }
    try {
      if (!auth.currentUser) {
        await signInAnonymously(auth);
      }
      const q = query(
        collection(db, "users"),
        where("phone", "==", loginForm.phone),
      );
      const querySnapshot = await getDocs(q);
      let userObj;
      if (!querySnapshot.empty) {
        const docSnap = querySnapshot.docs[0];
        userObj = {
          uid: docSnap.data().uid,
          name: docSnap.data().name,
          phone: docSnap.data().phone,
          isAdmin: docSnap.data().isAdmin || false,
        };
      } else {
        const newUid = crypto.randomUUID();
        userObj = {
          uid: newUid,
          name: loginForm.name,
          phone: loginForm.phone,
          isAdmin: false,
        };
        await addDoc(collection(db, "users"), {
          ...userObj,
          createdAt: serverTimestamp(),
        });
      }
      setCurrentUser(userObj);
      localStorage.setItem("million_km_user", JSON.stringify(userObj));
      setIsAuthModalOpen(false);
      showToast(`Xush kelibsiz, ${userObj.name}!`);
    } catch (error) {
      console.error(error);
      showToast("Tizimga kirishda xatolik", "error");
    }
  };

  const handlePhoneChange = (e) => {
    let val = e.target.value;
    if (!val.startsWith("+998")) {
      val = "+998";
    }
    if (val.length > 13) val = val.slice(0, 13);
    setLoginForm({ ...loginForm, phone: val });
  };

  const renderView = () => {
    switch (currentView) {
      case "cabinet":
        return currentUser ? (
          <Cabinet
            db={db}
            user={currentUser}
            showToast={showToast}
            onOrder={addOrder}
          />
        ) : (
          <Hero
            user={currentUser}
            onStart={() => setIsAuthModalOpen(true)}
            onStatusCheck={() => goToView("status-check")}
          />
        );
      case "admin":
        if (!currentUser) {
          setIsAuthModalOpen(true);
          setCurrentView("home");
          return null;
        }
        return (
          <AdminCheck
            orders={orders}
            currentUser={currentUser}
            showToast={showToast}
            setCurrentView={setCurrentView}
          />
        );
      case "express":
      case "fuel":
        return (
          <MobileService
            type={currentView}
            user={currentUser}
            onOrder={addOrder}
            onOpenAuth={() => setIsAuthModalOpen(true)}
          />
        );
      case "brand-details":
        return (
          <div className="pt-24 pb-12 px-6 max-w-[1200px] mx-auto">
            <BrandModels
              brand={selectedBrand}
              user={currentUser}
              onOrder={addOrder}
              onOpenAuth={() => setIsAuthModalOpen(true)}
            />
          </div>
        );
      case "service-info":
        return (
          <ServiceInfo
            onBack={goBack}
            onSelectModel={() => {
              goBack();
              setTimeout(
                () =>
                  document
                    .querySelector("#brands")
                    ?.scrollIntoView({ behavior: "smooth" }),
                100,
              );
            }}
          />
        );
      case "status-check":
        return (
          <StatusChecker
            onRegister={() => setIsAuthModalOpen(true)}
            onOneTime={() => goToView("express")}
          />
        );
      case "locations":
        return <NearestLocations />;
      case "about":
        return (
          <AboutUs
            onCheckStatus={() => {
              goBack();
              setTimeout(
                () =>
                  document
                    .querySelector("#status")
                    ?.scrollIntoView({ behavior: "smooth" }),
                100,
              );
            }}
            onStartBooking={goBack}
          />
        );
      default:
        return (
          <>
            <Hero
              user={currentUser}
              onStart={() =>
                currentUser ? goToView("cabinet") : setIsAuthModalOpen(true)
              }
              onStatusCheck={() => goToView("status-check")}
            />
            <div id="brands" className="max-w-[1200px] mx-auto px-6">
              <BrandGrid
                user={currentUser}
                onBrandSelect={(brand) => {
                  setSelectedBrand(brand);
                  goToView("brand-details");
                }}
                onInfoSelect={() => goToView("service-info")}
              />
            </div>
            <div id="benefits" className="max-w-[1200px] mx-auto px-6">
              <Benefits onAboutClick={() => goToView("about")} />
            </div>
            <div id="status" className="max-w-[900px] mx-auto px-6">
              <StatusCheckerPreview onCheck={() => goToView("status-check")} />
            </div>
            <div
              id="quick-services-view"
              className="max-w-[1200px] mx-auto px-6"
            >
              <QuickServices onSelect={setCurrentView} />
            </div>
            <div id="locations" className="max-w-[1200px] mx-auto px-6">
              <LocationsPreview onViewAll={() => goToView("locations")} />
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen selection:bg-blue-100 flex flex-col bg-[#F8F9FA]">
      <Navbar
        currentView={currentView}
        setView={setCurrentView}
        user={currentUser}
        onLogout={handleLogout}
        onLoginClick={() => setIsAuthModalOpen(true)}
        showBack={currentView !== "home"}
        onBack={goBack}
      />
      <main className="flex-grow pt-16 md:pt-0">{renderView()}</main>
      <footer className="bg-white py-20 border-t border-gray-200">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tighter text-[#1D1D1F] mb-2">
              {CONTENT.footer.brand}
            </h2>
            <p className="text-gray-500 font-medium">
              {CONTENT.footer.tagline}
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <button
              onClick={() => goToView("home")}
              className="font-bold text-gray-600 hover:text-black"
            >
              Bosh sahifa
            </button>
            <button
              onClick={() => goToView("about")}
              className="font-bold text-gray-600 hover:text-black"
            >
              Biz haqimizda
            </button>
            <a
              href="tel:+998770200107"
              className="bg-black text-white px-6 py-3 rounded-full font-bold hover:scale-105 transition-transform"
            >
              +998 77 020 01 07
            </a>
          </div>
        </div>
      </footer>
      <AIConsultant />
      {toast && (
        <div
          className={`fixed top-4 left-1/2 -translate-x-1/2 z-[300] max-w-[420px] w-[90%] transition-all duration-300 ${toast.isExiting ? "opacity-0 -translate-y-4" : "opacity-100 translate-y-0"}`}
        >
          <div
            className={`px-6 py-4 rounded-[2.5rem] shadow-2xl font-bold text-sm flex items-center gap-3 ${toast.type === "success" ? "bg-[#1C1C1E] text-white" : "bg-[#FF3B30] text-white"}`}
          >
            <i
              className={`fas ${toast.type === "success" ? "fa-check-circle text-green-400" : "fa-exclamation-circle"}`}
            ></i>
            <div>
              <div className="text-xs opacity-70 mb-0.5">Million KM</div>
              <div>{toast.message}</div>
            </div>
          </div>
        </div>
      )}
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white/95 rounded-[32px] p-10 max-w-md w-full shadow-2xl animate-fade-in relative">
            <button
              onClick={() => setIsAuthModalOpen(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-black"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
            <h3 className="text-3xl font-black tracking-tighter mb-8 text-center">
              Kirish
            </h3>
            <form onSubmit={handleLoginSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  To'liq ism
                </label>
                <input
                  type="text"
                  required
                  value={loginForm.name}
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, name: e.target.value })
                  }
                  className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-black outline-none font-medium"
                  placeholder="Masalan: Azizbek"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Telefon
                </label>
                <input
                  type="tel"
                  required
                  value={loginForm.phone}
                  onChange={handlePhoneChange}
                  className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-black outline-none font-medium"
                  placeholder="+998"
                />
              </div>
              <button
                type="submit"
                className="w-full h-16 bg-black text-white font-black rounded-2xl uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-transform mt-4"
              >
                DAVOM ETISH
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<App />);
