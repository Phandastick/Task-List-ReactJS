import { useEffect, useState } from "react"
import styles from './LoginPage.module.css'
const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function Loginbg(){
    const [imgData, setImgData] = useState(null);
    const [loading, setloading] = useState(true);
    const [error, seterror] = useState(null);

    useEffect(()=>{
        const getBgImage = async () => {
            try{
                // const url = `${BASE_URL}/api/login/doGetBgImage`
                // const res = await fetch(url)
                // const data = await res.json()

                const data = getData();
                setImgData(data.body)
            } catch (e){
                seterror(e)
            } finally {
                setloading(false)
            }
        }
        getBgImage();
    }, [])

    if(loading) {
        return <div style={{backgroundColor: "var(--c1)"}}></div>
    }

    if(error) {
      return <div>{error}</div>
    }

    return (
    <div className={styles["image-container"]}>
        <img className={styles["bg-image"]} src={imgData.urls.raw+"&w=1500"} alt="Image Background" />
        <div className={styles["bg-image-att"]}>
            <a href={imgData.links.html} target="_blank">Photo</a> By <a href={imgData.user.links.html}target="_blank">{imgData.user.name}</a>
        </div>
    </div>
    )
}

function getData(){
    return (
    {
      "status": 200,
      "statusText": "OK",
      "body": {
        "urls": {
          "raw": "https://images.unsplash.com/photo-1568133267847-ec7d66153788?ixid=M3w2NzczMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzIwNzIzODl8&ixlib=rb-4.0.3",
          "full": "https://images.unsplash.com/photo-1568133267847-ec7d66153788?crop=entropy&cs=srgb&fm=jpg&ixid=M3w2NzczMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzIwNzIzODl8&ixlib=rb-4.0.3&q=85",
          "regular": "https://images.unsplash.com/photo-1568133267847-ec7d66153788?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NzczMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzIwNzIzODl8&ixlib=rb-4.0.3&q=80&w=1080",
          "small": "https://images.unsplash.com/photo-1568133267847-ec7d66153788?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NzczMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzIwNzIzODl8&ixlib=rb-4.0.3&q=80&w=400",
          "thumb": "https://images.unsplash.com/photo-1568133267847-ec7d66153788?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NzczMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzIwNzIzODl8&ixlib=rb-4.0.3&q=80&w=200",
          "small_s3": "https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1568133267847-ec7d66153788"
        },
        "user": {
          "id": "0H_7ThC8zz4",
          "updated_at": "2024-11-20T01:16:59Z",
          "username": "stas_r",
          "name": "Stanislav Rozhkov",
          "first_name": "Stanislav",
          "last_name": "Rozhkov",
          "twitter_username": null,
          "portfolio_url": null,
          "bio": "Photography is my life",
          "location": "Germany",
          "links": {
            "self": "https://api.unsplash.com/users/stas_r",
            "html": "https://unsplash.com/@stas_r",
            "photos": "https://api.unsplash.com/users/stas_r/photos",
            "likes": "https://api.unsplash.com/users/stas_r/likes",
            "portfolio": "https://api.unsplash.com/users/stas_r/portfolio",
            "following": "https://api.unsplash.com/users/stas_r/following",
            "followers": "https://api.unsplash.com/users/stas_r/followers"
          },
          "profile_image": {
            "small": "https://images.unsplash.com/profile-fb-1504702315-7d77d45d75e4.jpg?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32",
            "medium": "https://images.unsplash.com/profile-fb-1504702315-7d77d45d75e4.jpg?ixlib=rb-4.0.3&crop=faces&fit=crop&w=64&h=64",
            "large": "https://images.unsplash.com/profile-fb-1504702315-7d77d45d75e4.jpg?ixlib=rb-4.0.3&crop=faces&fit=crop&w=128&h=128"
          },
          "instagram_username": "stas_rozhkov",
          "total_collections": 0,
          "total_likes": 175,
          "total_photos": 176,
          "total_promoted_photos": 24,
          "total_illustrations": 0,
          "total_promoted_illustrations": 0,
          "accepted_tos": true,
          "for_hire": false,
          "social": {
            "instagram_username": "stas_rozhkov",
            "portfolio_url": null,
            "twitter_username": null,
            "paypal_email": null
          }
        },
        "links": {
          "self": "https://api.unsplash.com/photos/green-banana-leaf-ztziOghlf2k",
          "html": "https://unsplash.com/photos/green-banana-leaf-ztziOghlf2k",
          "download": "https://unsplash.com/photos/ztziOghlf2k/download?ixid=M3w2NzczMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzIwNzIzODl8",
          "download_location": "https://api.unsplash.com/photos/ztziOghlf2k/download?ixid=M3w2NzczMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzIwNzIzODl8"
        }
      }
    })
}