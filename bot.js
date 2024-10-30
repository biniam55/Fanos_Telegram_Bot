const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const bodyParser = require('body-parser');

const token = '7758575412:AAFshIovy1r_NH9wl3HmRkS6F5UtWpmWn5M';
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const bot = new TelegramBot(token, { webHook: true });

const url = process.env.RENDER_EXTERNAL_URL || 'https://fanos-telegram-bot-2.onrender.com';
bot.setWebHook(`${url}/bot${token}`);

app.post(`/bot${token}`, (req, res) => {
    bot.processUpdate(req.body);
    res.sendStatus(200);
});

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const username = msg.from.username || 'there';

    const welcomeMessage = `Hey @${username}! It's FanosCrypto! 🌟 Your gateway to exclusive premium channels for crypto insights and analysis! 📈💼

Unlock premium content with just a few taps using our Telegram mini app! 🎟️ Don't miss out on the top-tier crypto knowledge and updates! 🚀

Also, check out our main channel for even more exciting updates! Stay informed and ahead of the game! 🧠💡

Remember: FanosCrypto is where crypto pros gather, and endless opportunities await! 💰`;

    const options = {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Access Premium Channel', url: `https://t.me/fanospremiumbot/FTMA?username=${username}` }],
                [{ text: 'Join Main Channel', url: 'https://t.me/FanosCryptoChannel' }]
            ]
        }
    };

    const launchButtonOptions = {
        reply_markup: {
            keyboard: [
                [{ text: 'Launch Mini App' }]
            ],
            resize_keyboard: true,
            one_time_keyboard: true
        }
    };
    bot.sendMessage(chatId, welcomeMessage, options);
    bot.sendMessage(chatId, 'Or use the "Launch Mini App" button below:', launchButtonOptions);
});
bot.onText(/Launch Mini App/, (msg) => {
    const chatId = msg.chat.id;

    bot.sendMessage(chatId, 'Click the link below to open the Mini App:', {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Access Premium Channel', url: 'https://t.me/fanospremiumbot/FTMA' }]
            ]
        }
    });
});

bot.onText(/\/open/, (msg) => {
    const chatId = msg.chat.id;

    const openOptions = {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Launch Mini App', url: 'https://t.me/fanospremiumbot/FTMA' }],
                [{ text: 'Join Channel', url: 'https://t.me/FanosCryptoChannel' }]
            ]
        }
    };

    bot.sendMessage(chatId, 'You can launch the mini app or join the channel using the buttons below:', openOptions);
});

app.listen(port, () => {
    console.log(`Telegram bot is listening on port ${port}`);
});
