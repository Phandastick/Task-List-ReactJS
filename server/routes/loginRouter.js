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
    // FIXME: add image to server cache, limit fetches to set time interval
    console.log("Called login bg image")
    const params = new URLSearchParams({
        query: "Green Background",
        orientation: "landscape"
    })
    const headers = {
        Authorization: 'Client-ID ' + process.env.UNSPLASH_CLIENT_KEY,
        'Accept-Version': 'v1'
    }
    const url = process.env.UNSPLASH_URL + '/photos/random?' + params.toString()
    console.log(url)
    const response = {}

    try {
        const res = await fetch(url, { headers: headers });

        if (res.status != 200) {
            throw new Error(res.statusText);
        }
        // console.log(res)


        const data = await res.json()

        // console.log(data)
        const urls = data.urls;
        const authUser = data.user
        const links = data.links
        // console.log(authUser)

        response.status = 200
        response.statusText = "OK"
        response.body = {
            urls: urls,
            user: authUser,
            links: links,
        }
    } catch (err) {
        response.status = 400
        response.statusText = err.text
        console.error(err)
    } finally {
        res.status(response.status).send(response)
    }
});
