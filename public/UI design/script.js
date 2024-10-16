
const preset_menu = [
    {
        1: 'Home',
        2: 'Upcoming',
        3: 'Filters'
    }
]
const sidebar_menu = document.getElementsByClassName('sidebar')

preset_menu[0].forEach(item => {
    let sidebar_item = document.createElement('div');
    
});


const todaydate = new Date();
const dates = document.getElementsByClassName('navbar-dates');

async function initDateList(){
    let today = todaydate.getDate();
    var dateList = []; 

    for(var i = 0; i < 7; i++){
        dateList[i] = today-3+i;
    }

    return dateList;
    // console.log(dateList);
}


document.addEventListener('DOMContentLoaded', () => {
    initDateList().then(
        (dateList)=>{
            for(var i = 0; i < dateList.length; i++){
                dates[i].innerHTML = dateList[i];
            }
        }
    );
})
