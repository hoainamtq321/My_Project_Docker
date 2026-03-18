import { useMemo } from 'react';
import styles from './Sidebar.module.css'
import { buildCategoryTree } from '../../utils/categoryTree';
import { NavLink } from 'react-router-dom'; // Sử dụng NavLink để thay đổi URL mượt mà


const MenuItem = ({item}) =>{
    return (
      <li key={item.id} className={styles.listItem}>
        <NavLink to={`/collections/${item.slug}`} className={({isActive}) => isActive ? styles.active : ''}>
          {item.name}
        </NavLink>
      
        {item.children && item.children.length > 0 && (
          <ul className={styles.subList}>
            {item.children.map((child) => (
              <MenuItem key={child.id} item={child} />
            ))}
          </ul>
        )}   
      </li>
    )
}

const Sidebar = ({categoryTree}) => {


  return (
    <div className={styles.sidebar}>
      {/* Nút để quay lại xem tất cả sản phẩm */}
      <NavLink to="/collections" className={styles.link}>
        <h3 className={styles.title}>Danh mục <br />Tất cả sản phẩm</h3>
      </NavLink>
      
      <ul className={styles.list}>
        
        {categoryTree.map((item) => (
          <MenuItem key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;