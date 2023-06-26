import React from "react";
import "./Medicines.css";
import mei from '../../images/mei.webp'

import { PlusOutlined,MoreOutlined,
  HistoryOutlined, SearchOutlined,CloseOutlined,CompassOutlined,ContactsOutlined,
  PhoneOutlined,VideoCameraOutlined,SendOutlined,
  TeamOutlined,WalletOutlined,HddOutlined,SmileOutlined,PaperClipOutlined } from '@ant-design/icons';


import { Input, Form,Checkbox  } from 'antd';

const { TextArea } = Input;
export default class Medicines extends React.Component {



  
  render() {
    return (
      <div className="Medicines_boxs">
  <div className="Medicines_left">
<div className="liaotian"><span className="title">PiPer chat</span> 
<div className="liaotian_jia"><PlusOutlined /> </div>
 <span className="liaotian_duo"><MoreOutlined /></span>
 </div>
 <div className="liaotian_sou">
 <Input size="large" placeholder="large size" prefix={<SearchOutlined />} />
 
 </div>

 <div className="liaotian_icon">
 <span className="liaotian_gao"><HistoryOutlined /></span><TeamOutlined /><WalletOutlined /><HddOutlined />
 </div>

 <div className="liaotian_friend">
  <div className="friend_heard">
<img src={mei}></img>

  </div>

  <div className="liaotian_friendxin"><p className="friend_name">
  Richards Hendrics</p>
  
  <p className="friend_gexing">
    Sup my name is liuleilei</p>
    <div className="friend_wedu">2</div>
    </div>
    
 </div>
 <div className="liaotian_friend liaotian_tan">
  <div className="friend_heard">
<img src={mei}></img>

  </div>

  <div className="liaotian_friendxin"><p className="friend_name">
  Richards Hendrics</p>
  
  <p className="friend_gexing">
    Sup my name is liuleilei</p>
    <div className="friend_wedu">1</div>
    </div>
    
 </div>

 <div className="liaotian_friend">
  <div className="friend_heard">
<img src={mei}></img>

  </div>

  <div className="liaotian_friendxin"><p className="friend_name">
  Richards Hendrics</p>
  
  <p className="friend_gexing">
    Sup my name is liuleilei</p>
    <div className="friend_wedu">2</div>
    </div>
    
 </div>
 <div className="liaotian_friend">
  <div className="friend_heard">
<img src={mei}></img>

  </div>

  <div className="liaotian_friendxin"><p className="friend_name">
  Richards Hendrics</p>
  
  <p className="friend_gexing">
    Sup my name is liuleilei</p>
    <div className="friend_wedu">2</div>
    </div>
    
 </div>
  </div>
  <div className="Medicines_right">

    <div className="frend_left">

      <div className="luang_heard">
        <div className="luang_zhuantai"></div>
        <p>Erlich Bachman</p>
     <div className="luang_shipin"><PhoneOutlined /> </div>
     <div className="luang_shipin luang_tonghua"><VideoCameraOutlined /> </div>
      </div>

      <div className="liantiankkaung">

      <div className="liant_duifang">

        <div>
        <div className="duifang_heard">

<img src={mei}></img>

</div><p className="liao_time">11:00Am</p>
        </div>
    
      <div className="liao_neirong">HELLO
      HELLOHELLOHELLOHELLO
      HELLO
      </div>
      
      </div>

      <div className="liant_duifang lianliant_right">

<div>
<div className="duifang_heard">

<img src={mei}></img>

</div><p className="liao_time">11:00Am</p>
</div>

<div className="liao_neirong">HELLO
HELLOHELLOHELLOHELLO
HELLO
</div>

</div>
<div className="liant_duifang lianliant_right">

<div>
<div className="duifang_heard">

<img src={mei}></img>

</div><p className="liao_time">11:00Am</p>
</div>

<div className="liao_neirong">
最近怎么样?
</div>

</div>
      </div>

      <div className="liaotian_fa">
        <div className="liao_box">
        <div className="feiji"><SendOutlined /></div>
        <PaperClipOutlined /> <SmileOutlined />
        
        </div>
      <TextArea rows={4} placeholder="maxLength is 6" maxLength={6} />
      </div>
    </div>
    <div className="frend_right">
<p className="liao_tuichu"><CloseOutlined /></p>
      <div className="big_derder">
        <img src={mei}></img>
       
      </div>
      <div className="big_zhuangtai"></div>

      <p className="big_pax"> Erlich Bachman</p>
      <p className="big_xiang">Founder Avioto 
      “bachrnamnity”</p>
      <p className="big_ding"> <CompassOutlined /> San Fransciso </p>
      <p className="big_ding"> <ContactsOutlined /> San Fransciso </p>
      <p className="big_ding"> <CompassOutlined /> San Fransciso </p>
      <p className="Media"> Media</p>

      <div className="some_from">
        <div className="one_from">
          <img src={mei}></img>
        </div><div className="one_from">
          <img src={mei}></img>
        </div><div className="one_from">
          <img src={mei}></img>
        </div><div className="one_from">
          <img src={mei}></img>
        </div>
      </div>
    </div>
  </div>
      </div>
    );
  }
}
