import { useEffect, useState } from "react"
import styles from './LoginPage.module.css'
const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function Loginbg() {
  const [imgData, setImgData] = useState(null);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(null);

  useEffect(() => {
    const getBgImage = async () => {
      try {
        //TODO: Set new image on timed interval
        // const url = `${BASE_URL}/api/login/doGetBgImage`
        // const res = await fetch(url)
        // const data = await res.json()

        const data = getData();
        setImgData(data)
      } catch (e) {
        seterror(e)
      } finally {
        setloading(false)
      }
    }
    getBgImage();
  }, [])

  if (loading) {
    return <div style={{ backgroundColor: "var(--c1)" }}></div>
  }

  if (error) {
    return <div>{error}</div>
  }

  return (<>
    <div className={styles["image-container"]}>
      <img className={styles["bg-image"]} src={imgData.urls.raw + "&w=1500"} alt="Image Background" />
    </div>
    <div className={styles["bg-image-att"]}>
      <a href={imgData.links.html} target="_blank">Photo</a> By <a href={imgData.user.links.html} target="_blank">{imgData.user.name}</a>
    </div>
    </>
    )
  }

function getData() {
  return ({
  "id": "ePB2oGU8mb4",
  "slug": "snow-capped-mountain-during-golden-hour-ePB2oGU8mb4",
  "alternative_slugs": {
    "en": "snow-capped-mountain-during-golden-hour-ePB2oGU8mb4",
    "es": "snow-capped-mountain-during-golden-hour-ePB2oGU8mb4",
    "ja": "snow-capped-mountain-during-golden-hour-ePB2oGU8mb4",
    "fr": "montagne-enneigee-pendant-lheure-doree-ePB2oGU8mb4",
    "it": "montagna-innevata-durante-lora-doro-ePB2oGU8mb4",
    "ko": "골든-아워-동안-눈-덮인-산-ePB2oGU8mb4",
    "de": "schneebedeckter-berg-wahrend-der-goldenen-stunde-ePB2oGU8mb4",
    "pt": "montanha-coberta-de-neve-durante-a-hora-dourada-ePB2oGU8mb4"
  },
  "created_at": "2017-08-28T12:42:26Z",
  "updated_at": "2024-11-26T00:05:38Z",
  "promoted_at": "2017-08-28T16:36:04Z",
  "width": 3840,
  "height": 4800,
  "color": "#262640",
  "blur_hash": "LYGbet-6M{Sh~qs.ayRjO@I;WBof",
  "description": "Shot during a post-midnight sunset on an Icelandic summer night. Long drives and steep hikes pay off almost every time here.",
  "alt_description": "snow capped mountain during golden hour",
  "breadcrumbs": [],
  "urls": {
    "raw": "https://images.unsplash.com/photo-1503924087716-07cbd5f49b21?ixid=M3w2NzczMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzI2MTMxNzN8\u0026ixlib=rb-4.0.3",
    "full": "https://images.unsplash.com/photo-1503924087716-07cbd5f49b21?crop=entropy\u0026cs=srgb\u0026fm=jpg\u0026ixid=M3w2NzczMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzI2MTMxNzN8\u0026ixlib=rb-4.0.3\u0026q=85",
    "regular": "https://images.unsplash.com/photo-1503924087716-07cbd5f49b21?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=M3w2NzczMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzI2MTMxNzN8\u0026ixlib=rb-4.0.3\u0026q=80\u0026w=1080",
    "small": "https://images.unsplash.com/photo-1503924087716-07cbd5f49b21?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=M3w2NzczMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzI2MTMxNzN8\u0026ixlib=rb-4.0.3\u0026q=80\u0026w=400",
    "thumb": "https://images.unsplash.com/photo-1503924087716-07cbd5f49b21?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=M3w2NzczMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzI2MTMxNzN8\u0026ixlib=rb-4.0.3\u0026q=80\u0026w=200",
    "small_s3": "https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1503924087716-07cbd5f49b21"
  },
  "links": {
    "self": "https://api.unsplash.com/photos/snow-capped-mountain-during-golden-hour-ePB2oGU8mb4",
    "html": "https://unsplash.com/photos/snow-capped-mountain-during-golden-hour-ePB2oGU8mb4",
    "download": "https://unsplash.com/photos/ePB2oGU8mb4/download?ixid=M3w2NzczMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzI2MTMxNzN8",
    "download_location": "https://api.unsplash.com/photos/ePB2oGU8mb4/download?ixid=M3w2NzczMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzI2MTMxNzN8"
  },
  "likes": 5141,
  "liked_by_user": false,
  "current_user_collections": [],
  "sponsorship": null,
  "topic_submissions": {
    "textures-patterns": {
      "status": "approved",
      "approved_on": "2024-03-27T07:22:02Z"
    }
  },
  "asset_type": "photo",
  "user": {
    "id": "GGr86YKpU9I",
    "updated_at": "2024-10-30T23:07:22Z",
    "username": "norrisniman",
    "name": "Norris Niman",
    "first_name": "Norris",
    "last_name": "Niman",
    "twitter_username": "norrisniman",
    "portfolio_url": "http://norrisniman.com",
    "bio": "Norris is a Swedish award-winning adventure photography specialist and Nikon Creator roaming the world since 2011. He stops time in moments worth waiting for and turns them into visual memories that have the power to tell stories and move people",
    "location": "Iceland",
    "links": {
      "self": "https://api.unsplash.com/users/norrisniman",
      "html": "https://unsplash.com/@norrisniman",
      "photos": "https://api.unsplash.com/users/norrisniman/photos",
      "likes": "https://api.unsplash.com/users/norrisniman/likes",
      "portfolio": "https://api.unsplash.com/users/norrisniman/portfolio",
      "following": "https://api.unsplash.com/users/norrisniman/following",
      "followers": "https://api.unsplash.com/users/norrisniman/followers"
    },
    "profile_image": {
      "small": "https://images.unsplash.com/profile-1503924054425-b4861b5bbff3?ixlib=rb-4.0.3\u0026crop=faces\u0026fit=crop\u0026w=32\u0026h=32",
      "medium": "https://images.unsplash.com/profile-1503924054425-b4861b5bbff3?ixlib=rb-4.0.3\u0026crop=faces\u0026fit=crop\u0026w=64\u0026h=64",
      "large": "https://images.unsplash.com/profile-1503924054425-b4861b5bbff3?ixlib=rb-4.0.3\u0026crop=faces\u0026fit=crop\u0026w=128\u0026h=128"
    },
    "instagram_username": "norrisniman",
    "total_collections": 0,
    "total_likes": 0,
    "total_photos": 2,
    "total_promoted_photos": 2,
    "total_illustrations": 0,
    "total_promoted_illustrations": 0,
    "accepted_tos": false,
    "for_hire": true,
    "social": {
      "instagram_username": "norrisniman",
      "portfolio_url": "http://norrisniman.com",
      "twitter_username": "norrisniman",
      "paypal_email": null
    }
  },
  "exif": {
    "make": "Canon",
    "model": "Canon EOS 5D Mark III",
    "name": "Canon, EOS 5D Mark III",
    "exposure_time": "1/500",
    "aperture": "5.6",
    "focal_length": "105.0",
    "iso": 1000
  },
  "location": {
    "name": "Iceland",
    "city": null,
    "country": "Iceland",
    "position": {
      "latitude": 64.963051,
      "longitude": -19.020835
    }
  },
  "meta": {
    "index": true
  },
  "public_domain": false,
  "tags": [
    {
      "type": "search",
      "title": "mountain"
    },
    {
      "type": "search",
      "title": "iceland"
    },
    {
      "type": "search",
      "title": "nature"
    },
    {
      "type": "search",
      "title": "landscape"
    },
    {
      "type": "landing_page",
      "title": "wallpaper",
      "source": {
        "ancestry": {
          "type": {
            "slug": "wallpapers",
            "pretty_slug": "HD Wallpapers",
            "redirect": null
          }
        },
        "title": "HD Wallpapers",
        "subtitle": "Download Free Wallpapers",
        "description": "Choose from the highest quality selection of high-definition wallpapers–all submitted by our talented community of contributors. Free to download and use for your mobile and desktop screens.",
        "redirect": null,
        "meta_title": "Download Free HD Wallpapers [Mobile + Desktop] | Unsplash",
        "meta_description": "Download the best HD and Ultra HD Wallpapers for free. Use them as wallpapers for your mobile or desktop screens.",
        "cover_photo": {
          "id": "VEkIsvDviSs",
          "slug": "a-mountain-with-a-pink-sky-above-the-clouds-VEkIsvDviSs",
          "alternative_slugs": {
            "en": "a-mountain-with-a-pink-sky-above-the-clouds-VEkIsvDviSs",
            "es": "una-montana-con-un-cielo-rosado-por-encima-de-las-nubes-VEkIsvDviSs",
            "ja": "雲の上にピンク色の空が広がる山-VEkIsvDviSs",
            "fr": "une-montagne-avec-un-ciel-rose-au-dessus-des-nuages-VEkIsvDviSs",
            "it": "una-montagna-con-un-cielo-rosa-sopra-le-nuvole-VEkIsvDviSs",
            "ko": "구름-위로-분홍빛-하늘이-있는-산-VEkIsvDviSs",
            "de": "ein-berg-mit-einem-rosa-himmel-uber-den-wolken-VEkIsvDviSs",
            "pt": "uma-montanha-com-um-ceu-rosa-acima-das-nuvens-VEkIsvDviSs"
          },
          "created_at": "2018-10-23T05:38:21Z",
          "updated_at": "2024-11-18T19:15:10Z",
          "promoted_at": "2018-10-24T13:12:35Z",
          "width": 5000,
          "height": 3333,
          "color": "#f3c0c0",
          "blur_hash": "LlLf,=%2WBax}nfhfkj[^iW.WBof",
          "description": "Life is full of adventures. This image was created during one of my own adventures on the top of Fronalpstock in Switzerland. During the day thousands and thousands of tourists  where passing by this spot. But the last chairlift was running at 5:30pm. Suddently the place became very quiet and calm. The fog started to clear up and reveal the two peaks.  This image represents one of the most beautiful sunsets I ever saw.",
          "alt_description": "a mountain with a pink sky above the clouds",
          "breadcrumbs": [],
          "urls": {
            "raw": "https://images.unsplash.com/photo-1540270776932-e72e7c2d11cd?ixlib=rb-4.0.3",
            "full": "https://images.unsplash.com/photo-1540270776932-e72e7c2d11cd?ixlib=rb-4.0.3\u0026q=85\u0026fm=jpg\u0026crop=entropy\u0026cs=srgb",
            "regular": "https://images.unsplash.com/photo-1540270776932-e72e7c2d11cd?ixlib=rb-4.0.3\u0026q=80\u0026fm=jpg\u0026crop=entropy\u0026cs=tinysrgb\u0026w=1080\u0026fit=max",
            "small": "https://images.unsplash.com/photo-1540270776932-e72e7c2d11cd?ixlib=rb-4.0.3\u0026q=80\u0026fm=jpg\u0026crop=entropy\u0026cs=tinysrgb\u0026w=400\u0026fit=max",
            "thumb": "https://images.unsplash.com/photo-1540270776932-e72e7c2d11cd?ixlib=rb-4.0.3\u0026q=80\u0026fm=jpg\u0026crop=entropy\u0026cs=tinysrgb\u0026w=200\u0026fit=max",
            "small_s3": "https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1540270776932-e72e7c2d11cd"
          },
          "links": {
            "self": "https://api.unsplash.com/photos/a-mountain-with-a-pink-sky-above-the-clouds-VEkIsvDviSs",
            "html": "https://unsplash.com/photos/a-mountain-with-a-pink-sky-above-the-clouds-VEkIsvDviSs",
            "download": "https://unsplash.com/photos/VEkIsvDviSs/download",
            "download_location": "https://api.unsplash.com/photos/VEkIsvDviSs/download"
          },
          "likes": 1201,
          "liked_by_user": false,
          "current_user_collections": [],
          "sponsorship": null,
          "topic_submissions": {
            "nature": {
              "status": "approved",
              "approved_on": "2020-04-06T14:20:12Z"
            },
            "wallpapers": {
              "status": "approved",
              "approved_on": "2020-04-06T14:20:09Z"
            }
          },
          "asset_type": "photo",
          "premium": false,
          "plus": false,
          "user": {
            "id": "1oL7MvktvW4",
            "updated_at": "2024-10-11T08:10:07Z",
            "username": "borisbaldinger",
            "name": "Boris Baldinger",
            "first_name": "Boris",
            "last_name": "Baldinger",
            "twitter_username": "borisbaldinger",
            "portfolio_url": "https://www.boris-baldinger.com",
            "bio": "Father of 3 | Business photographer with a fable for nature | Speaker | Teacher | Social Media Fan",
            "location": "Switzerland",
            "links": {
              "self": "https://api.unsplash.com/users/borisbaldinger",
              "html": "https://unsplash.com/@borisbaldinger",
              "photos": "https://api.unsplash.com/users/borisbaldinger/photos",
              "likes": "https://api.unsplash.com/users/borisbaldinger/likes",
              "portfolio": "https://api.unsplash.com/users/borisbaldinger/portfolio",
              "following": "https://api.unsplash.com/users/borisbaldinger/following",
              "followers": "https://api.unsplash.com/users/borisbaldinger/followers"
            },
            "profile_image": {
              "small": "https://images.unsplash.com/profile-1552053169443-ad3a5339ce69?ixlib=rb-4.0.3\u0026crop=faces\u0026fit=crop\u0026w=32\u0026h=32",
              "medium": "https://images.unsplash.com/profile-1552053169443-ad3a5339ce69?ixlib=rb-4.0.3\u0026crop=faces\u0026fit=crop\u0026w=64\u0026h=64",
              "large": "https://images.unsplash.com/profile-1552053169443-ad3a5339ce69?ixlib=rb-4.0.3\u0026crop=faces\u0026fit=crop\u0026w=128\u0026h=128"
            },
            "instagram_username": "borisbaldinger",
            "total_collections": 3,
            "total_likes": 71,
            "total_photos": 16,
            "total_promoted_photos": 12,
            "total_illustrations": 0,
            "total_promoted_illustrations": 0,
            "accepted_tos": true,
            "for_hire": true,
            "social": {
              "instagram_username": "borisbaldinger",
              "portfolio_url": "https://www.boris-baldinger.com",
              "twitter_username": "borisbaldinger",
              "paypal_email": null
            }
          }
        },
        "affiliate_search_query": null
      }
    },
    {
      "type": "search",
      "title": "snow"
    },
    {
      "type": "search",
      "title": "winter"
    },
    {
      "type": "landing_page",
      "title": "background",
      "source": {
        "ancestry": {
          "type": {
            "slug": "backgrounds",
            "pretty_slug": "Backgrounds",
            "redirect": null
          }
        },
        "title": "Hq Background Images",
        "subtitle": "Download Free Backgrounds",
        "description": "Browse our beautiful selection of free background images–all submitted by our community of talented contributors and completely free to download and use.",
        "redirect": null,
        "meta_title": "Best 100+ Free Background Images [HD] | Download your next background photo on Unsplash",
        "meta_description": "Download the perfect background images. Find over 100+ of the best free background images. Free for commercial use ✓ No attribution required ✓ Copyright-free ✓",
        "cover_photo": {
          "id": "fMUIVein7Ng",
          "slug": "closeup-photo-of-black-and-red-building-fMUIVein7Ng",
          "alternative_slugs": {
            "en": "closeup-photo-of-black-and-red-building-fMUIVein7Ng",
            "es": "foto-de-primer-plano-del-edificio-negro-y-rojo-fMUIVein7Ng",
            "ja": "黒と赤の建物のクローズアップ写真-fMUIVein7Ng",
            "fr": "photo-en-gros-plan-dun-batiment-noir-et-rouge-fMUIVein7Ng",
            "it": "foto-ravvicinata-delledificio-nero-e-rosso-fMUIVein7Ng",
            "ko": "흑백-건물의-근접-촬영-사진-fMUIVein7Ng",
            "de": "nahaufnahme-des-schwarz-roten-gebaudes-fMUIVein7Ng",
            "pt": "foto-de-closeup-do-edificio-preto-e-vermelho-fMUIVein7Ng"
          },
          "created_at": "2017-05-15T23:49:10Z",
          "updated_at": "2024-11-20T23:11:45Z",
          "promoted_at": "2017-05-16T09:06:41Z",
          "width": 3847,
          "height": 5583,
          "color": "#c0d9d9",
          "blur_hash": "LtJ@tjEyjFj[lov~Rja{-Cx]bbWC",
          "description": "After getting many photos for a project, I am also trying to get images to share with the Unsplash community. Here’s an attempt at abstracting a detail of the amazing architecture of CCPV.",
          "alt_description": "closeup photo of black and red building",
          "breadcrumbs": [],
          "urls": {
            "raw": "https://images.unsplash.com/photo-1494891848038-7bd202a2afeb?ixlib=rb-4.0.3",
            "full": "https://images.unsplash.com/photo-1494891848038-7bd202a2afeb?ixlib=rb-4.0.3\u0026q=85\u0026fm=jpg\u0026crop=entropy\u0026cs=srgb",
            "regular": "https://images.unsplash.com/photo-1494891848038-7bd202a2afeb?ixlib=rb-4.0.3\u0026q=80\u0026fm=jpg\u0026crop=entropy\u0026cs=tinysrgb\u0026w=1080\u0026fit=max",
            "small": "https://images.unsplash.com/photo-1494891848038-7bd202a2afeb?ixlib=rb-4.0.3\u0026q=80\u0026fm=jpg\u0026crop=entropy\u0026cs=tinysrgb\u0026w=400\u0026fit=max",
            "thumb": "https://images.unsplash.com/photo-1494891848038-7bd202a2afeb?ixlib=rb-4.0.3\u0026q=80\u0026fm=jpg\u0026crop=entropy\u0026cs=tinysrgb\u0026w=200\u0026fit=max",
            "small_s3": "https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1494891848038-7bd202a2afeb"
          },
          "links": {
            "self": "https://api.unsplash.com/photos/closeup-photo-of-black-and-red-building-fMUIVein7Ng",
            "html": "https://unsplash.com/photos/closeup-photo-of-black-and-red-building-fMUIVein7Ng",
            "download": "https://unsplash.com/photos/fMUIVein7Ng/download",
            "download_location": "https://api.unsplash.com/photos/fMUIVein7Ng/download"
          },
          "likes": 2013,
          "liked_by_user": false,
          "current_user_collections": [],
          "sponsorship": null,
          "topic_submissions": {
            "architecture-interior": {
              "status": "approved",
              "approved_on": "2020-04-06T14:20:14Z"
            },
            "color-of-water": {
              "status": "approved",
              "approved_on": "2022-04-21T15:04:21Z"
            },
            "wallpapers": {
              "status": "approved",
              "approved_on": "2020-04-06T14:20:09Z"
            }
          },
          "asset_type": "photo",
          "premium": false,
          "plus": false,
          "user": {
            "id": "hnq0aaqF_Qo",
            "updated_at": "2024-11-15T02:55:13Z",
            "username": "scottwebb",
            "name": "Scott Webb",
            "first_name": "Scott",
            "last_name": "Webb",
            "twitter_username": null,
            "portfolio_url": "https://scottwebb.me/",
            "bio": "If you like my work and you'd like to support me, you can consider a donation 👉  http://www.paypal.me/scottrwebb | Donation goal for a new lens: $351.01 of $449 | Thank you Jay D. 🙏",
            "location": "London, Ontario, Canada",
            "links": {
              "self": "https://api.unsplash.com/users/scottwebb",
              "html": "https://unsplash.com/@scottwebb",
              "photos": "https://api.unsplash.com/users/scottwebb/photos",
              "likes": "https://api.unsplash.com/users/scottwebb/likes",
              "portfolio": "https://api.unsplash.com/users/scottwebb/portfolio",
              "following": "https://api.unsplash.com/users/scottwebb/following",
              "followers": "https://api.unsplash.com/users/scottwebb/followers"
            },
            "profile_image": {
              "small": "https://images.unsplash.com/profile-1728583992323-a3fda92d4e12?ixlib=rb-4.0.3\u0026crop=faces\u0026fit=crop\u0026w=32\u0026h=32",
              "medium": "https://images.unsplash.com/profile-1728583992323-a3fda92d4e12?ixlib=rb-4.0.3\u0026crop=faces\u0026fit=crop\u0026w=64\u0026h=64",
              "large": "https://images.unsplash.com/profile-1728583992323-a3fda92d4e12?ixlib=rb-4.0.3\u0026crop=faces\u0026fit=crop\u0026w=128\u0026h=128"
            },
            "instagram_username": "scottwebb",
            "total_collections": 46,
            "total_likes": 4534,
            "total_photos": 813,
            "total_promoted_photos": 387,
            "total_illustrations": 0,
            "total_promoted_illustrations": 0,
            "accepted_tos": true,
            "for_hire": true,
            "social": {
              "instagram_username": "scottwebb",
              "portfolio_url": "https://scottwebb.me/",
              "twitter_username": null,
              "paypal_email": null
            }
          }
        },
        "affiliate_search_query": null
      }
    },
    {
      "type": "search",
      "title": "sunset"
    },
    {
      "type": "search",
      "title": "minimalist"
    },
    {
      "type": "search",
      "title": "orange"
    },
    {
      "type": "search",
      "title": "phone"
    },
    {
      "type": "search",
      "title": "sunrise"
    },
    {
      "type": "search",
      "title": "mountains"
    },
    {
      "type": "search",
      "title": "brennisteinsalda"
    },
    {
      "type": "search",
      "title": "golden hour"
    },
    {
      "type": "search",
      "title": "mountain peak"
    },
    {
      "type": "search",
      "title": "mountain range"
    },
    {
      "type": "search",
      "title": "mountain ridge"
    },
    {
      "type": "search",
      "title": "mountain layers"
    }
  ],
  "views": 24746333,
  "downloads": 223901,
  "topics": [
    {
      "id": "iUIsnVtjB0Y",
      "title": "Textures \u0026 Patterns",
      "slug": "textures-patterns",
      "visibility": "featured"
    }
  ]
})
}