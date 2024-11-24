import { MongoClient, ServerApiVersion, MongoServerError } from 'mongodb';

const dbUser = process.env.MONGO_USER_NAME
const dbPass = process.env.MONGO_USER_PW
const uri = `mongodb+srv://${dbUser}:${dbPass}@task-cluster.kixvt.mongodb.net/?retryWrites=true&w=majority&appName=Task-Cluster`;

// console.log(uri)

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
});

try{
    //Connect client to server
    console.log("Connecting to mongo client...")
    await client.connect();
    console.log("Connected successfully to MongoDB!");
    //ping server to ensure connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
} catch(error) {
    if (error instanceof MongoServerError) {
        console.log(`Error worth logging: ${error}`); // special case for some reason
    }
    console.error(error.stack)
}

let db = client.db("task-list-db");

export default db;