/* eslint-disable react/no-unescaped-entities */
import axios from 'axios'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import { AiFillCloseCircle } from 'react-icons/ai'

const Index = ({order}) => {

    const {push} = useRouter()

  return (
    <div className='container mx-auto min-h-[calc(100vh_-_290px)] flex items-center justify-center'>
      <Head>
        <title>{order.customer} - Siparişi</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
         <div className='fixed overflow-y-auto overflow-x-hidden top-0 left-0 flex bg-black w-screen h-screen items-center justify-center'>

        
            <div className='!bg-primary w-[600px] p-8 rounded-2xl relative'>
            <h3 className='font-dancing text-white text-[40px] text-center font-bold'>Sipariş Detayları</h3>
            <div className="flex flex-col gap-2 my-4 w-full">

            <span className='text-white font-semibold text-xl max-md:text-lg '>Sipariş Verilen Ürünler</span>
            {order.products.map((product) => (
                <div onClick={() => push(`/urun/${product._id}`)} key={product._id} className='relative w-full h-[80px] rounded-2xl cursor-pointer overflow-hidden group'>
                <Image src={product.img} priority alt="" width={500} height={500} className="h-full group-hover:scale-105 duration-300 w-full object-cover rounded-2xl"/>
                <span className='absolute top-0 left-0 bg-black/75 group-hover:bg-black/50 duration-300 w-full h-full flex items-center justify-center flex-col  text-white rounded-2xl'>
                    <span className='font-semibold text-xl  max-md:text-lg text-center'>{product.title}</span>
                    <span className='font-medium text-lg max-md:text-base text-center'>Adet : {product.quantity}</span>
                </span>
            </div>
            ))}

            <div className='flex flex-col'>
            <span className='text-white font-semibold max-md:text-lg text-xl mt-4'>Müşteri Bilgileri</span>
            <span className='text-white font-semibold text-lg max-md:text-base mt-2'>Adres:</span>
            <span className='text-white font-medium text-lg max-md:text-base'>{order?.address}</span>
            <span className='text-white font-semibold text-lg max-md:text-base mt-2'>Telefon:</span>
            <span className='text-white font-medium text-lg max-md:text-base'>{order?.phone}</span>
            <span className='text-white font-semibold text-lg max-md:text-base mt-2'>Ödeme Yöntemi:</span>
            <span className='text-white font-medium text-lg max-md:text-base'>{order?.method === 0 ? "Nakit" : "Kredi Kartı"}</span>
            <span className='text-white font-semibold text-lg max-md:text-base mt-4'>Sipariş Notu:</span>
            <span className='text-white font-medium text-lg max-md:text-base'>"{order?.message}"</span>
            </div>

      </div>

            <AiFillCloseCircle onClick={() =>push("/abika/profil")} className='absolute top-4 right-4 text-white hover:text-dark cursor-pointer' size={24}/>
            <button onClick={() =>push("/abika/profil")} className='py-2 px-4 rounded-full duration-300 font-semibold w-full !bg-white !text-dark hover:!bg-dark hover:!text-white'>Geri Dön</button>
            </div>

    </div>
    </div>
  )
}

export const getServerSideProps = async ({params}) => {

  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/orders/${params.id}`)
    
  
    return {
      props : {
        order: res.data ? res.data : null,
      }
    }
  }

export default Index