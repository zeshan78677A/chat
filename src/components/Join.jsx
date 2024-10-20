import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Join() {

  const navigate = useNavigate()
  const [userName,setUserName] = useState("")
  console.log(userName);


  const goToChat = () =>{
    if(userName){
      navigate('/chat',{state:userName})
    }
    else{
      alert("Enter Your Username")
    }
  }

  return (
    <>
        <div style={{height:'100vh'}} className='d-flex justify-content-center align-items-center'>
            <div className='d-flex flex-column justify-content-center align-items-center'>
                <img width={'80%'} className='img-fluid' src="https://icon-library.com/images/chat-app-icon/chat-app-icon-24.jpg" alt="" />
                <h1 className='hh1'>CHAT APP</h1>
                <div>
                    <input type="text" onChange={(e)=>setUserName(e.target.value)} className='form-control' placeholder='Enter your Username'/>
                    <button onClick={goToChat} className="btn btn-info mt-2 w-100">Start Chat</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default Join