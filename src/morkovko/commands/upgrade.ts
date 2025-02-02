import { EmbedBuilder } from 'discord.js';
import { noUserEmbed, setEmbedAuthor, randomIntFromInterval } from './helpers';
import config from '../config';

const carrotsLimit = config.bot.carrotsLimit;

export default {
  name: 'увеличить',
  run: (message, args, service, isSlash) => {
    const embedSuccess = new EmbedBuilder().setColor('#f97a50');
    const embedError = new EmbedBuilder().setColor('#f97a50');
    const user = isSlash ? message.user : message.author;
    const send = async (a) => {
      if (isSlash) await message.reply(a).catch(() => console.log(''));
      else message.channel.send(a).catch(() => console.log(''));
    };
    service.checkUser(user.id).then((res) => {
      if (res.status === 200) {
        const player = res.player;
        const count = isSlash
          ? Math.abs(parseInt(args.getString('кол-во')))
          : Math.abs(parseInt(args[0]));
        if (count && player.points >= count * 5) {
          const carrotNum = randomIntFromInterval(1, carrotsLimit);
          player.carrotSize += count;
          player.points -= count * 5;
          player.carrotAvatar = `./outputs/carrots/${carrotNum}.png`;
          service.savePlayer(player).then((resSave) => {
            if (resSave.status === 200) {
              embedSuccess.setDescription(
                `Ты увеличил конкурсную морковку. Теперь ее размер **${player.carrotSize}** см! Возможно она мутировала.`,
              );
              send({
                embeds: [setEmbedAuthor(embedSuccess, user)],
              });
            } else {
              embedError.setDescription(
                `Не получилось увеличить конкурсную морковку. Попробуй позже.`,
              );
              send({
                embeds: [setEmbedAuthor(embedError, user)],
              });
            }
          });
        } else {
          if (!count) {
            embedError.setDescription(`Ты не указал кол-во раз!`);
          } else {
            embedError.setDescription(
              `Тебе не хватает ${count * 5 - player.points}🔸!`,
            );
          }
          send({
            embeds: [setEmbedAuthor(embedError, user)],
          });
        }
      } else {
        send({ embeds: [noUserEmbed(user)] });
      }
    });
  },
};
