const { default: axios } = require('axios');
const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const Jimp = require('jimp');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('buscar-pais')
		.setDescription('Busca un pais!')
		.addStringOption(option => option
			.setName('nombre-pais')
			.setDescription('El nombre del pais a Buscar')
			.setRequired(true),
		),
	async execute(interaction) {
		const countryName = interaction.options.getString('nombre-pais');
		const { data } = await axios.get(`https://restcountries.com/v3.1/name/${countryName}`);
		const getClimates = async (nombre) => {
			const respuesta = await (await fetch (`https://api.openweathermap.org/data/2.5/weather?q=${nombre}&appid=1098163c1633e855183fe810aa5cd7ec&lang={sp, es}`, { method:'GET' })).json();
			return respuesta;
		};
		const clima = await getClimates(data[0].name.common);
		const imageFlag = data[0].flags.png;
		const imageMetadata = await Jimp.read(imageFlag);
		const color = imageMetadata.getPixelColor(0, 0);
		const { r, g, b } = Jimp.intToRGBA(color);
		const exampleEmbed = new EmbedBuilder()
			.setColor([r, g, b])
			.setTitle(String(data[0].name.common))
			.setDescription(String(clima.weather[0].description))
			.setThumbnail(String(`https://openweathermap.org/img/wn/${clima.weather[0].icon}@2x.png`))
			.addFields(
				{ name: 'Poblacion:', value:String(data[0].population) },
				{ name: '\u200B', value: '\u200B' },
				{ name: 'Continente', value: String(data[0].region), inline: true },
				{ name: 'Zona Horaria', value: String(data[0].timezones), inline: true },
			)
			.addFields({ name: 'Capital', value: String(data[0].capital), inline: true })
			.setImage(data[0].flags.png)
			.setTimestamp();

		interaction.channel.send({ embeds: [exampleEmbed] });
		getClimates();
	},
};