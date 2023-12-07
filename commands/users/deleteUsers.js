const { SlashCommandBuilder } = require('discord.js');
const db = require('../../database');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('borrar-usuario')
    .setDescription('Borra tu usuario!'),
  async execute(interaction) {
    const id = interaction.user.id;

    // Get uset form db
    const user = db.prepare(`
    SELECT * FROM users
    WHERE user_id = ?
    `).get(id);

    if (!user) {
      return await interaction.reply('Su Usuario no existe');
    }

    //  Delete User from bd
    db.prepare(`
    DELETE FROM USERS
    WHERE user_id = ?
`).run(id);
    await interaction.reply('Usuario Eliminado');
  },
};