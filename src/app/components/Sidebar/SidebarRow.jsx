function SidebarRow({ text, icon, className, idName, index }) {
    return <div id={idName} className={styles['sidebar-item']} key={index}>
        <embed
            className={`${className} ${styles['sidebar-item-icon']}`}
            src={`/assets/${icon}.svg`}
        />
        <a className={`${className} sidebar-item-text`}>{text}</a>
    </div>
}

export default SidebarRow;