const TelegramBot = require('node-telegram-bot-api');
const token = '1289510318:AAEzF8vwmiftWYYIyOisGmwbMWpziowlb_M';

var bot = new TelegramBot(token, {polling: true});

bot.onText(/\/echo(.+)/, (msg, match) => {

    var chatId = msg.chat.id;
    //  var echo=match[1];

    bot.sendMessage(
        chatId,
        'Please select the Following options',
        {
            reply_markup: {
                inline_keyboard: [[
                    {
                        text: 'Bill',
                        callback_data: JSON.stringify({
                            'command': 'billing',
                            'answer': 'YES'
                        })
                    }, {
                        text: 'Account History',
                        callback_data: JSON.stringify({
                            'command': 'payment',
                            'answer': 'YES'
                        })
                    }, {
                        text: 'Other',
                        callback_data: 'other'
                    }
                ]]
            }
        }
    );

    bot.on('callback_query', (callbackQuery) => {
        const message = callbackQuery.message;
        let category = callbackQuery.data;

        let text;
        console.log(`message ${message}`);
        console.log(`category ${category}`);

        let data = JSON.parse(category);

        //  let data=callbackQuery.data.toString();
        switch (data.command) {

            case "billing" : {
                console.log("Inside billing");
                text = "Please enter you Account/Meter no";
                break;
            }

            case "payment" : {
                console.log("Inside billing");
                text = "Enter Date in Format dd/MM/yyyy. Eg " + Date.now();
                break;
            }
            default: {
                text = "More to come.";
                break;
            }
        }

        bot.sendMessage(message.chat.id, text);
    });

    bot.on('message', (message) => {
        const text = message.text;
        console.log(message);
        console.log(`message ${text}`);

        if (Number.isNaN(text)) {

            console.log("Yes");
        }
        else {

            console.log("nohting")
        }

        bot.sendMessage(message.chat.id, `Received your Account/ Meter No. Processing`).then((value) => {

            bot.sendMessage(message.chat.id, "Name : XYZ, Out Standing bill: Rs.23100, last date of Payment 30-06-2020")

        });
    });
});