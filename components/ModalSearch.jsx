import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import {RiCloseCircleFill} from 'react-icons/ri'
import OutsideClickHandler from 'react-outside-click-handler';
import PacmanLoader from "react-spinners/PacmanLoader";

const ModalSearch = ({setModalSearch}) => {

  const [products, setProducts] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const router = useRouter();

    useEffect(() => {
      const getProducts = async () => {
        try {
          const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`)
          setProducts(res.data)
          setFiltered(res.data.slice(0,6))
        } catch (err) {
          console.log(err);
        }
      }
      setTimeout(() => {
        getProducts();
      }, 2000);
    }, [])

    const handleSearch = (e) => {
      const searchFilter = products.filter((product) => product.title.toLowerCase().includes(e.target.value.toLowerCase())).slice(0, 6);
      setFiltered(searchFilter)
    }
    

  return (
    <React.Fragment>
        <div className='w-full h-screen opacity-100 duration-300 bg-black/80 fixed top-0 right-0 z-20 flex items-center justify-center'>
            <OutsideClickHandler onOutsideClick={()=> setModalSearch(false)} >
            <div className='w-full h-full'>
            <div className='w-[600px] max-sm:w-full max-sm:p-4 bg-primary flex items-center justify-center max-md:!p-2 p-8 rounded-lg relative'>
                <div className='flex flex-col gap-2 items-center w-full p-4'>
                <h4 className='text-[40px] font-dancing text-white'>Arama</h4>
                <input type="text" placeholder='Arama...' onChange={handleSearch} className='outline-none border-none px-4 py-2 mb-2 rounded-full w-full' />

                {products.length > 0 ? 
                <ul className='flex flex-col gap-1 w-full'>
                {filtered.length > 0 ? filtered.map((product) => product.isActive === true ?
                  <li key={product._id} onClick={() => {router.push(`/urun/${product?._id}`), setModalSearch(false)}} className='flex items-center justify-between gap-2 w-full mt-2 group hover:bg-white duration-300 cursor-pointer rounded-full p-1'>
                  <div className='w-[50px] h-[50px] max-md:h-[35px] max-md:w-[35px]'>
                  <Image alt={product.title} src={product.img} className='w-full h-full rounded-full object-cover' width={100} height={100}/>
                  </div>

                  <span className='text-white text-lg max-md:text-xs max-md:font-normal text-center group-hover:text-dark duration-300 font-semibold'>{product.title}</span>
                  <span className='text-white text-lg max-md:text-xs max-md:font-normal group-hover:text-dark duration-300 font-semibold'>{product.discount ? product.discount.toFixed(2) :product.price.toFixed(2)} ₺</span>
                </li> : null
                ) : <span className='text-center font-medium text-white mt-2'>Hiç Ürün Bulunamadı!</span>}
                </ul> : <div className='flex w-full mx-auto items-center justify-start mt-8'> 
                            <PacmanLoader className='mx-auto' color='#fff'/>
                            </div>}

                </div>
                <RiCloseCircleFill onClick={() => setModalSearch(false)} size={25} className='hover:text-dark duration-300 absolute right-4 top-4 cursor-pointer text-white'/>
            </div>
            </div>
            </OutsideClickHandler>
        </div>
    </React.Fragment>
  )
}

export default ModalSearch