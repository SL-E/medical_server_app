import React from "react";
import "./Pharmacies.css";
import touone from '../../images/touone.webp'
import { MailOutlined, SettingOutlined,AppstoreOutlined} from '@ant-design/icons';
import { Menu } from 'antd';
import dutu from '../../images/18.png'
import dian from '../../images/19.png'
import zu from '../../images/20.png'
const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  const items = [
    getItem('Navigation One', 'sub1', <MailOutlined />, [
      getItem('Item 1', null, null, [getItem('Option 1', '1'), getItem('Option 2', '2')], 'group'),
      getItem('Item 2', null, null, [getItem('Option 3', '3'), getItem('Option 4', '4')], 'group'),
    ]),
    getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
      getItem('Option 5', '5'),
      getItem('Option 6', '6'),
      getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
    ]),
    getItem('Navigation Three', 'sub4', <SettingOutlined />, [
      getItem('Option 9', '9'),
      getItem('Option 10', '10'),
      getItem('Option 11', '11'),
      getItem('Option 12', '12'),
    ]),
    getItem('Navigation Three', 'sub4', <SettingOutlined />, [
        getItem('Option 9', '9'),
        getItem('Option 10', '10'),
        getItem('Option 11', '11'),
        getItem('Option 12', '12'),
      ]),
  ];
  const onClick = (e) => {
    console.log('click', e);
  };
export default class Pharmacies extends React.Component {
  render() {
    return (
      <div className="hos_boxs">
    <div className="dos_ssc">

    <Menu
    onClick={onClick}
    style={{
      width: 256,
    }}
    mode="vertical"
    items={items}
  />

       
    </div>
    <div className="dos_ssc">

        <img src={dutu}></img>
    </div>
    <div className="dos_ssc">

        <img src={dian}></img>
    </div>
    <div className="dos_ssc">

        <img src={zu}></img>
    </div>
      </div>
    );
  }
}
