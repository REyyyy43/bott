const { SlashCommandBuilder } = require('discord.js');
const db = require('../../database');
module.exports = {
  data: new SlashCommandBuilder()
    .setName('crear-usuario')
    .setDescription('Crea tu Usuario!')
    .addStringOption(option => option
      .setName('correo-electronico')
      .setDescription('Tu correo electronico')
      .setRequired(true),
    )
    .addNumberOption(option => option
      .setName('edad')
      .setDescription('Tu edad')
      .setRequired(false),
    ),
  async execute(interaction) {
    const id = interaction.user.id;
    const email = interaction.options.getString('correo-electronico');
    const age = interaction.options.getNumber('edad');
    const CreateUserStmlt = db.prepare(`
    INSERT INTO users (user_id, email, age) VALUES (?, ?, ?)
    `);
    CreateUserStmlt.run(id, email, age);
    console.log(email, age, id);
    await interaction.reply('Usuario Creado!');
  },

};