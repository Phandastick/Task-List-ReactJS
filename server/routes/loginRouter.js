import { Router } from "express";

export const loginRouter = Router();

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
