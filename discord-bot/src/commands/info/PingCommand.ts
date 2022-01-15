import { Message, MessageEmbed } from "discord.js";
import BaseCommand from "../../utils/structures/BaseCommand";
import DiscordClient from "../../client/client";

export default class PingCommand extends BaseCommand {
  constructor() {
    super("ping", "info", []);
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    const embed = new MessageEmbed();
    embed
      .setTitle("Pong! 🏓")
      .setDescription(`Average Ping of the server is **${client.ws.ping}** ms.`)
      .setColor("GREEN");

    const newEmbed = new MessageEmbed();

    const msg = await message.reply({ embeds: [embed] });

    newEmbed
      .setTitle("Pong! 🏓")
      .setDescription(
        `Average Ping of the server is **${
          client.ws.ping
        }** ms. Message Ping of this message is **${
          msg.createdTimestamp - message.createdTimestamp
        }** ms.`
      )
      .setColor("GREEN")
      .setTimestamp(message.createdTimestamp);
    msg.edit({ embeds: [newEmbed] });
  }
}
