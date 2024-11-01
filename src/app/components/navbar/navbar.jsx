//import css with a variable for it to be a module
import styles from './Navbar.module.css';

function getDateList(){
    var date = new Date()
    let todayDate = date.getDate();
    let dayofweek = date.getDay();
    var dateList = []; 

    //find sunday's date
    todayDate = todayDate-dayofweek
    date.setDate(todayDate)
    // console.log(date.getDate())
    
    for(var i = 0; i < 7; i++){
        //Increment starting from monday idk how
        dateList[i] = date.getDate(date.setDate(date.getDate()+1));
    }

    let dateDict = [
                {
                    "dayname":"Mon",
                    "datenum": dateList[0]
                },
                {
                    "dayname":"Tue",
                    "datenum": dateList[1]
                },
                {
                    "dayname":"Wed",
                    "datenum": dateList[2]
                },
                {
                    "dayname":"Thu",
                    "datenum": dateList[3]
                },
                {
                    "dayname":"Fri",
                    "datenum": dateList[4]
                },
                {
                    "dayname":"Sat",
                    "datenum": dateList[5]
                },
                {
                    "dayname":"Sun",
                    "datenum": dateList[6]
                }
            ]

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
                    dateDict.map((key) => {
                        return <Navbox 
                            day = {{
                                'name': key.dayname,
                                'date': key.datenum
                            }}
                        />
                    })
                }
            </div>
    )
};

export default Navbar