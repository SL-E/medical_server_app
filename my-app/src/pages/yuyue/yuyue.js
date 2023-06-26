import React from "react";
import "./yuyue.css";
import { useState, useEffect } from "react";
import touxing from "../../images/touxing.webp";
import {Select, Space,Button, Modal, message } from "antd";

import { getSchedulingList, reservationDoctor, checkIsLogin } from '../../api';
import { userdata } from "../../store/user";
import { useNavigate } from 'react-router-dom';
const {Option} = Select;

export default function Yuyue() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [options, setOptions] = useState([]);

  let [optiont, setOptiont] = useState([
    // {
    //   value: 'disabled',
    //   label: 'Disabled',
    //   disabled: true,
    // },
  ]);
  let [optionf, setOptionf] = useState([
    // {
    //   value: 'disabled',
    //   label: 'Disabled',
    //   disabled: true,
    // },
  ]);
  let [optione, setOptione] = useState([
    // {
    //   value: 'disabled',
    //   label: 'Disabled',
    //   disabled: true,
    // },
  ]);

  const [chooseHospital, setChooseHospital] = useState();
  const [chooseDoctor, setChooseDoctor] = useState(); 
  const [chooseMonth, setChooseMonth] = useState();
  const [chooseDay, setChooseDay] = useState();

  // 这是选择医院后的医生资料
  let [doutr, setDoutr] = useState([]);
  // 这是选择医院后的医生日期后的数据
  let [doutrri, setDoutrri] = useState([]);
  // 这是选择月份后的数据
  let [doutrda, setDoutrda] = useState([]);
  // Morning的数据
  let [shangwu, setShangwu] = useState({haoma:[]});
  // Afternoon的数据
  let [xiawu, setXiawu] = useState({haoma:[]});
  // 筛选号
  const handleChangec = (value) => {
    setChooseDay(`No.${value}`);
    doutrri.time.forEach((item) => {
      if (item.day == value) {
        //  这是最后的数据
        setDoutrda((doutrda = item));
      }
    });
    doutrda.yuyue.forEach((item)=>{
      if(item.shangwu=='Morning'){
        setShangwu(shangwu=item)
      }
      if(item.shangwu=='Afternoon'){
        setXiawu(xiawu=item)
      }
    })

  };
  // 筛选月份
  const handleChangeM = (value) => {
    setChooseMonth(`Mouth:${value}`);
    if(`Mouth:${value}` !== chooseMonth){
      setChooseDay(undefined);
      setDoutrda([]);
      setShangwu({haoma:[]});
      setXiawu({haoma:[]});
    }
    doutr.yuyueriqi.forEach((item) => {
      if (item.date == value) {
        setDoutrri((doutrri = item));
      }
    });

    let num = [];
    doutrri.time.forEach((item) => {
      let arr = {};
      arr.value = item.day;
      arr.label = "No."+item.day ;
      num.push(arr);
    });
    setOptione((optione = num));
  };

  // 筛选医生
  const handleChanged = (value) => {
    setChooseDoctor(value);
    if(value !== chooseDoctor){
      setChooseMonth(undefined);
      setChooseDay(undefined);
      setDoutrda([]);
      setShangwu({haoma:[]});
      setXiawu({haoma:[]});
    }
    data.forEach((item) => {
      if (item.id == value) {
        setDoutr((doutr = item));
        console.log(doutr);
      }
    });
    let num = [];
    // 获取时间
    doutr.yuyueriqi.forEach((item) => {
      let arr = {};
      arr.value = item.date;
      arr.label = "Mouth:"+item.date;
      num.push(arr);
    });
    setOptionf((optionf = num));
    setChooseMonth(undefined);
    setChooseDay(undefined);
  };

  const handleOk = async () => {
    setIsModalOpen(false);
    const res = await reservationDoctor({
      account: userdata.userInfo.account,
      id: tanz.id,
      status: 2
    })
    message[res?.data?.success ? 'success' : 'error'](res?.data?.message)
    if(res.data.success){
      const res = await getSchedulingList();
      const data = res.data || [];
      setData(data)
      const doctorData = data.find((item) => item.hospital === chooseHospital && item.id === chooseDoctor);
      if(!doctorData){
        return;
      }
      setDoutr(doctorData);
      const matchMonth = chooseMonth.match(/\d+/);
      const month = parseInt(matchMonth[0]);
      const monthData = doctorData.yuyueriqi.find((item) => item.date == month);
      if(!monthData){
        return;
      }
      setDoutrri(monthData);
      const daysData = monthData.time || [];
      const matchDay = chooseDay.match(/\d+/);
      const day = parseInt(matchDay[0]);
      const dayData = daysData.find((item) => item.day == day);
      if(!dayData){
        return;
      }
      setDoutrda(daysData);
      dayData.yuyue.forEach((item)=>{
        if(item.shangwu=='Morning'){
          setShangwu(shangwu=item)
        }
        if(item.shangwu=='Afternoon'){
          setXiawu(xiawu=item)
        }
      }) 
    }
  };



  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleChange = (value) => {
    setChooseHospital(value);
    if(value !== chooseHospital){
      setChooseDoctor(undefined);
      setChooseMonth(undefined);
      setChooseDay(undefined);
      setDoutrda([]);
      setShangwu({haoma:[]});
      setXiawu({haoma:[]});
    }
    // 筛选医院
    let num = [];
    data.forEach((item) => {
      if (item.hospital == value) {
        let arr = {};
        arr.value = item.id;
        arr.label = item.doctors;
        num.push(arr);
      }
      setOptiont((optiont = num));
    });
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  let [tanz, setTanz] = useState({});
  const tan=(value,a)=>{
    setIsModalOpen(true);
    setTanz(tanz=value)
  }
  
  useEffect(() => {
    (async () =>{
      const res = await getSchedulingList();
      setData(res.data || [])
      const hospitalSet = new Set([]);
      for(let item of res.data){
        hospitalSet.add(item.hospital)
      }
      const options = Array.from(hospitalSet).map((item) => {
        return {
           label: item,
           value: item
        }
      })
      setOptions(options);
    })()
    return () =>{ }
  }, [])


  return (
    <div>
      <div className="main w">
        <div className="nav">
          <Select
            placeholder="Choose a hospital"
            style={{
              width: 200,
            }}
            onChange={handleChange}
            options={options}
            value={chooseHospital}
          />
          <Select
            placeholder="Choose a Doctor"
            style={{
              width: 200,
            }}
            onChange={handleChanged}
            options={optiont}
            value={chooseDoctor}
          />
          <Select
            placeholder="Choose a Month"
            style={{
              width: 200,
            }}
            onChange={handleChangeM}
            options={optionf}
            value={chooseMonth}
          />
          <Select
            placeholder="Choose a day"
            style={{
              width: 200,
            }}
            onChange={handleChangec}
            options={optione}
            value={chooseDay}
          />
        </div>
        <div className="banxin">
          {/* <div className="biaoti">
            <div className="wen">
              <div className="xiaoren"></div>
              <div className="zi">
                <h4>Wcsa daihdd hdabdui hdnaoih?</h4>
                <p>ahd uiahduh hadu iahgd di ahidai hdihawd ihisafs fgsaf</p>
              </div>
            </div>
            <div className="money">
              <div className="dada">
                <h4>dgdad</h4>
                <p>da aod da wdih daio</p>
              </div>
            </div>
          </div> */}
          <div className="lianxi">
            <div className="lafao">



    {doutr.length!==0? <div>
      <div className="user_fs">
                <div className="ueras_das">
                  <img src={doutr.head}></img>
                </div>
                <div className="ueras_xdas">
                  <p>{doutr.doctors}</p>
                  <p> Hello!</p>
                </div>
              </div>

              <p className="detail">Detail:</p>

              <p className="detail">{doutr.detail}</p>
 
</div>:<p className="select-tip">Please select the hospital, doctor and date for your appointment!</p>}

            
            </div>
            <div className="paixu">
              <div className="li">
                <ul>
                  <li>Morning </li>
                  <li></li>
                  <li> </li>
                  <li className="adflkm"> </li>
                  <li> Afternoon</li>
                  <li> </li>
                </ul>
              </div>
              <div className="shuzi">
                <ul>
                  <li>1    </li>
                  <li>2</li>
                  <li>3</li>
                  <li>4</li>
                  <li>5</li>
                  <li>6</li>
                  <li>7</li>
                  <li>8</li>
                  <li>9</li>
                  <li>10</li>
               
                </ul>
              </div> 


       
      <Modal title="have an appointment with a doctor" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <p className="dsdshiacv">Are you sure to make an appointment?</p>
      </Modal>


              <div className="dahezi">
              {shangwu.haoma.map(item => {
                 if(item.status==0){
                
                 return <li className="boxxx" key={item.paixu}>
             
               
                 </li>
                }

                if(item.status==1){
             
                  return <li onClick={()=>tan(item,2)} className="boxxx boxxx1" key={item.paixu}>
                 
               
                 </li>
                }
                if(item.status==2){
                  return <li className="boxxx boxxx2" key={item.paixu}>
                 Reserved
                 </li>
                }
              }
     
      )}
              </div>
          
              <div className="dazi">
              {xiawu.haoma.map(item => {
                 if(item.status==0){
                 return (<li className="boxxx" key={item.paixu}></li>)
                }

                if(item.status==1){
                  return (<li onClick={()=>tan(item)} className="boxxx boxxx1" key={item.paixu}></li>)
                }
                if(item.status==2){
                  return (<li className="boxxx boxxx2" key={item.paixu}>Reserved</li>)
                }
              }
     
      )}
                
              </div>
              <div className="xian"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
