import { Message, MessageEmbed } from "discord.js";
import BaseCommand from "../../utils/structures/BaseCommand";
import DiscordClient from "../../client/client";

export default class SayCommand extends BaseCommand {
  constructor() {
    super("say", "fun", ["echo"]);
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    const sayEmbed = new MessageEmbed();
    sayEmbed.setDescription(args.join(" ")).setColor("GREEN");

    const messageSay = await message.channel.send({ embeds: [sayEmbed] });
  }
}
