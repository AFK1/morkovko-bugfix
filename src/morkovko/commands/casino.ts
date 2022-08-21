import { EmbedBuilder } from 'discord.js';
import { noUserEmbed, setEmbedAuthor } from './helpers';

export default {
  name: 'кахино',
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
        if (count && player.carrotCount >= count) {
          let win = false
          if(Math.floor(Math.random() * 6) > 5){
            win = true;
            player.carrotCount += count * 5;
          } else {
            win = false;
            player.carrotCount -= count;
          }
          service.savePlayer(player).then((resSave) => {
            if (resSave.status === 200) {
              if (win){
                embedSuccess.setDescription(
                  `Ты выиграл! Теперь у тебя **${player.carrotCount}** 🥕!`,
                );
              } else {
                embedSuccess.setDescription(
                  `Ты проиграл! Повезёт в следующий раз.`,
                );
              }
              send({
                embeds: [setEmbedAuthor(embedSuccess, user)],
              });
            } else {
              embedError.setDescription(
                `Не получилось сделать ставку. Попробуй позже.`,
              );
              send({
                embeds: [setEmbedAuthor(embedError, user)],
              });
            }
          });
        } else {
          if (!count) {
            embedError.setDescription(`Ты не указал кол-во 🥕!`);
          } else {
            embedError.setDescription(
              `Тебе не хватает ${count - player.carrotCount}🥕!`,
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
