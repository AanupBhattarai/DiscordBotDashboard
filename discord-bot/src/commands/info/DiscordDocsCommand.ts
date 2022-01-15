import { Message, MessageEmbed } from "discord.js";
import BaseCommand from "../../utils/structures/BaseCommand";
import DiscordClient from "../../client/client";
import axios from "axios";

export default class AvatarCommand extends BaseCommand {
  constructor() {
    super("documentation", "info", ["djs", "docs"]);
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    const DOCS_API_URL = "https://djsdocs.sorta.moe/v2/embed?src=stable";
    const query = args.join(" ");
    const errorQuery = new MessageEmbed();

    errorQuery.setColor("RED").setDescription("Please mention a proper query!");
    if (!query) return message.reply({ embeds: [errorQuery] });
    const url = `${DOCS_API_URL}&q=${encodeURIComponent(query)}`;

    axios.get(url).then(({ data }) => {
      if (data) {
        message.reply({ embeds: [data] });
      }
    });
  }
}
