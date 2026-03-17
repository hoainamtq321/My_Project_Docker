import styles from "./DropUp.module.css"
import { NavLink } from 'react-router-dom'; // Sử dụng NavLink để thay đổi URL mượt mà
import { FaAngleRight } from "react-icons/fa6";
const MenuItem = ({item}) =>{
    return (
        <li key={item.id} className={styles.item}>
            <NavLink to={item.link ? item.link : `/collections/${item.slug}`} className={styles.itemLink}>
                {item.name}
                {/* Kiểm tra nếu có children và mảng children có phần tử */}
                    {item.children && item.children.length > 0 && (
                        <span className={styles.arrowIcon}>
                            <FaAngleRight/>
                        </span>
                    )}
            </NavLink>
                       
            {/* Nếu có con thì hiển thị thêm một cấp nữa */}
                        
            {item.children && item.children.length > 0 &&(      
                     
                <ul className={styles.subList}>
                    {item.children.map((child) => (
                        <MenuItem key={child.id} item={child} />
                    ))}
                </ul>
            )}           
        </li>
    )
}

const DropUp = ({isHover,items})=>{

    return(
        <div className={`${styles.dropUp} ${isHover ? styles.show:""}`}>
            <ul className={styles.listItem}>
                {items.map((item)=>(
                    <MenuItem key={item.id} item={item} />
                ))}
            </ul>
        </div>
    )
}

/* 
const DropUp = ({isHover,categories})=>{

    return(
        <div className={`${styles.dropUp} ${isHover ? styles.show:""}`}>
            <ul className={styles.listItem}>
                {categories.map((item)=>(
                    <li key={item.id} className={styles.item}>
                        {item.name}
                        
                        
                        {item.children && item.children.length > 0 &&(
                            
                            <ul className={styles.subList}>
                                {item.children.map(child =>(
                                <li key={child.id} className={styles.subItem}>
                                    {child.name}
                                </li>
                                ))}
                            </ul>
                        )}
                        
                    </li>
                ))}
            </ul>
        </div>
    )
}

*/


export default DropUp