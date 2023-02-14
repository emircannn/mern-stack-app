
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import {BiSupport} from 'react-icons/bi'
import {IoMdClose, IoMdSend} from 'react-icons/io'
import { useSession } from "next-auth/react";
import moment from 'moment/moment';
import { toast } from 'react-toastify';
import { io } from 'socket.io-client'


const Chat = () => {

  /* const socket = io("http://localhost:5000", {transports: ['websocket']}) */

  const [chat, setChat] = useState(false)
  const {data: session} = useSession()
  const [users, setUsers] = useState([])
  const [chats, setChats] = useState([])
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")

  const currentUser = users.find((user) => user?.email === session?.user?.email)
  const currentChat = chats.find((chat) => chat.senderId === currentUser?._id)
  const currentMessages = messages.filter((message) => message.chatId === currentChat?._id)

  
//users
useEffect(() => {
    const getUsers = async () =>{
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`)
        setUsers(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    getUsers()
  }, [])


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

const createChat = async () => {
  try {
    if(session){
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/chats`, {senderId: currentUser._id, senderName: currentUser?.name, isAdmin: false})
      setChats((prev) => [...prev, res.data])
    }
    else{
      toast.error("Destek Talebi Oluşturmak İçin Oturum Açın!")
    }
  } catch (err) {
    console.log(err);
  }
}

  const handleSubmit = async (e) => {
      e.preventDefault()
      
      const message = {
        chatId: currentChat?._id,
        sender: currentUser?._id,
        text: newMessage
      }


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
}) */

  return (
    <div>

      <div className='flex items-center justify-center fixed bottom-8 right-8 gap-2 hover:animate-pulse cursor-pointer z-10'>
      <div onClick={() => setChat(true)} className=' bg-dark p-4 mb-2 rounded-full'>
        <BiSupport size={25} className="text-white"/>
      </div>
      <span className='fixed bottom-2 bg-dark text-white text-xs font-bold px-2 py-1 mt-2 rounded-full'>Canlı Destek</span>
      </div>

      <div className={`fixed right-4 max-md:right-2 bottom-0 w-[350px] ${chat ? 'h-[500px]' : 'h-0'} duration-300 border-x border-dark/25 bg-white flex flex-col items-center justify-between z-30 shadow-lg rounded-t-md`}>
        <div className='bg-secondary flex justify-between w-full items-center p-2 rounded-t-md'>
          <span className='text-white font-semibold'>Canlı Destek</span>
        <IoMdClose onClick={() => setChat(false)} size={20} className="text-white cursor-pointer hover:text-dark duration-300"/>
        </div>


      <div className='overflow-y-auto h-full w-full p-4'>

        {!currentChat && <button onClick={createChat} className='bg-secondary text-white px-4 py-2 w-full rounded-full hover:bg-dark duration-300'>Destek Talebi Oluştur</button>}

      {currentMessages && currentMessages.map((message) => (
        <div key={message._id}>
        {message.sender === currentUser?._id && <div  className='w-full flex flex-col items-end'>
          <span className='text-xs md:text-sm bg-secondary text-white py-2 px-4 my-2 rounded-full !break-words !overflow-hidden rounded-br-none max-w-[70%]'>{message.sender === currentUser?._id && message.text}</span>
          <span className='text-end text-xs text-dark'>{moment(message?.createdAt).format('DD/MM, H:mm')}</span>
        </div>}
  
          {message.sender !== currentUser?._id && <div  className='w-full flex flex-col items-start'>
          <span className='text-xs md:text-sm bg-[#E5E7EB] text-dark py-2 px-4 my-2 rounded-full !break-words !overflow-hidden rounded-bl-none max-w-[70%]'>{message.sender !== currentUser?._id && message.text}</span>
          <span className='text-end text-xs text-dark'>{moment(message?.createdAt).format('DD/MM, H:mm')}</span>
          </div>}
        </div>
      ))}

      
      </div>

        {currentChat && 
        <div className='p-2 w-full flex items-center gap-1 justify-between'>

        <form onSubmit={handleSubmit} className='w-full'>
        <input placeholder='Destek Talebinde Bulun...' value={newMessage} onChange={(e) => setNewMessage(e.target.value)} type="text" className='px-4 text-sm py-2 outline-none rounded-full w-full border-dark/30 border focus:border-dark/50'/>
        </form>

          <button onClick={handleSubmit}  type='submit'  className='bg-secondary px-4 py-2 rounded-full hover:bg-primary duration-300 cursor-pointer'>
            <IoMdSend  size={20} className="text-white"/>
          </button>
        </div>}

      </div>

    </div>
  )
}

export default Chat