import React from 'react';
import './home.css'
import { Tabs } from 'antd';
import { Card } from 'antd';
import {
    SettingOutlined,
    TeamOutlined,
    StarOutlined,
    SwitcherOutlined,
    UnlockOutlined,SmileOutlined,WalletOutlined
  } from '@ant-design/icons';
import { Button, Space } from 'antd';
const onChange = (key) => {
    console.log(key);
  };
  const items = [
    {
      key: '1',
      label: `Get Started`,
     
    },
    {
      key: '2',
      label: `Dashoard`,
     
    },
 
  ];

export default class home extends React.Component{
    render(){
        return <div className='home_box'>
<div className='home_flet'> 
<Tabs defaultActiveKey="1" items={items} onChange={onChange} />
<Card
    title="Quickstarts"
    extra={ <Button>view My Deployments</Button>}
    bordered={false}
    style={{
      width: 660,
    }}
  >
   <div className='sdss'>

   <div className='card_box'>
       <p><span>APPLICATION DEVELOPMENT</span> <SettingOutlined className='ixcon' /></p> 
       <p className='zxzxx'>Deploy a low-code app on<br></br>
   Autopnocmus Database Using APEX </p> 
   <p className='zxzxx dfsfs'>3-5mins</p>   
    </div>
    <div className='card_box'>
       <p><span>APPLICATION DEVELOPMENT</span> <StarOutlined className='ixcon' /></p> 
       <p className='zxzxx'>Deploy a low-code app on<br></br>
   Autopnocmus Database Using APEX </p>
   <p className='zxzxx dfsfs'>4-6mins</p>  
    </div>
    <div className='card_box'>
       <p><span>APPLICATION DEVELOPMENT</span><TeamOutlined className='ixcon' /></p> 
       <p className='zxzxx'>Deploy a low-code app on<br></br>
   Autopnocmus Database Using APEX </p>
   <p className='zxzxx dfsfs'>6-8mins</p>  
    </div>
    <div className='card_box'>
    
       <p><span>APPLICATION DEVELOPMENT</span><SwitcherOutlined className='ixcon' /></p> 
       <p className='zxzxx'>Deploy a low-code app on<br></br>
   Autopnocmus Database Using APEX </p>
   <p className='zxzxx dfsfs'>1-5mins</p>  
    </div><div className='card_box'>
       <p><span>APPLICATION DEVELOPMENT</span><TeamOutlined className='ixcon' /></p> 
       <p className='zxzxx'>Deploy a low-code app on<br></br>
   Autopnocmus Database Using APEX </p>
   <p className='zxzxx dfsfs'>3-5mins</p>  
    </div><div className='card_box'>
       <p><span>APPLICATION DEVELOPMENT</span><UnlockOutlined className='ixcon' /></p> 
   <p className='zxzxx'>Deploy a low-code app on<br></br>
   Autopnocmus Database Using APEX </p>
   <p className='zxzxx dfsfs'>3-6mins</p>  
    </div>
   </div>
   
  </Card>

  <Card
    title="Launch Resources"
    extra={ <Button>view My Deployments</Button>}
    bordered={false}
    style={{
      width: 660,
    }}
  >
   <div className='sdss'>

   <div className='card_box'>
       <p><span>APPLICATION DEVELOPMENT</span> <SettingOutlined className='ixcon' /></p> 
       <p className='zxzxx'>Deploy a low-code app on<br></br>
   Autopnocmus Database Using APEX </p> 
   <p className='zxzxx dfsfs'>3-5mins</p>   
    </div>
    <div className='card_box'>
       <p><span>APPLICATION DEVELOPMENT</span> <StarOutlined className='ixcon' /></p> 
       <p className='zxzxx'>Deploy a low-code app on<br></br>
   Autopnocmus Database Using APEX </p>
   <p className='zxzxx dfsfs'>4-6mins</p>  
    </div>
    <div className='card_box'>
       <p><span>APPLICATION DEVELOPMENT</span><TeamOutlined className='ixcon' /></p> 
       <p className='zxzxx'>Deploy a low-code app on<br></br>
   Autopnocmus Database Using APEX </p>
   <p className='zxzxx dfsfs'>6-8mins</p>  
    </div>
    <div className='card_box'>
    
       <p><span>APPLICATION DEVELOPMENT</span><SwitcherOutlined className='ixcon' /></p> 
       <p className='zxzxx'>Deploy a low-code app on<br></br>
   Autopnocmus Database Using APEX </p>
   <p className='zxzxx dfsfs'>1-5mins</p>  
    </div><div className='card_box'>
       <p><span>APPLICATION DEVELOPMENT</span><TeamOutlined className='ixcon' /></p> 
       <p className='zxzxx'>Deploy a low-code app on<br></br>
   Autopnocmus Database Using APEX </p>
   <p className='zxzxx dfsfs'>3-5mins</p>  
    </div><div className='card_box'>
       <p><span>APPLICATION DEVELOPMENT</span><UnlockOutlined className='ixcon' /></p> 
   <p className='zxzxx'>Deploy a low-code app on<br></br>
   Autopnocmus Database Using APEX </p>
   <p className='zxzxx dfsfs'>3-6mins</p>  
    </div>
   </div>
   
  </Card>
</div>
<div className='home_right'>
    <div>
        <div className='hgi_box'>
<div className='xinsd'>

<SmileOutlined />
</div>
<div><p className='vnn'>All systems operationnal</p>
<p className='vnn ccsdsdsds'>View health dashboard</p></div>

        </div>

    </div>
    <div>
        <div className='hgi_box'>
<div className='xinsd sasdzx'>

<TeamOutlined />
</div>
<div><p className='vnn'>All systems operationnal</p>
<p className='vnn ccsdsdsds'>View health dashboard</p></div>

        </div>

    </div>
  <div className='yuan_box'>
  <div className='yuan'></div>
  <div className='yuan yuana'></div>
  <div className='yuan yuana'></div>
  
  

  </div>
  <p className='lhjig'>Accont Center</p>
  <p className='lhjig lhjigs'> <TeamOutlined />User Management<br></br>
  <span className='sdsds'>Add ause to your tenancy</span>
  </p>
  <p className='lhjig lhjigcv'><WalletOutlined /> Cost Managenment</p>
  <p className='ssthjng'><div className='gren'></div>
   <span className='trefsx'>Implemented(0)</span><div className='yewo'></div>
   <span className='trefsx'>Pending(0)</span>
   </p>
   <div className='jin'></div>
   <p className='trefsx cla'>View const saving </p>

   <div className='tables'>

    <div className='tielehed'>Free OCI certification</div>
    <p className='tab_vc'>Take oci certifitiong exams for free through Feb 28,2022.</p>
   
  <div className='butt'>Get started</div> </div>
     </div>

        </div>
        
    }
}