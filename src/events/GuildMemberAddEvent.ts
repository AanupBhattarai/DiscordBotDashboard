import { GuildMember, MessageEmbed, TextChannel } from "discord.js";
import BaseEvent from "../utils/structures/BaseEvent";
import DiscordClient from "../client/client";

export default class GuildMemberAddEvent extends BaseEvent {
  constructor() {
    super("guildMemberAdd");
  }

  async run(client: DiscordClient, member: GuildMember) {
    const welcomeEmbed = new MessageEmbed()
      .setAuthor({
        name: `${member.user.tag}`,
        iconURL: `${member.displayAvatarURL({ dynamic: true })}`,
      })
      .setColor("GREEN")
      .setDescription(`Welcome ${member} to ${member.guild.name}`)
      .setTimestamp()
      .setFooter({
        text: `${client.user?.username}`,
        iconURL: `${client.user?.displayAvatarURL({
          dynamic: true,
        })}`,
      });

    console.log(`Guild Member Joined`);
    console.log(`Joined ${member.guild.id} ${member.guild.name}`);
    const config = client.configs.get(member.guild.id);
    console.log(config);
    if (!config) return;
    if (config.welcomeChannelId) {
      const channel = member.guild.channels.cache.get(
        config.welcomeChannelId
      ) as TextChannel;
      if (!channel) console.log("No welcome channel found");
      else channel.send({ embeds: [welcomeEmbed] });
    } else {
      console.log("No welcome channel set.");
    }
  }
}
