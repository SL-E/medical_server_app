import React from 'react';
import './user.css'
import touxing from '../../images/touxing.webp'
import { Tabs } from 'antd';

import { Input,Tooltip  } from 'antd';
import {

    WeiboSquareOutlined,
   
    SwitcherOutlined,TwitterOutlined,
   
    RestOutlined,UserOutlined
  
  } from '@ant-design/icons';
import { Button, Space } from 'antd';

  const items = [
    {
      key: '1',
      label: `User info`,
     
    },
    {
      key: '2',
      label: `Book info`,
     
    },{
        key: '3',
        label: `Medical treatment case`,
       
      },
 
  ];

export default class user extends React.Component{
state={

   num:1
}
onChange = (key) => {
      console.log(key);



      this.setState({
         num:key
      })

  
    };

    render(){
      const { num } = this.state;
        return <div className='home_boxs'>
<div className='user_left'>
<p className='user_title'>Jamed Allan</p>
<p className='user_ti'>@james</p>

<div className='user_heard'>
    
    <img src={touxing}></img>
</div>
<div className='lajitong'>
    <RestOutlined />
    </div>
    <div className='user_btn'>
        Upload New Photo
    </div>

    <div className='user_shuo'><p>Upload a new Photo.larger imange will be resized automatically.</p>
    <p className='vxcfrftgy'> Maxinmum upload size id <span className='hikyuk'>1 MB</span></p>
     </div>
     <p className='sdzxxc'>
        Member Since: <span className='hikyuk'>29 Sepetember 2019</span>
    </p>
</div>
<div className='user_right'>
   <p className='user_xing'> Edit Profile</p> 
   <Tabs defaultActiveKey="1" items={items} onChange={this.onChange} />
{num==1? <div className='user_bigbo'>
    <div className='inas'>
       <p className='inysd'>  Full Name</p>
    <Input placeholder="James" />
    </div>
    <div className='inas'>
       <p className='inysd'>  Gender</p>
    <Input placeholder="Female" />
    </div>
    <div className='inas'>
       <p className='inysd'>  Password</p>
       <Input.Password placeholder="input password" />
    </div>
    <div className='inas'>
       <p className='inysd'>  Confirm Password</p>
       <Input.Password placeholder="input password" />
    </div>

    <div className='inas'>
       <p className='inysd'>  Email Address</p>
    <Input placeholder="Email" />
    </div>
  
    <div className='inas'>
       <p className='inysd'> Confirm Email Address</p>
    <Input placeholder="Email" />
    </div>
    <div className='inas'>
       <p className='inysd'> Social Profile</p>
       <Input
      placeholder="Enter your Email"
      prefix={<WeiboSquareOutlined className="site-form-item-icon" />}
   
    />
    </div>
    <div className='inas'>
       <p className='inysd'> Social Profile</p>
       <Input
      placeholder="Enter your Email"
      prefix={<TwitterOutlined className="site-form-item-icon" />}
   
    />
    </div>
   </div> :0}
  

   <div className='user_asaz'>Updata info</div>
</div>

        </div>
        
    }
}