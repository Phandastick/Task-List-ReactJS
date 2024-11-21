import { MongoClient, ServerApiVersion } from 'mongodb';

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
    await client.connect();
    //ping server to ensure connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
} catch(err) {
    console.error(err)
}

let db = client.db("task-list-db")

export default db;