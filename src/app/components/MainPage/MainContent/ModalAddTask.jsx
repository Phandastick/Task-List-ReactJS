import Modal from 'react-modal';
import styles from './Modal.module.css'
import { useContext, useState } from 'react';
import { usernameContext } from '../../../contexts/Contexts';
import { tasksFetch } from '../../../hooks/fetchAPI'
const BASE_URL = import.meta.env.VITE_BASE_URL

//https://reactcommunity.org/react-modal/


export default function ModalAddList(props) {
    Modal.setAppElement(document.getElementById('root'))
    const username = useContext(usernameContext)
    const modalState = props.modalState

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
        tasksFetch(
            url,
            {
                method:'post',
                body: JSON.stringify(data)
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
    isOpen={modalState}
    styles= {styles}
    preventScroll={true}>
        <div className={styles["modal-wrapper"]}>
            <div className={styles["modal-header"]}>Add new task</div>
            <button className={styles["modal-button-close"]}
                onClick={() => {closeModal}}>
                <embed id={styles["closeBtn"]} 
                src='./assets/cross.svg'/>
            </button>

            <form className={styles.form} name="AddTaskForm" onSubmit={submitList} >
                <label htmlFor="name">Task Name</label>
                <input type='text' id="name" name="name" className={styles["modal-tf"]} required/>
                <label htmlFor="desc">Task Description</label>
                <input type='text' id="desc" name="desc" className={styles["modal-tfdate"]} required/>
                <label htmlFor="date">Task Duedate</label>
                <input type='text' id="date" name="date" className={styles["modal-tf"]} required/>

                <button 
                    className={styles["modal-addBtn"]}
                >Add task</button>
            </form>
        </div>
    </Modal>
    )
}