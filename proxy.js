const express = require('express');
const axios = require('axios');

const SHARD_ADDRESSES = ['http://localhost:8080', 'http://localhost:8081'];
const SHARD_COUNT = SHARD_ADDRESSES.length;

const app = express();
app.use(express.json());

function getShardEndpoint(key) {
	const shardNumber = key.charCodeAt(0) % SHARD_COUNT;
	const shardAddress = SHARD_ADDRESSES[shardNumber];
	return `${shardAddress}/${key}`;
}

app.post('/:dataKey', async (req, res) => {
	const shardEndpoint = getShardEndpoint(req.params.dataKey);
	console.log(`Forwarding to ${shardEndpoint}`);

	await axios.post(shardEndpoint, req.body);
	res.send();
});

app.get('/:dataKey', async (req, res) => {
	const shardEndpoint = getShardEndpoint(req.params.dataKey);
	console.log(`Forwarding to ${shardEndpoint}`);

	const { data } = await axios.get(shardEndpoint);
	res.send(data);
});

app.listen(3000, () => {
	console.log('Listening on port 3000!');
});
