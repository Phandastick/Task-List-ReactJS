import { request } from "express";

async function getDefaultLists(){
    const port =  process.env.PORT
    const url = 'http://localhost:{port}/apidoGetDefaultLists'
    // const url = 'http://localhost:6969/doGetDefaultLists'

    try {
        const response = await fetch(url);

        if(!response.ok){
            throw new Error(`Response Status: ${response.status}`)
        }
        
        const resJson = await response.json()
        var data = resJson.body
        return data
    } catch (err) {
        console.error(err.stack);
    }
}

function Sidebar () {
    const defaultLists = getDefaultLists()
    console.log(defaultLists)

    return (
        <div class="sidebar containers">
            <h1>To-do List</h1>
            <div class="sidebar-presets"></div>
            <hr class="sidebar-divider"></hr>
            <div class="sidebar-custom"></div>
        </div>
    );
};

export default Sidebar;