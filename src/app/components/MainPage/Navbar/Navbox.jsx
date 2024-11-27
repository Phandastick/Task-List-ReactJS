import styles from './Navbar.module.css';


// TODO: Add filtering by date
export default function Navbox({day}){
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