import styles from './QuantityInput.module.css';
import { FaAngleLeft,FaAngleRight } from "react-icons/fa6";

const QuantityInput = ({ value,onChange})=>{
    // 1. Hàm chặn phím (Chỉ cho số và phím điều hướng)
    const blockInvalidChar = (e) => {
        const allowedKeys = ['Backspace', 'Tab', 'Enter', 'ArrowLeft', 'ArrowRight', 'Delete'];
        // Nếu phím không nằm trong danh sách cho phép VÀ không phải là số 0-9 thì chặn
        if (!allowedKeys.includes(e.key) && (e.key < '0' || e.key > '9')) {
            e.preventDefault();
        }
    };

    // 2. Hàm xử lý thay đổi (Dùng regex để xóa sạch mọi ký tự lạ nếu lọt qua)
    const handleChange = (e) => {
        const val = e.target.value.replace(/\D/g, ""); // \D là tất cả những gì KHÔNG phải số
        onChange(val); // Gửi giá trị đã lọc sạch về cho cha (ProductInfo)
    };

    //3.1 Tự xử lý tăng
    const handleIncrease = () => {
        onChange(Number(value) + 1);
    };

    //3.2 Tự xử lý giảm (kèm logic chặn số < 1)
    const handleDecrease = () => {
        const newValue = Number(value) > 1 ? Number(value) - 1 : 1;
        onChange(newValue);
    };

    // 4. Sửa lỗi khi người dùng xóa trống rồi click ra ngoài
    const handleBlur = ()=>{
        if(value == "" || Number(value) < 1 )
        {
            onChange(1);
        }
    }
    return (
        <div className={styles.quantityItem}>
            <button className={`${styles.quantityBtn} ${styles.btnAdd}`} type="button" onClick={handleIncrease}>
                <span><FaAngleRight/></span>
            </button>
            <input className={styles.quantityInput} 
                type="text" 
                inputMode="numeric" 
                name="quantity"
                value={value}
                onKeyDown={blockInvalidChar}
                onChange={handleChange}
                onBlur={handleBlur}
            />
            <button className={`${styles.quantityBtn} ${styles.btnReduce}`} type="button" onClick={handleDecrease}>
                <span><FaAngleLeft/></span>
            </button>
        </div>
    );
}

export default QuantityInput