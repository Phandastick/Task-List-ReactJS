import styles from './Sidebar.module.css'

function SidebarRow({ text, icon, className, idName }) {
    return <div id={idName} className={styles['sidebar-item']}>
        <embed
            className={`${className} ${styles['sidebar-item-icon']}`}
            src={`/assets/${icon}.svg`}
        />
        <a className={`${className} sidebar-item-text`}>{text}</a>
    </div>
}

export default SidebarRow;