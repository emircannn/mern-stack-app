import axios from 'axios'
import React, { useEffect, useState } from 'react'
import moment from 'moment/moment'
import { useRouter } from 'next/router'
import { useSession } from "next-auth/react";
import { PacmanLoader } from 'react-spinners';

const Siparislerim = () => {

    const [orders, setOrders] = useState([])
    const status = ["Sipariş Alındı","Sipariş Hazırlanıyor", "Sipariş Yolda", "Sipariş Teslim Edildi"]
    const {push} = useRouter()
    const {data: session} = useSession()

    useEffect(() => {
     const getOrders = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/orders`)
            setOrders(res.data.filter((order) => order.customer === session?.user?.name))
        } catch (error) {
            console.log(err);
        }
     }
     setTimeout(() => {
        getOrders();
      }, 1000);
    }, [session])
  return (
    <div className='lg:p-8 lg:mt-0 mt-5 max-md:my-6 max-md:px-4  flex-1'>
        <h3 className='font-dancing text-[40px] text-primary font-bold'>Siparişlerim</h3>

        <div className={`w-full mt-5 grid grid-cols-2 gap-4 max-lg:grid-cols-1 ${orders.length === 0 && "grid-cols-1"}`}>
            {orders.length > 0 ? orders.sort((a,b)=>{
                        return new Date(b.createdAt) - new Date(a.createdAt)
                    }).map((order) => (
                <div key={order._id} className='bg-primary p-4 rounded-2xl max-md:flex-col flex justify-between items-center'>
                <div className='flex flex-col text-white gap-2'>
                    <span>Sipariş Kodu: <span className='font-bold'>{order?._id.substring(0,8)}...</span> </span>
                    <span>Müşteri Adı: <span className='font-bold'>{order?.customer}</span> </span>
                    <span>Sipariş Tarihi: <span className='font-bold'>{moment(order?.createdAt).format('DD / MM / YYYY, H:mm ')}</span> </span>
                    <span>Sipariş Tutarı: <span className='font-bold'>{(order?.total).toFixed(2)} ₺</span> </span>
                    <span>Sipariş Durumu: <span className='font-bold'>{status[order?.status]}</span> </span>
                </div>

                <div className='h-full mt-4 max-md:w-full flex-col gap-2 flex items-end justify-end md:self-end'>
                    <button onClick={()=> push(`/profil/siparisler/${order?._id}`)} className='py-2 px-4 rounded-full duration-300 font-semibold w-full !bg-white !text-dark hover:!bg-dark hover:!text-white'>
                        Detaylar</button>
                </div>
            </div>
            )) : <div className='flex w-full h-full mx-auto items-center justify-center mt-8'> 
            <PacmanLoader className='mx-auto' color='#E11D48'/></div>}

        </div>
        
    </div>
  )
}

export default Siparislerim