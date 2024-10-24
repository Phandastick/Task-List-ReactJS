function getDateList(){
    const date = new Date()
    var today = date.getDate();
    var weekday = date.getDay();
    var dateList = []; 

    today = today-weekday
    date.setDate(today)
    // console.log(date.getDate())

    date.setDate(date.getDate()+6)
    // console.log(date.getDate())
    
    for(var i = 0; i < 7; i++){
        dateList[i] = today+i;
    }

    console.log(dateList)
    return dateList
}

function Navbar () {
    const dateList = getDateList()
    let today = new Date().getDate();
    let navbarClass;

    return (
        <div className="navbar header">
            {
                dateList.map((dateNum) => {
                    if(dateNum == today){
                        navbarClass = 'navbar-item-today';
                    } else {
                        navbarClass = 'navbar-item';
                    }

                    return (
                        <div className = {navbarClass}>
                            <a className="navbar-dates">{dateNum}</a>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Navbar