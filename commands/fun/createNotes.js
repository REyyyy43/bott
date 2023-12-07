const { SlashCommandBuilder } = require('discord.js');
const db = require('../../database');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('agregar-nota')
    .setDescription('Agrega una nota')
    .addStringOption(option =>
      option
        .setName('nota')
        .setDescription('Nota a agregar')
        .setRequired(true)
    ),
  execute: async (interaction) => {
    const userId = interaction.user.id;
    const newNote = interaction.options.getString('nota');

    const userNotes = db.prepare('SELECT * FROM notas WHERE user_id = ?').all(userId);

    if (!userNotes) {
      console.error('Error al obtener las notas del usuario.');
      return await interaction.reply('Hubo un problema al intentar obtener las notas.');
    }

    const insertResult = db.prepare('INSERT INTO notas (user_id, nota) VALUES (?, ?)').run(userId, newNote);

    if (!insertResult) {
      console.error('Error al agregar la nota.');
      return await interaction.reply('Hubo un problema al intentar agregar la nota.');
    }

    await interaction.reply('¡Nota agregada correctamente!');
  },
};
