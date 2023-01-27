const axios = require('axios');
const {Telegraf} = require("telegraf");

const TOKEN = '5966975199:AAEdhNQXQjEa5bSUHnepJhhlkrK3mZfX2FQ';
const bot = new Telegraf(TOKEN);
const Url = 'http://api.weatherstack.com/current?access_key=032a4dffa069cf5eeaebf984d5442e4c&query='

const fetchData = async (cityName) =>{
    const res = await axios.get(`${Url+cityName}`)
    return res;
    
}

bot.start((ctx) => {
    ctx.reply("Hello i'm your weather assistant");
});

bot.on('text',async(ctx)=>{
    const {message} = ctx;
    const {data} = await fetchData(message.text);
    if(data.success === false){
        ctx.reply("Enter a valid city name:");
    }else{
        const {current, location} = data;
        const weatherStatus = current.weather_descriptions[0];

        ctx.reply(`City: ${location.name}\n Temperature ${current.temperature}`)
        setInterval(reply, 360000);
        function reply(){
          ctx.reply(`City: ${location.name}\n Temperature ${current.temperature}`)
        }
    }
});

bot.launch();