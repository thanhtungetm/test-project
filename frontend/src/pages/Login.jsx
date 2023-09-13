import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

function Login() {

    const navigate = useNavigate();

    const [data, setData] = useState({username:"", password:""})
    const [err, setErr] = useState(false)

    async function login(){
        try {
            const res = await AuthService.login(data);
            localStorage.setItem('user-info', JSON.stringify(res))  
            navigate('/')
        } catch (error) {
            console.error(error)
            setErr(true)
        }
        
        
    }

    return (
        <div>
            <h2>Đăng nhập</h2>
          
            <div class="form-floating mb-3">
                <input  class="form-control" id="floatingInput"
                    onChange={(e)=>setData({...data, username: e.target.value})}
                />
                    <label for="floatingInput">Tên người dùng</label>
            </div>
            <div class="form-floating">
                <input type="password" class="form-control" id="floatingPassword" placeholder="Password"
                onChange={(e)=>setData({...data, password: e.target.value})}
                />
                    <label for="floatingPassword">Mật khẩu</label>
            </div>
            {err&&<div className="alert alert-danger">Tên tài khoản hoặc mật khẩu không đúng!</div>}
            <button type="button mt-3" class="btn btn-primary"
                onClick={login}
            >Đăng nhập</button>
            <Link to={'/signup'}>
            <button type="button mx-1" class="btn btn-info">Đăng ký</button>
            </Link>
        </div>
    );
}

export default Login;