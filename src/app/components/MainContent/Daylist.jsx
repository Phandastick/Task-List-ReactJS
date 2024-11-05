import { useState } from 'react';
import Todo from './Todo/Todo.jsx'
import { useContext } from 'react';
import { usernameContext } from '../../contexts.jsx';

export default function Daylist({onSetLoading}) {
    //TODO: getlist with username

    const username = useContext(usernameContext);

    let resJson = returnJson();
    let props = resJson;
    
    return(
        <Todo {...props}/>
    )
}

function returnJson(){
    return {
        'groupname': 'Task list\'s name',
        'tasks': [
            {
                'name': 'Taskname',
                'date': 'Task due date',
                'desc': 'Long text whch should decribe the name of the task which is to be tracked and accomplished'
            },{
                'name': 'Taskname',
                'date': 'Task due date',
                'desc': 'Long text whch should decribe the name of the task which is to be tracked and accomplished'
            },{
                'name': 'Taskname',
                'date': 'Task due date',
                'desc': 'Long text whch should decribe the name of the task which is to be tracked and accomplished'
            },{
                'name': 'Taskname',
                'date': 'Task due date',
                'desc': 'Long text whch should decribe the name of the task which is to be tracked and accomplished'
            },{
                'name': 'Taskname',
                'date': 'Task due date',
                'desc': 'Long text whch should decribe the name of the task which is to be tracked and accomplished'
            }
        ]
    }
}