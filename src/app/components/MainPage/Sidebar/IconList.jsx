import { useEffect, useState } from "react"


const BASE_URL = import.meta.env.VITE_BASE_URL

export default function IconList() {
    const updateIcons = false;
    const [useIcons, setIcons] = useState([])

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const getData = async () => {
            const url = `${BASE_URL}/api/doGetIcons`
            const res = await fetch(url);
            if(res.status != 200){
                setError(res.statusText)
                return
            }
            const data = res.json();
            const iconList = data.lists;

            if(iconList.length < 1 || iconList == undefined){
                setError("There is no icons fetched!")
                return
            }

            setIcons(iconList)
            setLoading(false);
        };
        getData();
    }, [updateIcons])
    
    if(error) {
        return (
            <div> Error fetching list icons: {error}</div>
        )
    }

    if(loading) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <div>
        {
            useIcons.map((icon) => {
                <button className={styles["btn-icons"]} key={icon.name}>
                    <embed 
                    src={`/assets/${icon.name}`}
                    className={styles["embed-icons"]}
                    />
                </button>
            })
        }
        </div>
    )
}