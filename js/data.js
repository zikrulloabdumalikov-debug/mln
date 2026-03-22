export const CAR_DATA = {
  chevrolet: {
    "Nexia 3": { maxAge: 5, maxKm: 100000, priceOneTime: 849000 },
    Cobalt: { maxAge: 5, maxKm: 100000, priceOneTime: 849000 },
    Gentra: { maxAge: 5, maxKm: 100000, priceOneTime: 849000 },
    Onix: { maxAge: 3, maxKm: 50000, priceOneTime: 1049000 },
    Tracker: { maxAge: 3, maxKm: 50000, priceOneTime: 1049000 },
    Malibu: { maxAge: 5, maxKm: 50000, priceOneTime: 1299000 },
    Equinox: { maxAge: 3, maxKm: 50000, priceOneTime: 1499000 },
    Traverse: { maxAge: 5, maxKm: 100000, priceOneTime: 1899000 },
    Tahoe: { maxAge: 5, maxKm: 100000, priceOneTime: 2199000 },
  },
  kia: {
    Sonet: { maxAge: 3, maxKm: 50000, priceOneTime: 1049000 },
    K5: { maxAge: 3, maxKm: 50000, priceOneTime: 1399000 },
    Sportage: { maxAge: 3, maxKm: 50000, priceOneTime: 1299000 },
  },
  liauto: {
    L6: {
      maxAge: 3,
      maxKm: 50000,
      priceOneTime: 1299000,
      reductorPrice: 949000,
    },
    L7: {
      maxAge: 3,
      maxKm: 50000,
      priceOneTime: 1299000,
      reductorPrice: 949000,
    },
    L8: {
      maxAge: 3,
      maxKm: 50000,
      priceOneTime: 1299000,
      reductorPrice: 949000,
    },
    L9: {
      maxAge: 3,
      maxKm: 50000,
      priceOneTime: 1299000,
      reductorPrice: 949000,
    },
  },
};

export const BRAND_LOGOS = {
  chevrolet:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Chevrolet-logo.png/640px-Chevrolet-logo.png",
  kia: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/KIA_logo2.svg/640px-KIA_logo2.svg.png",
  liauto:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Li_Auto_logo.svg/640px-Li_Auto_logo.svg.png",
};

const TELEGRAM_BOT_TOKEN = "7722483735:AAG_LZ1Bg0H-mnqAlnw4OknNj-BTrqM8CWM";
const TELEGRAM_CHAT_ID = "-1003461463026";

export async function sendTelegramNotification(message) {
  try {
    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: "HTML",
        }),
      },
    );
    return response.ok;
  } catch (error) {
    console.error("Telegram error:", error);
    return false;
  }
}

export async function sendLeadToTelegram(data) {
  const { name, phone, model, carPlate, mileage, problem } = data;

  let message = `<b>Yangi Buyurtma / Murojaat</b> 🚀\n\n`;
  if (name) message += `👤 <b>Ism:</b> ${name}\n`;
  if (phone) message += `📞 <b>Telefon:</b> ${phone}\n`;
  if (model) message += `🚘 <b>Model:</b> ${model}\n`;
  if (carPlate) message += `🔢 <b>Davlat raqami:</b> ${carPlate}\n`;
  if (mileage) message += `🛣 <b>Probeg:</b> ${mileage} km\n`;
  if (problem) message += `🛠 <b>Muammo/Xizmat:</b> ${problem}\n`;

  message += `\n📅 <b>Sana:</b> ${new Date().toLocaleString("uz-UZ")}`;

  return await sendTelegramNotification(message);
}
