import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import {FaInstagram, FaFacebook} from 'react-icons/fa'
import {BsWhatsapp} from 'react-icons/bs'
import axios from 'axios'


const Footer = () => {

  const [settings, setSettings] = useState([])

    useEffect(() => {
        const getSettings = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/settings`)
                if(res.status === 200) {
                    setSettings(res.data.slice(0,1))
                }
            } catch (err) {
                console.log(err);
            }
          };
          getSettings()
        }, [])
  return (
    <div className='bg-primary'>
      <div className='container mx-auto px-4 py-10 max-md:flex-col max-md:gap-4 flex items-center justify-between'>
        <div className='flex flex-col items-center justify-center'>
          {/* <Image alt='' priority src='/images/Duman.png' width={100} height={100}/> */}
          <h2 className='text-white font-dancing text-4xl'>Logo</h2>
        </div>

        <div className='flex flex-col justify-center items-center'>
          <h2 className='text-white font-dancing text-2xl'>Sosyal Medya Hesaplarımız</h2>
          <div className='flex items-center justify-center gap-4 mt-4 text-white'>
            <FaInstagram size={25} className='hover:text-dark cursor-pointer duration-300'/>
            <FaFacebook size={25} className='hover:text-dark cursor-pointer duration-300'/>
            <BsWhatsapp size={25} className='hover:text-dark cursor-pointer duration-300'/>
          </div>
        </div>
        <div className='flex flex-col justify-center items-center'>
        <h2 className='text-white font-dancing text-2xl'>Çalışma Saatlerimiz.</h2>
        {settings.map((setting) => (
          <div key={setting._id} className='flex flex-col justify-center items-center text-white mt-4'>
          <span className='text-lg font-medium'>{setting.clock}</span>
          <span className='text-lg font-medium'>{setting.day}</span>
        </div>
        ))}
        </div>
      </div>
    </div>
  )
}

export default Footer