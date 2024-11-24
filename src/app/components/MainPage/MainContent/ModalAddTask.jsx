import Modal from 'react-modal';
import styles from './Modal.module.css'
import { useContext, useEffect, useState } from 'react';
import { usernameContext } from '../../../contexts/Contexts';
import { tasksFetch } from '../../../hooks/fetchAPI'
const BASE_URL = import.meta.env.VITE_BASE_URL

//https://reactcommunity.org/react-modal/


export default function ModalAddList(props) {
    Modal.setAppElement(document.getElementById('root'))
    const modalState = props.modalState
    const [lists, setLists] = useState(props.lists)

    useEffect(()=>{
        setLists(props.lists)
    },[props.lists])

    const openModal = () => {
        props.setModalState(true)
    }
    const closeModal = () => {
        props.setModalState(false)
    }

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
        
        const url = `${BASE_URL}/api/doPostNewTask`;
        const payload = {
            groupname: data.listname,
            tasks: [{
                name: data.name,
                desc: data.desc,
                date: data.date
            }]
        }
        tasksFetch(
            url,
            {
                method:'post',
                body: JSON.stringify(payload)
            }
        ).then((response) => {
            return response.json()
        })
        .then((data) => {
            console.log(data)
            props.updateFlag(true)
        })
        .catch((error) => {
            console.error("Fetch error post data: ", error)
        });
    }



    return (
    <Modal 
    className={styles.modal}
    isOpen={modalState}
    styles= {styles}
    onAfterOpen={() => document.body.style.overflow = 'hidden'}
    onAfterClose={() => document.body.style.overflow = 'unset'}
    >
        <div className={styles["modal-wrapper"]}>
            <div className={styles["modal-header"]}>Add new task</div>
            <button className={styles["modal-button-close"]}
                onClick={closeModal}>
                <embed id={styles["closeBtn"]} 
                src='./assets/cross.svg'/>
            </button>

            <form className={styles.form} name="AddTaskForm" onSubmit={submitList} >
                <label htmlFor="name">Task Name</label>
                <input type='text' id="name" name="name" className={styles["modal-tf"]} required/>
                <label htmlFor="desc">Task Description</label>
                <input type='text' id="desc" name="desc" className={styles["modal-tfdesc"]} required/>
                <label htmlFor="date">Task Duedate</label>
                <input type='text' id="date" name="date" className={styles["modal-tf"]} required/>

                <select className={styles["ddl-listname"]} name='listname'>
                    {
                        lists.map((listname) => {
                            return(
                                <option value={listname}>{listname}</option>
                            )
                        })
                    }
                </select>

                <button 
                    className={styles["modal-addBtn"]}
                >Add task</button>
            </form>
        </div>
    </Modal>
    )
}