import styles from "./DropDown.module.css"

const DropDown = ({options, isHover})=>{
    return(
        <div className={`${styles.dropDown} ${isHover ? styles.show:""}`}>
            <ul className={styles.listItem}>
                {options.map((option, index) => (
                    <li key={index} className={styles.item}>
                        {option.label}
                    </li>
                ))}
                <li className={styles.item}>Full Size</li>
            </ul>
        </div>
    )
}

export default DropDown