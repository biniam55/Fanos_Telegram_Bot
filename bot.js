const TelegramBot = require('node-telegram-bot-api');

// Replace with your own token
const token = '7758575412:AAFshIovy1r_NH9wl3HmRkS6F5UtWpmWn5M';
const bot = new TelegramBot(token, { polling: true });

// Listen for the /start command
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const username = msg.from.username || 'there'; // Use the username or a fallback if it's not available

    // Craft the welcome message
    const welcomeMessage = `Hey @${username}! It's FanosCrypto! 🌟 Your gateway to exclusive premium channels for crypto insights and analysis! 📈💼

Unlock premium content with just a few taps using our Telegram mini app! 🎟️ Don't miss out on the top-tier crypto knowledge and updates! 🚀

Also, check out our main channel for even more exciting updates! Stay informed and ahead of the game! 🧠💡

Remember: FanosCrypto is where crypto pros gather, and endless opportunities await! 💰`;

    // Create inline keyboard options with buttons on different rows
    const options = {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Access Premium Channel', url: `https://t.me/fanospremiumbot/FTMA?username=${username}` }], // URL to your mini app
                [{ text: 'Join Main Channel', url: 'https://t.me/FanosCryptoChannel' }] // URL to your Telegram channel
            ]
        }
    };

    // Create reply keyboard options with the "Launch Mini App" button in the typing area
    const launchButtonOptions = {
        reply_markup: {
            keyboard: [
                [{ text: 'Launch Mini App' }] // Reply keyboard button in the typing area
            ],
            resize_keyboard: true, // Resize keyboard to fit the screen
            one_time_keyboard: true // Hide keyboard after the button is pressed
        }
    };

    // Send a message with the crafted text and the inline buttons
    bot.sendMessage(chatId, welcomeMessage, options);
    bot.sendMessage(chatId, 'Or use the "Launch Mini App" button below:', launchButtonOptions);
});

// Listen for the "Launch Mini App" button press in the typing area
bot.onText(/Launch Mini App/, (msg) => {
    const chatId = msg.chat.id;

    // Respond by sending an inline button with the mini app URL
    bot.sendMessage(chatId, 'Click the link below to open the Mini App:', {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Access Premium Channel', url: 'https://t.me/fanospremiumbot/FTMA' }] // Inline button with URL to mini app
            ]
        }
    });
});

// Add a command to handle opening the mini app with inline buttons
bot.onText(/\/open/, (msg) => {
    const chatId = msg.chat.id;

    // Create inline keyboard options for opening the mini app and joining the channel on different rows
    const openOptions = {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Launch Mini App', url: 'https://t.me/fanospremiumbot/FTMA' }], // URL to your mini app
                [{ text: 'Join Channel', url: 'https://t.me/FanosCryptoChannel' }] // URL to your Telegram channel
            ]
        }
    };

    // Send a message with the inline buttons
    bot.sendMessage(chatId, 'You can launch the mini app or join the channel using the buttons below:', openOptions);
});
