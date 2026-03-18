import imageBanner from "../../assets/images/banner.jpg";
import styles from "./Banner.module.css";

const Banner = () => {
  return (
    <div className={styles.banner}>
      <img src={imageBanner} alt="Banner" />
    </div>
  );
};

export default Banner;