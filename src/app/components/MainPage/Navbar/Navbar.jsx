//import css with a variable for it to be a module
import styles from './Navbar.module.css';

function getDateList(){
    
    var date = new Date()
    let todayDate = date.getDate(); // date number
    var dateList = []; 
    
    let dayofweek = date.getDay()-1;
    if(dayofweek == -1){
        dayofweek = 6
    }

    // console.log(dayofweek)
    // console.log(todayDate)
    date.setDate(todayDate - dayofweek) // get monday
    // console.log(date.getDate())

    let day = {}
    let dateDict = []
    const dayList = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    
    for(var i = 0; i < 7; i++){
        //Increment starting from monday idk how
        day = {
            "dayname": dayList[i],
            "datenum": date.getDate()
        }
        dateList[i] = date.getDate();
        date.setDate(date.getDate()+1);
        dateDict[i] = day;
    }

    // console.log(dateDict)
    return dateDict
}

function Navbox({day}){
    let navbarClass, today = new Date().getDate();
    // let day = props.day;
    if(day.date == today){
        navbarClass = 'navbar-item-today';
    } else {
        navbarClass = 'navbar-item';    
    }

    // console.log(day);

    return (
        <div className = {styles[navbarClass]} key = {day.date}>
            <a className={styles["navbar-dates"]}>{day.date}</a>
            <a className={styles["navbar-days"]}>{day.name}</a>
        </div>
    )
};

function Navbar () {
    const dateDict = getDateList()

    return (<div className={`${styles.navbar} ${styles.header} containers`}>
                {
                    dateDict.map((key,index) => {
                        return <Navbox 
                            day = {{
                                'name': key.dayname,
                                'date': key.datenum
                            }}
                            key = {index}
                        />
                    })
                }
            </div>
    )
};

export default Navbar