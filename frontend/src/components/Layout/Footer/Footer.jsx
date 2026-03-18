import styles from './Footer.module.css'

import bank1 from "../../../assets/images/bank_1.jpeg";
import bank2 from "../../../assets/images/bank_2.jpeg";
import bank3 from "../../../assets/images/bank_3.jpeg";
import bank4 from "../../../assets/images/bank_4.jpeg";
import luat from "../../../assets/images/luat.png";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <ul className={`d-flex ${styles.items}`}>
        <li className={`${styles.item} ${styles.itemFirst}`}>
            <h3>NEM FASHION - THỜI TRANG CÔNG SỞ</h3>
            <div>Công ty TNHH Dịch vụ và Thương mại An Thành.
                <br />
                Số ĐKKD 0107861393, Sở KHĐT Tp. Hà Nội cấp ngày 04/10/2017
            </div>
            
            <div>Địa chỉ: Lô 1+2, Ô quy hoạch E.2/NO7 đường Lâm Hạ
                <br />
                phường Bồ Đề, quận Long Biên, Hà Nội
            </div>
            <div>
                Chăm sóc khách hàng: 0246.2591551
                <br />
                Mua hàng online: 0246.2909098
            </div>
            <div>
                Email: nemcskh@stripe-vn.com
            </div>
        </li>
        <li className={styles.item }>
            <ul className={styles.itemMenu}>
              <li><a href="">Giới thiệu</a></li>
              <li><a href="">Triết lý kinh doanh tại NEM Fashion</a></li>
              <li><a href="">NEM's Blog</a></li>
              <li><a href="">Hệ thống showroom</a></li>
            </ul>
        </li>
        <li className={styles.item }>
          <ul className={styles.itemMenu}>
              <li><a href="">Chính sách giao nhận - Vận chuyển</a></li>
              <li><a href="">Tra cứu đơn hàng</a></li>
              <li><a href="">Hướng dẫn chọn Size</a></li>
              <li><a href="">Quy định đổi hàng</a></li>
              <li><a href="">Quy định bảo hành và sửa chữa</a></li>
              <li><a href="">Khách hàng thân thiết</a></li>
              <li><a href="">Hướng dẫn bảo quản sản phẩm</a></li>
          </ul>
        </li>
        <li className={styles.item }>
            <p>Phương thức thanh toán</p>
            <div className="d-flex flex-wrap">
              <div className={styles.frame}><img src={bank1} alt="Phương thức thanh toán" /></div>
              <div className={styles.frame}><img src={bank2} alt="Phương thức thanh toán" /></div>
              <div className={styles.frame}><img src={bank3} alt="Phương thức thanh toán" /></div>
              <div className={styles.frame}><img src={bank4} alt="Phương thức thanh toán" /></div>
            </div>
            <div>
              <a href=""><img src={luat} alt="" style={{ width: '120px', height: 'auto' }} /></a>
            </div>
        </li>
      </ul>
    </footer>
  );
}