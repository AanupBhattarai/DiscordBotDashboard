import { Message, MessageEmbed } from "discord.js";
import BaseCommand from "../../utils/structures/BaseCommand";
import DiscordClient from "../../client/client";
const axios = require("axios");
const cFlags = require("country-flag-emoji");

export default class WeatherCommand extends BaseCommand {
  constructor() {
    super("weatherinfo", "info", ["weather"]);
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    const weatherToken = process.env.WEATHER_TOKEN;

    const query = args.join(" ");

    const url = `http://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      query
    )}&appid=${weatherToken}&units=metric`;

    axios
      .get(url)
      .then(
        (res: {
          status: 200;
          data: {
            main: {
              temp_max: any;
              temp_min: any;
              humidity: any;
              pressure: any;
              temp: number;
            };
            clouds: { all: any };
            rain: { [x: string]: any };
            snow: { [x: string]: any };
            wind: { speed: any };
            weather: { icon: any }["icon"];
            sys: { country: any };
            name: any;
          };
        }) => {
          if (res.status) {
            const fields = [
              {
                name: "🌡️ Max\nTemp:",
                value: `**${res.data.main.temp_max}C°**`,
                inline: true,
              },
              {
                name: "🌡️ Min\nTemp:",
                value: `**${res.data.main.temp_min}C°**`,
                inline: true,
              },
              {
                name: "💧 Humidity:",
                value: `**${res.data.main.humidity}%**`,
                inline: true,
              },
            ];

            if (res.data.clouds)
              fields.push({
                name: "☁️ Clouds:",
                value: `**${res.data.clouds.all}%** cloudiness`,
                inline: true,
              });
            if (res.data.rain)
              fields.push({
                name: "🌧️ Rain:",
                value: `**${
                  res.data.rain["3h"] || res.data.rain["1h"] || 0
                }mm** in the last 3 hours`,
                inline: true,
              });
            if (res.data.snow)
              fields.push({
                name: "🌨️ Snow:",
                value: `**${
                  res.data.snow["3h"] || res.data.snow["1h"] || 0
                }mm** in the last 3 hours`,
                inline: true,
              });
            if (res.data.main.pressure)
              fields.push({
                name: "📊 Pressure:",
                value: `**${res.data.main.pressure}** hpa`,
                inline: true,
              });
            if (res.data.wind && res.data.wind.speed)
              fields.push({
                name: "💨 Wind:",
                value: `**${res.data.wind.speed}** m/s`,
                inline: true,
              });

            const description = res.data.weather[0].description
              .split(" ")
              .map(
                (word: string) =>
                  `${word.charAt(0).toUpperCase()}${word.substring(1)}`
              )
              .join(" ");

            let { country } = res.data.sys;
            country += cFlags.get(country).emoji
              ? " " + cFlags.get(country).emoji
              : "";

            let currentTemp = Math.round(res.data.main.temp);

            const weatherReport = new MessageEmbed();
            weatherReport
              .setTitle(`Current Weather for ${res.data.name}, ${country}`)
              .setThumbnail(
                `https://openweathermap.org/img/w/${res.data.weather[0].icon}.png`
              )
              .setFields(fields)
              .setColor("GREEN")
              .setDescription(`**${description},** **${currentTemp}C°**`)
              .setFooter("- The above information is in metric units. ");
            return message.reply({ embeds: [weatherReport] });
          }
        }
      )
      .catch((err: any) => {
        console.log(err);
        const errorQuery = new MessageEmbed();

        errorQuery
          .setColor("RED")
          .setDescription("Please mention a proper query!");

        return message.reply({ embeds: [errorQuery] });
      });
  }
}
