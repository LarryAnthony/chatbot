require('dotenv').config();
const express = require("express");
const app = express();
const cors = require("cors");
const axios = require('axios');
const { WebhookClient } = require('dialogflow-fulfillment');

app.use(cors());
app.use(express.json());

app.get("/", function (req, res) {
	res.send("Aún no tenemos data");
});

app.post("/webhook", express(), function (req, res) {
	try {
		const agent = new WebhookClient({ request: req, response: res });
		const codigo = agent.parameters.codigo;
		console.log('Dialogflow Request headers: ' + JSON.stringify(req.headers));
		console.log('Dialogflow Request body: ' + JSON.stringify(req.body));

		async function consultaProyecto() {
			const respuesta = await axios(process.env.API_SHEET)
			agend.add(respuesta.data.data[0].status);
		}

		let intentMap = new Map();
		intentMap.set('Consulta.Proyecto', consultaProyecto);

		agent.handleRequest(intentMap);
	} catch (error) {
		agent.add("No tenemos información sobre ese proyecto");
	}
});

const PORT = process.env.PORT || 3003;

app.listen(PORT, () => {
	console.log(`Servidor conectado al puerto ${PORT}`);
	if (process.send) {
		process.send('ready');
	}
});