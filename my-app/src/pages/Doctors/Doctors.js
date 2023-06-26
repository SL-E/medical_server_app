import React from "react";
import "./Doctors.css";
import touone from '../../images/touone.webp'
import { Select, Space } from 'antd';
import {

  SearchOutlined
} from "@ant-design/icons";
import { Button, Tooltip } from 'antd';
import { getDoctorList } from '../../api/index'

const { Option } = Select;export default class Doctors extends React.Component {
  constructor(){
    super();
    this.state = {
      citys: [],
      hospitals: [],
      category: [],
      doctors: [],
      selectedCity: [],
      selectedHospital: [],
      selectedCategory: []
    }
  }


  async componentDidMount(){
    this.requestData();
  }

  handleChangeCity = (value) => {
    this.setState({
      selectedCity: value
    })
  };

  handleChangeHospital = (value) => {
    this.setState({
      selectedHospital: value
    })
  };

  handleChangeCategory = (value) => {
    this.setState({
      selectedCategory: value
    })
  };

  onSearch = async () => {
    this.requestData()
  }

  requestData = async () => {
    const res = await getDoctorList({
      params: {
        selectedCity:  this.state.selectedCity,
        selectedHospital:  this.state.selectedHospital,
        selectedCategory:  this.state.selectedCategory
      }
    });
    const { citys = [], hospitals = [], category = [], doctors = [] } =  res.data.data;
    this.setState({
      citys,
      hospitals,
      category,
      doctors
    })
  }


  render() {
    return (
      <div className="doctors_boxs">
      <div className="doctors_asasa">

      <div className="doctors_selcet">
      <Select
        mode="multiple"
        style={{
          width: '100%',
        }}
        placeholder="select one city"
        onChange={this.handleChangeCity}
        optionLabelProp="label"
        allowClear
    >{
      this.state.citys.map((item) => {
         return (
          <Option value={item} label={item} key={item}>
          <Space>
            <span role="img" aria-label={item}>

            </span>
            {item} 
          </Space>
        </Option>
         )
      })
    }
    </Select>

        </div>
        <div className="doctors_selcet">
        <Select
    mode="multiple"
    style={{
      width: '100%',
    }}
    placeholder="select one hospital"
    onChange={this.handleChangeHospital}
    optionLabelProp="label"
    allowClear
  >
    {
      this.state.hospitals.map((item)=>{ 
        return (
          <Option value={item} label={item} key={item}>
          <Space>
            <span role="img" aria-label={item}>
              
            </span>
            {item}
          </Space>
        </Option>
        )
      })
    }
  </Select>

        </div> 
        <div className="doctors_selcet">
        <Select
    mode="multiple"
    style={{
      width: '100%',
    }}
    placeholder="select one category"
    onChange={this.handleChangeCategory}
    optionLabelProp="label"
    allowClear
  >
    {
      this.state.category.map((item)=> {
        return (
          <Option value={item} label={item} key={item}>
          <Space>
            <span role="img" aria-label={item}>
              
            </span>
            {item} 
          </Space>
        </Option>
        )
      })
    }
  </Select>

        </div>
        <div>
        <Button  className="searchBtn" type="primary" icon={<SearchOutlined />} onClick={this.onSearch}>
        Search
      </Button>
        </div>
      </div>
        <div className="doctors_title">
        All doctors
        </div>

        <div className="doctors_xbox">
          {
            this.state.doctors.map((item) => {
              return (
                <div className="doctors_doctors" key={item.id}>
                  <div className="doctors_xheard">
                      <img src={item.head}></img>
                  </div>
                  <div className="doctors_xright">
                      <p className="title">{item.name} </p>
                      <p className="titletw">Gender: {item.gender}</p>
                      <p className="titletw">Age: {item.age}</p>
                      <p className="titletw">Specialty: {item.specialty}</p>
                      <p className="titletw"> {item.detail}</p>
                      <p className="dsds">Profile</p>
                  </div>
              </div>
              )
            })
          }
        </div>
      </div>
    );
  }
}
