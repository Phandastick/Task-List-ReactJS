const preset_menu = {
    'Home':'./assets/defaultlist/home.svg', 
    'Upcoming':'./assets/defaultlist/upcoming.svg',
    'Filters':'./assets/defaultlist/filters.svg'
}

const user_menu = {
    'MyList': './assets/userlist/',
    'Projects': './assets/userlist/writing',
    'Personal': '',
    'Today': './assets/userlist/checkmark'
}


const sidebar_menu = document.getElementsByClassName('sidebar-presets')[0]
const siderbar_custom = document.getElementsByClassName('sidebar-custom')[0];

const todaydate = new Date();
const dates = document.getElementsByClassName('navbar-dates');

function initSidebar(){
    var idIndex = 1;
    for (var text in preset_menu) {
        let new_sidebar_item = document.createElement('div');
        new_sidebar_item.id = 'sidebar-preset-' + idIndex;
        new_sidebar_item.classList.add('sidebar-item')

        let new_sidebar_item_icon = document.createElement('EMBED');
        new_sidebar_item.appendChild(new_sidebar_item_icon);
        new_sidebar_item_icon.classList.add('sidebar-preset-' + idIndex)
        new_sidebar_item_icon.classList.add('sidebar-item-icon')
        new_sidebar_item_icon.src = preset_menu[text];
        
        let new_sidebar_item_text = document.createElement('a');
        new_sidebar_item.appendChild(new_sidebar_item_text);
        new_sidebar_item_text.classList.add('sidebar-preset-' + idIndex);
        new_sidebar_item_text.classList.add('sidebar-item-text');
        new_sidebar_item_text.text = text;

        sidebar_menu.appendChild(new_sidebar_item);
        idIndex++
    }
}

async function getDateList(){
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

// ADD CODE HERE IF NEED TASHA

document.addEventListener('DOMContentLoaded', () => {
    getDateList().then(
        (dateList)=>{
            for(var i = 0; i < dateList.length; i++){
                dates[i].innerHTML = dateList[i];
            }
        }
    );
    initSidebar();
})
