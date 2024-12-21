import Todo from './Todo/Todo.jsx'

export default function Daylist(props) {
    //TODO: Add different views
    
    return(
        <Todo 
            filter = {props.filter}
        />
    )
}