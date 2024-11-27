import { MongoClient, ServerApiVersion } from "mongodb";
const uri = process.env.URI_MONGODB as string;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const database = client.db("MediLoop");


export default database;
