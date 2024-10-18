function Navbar () {
    const today = new Date().getDate();
    var dateList = []; 

    for(var i = 0; i < 7; i++){
        dateList[i] = today-3+i;
    }
    return (
        <div className="navbar header">
            {
            dateList.map((date) => {
                    <div className="navbar-item">
                        <a className="navbar-dates">date</a>
                    </div>
                })
            }
        </div>
    )
}

export default Navbar