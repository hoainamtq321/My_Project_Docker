import { useState, useEffect } from "react";
import imageBanner1 from "../../assets/images/banner1.jpg";
import imageBanner2 from "../../assets/images/banner2.jpg";
// Sau này bạn chỉ cần import thêm ảnh ở đây và ném vào mảng images bên dưới
import styles from "./Banner.module.css";

const Banner = () => {
  // THÊM ẢNH VÀO ĐÂY LÀ XONG, KHÔNG CẦN SỬA LOGIC NỮA
  const images = [imageBanner1, imageBanner2]; 
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleScroll = (direction) => {
    if (direction === "next") {
      goToNext();
    } else {
      goToPrev();
    }
  };

  // Reset Timer: Mỗi khi currentIndex thay đổi (do ấn nút hoặc tự chạy), 
  // useEffect sẽ hủy timer cũ và tạo timer mới đếm lại từ đầu (5s).
  useEffect(() => {
    const timer = setInterval(() => {
      goToNext();
    }, 5000);

    return () => clearInterval(timer);
  }, [currentIndex, images.length]); 

  return (
    <div className={styles.banner}>
      <div 
        className={styles.track} 
        style={{ 
          width: `${images.length * 100}%`, // Tự giãn theo số lượng ảnh
          transform: `translateX(-${currentIndex * (100 / images.length)}%)` // Tự tính tọa độ trượt
        }}
      >
        {images.map((img, index) => (
          <div 
            key={index} 
            className={styles.slide}
            style={{ width: `${100 / images.length}%` }} // Chia đều chiều rộng cho mỗi slide
          >
            <img className={styles.imgae} src={img} alt={`Banner ${index}`} />
          </div>
        ))}
      </div>

      <div className={styles.controls}>
        <button onClick={() => handleScroll('prev')} className={styles.prev}>←</button>
        <button onClick={() => handleScroll('next')} className={styles.next}>→</button>
      </div>
    </div>
  );
};

export default Banner;