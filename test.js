function getDateList(){
    var date = new Date()
    let today = date.getDate();
    let weekday = date.getDay();
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

getDateList();