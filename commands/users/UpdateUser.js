const { SlashCommandBuilder } = require('discord.js');
const db = require('../../database');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('actualizar-usuario')
    .setDescription('actualiza los datos de tu usuario!')
    .addStringOption(option => option
      .setName('edad')
      .setDescription('tu-edad')
      .setRequired(true),
    ),
  async execute(interaction) {
    const id = interaction.user.id;
    const age = interaction.options.getString('edad');
    // Get uset form db
    const user = db.prepare(`
    SELECT * FROM users
    WHERE user_id = ?
    `).get(id);

    if (!user) {
      return await interaction.reply('Su Usuario no existe');
    }

    //  Uptade User from bd
    db.prepare(`
    UPDATE USERS
    SET  age = ?
    WHERE user_id = ?
`).run(age, id);
    await interaction.reply(`La edad del ususario ha sido cambiada de ${user.age} a ${age}`);
  },
};