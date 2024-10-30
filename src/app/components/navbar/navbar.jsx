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

    console.log(dateList)
    return dateList
}

function Navbar () {
    const dateList = getDateList()
    let today = new Date().getDate();
    let navbarClass;

    return (
        <div className={`${styles.navbar} ${styles.header} containers`}>
            {
                dateList.map((dateNum) => {
                    if(dateNum == today){
                        navbarClass = 'navbar-item-today';
                    } else {
                        navbarClass = 'navbar-item';
                    }

                    return (
                        <div className = {styles[navbarClass]}>
                            <a className={styles["navbar-dates"]}>{dateNum}</a>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Navbar