import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import MessageBox from "./MessageBox";
import { useDispatch, useSelector } from "react-redux";
import { setChat } from "../Redux/chatSlice";



function Chat() {

  const location = useLocation();
  const user = location.state;
  const [typeMessage,setTypeMessage] = useState("")
  const [newSocket,setNewSocket] = useState()
  const [id,setUserId] = useState()
  const boxref = useRef(null)
  const dispatch = useDispatch()
  const datared = useSelector(state=>state.chatReducer)

  useEffect(() => {

    const socket = io("https://chat-app-server-nm76.onrender.com");
    setNewSocket(socket)

    socket.on("connect", () => {
      setUserId(socket.id)
    });
    console.log(socket);
    socket.emit('joined',{user})

    socket.on('welcome',(data)=>{
      dispatch(setChat(data))
      console.log(data.user,data.message);
    })

    socket.on('userJoined',(data)=>{
      dispatch(setChat(data))
      console.log(data.user,data.message);
    })

    socket.on('sendMessage',(data)=>{
      dispatch(setChat(data))
      console.log(data.user,data.message,data.id);
    })

    socket.on('disconnect',()=>{
      socket.emit("disconnect",{user})
    })

    socket.on('leave',(data)=>{
      dispatch(setChat(data))
      console.log(data.user,data.message);
    })

  
  }, []);

  const send =()=>{
    if(typeMessage!=""){newSocket.emit('message',{message:typeMessage,id})
    setTypeMessage("")}
  }

  useEffect(()=>{
    console.log(datared);
  },[datared])

  useEffect(()=>{
    boxref.current?.lastElementChild?.scrollIntoView()
  },[datared])

  return (
    <>
      <div
        style={{ height: "100vh", backgroundColor: "#19D197" }}
        className="d-flex justify-content-center align-items-center"
      >
        <div className="mm bg-white">
          <div
            className="headchat d-flex align-items-center bg-info"
            style={{ height: "10%"}}
          >
            <h4 style={{fontSize:'20px'}} className="ps-3 hh2">Messanger</h4>
          </div>
          <div ref={boxref} className="chatarea" style={{ height: "76%",backgroundColor:'#ddddf7' }}>
            {datared&& datared.map((item,index)=>(
              <MessageBox user={user} name={item.user} message={item.message}/>
            ))}
          </div>
          <div className="inputbox px-2 py-2 d-flex" style={{ height: "6%" ,width:"100%"}}>
            <input onChange={(e)=>setTypeMessage(e.target.value)} value={typeMessage} style={{ width: "80%",height:'45px' }} type="text" className="me-2 inp" placeholder="Type your Message"/>
            <button onClick={()=>send()} className="btt" style={{ width: "20%",height:'45px',backgroundColor:'#11E4D9' }}>Send</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chat;