import Todo from './Todo/Todo.jsx'

export default function Daylist(props) {
    //TODO: Add different views
    // - calendar mode
    
    return(
        <Todo 
            filter = {props.filter}
        />
    )
}