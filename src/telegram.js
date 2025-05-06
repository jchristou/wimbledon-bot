import TelegramBot from "node-telegram-bot-api";

const TOKEN = process.env.TELEGRAM_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const OWNER_ID = process.env.TELEGRAM_OWNER_CHAT_ID;

const bot = new TelegramBot(TOKEN, { polling: true });

export function sendTelegramMessage(message) {
  console.log("Broadcasting:", message);
  const messageWithPaypal =
    message + "\nGet Tickets? Buy me a coffee at http://paypal.me/jcjchristou";
  return bot.sendMessage(CHAT_ID, messageWithPaypal);
}

export function sendTelegramError(message) {
  return bot.sendMessage(OWNER_ID, message);
}
