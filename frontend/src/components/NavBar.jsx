import { Link, useNavigate } from "react-router-dom";

function NavBar() {
    const navigate = useNavigate()
    function logout(){
        localStorage.removeItem('user-info');
        navigate('/login')
    }

    return (
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">Trắc nghiệm</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="#">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Môn học yêu thích</a>
                        </li>
                        <li class="nav-item">
                            <Link to="/history">
                                <a class="nav-link" href="#">Lịch sử điểm</a>
                            </Link>
                        </li>
                        <li class="nav-item">
                                <a class="nav-link" onClick={logout}>Đăng xuất</a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Quản trị
                            </a>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="#">Tạo môn học</a></li>
                                <li><a class="dropdown-item" href="#">Tạo câu hỏi</a></li>
                                <li><a class="dropdown-item" href="#">Tạo đề thi</a></li>
                                <li><a class="dropdown-item" href="#">Thống kê, xếp hạng</a></li>
                                <li><a class="dropdown-item" href="#">Khóa tài khoản</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;