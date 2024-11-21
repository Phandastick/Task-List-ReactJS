import { Router } from "express";
import db from "../db/connection.js";

export const loginRouter = Router();

loginRouter.get('/doSignIn', async (req,res) => {

})

loginRouter.post('/doPostNewUser', async (req, res) => {
    const data = req.body
    const username = data.username
    const password = data.password
    const response = {}

    console.log("Username:", username)
    console.log("Password:", password)

    try{
        let collection = await db.collection("users")
        let duplicate = await collection.findOne({
            username: username
        })

        if(duplicate){
            //duplicate found
            throw Error("Duplicate username found!")
        }

        let newDoc = {
            username: username,
            password: password
        }

        let result = await collection.insertOne(newDoc);

        // console.log(result);

        if(result.acknowledged){
            response.status = 200
            response.statusText = result
            console.log(response)
        } else {
            response.status = 500
            response.statusText = result
        }

    } catch (err){
        console.error(err);
        response.status = 500
        response.statusText = err.message
    } finally {
        console.log("Finally")
        res.status(response.status).json(response)
    }
});

loginRouter.get('/doGetBgImage', async (req, res) => {
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

    try{
        const res = await fetch(url, {headers: headers});

        if(res.status != 200){
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
        response.body ={
            urls: urls,
            user: authUser,
            links: links,
        }
    } catch(err){
        response.status = 400
        response.statusText = err.text
        console.error(err)
    } finally {
        res.status(response.status).send(response)
    }
});
