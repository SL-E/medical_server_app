import "./App.css";
import {BrowserRouter as Router, Route, Routes, Link, useNavigate} from "react-router-dom";
import home from "./pages/home/home";
import logo from "./images/logo.webp";
import user from "./pages/user/user";
import drug from "./pages/drug/drug";
import Hospitals from "./pages/Hospitals/Hospitals";
import Doctors from "./pages/Doctors/Doctors";
import login from "./pages/login/login";
import Pharmacies from "./pages/Pharmacies/Pharmacies";
import About from "./pages/About/About";
import yuyue from "./pages/yuyue/yuyue";
import Medicines from "./pages/Medicines/Medicines";
import {observer} from 'mobx-react-lite'
import {userdata} from './store/user'
import guanli from './pages/login/guanlui/guanli'

import { userLoginout } from './api/index'
import { message } from "antd";

import AuthRouter from './components/AuthRouter'

function App() {
  const onClickLogOut = async () => {
    const res = await userLoginout({ account: userdata.userInfo.account })
    if(res.data.success){
      userdata.updateIsLogin(false);
      message.success('loginout success')
      window.location.href = "/login"
    }else{
      message.error('loginout fail')
    }
  }

  return (
    <Router>
      <div className="App">
        <div className="box">
          <div className="app_heasdedr">
            <div className="hear">
        
              <Link className="logo" to="/about">
              <img src={logo}></img>
                </Link>

              <div className="title">
                <span>
                  MedicalService <br></br>
                  inNewZealand
                </span>
              </div>
              <div className="daohang">
                <Link className="dsds" to="/about">
                  About Us
                </Link>
                
                <Link className="dsds" to="/home">
                  Help
                </Link>

                <Link className="dsds" to="/FAQs">
                  FAQs
                </Link>

                <Link className="dsds" to="/Feedback">
                  Feedback
                </Link>

                <Link className="dsds" to="/Get the APP">
                  Get the APP
                </Link>
                {
                  userdata.isLogin ?  (<div className="dsds logout" onClick={onClickLogOut}>log out</div>) : (
                    <Link className="dsds" to="/login">
                    log in
                  </Link>
                  )
                }

              </div>
              <div >
               
              </div>
{userdata.token? <Link className="sdasa" to="/user">
              profile<br></br>
               photo

                {userdata.token}
              </Link>:'' }
             
            </div>
          </div>

          <div className="navs">
            <div className="nacBox">
              <Link className="dsdsaa" to="/yuyue">
                Book
              </Link>
              <Link className="dsdsaa" to="/hospitals">
                Hospitals&Clinics
              </Link>

              
              <Link className="dsdsaa" to="/pharmacies">
                Pharmacies
              </Link>
              <Link className="dsdsaa" to="/doctors">
                Doctors
              </Link>

              <Link className="dsdsaa" to="/drug">
                Medicines
              </Link>

              <Link className="dsdsaa" to="/communacation">
                Communacation
              </Link>
            </div>
          </div>

          <AuthRouter isAuthenticated={userdata?.userInfo?.account}></AuthRouter>
        </div>
      </div>
    </Router>
  );
}

export default observer(App) ;
