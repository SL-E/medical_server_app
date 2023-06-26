import React, { useEffect, useState } from "react";
import "./login.css";
import touone from '../../images/touone.webp'
import { MailOutlined,CoffeeOutlined,CommentOutlined,FacebookOutlined,TwitterOutlined,UserOutlined,LockOutlined,AppleOutlined,WindowsOutlined} from '@ant-design/icons';
import { useNavigate } from "react-router-dom";

import {userdata} from '../../store/user'
import { Input,Checkbox,Form,Button, message } from 'antd';

import { userRegister, userLogin, connectWs } from '../../api';


export default function login()  {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isRegister, setIsRegister] = useState(false);
  const onFinish = async (values) => {
    const { username, password } = values;
    const apiFunction = isRegister ? userRegister : userLogin;
    await connectWs(`account=${username}`);
    const res = await apiFunction({
      account: username,
      password
    })
    userdata.onxx()
    message[res?.data?.success ? 'success' : 'error'](res?.data?.message)
    if(res?.data?.success){
      navigate('/yuyue');
      userdata.updateUserInfo(res?.data?.data || {})
    }
  };

  const onRegister = () => {
    setIsRegister(!isRegister);
  }

  const onFinishFailed = (errors) => {
    console.log('Errors:', errors);
    // TODO: 处理校验失败的表单项
    message.error('提交失败，请检查表单项');
  };

    useEffect(() => {
      message.warning('Not logged in, about to jump to the login page')
    }, [])
  
    return (      
      <div className="login_boxs">
  <div className="login_biao">
  <UserOutlined />
  <p>{isRegister ? 'User Register' : 'User Login'}</p>

  
  </div>
  <div className="login_from">
  <Form
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      form={form}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input prefix={<UserOutlined />} placeholder="Username" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password prefix={<LockOutlined />} placeholder="Password" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>
    </Form>
  
  </div>
  <div className="login_from">
  {/* <Input size="large" placeholder="large size" prefix={<LockOutlined />} /> */}
 <div className="mima">
 <Checkbox ><span className="logn_w">
  Keep me signed in</span> </Checkbox>
  <span className="logng_r" onClick={onRegister}>{ isRegister ? 'Back to user login' : 'Register new account'}</span>
 </div>
  </div>

  {/* <Routes></Routes>
   */}

    
  {/* <div onClick={userdata.onxx} className="dengl">
  <Link  to="/guanli">
  Sign In
              </Link>
   </div> */}
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

