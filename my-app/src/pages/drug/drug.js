import React from "react";
import "./drug.css";
import touxing from "../../images/touxing.webp";
import {Tabs, Input} from "antd";

import drug from "../../images/drug.png";
import {
  LeftOutlined,
  DoubleLeftOutlined,
  DoubleRightOutlined,
} from "@ant-design/icons";

import { getMedicineList } from '../../api/index'

export default class drugs extends React.Component {
  constructor(){
    super();
    this.state = {
      medicineList: [],
      pageNum: 1,
      pageSize: 18,
      total: 0
    }
  }

  componentDidMount(){
    this.getData()
  }

  async getData(options = {}) {
    const res = await getMedicineList({
      params: {
        pageNum: options.pageNum,
        pageSize: options.pageSize
      }
    });
    this.setState({
      medicineList: res.data.data,
      pageNum: res.data.pageNum,
      pageSize: res.data.pageSize,
      total: res.data.total
    })
  }

  onClickFirstPage = () => {
    this.getData({
      pageNum: 1,
      pageSize: this.state.pageSize
    })
  }

  onClickLastPage = () => {
    this.getData({
      pageNum: Math.max(1, Math.ceil(this.state.total/this.state.pageSize)),
      pageSize: this.state.pageSize
    })
  }

  onClickPrevPage = () => {
    if(this.state.pageNum === 1){
      return;
    }
    this.getData({
      pageNum: this.state.pageNum - 1,
      pageSize: this.state.pageSize
    })
  }

  onClickNextPage = () => {
    console.log(`output->Math.max(1, Math.ceil(this.state.total/this.state.pageSize))`,Math.max(1, Math.ceil(this.state.total/this.state.pageSize)))
    if(this.state.pageNum === Math.max(1, Math.ceil(this.state.total/this.state.pageSize))){
      return;
    }
    this.getData({
      pageNum: this.state.pageNum + 1,
      pageSize: this.state.pageSize
    })
  }

  render() {
    return (
      <div className="drug_boxs">

        <div className="drug_right">
          <div className="drug_fenye">
            <span onClick={this.onClickFirstPage}>
              <DoubleLeftOutlined />
              Frist
            </span>
            &nbsp;&nbsp;&nbsp;{" "}
            <span onClick={this.onClickPrevPage}>
              <LeftOutlined />
              Previous
            </span>
            &nbsp; &nbsp;&nbsp;&nbsp;
            <span>Page {this.state.pageNum} of {Math.max(1, Math.ceil(this.state.total/this.state.pageSize))}&nbsp; &nbsp;&nbsp;&nbsp;</span>
            <span onClick={this.onClickNextPage}>
              Next
              <DoubleRightOutlined />
            </span>
            &nbsp;&nbsp;&nbsp;
            <span onClick={this.onClickLastPage}>
              Last
              <DoubleRightOutlined />
            </span>
          </div>
          
          <div className="tdrug_ab">
            <div className="drug_one">Medicine Name</div>
            <div className="drug_one">Medicine Type</div>
            <div className="drue_tow">Medicine Usage</div>
            <div className="drug_one">Medicine Treats</div>  
          </div>

           {
            this.state.medicineList.map((item) => {
              return (
                <div className="tdrug_ab tdrug_abt" key={item.id}>
                  <div className="drug_one">{item.name}</div>
                  <div className="drug_one">{item.type}</div>
                  <div className="drue_tow">{item.usage}</div>
                  <div className="drug_one">{item.treats}</div>
                </div>
              )
            })
           }
        </div>
      </div>
    );
  }
}
