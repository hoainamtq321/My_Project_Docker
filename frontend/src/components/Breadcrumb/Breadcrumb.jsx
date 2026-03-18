import { Link, useLocation } from "react-router-dom";

import styles from "./Breadcrumb.module.css";

const Breadcrumb = () => {
  const location = useLocation();

  const paths = location.pathname
    .split("/")
    .filter(Boolean);

  return (
    <nav className={styles.breadcrumb}>
      <Link to="/">Trang chủ</Link>
      {paths.map((path, index) => {
        const url = "/" + paths.slice(0, index + 1).join("/");
        return (
          <span key={index}>
            {" / "}
            <Link to={url}>{path}</Link>
          </span>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
