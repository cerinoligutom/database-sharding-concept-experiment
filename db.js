const express = require('express');
const fs = require('fs');

const PORT = process.env.PORT;
const DATA_DIR = process.env.DATA_DIR;

const app = express();
app.use(express.json());

app.post('/:dataKey', (req, res) => {
	const { dataKey } = req.params;
	console.info(`Storing at key: ${dataKey}`);

	const destinationFile = `${DATA_DIR}/${dataKey}`;
	fs.writeFileSync(destinationFile, JSON.stringify(req.body));
	res.send();
});

app.get('/:dataKey', (req, res) => {
	const { dataKey } = req.params;
	console.info(`Retrieving from key: ${dataKey}`);

	const destinationFile = `${DATA_DIR}/${dataKey}`;
	try {
		const data = JSON.parse(fs.readFileSync(destinationFile).toString());
		res.send(data);
	} catch {
		// Key doesn't exist in the database so return null
		res.send(null);
	}
});

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}!`);
});
