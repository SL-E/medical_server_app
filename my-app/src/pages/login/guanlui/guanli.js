import React from "react";
// import "./login.css";
// import touone from '../../images/touone.webp'
import { MailOutlined,CoffeeOutlined,CommentOutlined,FacebookOutlined,TwitterOutlined,UserOutlined,LockOutlined,AppleOutlined,WindowsOutlined} from '@ant-design/icons';
import {BrowserRouter as Router, Route, Routes, Link} from "react-router-dom";

import {userdata} from '../../../store/user'
import { Input, Form,Checkbox  } from 'antd';


export default function login()  {


  const denglu=()=>{

  }
    return (
      <div className="login_boxs">
  <div className="login_biao">
  <UserOutlined />
  <p>User Login</p>

  
  </div>
  <div className="login_from">
  <Input size="large" placeholder="large size" prefix={<MailOutlined />} />
  
  </div>
  <div className="login_from">
  <Input size="large" placeholder="large size" prefix={<LockOutlined />} />
 <div className="mima">
 <Checkbox ><span className="logn_w">
  Keep me signed in</span> </Checkbox>
  <span className="logng_r"> Forget Your Password?</span>
 </div>
  </div>

  {/* <Routes></Routes>
   */}

    
  <div onClick={userdata.onxx} className="dengl">
  <Link  to="/guanli">
  Sign In
              </Link>
   </div>
<div className="login_ti">
    <div className="biao_one"><AppleOutlined /></div>
    <div className="biao_one"><WindowsOutlined /></div>
    <div className="biao_one"><TwitterOutlined /></div>
    <div className="biao_one"><FacebookOutlined /></div>
    <div className="biao_one"><CommentOutlined /></div>
    <div className="biao_one"><CoffeeOutlined /></div>
</div>
      </div>
    );
  }

