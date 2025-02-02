import { EmbedBuilder } from 'discord.js';

export function noUserEmbed(user) {
  const embedError = new EmbedBuilder()
    .setColor('#f97a50')
    .setAuthor({
      name: user.username,
      iconURL: user.avatarURL(),
    })
    .setDescription(
      `Похоже, что ты еще не открыл свою ферму! Используй команду ниже.`,
    )
    .addFields({ name: '!начать', value: 'Участвовать в игре', inline: true });
  return embedError;
}

export function setEmbedAuthor(embed, user) {
  embed.setAuthor({
    name: user.username,
    iconURL: user.avatarURL(),
  });
  return embed;
}

export function getRelLevelName(level: number) {
<<<<<<< HEAD
  if (level < 10) {
    return 'Знакомые';
  } else if (level < 20) {
=======
  if (level < 20) {
>>>>>>> 728bab6d2a0a31145a9c907826a8a7fd2053fb25
    return 'Приятные знакомые';
  } else if (level < 30) {
    return 'Потенциальные друзья';
  } else if (level < 40) {
    return 'Развивающаяся дружба';
  } else if (level < 50) {
    return 'Просто друзья';
  } else if (level < 60) {
    return 'Близкие друзья';
  } else if (level < 70) {
    return 'Лучшие друзья';
  } else if (level < 80) {
    return 'Неразлучные союзники';
  } else if (level < 100) {
    return 'Крепкая семья';
  } else if (level < 110) {
    return 'Прекрасные партнеры';
  } else if (level >= 110) {
    return 'Ачбко порву';
  }
  return 'Знакомые';
}

export function getTimeFromMins(mins: number) {
  const hours = Math.trunc(mins / 60);
  const minutes = mins % 60;
  return hours + 'ч. ' + minutes + 'м.';
}

export function calcTime(n, f, t) {
  let r = n;
  let count = 0;
  const len = 100 / t;
  for (let i = 0; i < len; i++) {
    const a = r + t;
    r = (a / 100) * f + a;
    if (r >= 100 && count == 0) count = i + 1;
  }
  return count;
}

export function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
