# database-sharding-concept-experiment

Experimenting how sharding could look like with a naive hashing function and a reverse proxy.

![image](https://user-images.githubusercontent.com/6721822/88194501-7f758380-cc71-11ea-8599-6d82456f5cce.png)

Hit the reverse proxy endpoint found at `localhost:3000/:dataKey` with a `POST` request to write data or a `GET` request to retrieve data.

When doing a request, observe how the reverse proxy decides which database shard it picks to retrieve or persist data based on the naive hashing function.

## Get started

Install dependencies

```terminal
npm install
```

Run the services

```terminal
npm start
```
