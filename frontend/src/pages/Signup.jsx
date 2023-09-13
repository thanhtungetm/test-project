function Signup() {
    return (
        <div>
            <h2>Signup</h2>
            <form action="">
            <div class="form-floating mb-3">
                <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com"/>
                    <label for="floatingInput">Tên người dùng</label>
            </div>
            <div class="form-floating">
                <input type="password" class="form-control" id="floatingPassword" placeholder="Password"/>
                    <label for="floatingPassword">Mật khẩu</label>
            </div>
            <button type="button" class="btn btn-primary">Đăng ký</button>
        </form>
        </div>
    );
}

export default Signup;