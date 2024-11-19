import { Router } from "express";

export const loginRouter = Router();

loginRouter.use('/login')

loginRouter.get('/doGetBgImage', async (req, res) => {
    const params = new URLSearchParams({
        query: "Wallpaper",
        orientation: "portrait"
    })
    const url = process.env.UNSPLASH_BASE_URL + params.toString()
    const response = {}

    try{
        const res = await fetch(url);
        const data = await res.json()
    
        const urls = data.urls;
        const imgUrl = `${urls.raw}&w=1500&dpr=2`;
        
        const authUser = data.user
        const authName = authUser.Name
        const authLink = authUser.links.html
    
        response.status = 200
        response.statusText = "OK"
        response.body ={
            imgUrl: imgUrl,
            authName: authName,
            authLink: authLink,
        }
    } catch(err){
        response.status = 400
        response.statusText = err
    } finally {
        res.status(response.status).send(response)
    }
});
