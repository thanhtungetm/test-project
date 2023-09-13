import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar';
import { Link, useNavigate } from 'react-router-dom';
import helper from './helper/index'

function App() {
  const navigate = useNavigate();
  if(!helper.getUserInfo()){
    return navigate('/login')
  }

  return (
    <div>
      <NavBar />
      <div>
        <Link to="/quiz">
          <button className='btn btn-primary mx-2'>
            Câu hỏi ngẫu nhiên
          </button>
        </Link>
        <Link to="/test">
          <button className='btn btn-primary'>
            Đề thi
          </button>
        </Link>
      </div>
    </div>
  );
}

export default App;
