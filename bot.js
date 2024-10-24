const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const bodyParser = require('body-parser');

// Replace with your own token
const token = '7758575412:AAFshIovy1r_NH9wl3HmRkS6F5UtWpmWn5M';
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse incoming requests
app.use(bodyParser.json());

// Create the bot with webhook configuration
const bot = new TelegramBot(token, { webHook: true });

// Set the webhook URL (replace 'YOUR_DOMAIN' with your actual domain or external URL from Render)
const url = process.env.RENDER_EXTERNAL_URL || 'https://your-domain.com';
bot.setWebHook(`${url}/bot${token}`);

// Webhook route to handle Telegram messages
app.post(`/bot${token}`, (req, res) => {
    bot.processUpdate(req.body);
    res.sendStatus(200);
});

// Listen for the /start command
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const username = msg.from.username || 'there'; // Use the username or fallback if it's not available

    // Craft the welcome message
    const welcomeMessage = `Hey @${username}! It's FanosCrypto! 🌟 Your gateway to exclusive premium channels for crypto insights and analysis! 📈💼

Unlock premium content with just a few taps using our Telegram mini app! 🎟️ Don't miss out on the top-tier crypto knowledge and updates! 🚀

Also, check out our main channel for even more exciting updates! Stay informed and ahead of the game! 🧠💡

Remember: FanosCrypto is where crypto pros gather, and endless opportunities await! 💰`;

    // Inline keyboard with buttons on different rows
    const options = {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Access Premium Channel', url: `https://t.me/fanospremiumbot/FTMA?username=${username}` }],
                [{ text: 'Join Main Channel', url: 'https://t.me/FanosCryptoChannel' }]
            ]
        }
    };

    // Reply keyboard options with the "Launch Mini App" button
    const launchButtonOptions = {
        reply_markup: {
            keyboard: [
                [{ text: 'Launch Mini App' }]
            ],
            resize_keyboard: true,
            one_time_keyboard: true
        }
    };

    // Send welcome message with inline buttons and the launch button in the typing area
    bot.sendMessage(chatId, welcomeMessage, options);
    bot.sendMessage(chatId, 'Or use the "Launch Mini App" button below:', launchButtonOptions);
});

// Handle the "Launch Mini App" button press in the typing area
bot.onText(/Launch Mini App/, (msg) => {
    const chatId = msg.chat.id;

    // Respond by sending an inline button with the mini app URL
    bot.sendMessage(chatId, 'Click the link below to open the Mini App:', {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Access Premium Channel', url: 'https://t.me/fanospremiumbot/FTMA' }]
            ]
        }
    });
});

// Add a command to handle opening the mini app with inline buttons
bot.onText(/\/open/, (msg) => {
    const chatId = msg.chat.id;

    // Inline keyboard options for opening the mini app and joining the channel
    const openOptions = {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Launch Mini App', url: 'https://t.me/fanospremiumbot/FTMA' }],
                [{ text: 'Join Channel', url: 'https://t.me/FanosCryptoChannel' }]
            ]
        }
    };

    // Send a message with inline buttons
    bot.sendMessage(chatId, 'You can launch the mini app or join the channel using the buttons below:', openOptions);
});

// Start the express server
app.listen(port, () => {
    console.log(`Telegram bot is listening on port ${port}`);
});
