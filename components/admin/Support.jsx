import axios from 'axios'
import moment from 'moment/moment'
import React, { useEffect, useRef, useState } from 'react'
import { IoMdSend } from 'react-icons/io'
import { io } from 'socket.io-client'

const Support = () => {

    const [chats, setChats] = useState([])
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState("")
    const [currentChat, setCurrentChat] = useState(null)
    const currentMessages = messages.filter((message) => message.chatId === currentChat?._id)
    /* const socket = io("http://localhost:5000", {transports: ['websocket']}) */

      //chats
  useEffect(() => {
    const getChats = async () =>{
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/chats`)
        setChats(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    getChats()
  }, [])

//messages
useEffect(() => {
  const getMessages = async () =>{
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/messages`)
      setMessages(res.data)
    } catch (err) {
      console.log(err)
    }
  }
  getMessages()
}, [])



  const message = {
    chatId: currentChat?._id,
    sender: "admin",
    text: newMessage
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if(newMessage !== ""){
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/messages`, message)
      setMessages((prev) => [...prev, res.data])
      setNewMessage('')
      /* socket.emit('send',message) */
      }
    } catch (err) {
      console.log(err);
    }
  }

  
  /* socket.on('message', (data) => {
    setMessages((prev) => [...prev, data])
    
  })
 */
  return (
    <div className='lg:p-8 lg:mt-0 mt-5 max-md:my-6 max-md:px-4 h-full flex-1'>
        <div className='flex max-md:flex-col-reverse'>

            <div className='w-[75%] min-h-[703px] max-md:w-full max-md:min-h-[300px] flex-col flex items-center overflow-hidden justify-between p-4'>
                <div className='overflow-y-auto max-h-[703px] w-full'>

                {currentChat && currentMessages.map((message) => (
        <div key={message._id}>
        {message.sender === "admin" && <div  className='w-full flex flex-col items-end'>
          <span className='text-xs md:text-sm bg-secondary text-white py-2 px-4 my-2 rounded-full !break-words !overflow-hidden rounded-br-none max-w-[70%]'>{message.sender === "admin" && message.text}</span>
          <span className='text-end text-xs text-dark'>{moment(message?.createdAt).format('DD/MM, H:mm')}</span>
        </div>}
  
          {message.sender !== "admin" && <div  className='w-full flex flex-col items-start'>
          <span className='text-xs md:text-sm bg-[#E5E7EB] text-dark py-2 px-4 my-2 rounded-full !break-words !overflow-hidden rounded-bl-none max-w-[70%]'>{message.sender !== "admin" && message.text}</span>
          <span className='text-end text-xs text-dark'>{moment(message?.createdAt).format('DD/MM, H:mm')}</span>
          </div>}
        </div>
      ))}

                </div>

                {currentChat && <div className=' w-full flex items-center gap-1 justify-between'>

                    <form onSubmit={handleSubmit} className='w-full'>
                    <input value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder='Cevap Yaz...' type="text" className='px-4 text-sm py-2 outline-none rounded-full w-full border-dark/30 border focus:border-dark/50'/>
                    </form>

                <button onClick={handleSubmit}  type='submit'  className='bg-secondary px-4 py-2 rounded-full hover:bg-primary duration-300 cursor-pointer'>
                    <IoMdSend  size={20} className="text-white"/>
                </button>
                </div>}
            </div>

            <div className='border-x border-[#E5E7EB] cursor-pointer min-h-[703px] w-[25%] max-md:w-full max-md:min-h-[200px]'>

                <h2 className='text-center font-bold text-lg max-md:text-base text-secondary my-2'>Destek Talepleri</h2>

                {chats && chats.sort((a,b)=>{
                        return new Date(b.createdAt) - new Date(a.createdAt)
                    }).map((chat) => (
                    <div onClick={() => setCurrentChat(chat)} key={chat._id} className={`p-4 ${currentChat?._id === chat._id ? "bg-secondary text-white" : "bg-[#E5E7EB] text-secondary"} duration-300  items-center flex justify-center`}>
                    <h4 className='font-semibold'>{chat.senderName}</h4>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Support