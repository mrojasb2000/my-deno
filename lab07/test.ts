// Mongo https://deno.land/x/mongo@v0.7.0/mod.ts;

// Oak https://deno.land/x/oak/mod.ts;

import { MongoClient } from 'https://deno.land/x/mongo/mod.ts';

const client = new MongoClient();

client.connectWithUri('mongodb://localhost:27017');

const db = client.database('users');

const detailsCollection = db.collection('details');

const deleteMany = await detailsCollection.deleteMany({username: "NEW Updated Many Username"});