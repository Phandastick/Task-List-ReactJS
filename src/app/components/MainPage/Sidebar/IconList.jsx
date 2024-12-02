import { useEffect, useState } from "react"
import styles from './Sidebar.module.css'

const BASE_URL = import.meta.env.VITE_BASE_URL

export default function IconList() {
    const updateIcons = false;
    const [useIcons, setIcons] = useState([])
    const [useSelectedIcon, setSelectedIcon] = useState(null);

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
            const data = await res.json();
            const iconList = data.icons;

            if(iconList == undefined || iconList.length < 1){
                setError("No icons available for now!")
                return
            }

            setIcons(iconList)
            setLoading(false);
        };
        getData();
    }, [])

    const handleChangeIcon = (iconname) => {
        setSelectedIcon(iconname);
        document.getElementById('hdf-listicon').value = iconname;
    }
    
    if(error) {
        return (
            <div style={{textWrap:true}}> Error fetching list icons: {error}</div>
        )
    }

    if(loading) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <div className={styles["icons-container"]}>
        {
            useIcons.map((icon, index) => {
                return(
                    <button 
                    className={useSelectedIcon === icon ? styles["btn-icons-active"] : styles["btn-icons"]}
                    type="button"
                    onClick={() => { handleChangeIcon(icon) }} 
                    key={index}>
                        <embed 
                        src={`/assets/userIcons/${icon}`}
                        className={styles["embed-icons"]}
                        />
                    </button>
                )
            })
        }
        </div>
    )
}