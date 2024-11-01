import { SidebarRow } from './SidebarRow.jsx';

function Sidebar_Presets(){
    const [list, setlist] = useState([])

    try {
        // const port = 6969
        const url = `/doGetDefaultLists`
        
        useEffect(() => {
            fetch(url)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                console.log('Data Received!: ')
                console.log(data)
                setlist(data.data)
            })
            .catch((error) => console.log(error)
            );
        }, [])
    } catch (err){
        console.error(err.stack)
    }

    return (
        <div className={styles["sidebar-presets"]}>
            {
                list.map((item, index) => {
                    const className = `sidebar-preset-${index + 1}`;
                    return <SidebarRow
                        text={item.name}
                        icon={`default/${item.file}`}
                        className={className}
                        idName={className}
                        index={index + 1}
                    />
                })
            }
        </div>
    )
}

export default Sidebar_Presets