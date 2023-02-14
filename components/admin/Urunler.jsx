/* eslint-disable @next/next/no-img-element */
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import PacmanLoader from "react-spinners/PacmanLoader";

import { toast } from "react-toastify"


const Urunler = () => {


  const [products, setProducts] = useState([])
  const [filtered, setFiltered] = useState([]);
  const [discount, setDiscount] = useState()
  const {push} = useRouter()

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`)
        setProducts(res?.data)
        setFiltered(res.data)
     } catch (err) {
        console.log(err);
      }
    }
    setTimeout(() => {
      getProducts();
    }, 1000);

  }, [setProducts])

  const handleSearch = (e) => {
    const searchFilter = products.filter((product) => product.title.toLowerCase().includes(e.target.value.toLowerCase()));
    setFiltered(searchFilter)
  }

    
  const handleDelete = async (id) => {
    try {
      if (confirm("Bu Ürünü Silmek İstediğinize Emin Misiniz?")) {
        const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`)
        
        if(res.status === 200) {
          setProducts(products.filter((pro) => pro._id !== id));
          toast.success("Ürün Silme İşlemi Başarılı!");
        }
      }} catch (err) {
        console.log(err);
      }
    }

    //İndirim

    const handleFinisDiscount = async (id) => {
      try {
        if (confirm("İndirimi Bitirmek İstediğinize Emin Misiniz?")) {
          const endDiscount = {discount : null}
          
          const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, endDiscount)
          if (res.status === 200) {
            toast.success("İndirim Bitirme İşlemi Başarılı!")
            setFiltered([res.data, ...filtered.filter((product) => product._id !== id)])
            setProducts([res.data, ...products.filter((product) => product._id !== id)])
          }
        }
      } catch (err) {
        console.log(err);
      }
    }

    const handleDiscount = async (id) => {
      try {
        
        if (confirm("İndirimi Oluşturmak İstediğinize Emin Misiniz?")) {
          
          const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`)
          const price = res.data.price
          if(discount < price) {
          const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, {discount : discount} )
          if (res.status === 200) {
            toast.success("İndirim Oluşturma İşlemi Başarılı!")
            setFiltered([res.data, ...filtered.filter((product) => product._id !== id)])
            setProducts([res.data, ...products.filter((product) => product._id !== id)])
          }
        } else {
          toast.error("İndirimli Fiyat, Ürün Fiyatından Yüksek Olamaz!");
        }
      }

      } catch (err) {
        console.log(err);
      }
    }

    //Ürün Aktifleştirme

    const handleActive = async (id) => {
      try {
        if (confirm("Ürünü Etkinleştirmek İstediğinize Emin Misiniz?")) {


          const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, {isActive : true} )
          if (res.status === 200) {
            toast.success("Etkinleştirme İşlemi Başarılı!")
            setFiltered([res.data, ...filtered.filter((product) => product._id !== id)])
            setProducts([res.data, ...products.filter((product) => product._id !== id)])
          }
        }
      } catch (err) {
        console.log(err);
      }
    }

    const handleDeActive = async (id) => {
      try {
        if (confirm("Ürünü Etkisizleştirmek İstediğinize Emin Misiniz?")) {
          const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, {isActive : false} )
          if (res.status === 200) {
            toast.success("Etkisizleştirme İşlemi Başarılı!")
            setFiltered([res.data, ...filtered.filter((product) => product._id !== id)])
            setProducts([res.data, ...products.filter((product) => product._id !== id)])
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
    
    
    return (
    <div className='lg:p-8 lg:mt-0 mt-5 max-md:px-4 flex-1 max-md:my-8'>
        <h3 className='font-dancing font-bold text-[2.5rem] text-primary'>Ürünler</h3>

        <input type="text" placeholder='Ürün Arama...' onChange={handleSearch} className='w-full my-4 px-4 py-2 rounded-full border border-dark/50 focus:border-dark/75 outline-none' />
        {products.length > 0 ?
        <div className='grid grid-cols-4 max-lg:grid-cols-2 max-xl:grid-cols-3 gap-3'>
          {filtered.length > 0 ? filtered.map((product) => (
            <div key={product._id} className='relative'>
            <div onClick={() => console.log(product.title)} className={`bg-primary relative rounded-xl h-full overflow-hidden shadow-lg ${!product.isActive && "opacity-50"}`}>
          <Link href={`/abika/profil/urun/${product._id}`}>
          <div className='overflow-hidden rounded-bl-[150px] rounded-t-xl'>
              <Image priority src={product.img} alt='' width={500} height={500} className='object-cover w-full h-[200px]  hover:scale-110 duration-300 rounded-bl-[150px] rounded-t-xl'/>
          </div>
          </Link>
  
          <div className='p-5 flex flex-col max-md:gap-2 max-md:p-3 gap-2 h-fit text-white'>
              <div className='flex items-center gap-4 justify-between'>
              <h3 className='text-lg max-md:text-sm font-bold select-none whitespace-nowrap text-ellipsis overflow-hidden'>{product.title}</h3>
              </div>
              {product.desc ? <p className='text-sm max-md:text-xs select-none whitespace-nowrap text-ellipsis overflow-hidden'>{product.desc}</p> : "-"}
              {/* <div className='flex flex-col'>
                <span>İstemiyorum: </span>
              <div className='flex items-center gap-1'>
               {product.extraOptions.length > 0 ? product.extraOptions.map((extra) => (
                <p key={extra._id} className='text-sm max-md:text-xs select-none whitespace-nowrap text-ellipsis overflow-hidden'>{extra.text},</p>
              )) : "-"}
              </div>
              </div> */}
              <span className=' font-semibold text-base max-xl:font-medium max-md:text-sm'>Fiyat: <span className={`${product.discount && 'line-through opacity-80 mr-2'}`}>{(product.price).toFixed(2)}₺</span> {product.discount && <span>{(product.discount).toFixed(2)}₺</span>} </span>
              {!product.discount ? <div className='flex items-center max-xl:flex-col justify-center gap-2'>
              <input placeholder='İndirim Ekle' type="number" className='border flex-1 w-full focus:border-secondary/50 max-md:py-1 max-md:px-2 max-md:text-sm py-2 px-4 outline-none text-secondary mt-1 rounded-full' 
              onChange={(e) => setDiscount(e.target.value)} />
                <button onClick={() => handleDiscount(product._id)} className='button !bg-white !text-dark flex-1 hover:!bg-dark w-full hover:!text-white'>Ekle</button>
              </div> : <button onClick={() => handleFinisDiscount(product._id)}  className='button !bg-white !text-dark hover:!bg-dark hover:!text-white'>İnidirimi Bitir</button>}
              <div className='flex items-center justify-center gap-2'>
  
              <button onClick={() => handleDelete(product._id)} className='button !bg-dark !text-white flex-1 hover:!bg-white hover:!text-dark'>Sil</button>
              </div>
          </div>
          {product.discount && <span className='absolute top-4 right-4 text-white font-bold bg-primary p-2 rounded-full text-sm'>İndirim</span>}

          </div>

          {product.isActive && <span onClick={() => handleDeActive(product._id)} className='absolute top-4 left-4 text-white font-bold bg-dark py-2 px-4 rounded-full text-xs !opacity-100 cursor-pointer'>Etkin</span>}
          {!product.isActive && <span onClick={() => handleActive(product._id)} className='absolute top-4 left-4 text-white font-bold bg-dark py-2 px-4 rounded-full text-xs !opacity-100 cursor-pointer'>Etkisiz</span>}
          </div>
          )) : <span className=' w-full font-medium text-dark mt-2'>Hiç Ürün Bulunamadı!</span>}

        </div>
        :  <div className='flex w-full h-full mx-auto items-center justify-center mt-8'> 
        <PacmanLoader className='mx-auto' color='#E11D48'/></div>}
        </div>
  )
}

export default Urunler