import { Router } from "express";
import db from '../db/connection.js'

export const loginRouter = Router();

// #region login details
//get user
loginRouter.post('/doSignIn', async (req, res) => {
    const data = req.body
    // console.log("Login from: ", data)
    const username = data.username
    const password = data.password
    const response = {};

    const users = await db.collection("users")
    const foundUser = await users.findOne({
        username: username
    })

    // console.log(foundUser);
    try {
        const userPass = foundUser.password
        if (foundUser && password == userPass) {
            response.status = 200
            response.statusText = "User found!"
        } else {
            throw new Error()
        }

        res.status(response.status).json(response)
    } catch (error) {
        res.status(400).send("Username or passord incorrect!")
    }
})

loginRouter.post('/doPostNewUser', async (req, res) => {
    const data = req.body
    const username = data.username
    const password = data.password

    console.log("Posting new user:")
    console.log("Username:", username)
    console.log("Password:", password)

    try {
        let collection = await db.collection("users")
        let duplicate = await collection.findOne({
            username: username
        })

        //duplicate found
        if (duplicate)
            throw Error("Duplicate username found!");

        let newDoc = {
            username: username,
            password: password
        }

        let result = await collection.insertOne(newDoc);

        let newList = {
            name: username,
            lists: []
        }
        let tasksCollection = await db.collection("tasks")
        let result2 = await tasksCollection.insertOne(newList)

        // console.log(result);

        if (result.acknowledged && result2.acknowledged) {
            res.status(200).json(result2)
        } else {
            res.status(400).send("Query not acknowledged")
        }

    } catch (err) {
        res.status(400).send(err.message)
    }
});

loginRouter.patch('/doUpdateNewUser', async (req, res) => {
    res.sendStatus(502)
});

loginRouter.delete('/doDeleteNewUser', async (req, res) => {
    res.sendStatus(502)
});
//#endregion

loginRouter.get('/doGetBgImage', async (req, res) => {
    console.log("Called login bg image")

    const utility = await db.collection("utility");

    const results = await utility.findOne({type:"image-login-bg"})
    // console.log(results);
    var imgData = results.imgData
    if(results){
        const currentTime= new Date()
        let updatedLast = results.updatedLast
        console.log("Last Updated at:",updatedLast)
        if(!updatedLast) {
            updatedLast = new Date().getTime();
        }
        let updatedLastMinutes = updatedLast/60/1000
        let nowMinutes = currentTime.getTime()/60/1000
        let timeDifference = nowMinutes - updatedLastMinutes;
        console.log("Time Difference:",timeDifference)

        // if(timeDifference > 10) {
        if(timeDifference > 10 || !imgData) {
            imgData = await newImg();
        }

        let imgJson = {
            urls: imgData.urls,
            user: imgData.user,
            links: imgData.links,
        };
        res.status(200).json(imgJson);
    } else {
        res.status(500).send("Something went wrong!")
    }

    async function newImg(){
        console.log("Generating new image...")
        const params = new URLSearchParams({
            query: "Green Background",
            orientation: "landscape"
        })
        const headers = {
            Authorization: 'Client-ID ' + process.env.UNSPLASH_CLIENT_KEY,
            'Accept-Version': 'v1'
        }
        const url = process.env.UNSPLASH_URL + '/photos/random?' + params.toString()
        // console.log(url)
        
        const response = await fetch(url, { headers: headers });

        if (response.status != 200) {
            throw new Error(response.statusText);
        };

        const imgData = await response.json();
        // console.log(imgData)

        utility.updateOne({ type:"image-login-bg"},
            { //update json
                $set: {
                    imgData: imgData,
                    updatedLast: new Date().getTime()
                }
            },
            { upsert: true }
        );

        return imgData;
    }
});
