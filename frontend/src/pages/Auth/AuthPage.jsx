import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { loginApi, registerApi, getMeApi } from "../../services/api";

const AuthPage = () => {
  
  useEffect(() => {
    // Cuộn lên đầu trang ngay khi vào trang chi tiết
    window.scrollTo(0, 0);
  }, []); // [] đảm bảo chỉ chạy 1 lần khi render

    // 1. Khởi tạo state để lưu giá trị nhập vào
    const { type } = useParams();
    const isLogin = type !== "register";


    const [name, setName] = useState(''); // Chỉ dùng khi đăng ký
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // 2. Hàm xử lý khi nhấn nút Đăng nhập
    const handleAuth = async (e) => {
        e.preventDefault();
        /* e.preventDefault(): Mặc định khi nhấn nút trong <form>, trình duyệt sẽ tải lại trang. Dòng này giúp ngăn chặn việc đó để React có thể xử lý ngầm. */
        setLoading(true);

        // Chuẩn bị object credentials đúng như service yêu cầu
        const credentials = {
          email: email,
          password: password
        };

        try {
          if(isLogin)
          {
            // LOGIC Login
            const data = await loginApi(credentials);
            localStorage.setItem('token', data.token); // Lưu token
            getMeApi(); // Gọi API /me để lưu thông tin user vào Context ngay sau khi login
            alert('Đăng nhập thành công!');
            // Điều hướng người dùng đi tiếp...
          }
          else
          {
            // LOGIC Register
            const userData = {
              name: name,
              email: email,
              password: password,
              password_confirmation: password // Giả sử xác nhận mật khẩu giống mật khẩu
            };

            const data = await registerApi(userData);
            alert('Đăng ký thành công! Bây giờ bạn có thể đăng nhập.');
            setIsLogin(true); // Chuyển sang trang đăng nhập
          }

        } catch (error) {
            // Xử lý lỗi từ axios
            const errorMsg = error.response?.data?.message || 'Sai tài khoản hoặc mật khẩu';
            setError(errorMsg);
            alert('Lỗi: ' + errorMsg);
        } finally {
            setLoading(false);
        }
    }

    return (
      <>
        <div className="card mx-auto p-2" style={{ maxWidth: "400px", width: "300px" }}>
          <h5 className="card-title text-center">{isLogin ? "Login" : "Register"}</h5>
          <form onSubmit={handleAuth} className="card-body">
            {error && <p className="text-danger">{error}</p>}
            
            {!isLogin && (
              <div className="mb-3">
                <input
                type="text"
                className="form-control"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}
            <div className="mb-3">
              <input 
                type="email" 
                className="form-control" 
                id="exampleInputEmail1" 
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input 
                type="password" 
                className="form-control" 
                id="exampleInputPassword1" 
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
            <div className="mb-3 d-flex justify-content-around">
              <button className="btn btn-success" type="submit">
                {isLogin ? "Login" : "Create Account"}
              </button>

              <Link className="btn btn-success" to={isLogin ? "/auth/register" : "/auth/login"}>
                {isLogin ? "register" : "Login"}
              </Link>
            </div>
              
          </form>
        </div>
      </>
    );
}

export default AuthPage;
/*
import { useState } from "react";
import api from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/login", { email, password });
      localStorage.setItem("token", res.data.token);
      alert("Login success");
    } catch (err) {
      setError("Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      {error && <p>{error}</p>}

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button>Login</button>
    </form>
  );
}
*/