import React, { useEffect, useState, useRef } from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import LetterAvatar from 'react-letter-avatar';
import { userdata } from '../../store/user'
import { getOnlineUser, getWs, getMsgList, sendMsgToUser, readMsg } from '../../api/index'
import './Communacation.css'


export default function Communacation() {
    const [msg, setMsg] = useState('');
    const [toUser, setToUser] = useState('')
    const [toUserIsOnline, setToUserIsOnline] = useState(false)
    const [chatList, setChatList] = useState([])
    const [msgList, setMsgList] = useState([])
    const [tabIdx, setTabIdx] = useState(0)
    const scrollContainer = useRef(null)


    const onChatWith = async (target, isOnline = false, isClearUnRead = false) => {
        setToUser(target);
        setToUserIsOnline(isOnline);
        const res = await getMsgList({
            params: {
                from: userdata.userInfo.account,
                to : target,
            }
        })
        const list = res.data.data || [];
        setMsgList(list)
        setTimeout(() => {
            scrollContainer.current.scrollTop = scrollContainer.current.scrollHeight
        }, 50)
        if(isClearUnRead) { 
            const res2 = await readMsg({
                    from: userdata.userInfo.account,
                    to : target,
            })

            const res3 =  await getOnlineUser({ params: { account: userdata.userInfo.account } })
            let list = res3?.data?.data || [];
            if(tabIdx === 0) {
                const now = Date.now();
                list = list.filter((item) => Number(item.lastChatTime) - now < 1000 * 3600 * 24)
            }
            setChatList(list)
        }
    }

    useEffect(() => {
        (async () => {
           const res =  await getOnlineUser({ params: { account: userdata.userInfo.account } })
           let list = res?.data?.data || [];
           if(tabIdx === 0) {
               const now = Date.now();
               list = list.filter((item) => Number(item.lastChatTime) - now < 1000 * 3600 * 24)
           }
           setChatList(list)
           onChatWith(list?.[0]?.name || '', list?.[0]?.isOnline || false, true)
        })()
    }, [])

    useEffect(() => {
        const ws = getWs();
        if(!ws){
            return;
        }

        const onMessage = async (event) => {
            const data = JSON.parse(event.data);
            if(data.onlineUser){
                let onlineUser = data.onlineUser;
                if(tabIdx === 0) {
                    const now = Date.now();
                    onlineUser = onlineUser.filter((item) => Number(item.lastChatTime) - now < 1000 * 3600 * 24)
                }
                setChatList(onlineUser || [])
                const findRes = (onlineUser || []).find((item) => item.name === toUser)
                if(findRes){
                    setToUserIsOnline(findRes.isOnline)
                }else{
                    setToUserIsOnline(findRes[0]?.isOnline)
                }
            }
            if(data.list) {
                setMsgList(data.list || [])
                setTimeout(() => {
                    scrollContainer.current.scrollTop = scrollContainer.current.scrollHeight
                }, 50)
            }

            if(data.fetchNewOnlineUsers){
                const res =  await getOnlineUser({ params: { account: userdata.userInfo.account } })
                let list = res?.data?.data || [];
                if(tabIdx === 0) {
                    const now = Date.now();
                    list = list.filter((item) => Number(item.lastChatTime) - now < 1000 * 3600 * 24)
                }
                setChatList(list)
            }
          };
        ws.onmessage = onMessage
    }, [toUser])

    function throttle(fn, delay) {
        let timer;
        return function (...args) {
          if (!timer) {
            timer = setTimeout(() => {
              fn.apply(this, args);
              timer = null;
            }, delay);
          }
        }
      }

      

    const sendMsg = async () => {
        const res = await sendMsgToUser({
            content: msg,
            from: userdata.userInfo.account,
            to : toUser,
            time: String(Date.now()),
        })
        setMsg('')
        await onChatWith(toUser, toUserIsOnline)
    }
    
    const changeMsg = (event) => {
        setMsg(event.target.value)
    }

    const handleKeyDown = (event) => {
        if (event.keyCode === 13) {
          sendMsg()
        }
    };

    const onClickTab = (target) => {
        setTabIdx(target)
        switch(target){
            case 0:
            case 1: {
                (async () => {
                    const res =  await getOnlineUser({ params: { account: userdata.userInfo.account } })
                    let list = res?.data?.data || [];
                    if(target === 0) {
                        const now = Date.now();
                        list = list.filter((item) => Number(item.lastChatTime) - now < 1000 * 3600 * 24)
                    }
                    setChatList(list)
                    onChatWith(list?.[0]?.name || '', list?.[0]?.isOnline || false, list?.[0].unReadMsg > 0)
                 })()
            }
            case 2:
            case 3: {
                setChatList([]);
            }
        }
    }

    const onSearchUser = throttle(async function (event) {
        const val = event.target.value;
        const res =  await getOnlineUser({ params: { account: userdata.userInfo.account } })
        let list = res?.data?.data || [];
        if(tabIdx === 0) {
            const now = Date.now();
            list = list.filter((item) => Number(item.lastChatTime) - now < 1000 * 3600 * 24)
        }
        const filterChatList = list.filter((item) => { 
            return new RegExp(val).test(item.name)
        })
        setChatList(filterChatList)
    }, 200)



    return (
        <div className='communacation-box'>
            <div className='user-list-box'>
                <div className='communacation-title'>
                    <span>Piper</span>
                    <span>Chat</span>
                    <div>
                        <svg t="1686016030925" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2386" width="32" height="32"><path d="M514.048 62.464q93.184 0 175.616 35.328t143.872 96.768 96.768 143.872 35.328 175.616q0 94.208-35.328 176.128t-96.768 143.36-143.872 96.768-175.616 35.328q-94.208 0-176.64-35.328t-143.872-96.768-96.768-143.36-35.328-176.128q0-93.184 35.328-175.616t96.768-143.872 143.872-96.768 176.64-35.328zM772.096 576.512q26.624 0 45.056-18.944t18.432-45.568-18.432-45.056-45.056-18.432l-192.512 0 0-192.512q0-26.624-18.944-45.568t-45.568-18.944-45.056 18.944-18.432 45.568l0 192.512-192.512 0q-26.624 0-45.056 18.432t-18.432 45.056 18.432 45.568 45.056 18.944l192.512 0 0 191.488q0 26.624 18.432 45.568t45.056 18.944 45.568-18.944 18.944-45.568l0-191.488 192.512 0z" p-id="2387" fill="#ffffff"></path></svg>
                        <div style={{ width: '20px' }}></div>
                        <svg t="1686016409242" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3656" width="32" height="32"><path d="M415.930119 223.790358c0-52.980346 43.003528-95.983874 95.983874-95.983874s95.983874 43.003528 95.983874 95.983874-43.003528 95.983874-95.983874 95.983874S415.930119 276.770704 415.930119 223.790358z" fill="#ffffff" p-id="3657"></path><path d="M415.930119 511.741979c0-52.980346 43.003528-95.983874 95.983874-95.983874s95.983874 43.003528 95.983874 95.983874-43.003528 95.983874-95.983874 95.983874S415.930119 564.722325 415.930119 511.741979z" fill="#ffffff" p-id="3658"></path><path d="M415.930119 799.865614c0-52.980346 43.003528-95.983874 95.983874-95.983874s95.983874 43.003528 95.983874 95.983874-43.003528 95.983874-95.983874 95.983874S415.930119 852.673946 415.930119 799.865614z" fill="#ffffff" p-id="3659"></path></svg>
                    </div>
                </div>
                <div className='communacation-search-box'>
                    <Input 
                       className='communacation-search' 
                       prefix={<SearchOutlined />} 
                       placeholder='Search User Here'
                       onChange={onSearchUser}
                    ></Input>
                </div>
                <div className='communacation-tab-box'>
                    <div className={tabIdx === 0 ? 'communacation-tab-ative' : ''} onClick={() => onClickTab(0)}>
                        <svg t="1686017722298" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4473" width="32" height="32"><path d="M237.348571 123.611429l-7.094857 8.996571c3.072-10.971429 5.339429-19.602286 6.875429-26.112l6.875428-29.257143c7.021714-21.211429 2.486857-33.865143-18.651428-40.96-15.945143-2.706286-29.988571-0.365714-37.010286 13.750857l-33.792 142.482286c-4.681143 16.822857-6.290286 29.403429 14.848 36.498286l132.461714 33.645714c21.211429 7.021714 36.352-1.901714 42.422858-19.456 5.924571-17.627429-7.021714-34.962286-22.820572-38.180571l-56.100571-14.482286c5.193143-3.730286 4.827429-5.997714 12.214857-11.849143 83.968-65.828571 156.672-101.522286 248.32-101.522286 211.382857 0 396.8 190.317714 396.8 401.700572 0 211.456-185.417143 398.116571-396.8 398.116571-211.382857 0-396.8-186.660571-396.8-398.116571 0-21.138286-13.897143-38.034286-35.108572-38.034286-21.138286 0-34.011429 16.896-34.011428 38.034286 0 253.805714 212.187429 467.821714 465.92 467.821714 253.659429 0 467.675429-214.674286 467.675428-468.406857S790.966857 11.264 526.774857 11.264a437.540571 437.540571 0 0 0-289.426286 112.274286zM470.308571 329.216v222.427429c0 21.211429 14.116571 35.254857 35.254858 35.254857h160.036571c21.211429 0 34.377143-14.116571 34.377143-35.254857s-13.165714-31.012571-34.377143-31.012572H539.062857V329.289143c0-21.138286-11.995429-35.620571-33.206857-35.620572-21.138286 0-35.474286 14.482286-35.474286 35.620572z" fill="#ffffff" p-id="4474"></path></svg>
                    </div>
                    <div className={tabIdx === 1 ? 'communacation-tab-ative' : ''} onClick={() => onClickTab(1)}>
                      <svg t="1686017749888" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5502" width="32" height="32"><path d="M463.659089 647.857426q-2.027723 11.152475-5.069307 17.235644t-14.194059 13.180198q-26.360396 16.221782-56.776238 26.360396t-58.29703 22.30495-48.665347 31.936634-25.853465 56.269307q-2.027723 11.152475-2.534653 21.79802t-1.520792 19.770297q-1.013861 2.027723-2.027723 3.548515t-2.027723 3.548515q-39.540594-3.041584-80.09505-7.09703t-74.518812-9.124752-57.283168-10.138614-29.40198-10.138614q-9.124752-7.09703-13.687129-42.582178t3.548515-92.261386q5.069307-31.429703 25.853465-48.158416t49.172277-26.360396 58.29703-17.742574 53.227723-22.30495q18.249505-12.166337 27.881188-22.30495t13.687129-20.784158 4.055446-21.79802-1.013861-24.332673q-2.027723-20.277228-13.687129-31.936634t-25.853465-23.825743q-8.110891-5.069307-13.687129-16.221782t-9.631683-22.30495q-4.055446-12.166337-8.110891-27.374257-6.083168-2.027723-12.166337-6.083168-5.069307-4.055446-10.645545-12.166337t-10.645545-22.30495-4.055446-26.867327 5.069307-21.79802q4.055446-11.152475 11.152475-18.249505-1.013861-32.443564 3.041584-65.90099 4.055446-27.374257 13.180198-58.80396t27.374257-56.776238q16.221782-24.332673 36.49901-39.540594t41.061386-23.825743 42.075248-11.659406 41.568317-3.041584q50.693069 0 91.247525 21.291089t60.831683 45.623762q13.180198 17.235644 16.728713 31.936634t9.631683 33.964356q-19.263366 11.152475-41.061386 32.950495t-38.019802 44.10297q-20.277228 28.388119-30.415842 62.859406t-15.207921 63.873267q-5.069307 35.485149-5.069307 70.970297-8.110891 9.124752-12.166337 20.277228-4.055446 10.138614-5.069307 23.825743t4.055446 29.908911q5.069307 17.235644 11.152475 26.360396t11.152475 14.194059q6.083168 6.083168 12.166337 8.110891 4.055446 16.221782 8.110891 30.415842 4.055446 12.166337 9.631683 24.839604t13.687129 18.756436q7.09703 6.083168 11.152475 10.138614t6.590099 7.60396 3.041584 9.631683 2.534653 16.221782zM1004.047208 834.407921q4.055446 14.194059 6.590099 34.471287t2.534653 41.061386-3.041584 39.033663-9.124752 27.374257q-4.055446 6.083168-23.825743 12.166337t-49.172277 11.152475-64.887129 9.631683-71.477228 7.60396-69.449505 5.069307-58.80396 2.027723-58.29703-2.027723-68.435644-5.069307-69.956436-6.590099-63.366337-8.110891-48.665347-9.124752-24.839604-8.617822q-8.110891-7.09703-13.180198-42.582178t3.041584-91.247525q5.069307-32.443564 25.853465-48.665347t49.172277-26.360396 58.29703-17.742574 53.227723-22.811881q18.249505-12.166337 27.881188-22.30495t14.194059-20.277228 4.562376-21.291089-1.013861-25.346535q-2.027723-20.277228-14.194059-31.936634t-26.360396-22.811881q-7.09703-6.083168-12.673267-17.235644t-9.631683-22.30495q-4.055446-12.166337-8.110891-27.374257-6.083168-2.027723-12.166337-6.083168-5.069307-4.055446-10.645545-12.166337t-10.645545-22.30495-4.055446-26.867327 5.069307-20.784158q4.055446-10.138614 11.152475-18.249505-1.013861-32.443564 3.041584-65.90099 4.055446-28.388119 12.673267-59.310891t26.867327-57.283168q16.221782-24.332673 36.49901-39.540594t41.568317-23.825743 42.582178-11.659406 40.554455-3.041584q51.706931 0 92.261386 21.291089t59.817822 45.623762q22.30495 27.374257 32.950495 61.338614t15.714851 63.366337q5.069307 34.471287 4.055446 68.942574 5.069307 4.055446 9.124752 11.152475 3.041584 6.083168 5.576238 15.714851t0.506931 23.825743q-2.027723 18.249505-8.110891 29.40198t-12.166337 17.235644q-7.09703 7.09703-16.221782 9.124752-4.055446 15.207921-8.110891 27.374257-4.055446 11.152475-10.138614 22.30495t-13.180198 16.221782q-8.110891 7.09703-14.70099 12.166337t-11.659406 10.645545-8.617822 12.673267-5.576238 17.235644q-2.027723 13.180198-1.520792 26.867327t6.590099 26.867327 19.770297 25.346535 38.019802 21.291089q21.291089 9.124752 47.144554 15.714851t49.679208 15.714851 42.582178 23.318812 26.867327 36.49901z" p-id="5503" fill="#ffffff"></path></svg> 
                    </div>
                    <div className={tabIdx === 2 ? 'communacation-tab-ative' : ''} onClick={() => onClickTab(2)}> 
                        <svg t="1686017814559" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6806" width="36" height="36"><path d="M185.6 416l76.8 0 0 192-76.8 0 0-192Z" p-id="6807" fill="#ffffff"></path><path d="M736 128 185.6 128l0 160 76.8 0L262.4 192l422.4 0c70.4 0 128 44.8 128 102.4l0 435.2c0 57.6-57.6 102.4-128 102.4L268.8 832l0-96L185.6 736 185.6 896l550.4 0c89.6 0 153.6-57.6 153.6-128L889.6 256C889.6 185.6 825.6 128 736 128z" p-id="6808" fill="#ffffff"></path><path d="M179.2 396.8l96 0c25.6 0 51.2-19.2 51.2-51.2 0-25.6-19.2-51.2-51.2-51.2L179.2 294.4c-25.6 0-44.8 19.2-44.8 51.2C134.4 377.6 153.6 396.8 179.2 396.8z" p-id="6809" fill="#ffffff"></path><path d="M326.4 672c0-25.6-19.2-51.2-51.2-51.2L179.2 620.8c-25.6 0-44.8 19.2-44.8 51.2 0 25.6 19.2 51.2 44.8 51.2l96 0C300.8 723.2 326.4 697.6 326.4 672z" p-id="6810" fill="#ffffff"></path><path d="M537.6 371.2m-96 0a1.5 1.5 0 1 0 192 0 1.5 1.5 0 1 0-192 0Z" p-id="6811" fill="#ffffff"></path><path d="M409.6 595.2l0 128 256 0 0-128c0-70.4-57.6-128-128-128S409.6 524.8 409.6 595.2z" p-id="6812" fill="#ffffff"></path></svg>
                    </div>
                    <div className={tabIdx === 3 ? 'communacation-tab-ative' : ''} onClick={() => onClickTab(3)}>
                        <svg t="1686017911512" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8387" width="32" height="32"><path d="M148.48 186.368q18.432-22.528 36.864-41.984 14.336-17.408 30.208-32.768t24.064-22.528q11.264-9.216 24.064-16.384t34.304-7.168l442.368 0q13.312 0 30.72 5.632t33.792 23.04q8.192 10.24 21.504 25.6t25.6 29.696q14.336 17.408 28.672 36.864l-732.16 0zM979.968 492.544q0 32.768-21.504 55.296t-61.44 22.528l-756.736 0q-38.912 0-61.952-22.528t-23.04-55.296l0-146.432q0-32.768 20.48-56.32t66.56-23.552l753.664 0q47.104 0 65.536 23.552t18.432 56.32l0 146.432zM593.92 418.816q0-13.312-6.656-18.944t-17.92-5.632l-103.424 0q-11.264 0-18.432 7.168t-7.168 17.408q1.024 13.312 7.68 19.456t17.92 6.144l103.424 0q23.552 0 24.576-25.6zM976.896 863.232q0 32.768-25.088 56.32t-64 22.528l-750.592 0q-32.768 0-58.88-23.04t-26.112-64l0-137.216q0-33.792 20.992-56.832t67.072-23.04l751.616 0q43.008 0 64 23.04t20.992 55.808l0 146.432zM590.848 790.528q0-10.24-6.656-17.408t-17.92-7.168l-103.424 0q-11.264 0-18.432 7.168t-7.168 17.408 7.168 17.408 18.432 7.168l103.424 0q11.264 0 17.92-7.168t6.656-17.408z" p-id="8388" fill="#ffffff"></path></svg>
                    </div>
                </div>
                <div className='communacation-user-list-box'>
                    {
                        chatList.map((item) => {
                            return (
                                <div key={item.name} onClick={() => onChatWith(item.name, item.isOnline, item.unReadMsg > 0)} style={{ background: toUser === item.name ? '#11cc9a' : 'transparent' }}>
                                    <div className={item.isOnline ? 'communacation-user-online' : 'communacation-user-offline' }></div>
                                    <LetterAvatar
                                        name={item.name}
                                        size={60}
                                        radius={50}
                                        color="#f3f3f3"
                                        fontSize={20}
                                    />
                                    <div>
                                        <span>{item.name}</span>
                                        <p>{item.lastMsg}</p>
                                    </div>
                                    {item.unReadMsg && item.unReadMsg > 0 ? (<div className='communacation-user-unread'>{item.unReadMsg}</div>) : null}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className='communacation-list-box'>
                <div className='communacation-list-header'>
                    <div className={ toUserIsOnline ? 'communacation-user-online-chat' : 'communacation-user-off-chat' }></div>
                    <div className='communacation-user-name'>{toUser}</div>
                    <div className='communacation-user-media'>
                        <div>
                            <svg t="1686027978266" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="13689" width="32" height="32"><path d="M742.218667 526.666667c107.637333 0 194.848 87.573333 194.848 195.552V725.333333c0 103.168-93.578667 190.4-190.4 190.4h-45.44a30.4 30.4 0 0 1-2.517334-0.106666c-153.898667-12.778667-312.266667-80.128-411.914666-173.888C169.184 631.082667 86.933333 461.44 86.933333 303.818667c0-113.802667 84.405333-195.552 194.848-195.552 107.626667 0 194.837333 87.573333 194.837334 195.552 0 76.032-44.181333 138.773333-111.701334 169.12a507.658667 507.658667 0 0 0 81.6 100.266666c36.288 34.453333 76.544 62.336 118.752 81.813334 26.304-76.170667 94.186667-128.352 176.96-128.352z" fill="#ffffff" p-id="13690"></path></svg>
                        </div>
                        <div>
                             <svg t="1686027946291" class="icon" viewBox="0 0 1087 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12616" width="32" height="32"><path d="M768 415.744q0 5.12-10.752 17.92t-23.04 30.208-23.04 37.888-10.752 41.984 10.752 41.472 23.04 36.352 23.04 27.136 10.752 13.824l0 107.52q0 17.408-12.8 39.424t-31.744 41.472-41.984 32.256-43.52 12.8l-508.928 0q-27.648 0-50.688-9.728t-40.448-27.136-27.136-40.96-9.728-51.2l0-441.344q0-20.48 9.216-42.496t26.112-40.448 39.936-30.72 50.688-12.288l508.928 0q27.648 0 51.712 9.728t41.984 26.624 28.16 40.448 10.24 50.176l0 89.088zM1086.464 319.488l0 467.968q0 22.528-11.776 39.936t-35.328 17.408q-8.192 0-20.992-6.144t-25.6-14.336-24.064-16.384-16.384-13.312q-13.312-11.264-40.448-38.912t-54.784-62.464-48.64-71.68-20.992-67.584 22.528-70.144 54.272-77.312 66.56-70.144 58.368-48.64q9.216-6.144 25.088-14.848t28.16-8.704q27.648 0 35.84 15.36t8.192 37.888l0 2.048z" p-id="12617" fill="#ffffff"></path></svg>
                        </div>
                    </div>
                </div>
                <div className='communacation-list-body' ref={scrollContainer}>
                    {
                        msgList.map((item) => {
                            const isMe = userdata.userInfo.account && item.name === userdata.userInfo.account;
                            return (
                                <div className={ isMe? 'communacation-content communacation-content-me' : 'communacation-content'} key={item.id}>
                                    <div>
                                        <LetterAvatar
                                            name={isMe ? 'Me' : item.name}
                                            size={60}
                                            radius={50}
                                            color="#f3f3f3"
                                            fontSize={20}
                                        />
                                        <span>{isMe ? 'Me' : item.name}</span>
                                    </div>
                                    <div>
                                        {item.text}
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className='communacation-list-footer'>
                    <Input 
                        value={msg}
                        onChange={changeMsg}
                        className='communacation-user-send'
                        placeholder='Type Your Message Here'
                        onKeyDown={handleKeyDown}
                    ></Input>
                    <div>
                    <svg t="1686029284395" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="15884" width="32" height="32"><path d="M517.632 954.0096c-244.3776 0-443.2384-198.8096-443.2384-443.2384S273.2544 67.584 517.632 67.584s443.2384 198.8096 443.2384 443.2384c0 65.28-13.8752 128.1536-41.216 186.88-7.168 15.36-25.4464 22.0672-40.8064 14.8992-15.36-7.168-22.0672-25.4464-14.8992-40.8064 23.552-50.5856 35.4816-104.704 35.4816-160.9728 0-210.5344-171.264-381.7984-381.7984-381.7984S135.8336 300.288 135.8336 510.8224s171.264 381.7984 381.7984 381.7984c80.9984 0 158.3104-25.0368 223.6928-72.3456 13.7216-9.984 32.9216-6.8608 42.9056 6.8608a30.76096 30.76096 0 0 1-6.8608 42.9056c-75.9296 54.9376-165.7344 83.968-259.7376 83.968z" fill="#707070" p-id="15885"></path><path d="M726.9888 587.3664c-14.9504-7.9872-33.5872-2.304-41.5744 12.6464a189.81376 189.81376 0 0 1-167.7824 100.7616c-72.5504 0-137.728-40.3456-170.1376-105.3184-7.5776-15.1552-26.0096-21.3504-41.216-13.7728s-21.3504 26.0096-13.7728 41.216c42.8544 85.9648 129.1264 139.3152 225.1264 139.3152 93.0816 0 178.1248-51.0464 222.0032-133.2736 7.9872-14.9504 2.304-33.5872-12.6464-41.5744z" fill="#707070" p-id="15886"></path><path d="M378.5216 364.6976m-47.0528 0a47.0528 47.0528 0 1 0 94.1056 0 47.0528 47.0528 0 1 0-94.1056 0Z" fill="#707070" p-id="15887"></path><path d="M654.0288 364.6976m-47.0528 0a47.0528 47.0528 0 1 0 94.1056 0 47.0528 47.0528 0 1 0-94.1056 0Z" fill="#707070" p-id="15888"></path></svg>
                    </div>
                    <div>
                     <svg t="1686029250647" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="15280" width="32" height="32"><path d="M607.934444 417.856853c-6.179746-6.1777-12.766768-11.746532-19.554358-16.910135l-0.01228 0.011256c-6.986111-6.719028-16.47216-10.857279-26.930349-10.857279-21.464871 0-38.864146 17.400299-38.864146 38.864146 0 9.497305 3.411703 18.196431 9.071609 24.947182l-0.001023 0c0.001023 0.001023 0.00307 0.00307 0.005117 0.004093 2.718925 3.242857 5.953595 6.03853 9.585309 8.251941 3.664459 3.021823 7.261381 5.997598 10.624988 9.361205l3.203972 3.204995c40.279379 40.229237 28.254507 109.539812-12.024871 149.820214L371.157763 796.383956c-40.278355 40.229237-105.761766 40.229237-146.042167 0l-3.229554-3.231601c-40.281425-40.278355-40.281425-105.809861 0-145.991002l75.93546-75.909877c9.742898-7.733125 15.997346-19.668968 15.997346-33.072233 0-23.312962-18.898419-42.211381-42.211381-42.211381-8.797363 0-16.963347 2.693342-23.725354 7.297197-0.021489-0.045025-0.044002-0.088004-0.066515-0.134053l-0.809435 0.757247c-2.989077 2.148943-5.691629 4.669346-8.025791 7.510044l-78.913281 73.841775c-74.178443 74.229608-74.178443 195.632609 0 269.758863l3.203972 3.202948c74.178443 74.127278 195.529255 74.127278 269.707698 0l171.829484-171.880649c74.076112-74.17435 80.357166-191.184297 6.282077-265.311575L607.934444 417.856853z" fill="#707070" p-id="15281"></path><path d="M855.61957 165.804257l-3.203972-3.203972c-74.17742-74.178443-195.528232-74.178443-269.706675 0L410.87944 334.479911c-74.178443 74.178443-78.263481 181.296089-4.085038 255.522628l3.152806 3.104711c3.368724 3.367701 6.865361 6.54302 10.434653 9.588379 2.583848 2.885723 5.618974 5.355985 8.992815 7.309476 0.025583 0.020466 0.052189 0.041956 0.077771 0.062422l0.011256-0.010233c5.377474 3.092431 11.608386 4.870938 18.257829 4.870938 20.263509 0 36.68962-16.428158 36.68962-36.68962 0-5.719258-1.309832-11.132548-3.645017-15.95846l0 0c-4.850471-10.891048-13.930267-17.521049-20.210297-23.802102l-3.15383-3.102664c-40.278355-40.278355-24.982998-98.79612 15.295358-139.074476l171.930791-171.830507c40.179095-40.280402 105.685018-40.280402 145.965419 0l3.206018 3.152806c40.279379 40.281425 40.279379 105.838513 0 146.06775l-75.686796 75.737962c-10.296507 7.628748-16.97358 19.865443-16.97358 33.662681 0 23.12365 18.745946 41.87062 41.87062 41.87062 8.048303 0 15.563464-2.275833 21.944801-6.211469 0.048095 0.081864 0.093121 0.157589 0.141216 0.240477l1.173732-1.083681c3.616364-2.421142 6.828522-5.393847 9.529027-8.792247l79.766718-73.603345C929.798013 361.334535 929.798013 239.981676 855.61957 165.804257z" fill="#707070" p-id="15282"></path></svg>
                    </div>
                    <div onClick={sendMsg}>
                    <svg t="1686029324323" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="16997" width="48" height="48"><path d="M510.3616 90.4704c-232.0896 0-420.864 188.8256-420.864 420.864 0 232.0896 188.8256 420.864 420.864 420.864s420.864-188.8256 420.864-420.864-188.7744-420.864-420.864-420.864z m0 800.8192c-209.5104 0-379.904-170.4448-379.904-379.904 0-209.5104 170.4448-379.904 379.904-379.904 209.5104 0 379.904 170.4448 379.904 379.904 0 209.4592-170.4448 379.904-379.904 379.904z" fill="#5ebd9a" p-id="16998"></path><path d="M259.4816 439.8592l422.5024-103.5776c20.4288-5.0176 37.5296 15.9744 28.4672 34.9696L522.24 766.4128c-9.728 20.3776-39.3728 18.432-46.2848-3.072l-48.0256-149.4016a25.06752 25.06752 0 0 1 5.2224-24.3712l82.1248-91.0336c5.0176-5.5808-1.6896-13.9264-8.192-10.0864l-108.9536 63.488a24.9856 24.9856 0 0 1-24.6272 0.3072L253.3888 485.9392c-19.9168-11.008-15.9744-40.704 6.0928-46.08z" fill="#5ebd9a" p-id="16999"></path></svg>
                    </div>
                </div>
            </div>
        </div>
    )
}