const preset_menu = {
    'Home':'/src/assets/home.svg', 
    'Upcoming':'/src/assets/upcoming.svg',
    'Filters':'/src/assets/filters.svg'
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

async function initNavbar(){
    let today = todaydate.getDate();
    var dateList = []; 

    for(var i = 0; i < 7; i++){
        dateList[i] = today-3+i;
    }

    return dateList;
    // console.log(dateList);
}

// ADD CODE HERE IF NEED TASHA

document.addEventListener('DOMContentLoaded', () => {
    initNavbar().then(
        (dateList)=>{
            for(var i = 0; i < dateList.length; i++){
                dates[i].innerHTML = dateList[i];
            }
        }
    );
    initSidebar();
})
