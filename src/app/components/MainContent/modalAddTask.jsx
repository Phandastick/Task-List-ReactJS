import Modal from 'react-modal';
import styles from './Modal.module.css'
import { useContext } from 'react';
import { usernameContext } from '../../providers/AuthContext.jsx';


export default function ModalAddList(props) {
    Modal.setAppElement(document.getElementById('root'))
    const username = useContext(usernameContext)

    function submitList(e) {
        console.log('Submitting data...')
        e.preventDefault();
        // console.log(e)
    
        var data = {}
        const form = new FormData(e.target)
        form.forEach((value, key) => {
            // console.log(key, value);
            data[key] = value
        });
    
        data['username'] = username;
    
        console.log(data);
        
        const BASE_URL = process.env.BASE_URL;
        const url = `${BASE_URL}/api/doPostNewTasks`;
        fetch(
            url,
            {
                'method':'post',
                'headers':{
                    "Content-Type": "application/json"
                },
                'body':data
            }
        ).then((response) => {
            return response.json()
        })
        .then((data) => {
            console.log(data)
        })
        .catch((error) => {
            console.error("Fetch error post data: ", error)
        });
    }
    return (
    <Modal 
    className={styles.modal}
    isOpen={props.isModalOpen}
    styles= {styles}>
        <div className={styles["modal-wrapper"]}>
            <div className={styles["modal-header"]}>Add new list</div>
            <button className={styles["modal-button-close"]}
                onClick={props.onRequestClose}>
                <embed id={styles["closeBtn"]} 
                src='./assets/cross.svg'/>
            </button>

            <form className={styles.form} name="AddListForm" method="post" onSubmit={submitList} >
                <label htmlFor="groupname">Name</label>
                <input type='text' id="groupname" name="name" className={styles["modal-tf"]} required/>
                <button 
                    className={styles["modal-addBtn"]}
                >New List</button>
            </form>
        </div>
    </Modal>
    )
}