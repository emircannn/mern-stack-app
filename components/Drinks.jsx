import axios from 'axios';
import Image from 'next/image'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import Slider from 'react-slick'
import { addProduct } from '../redux/cartSlice';


const Drinks = () => {

    const {push} = useRouter()

    const settings = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 4000,
        responsive: [
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 1,
                arrows: false,
                autoplay: true,
                autoplaySpeed: 3000,
              },
            },

            {
                breakpoint: 1278,
                settings: {
                  slidesToShow: 2,
                  arrows: false,
                  autoplay: true,
                  autoplaySpeed: 3000,
                },
              },
            {
                breakpoint: 1400,
                settings: {
                  slidesToShow: 3,
                  arrows: false,
                  autoplay: true,
                  autoplaySpeed: 3000,
                },
              },
          ],
      };

      const [products, setProducts] = useState([])
      const [drinks, setDrinks] = useState([])

      useEffect(() => {
       const getProducts = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`)
            setProducts(res.data)
       } catch (err) {
        console.log(err);
       }
       }
       getProducts()
      }, [])
      
      useEffect(() => {
        setDrinks(products.filter((product) => product.category === "tatlılar" || product.category === "i̇çecekler"))
      }, [setDrinks, products])

      const dispatch = useDispatch()

      const handleAdd = (drink) => {
        dispatch(addProduct({...drink, price: drink.price, quantity : 1 }))
    }
      
  return (
    <div className='w-screen overflow-x-hidden'>
        <div>
            <h2 className='mb-2 font-semibold text-dark text-lg max-md:text-base'>İçecek & Tatlı</h2>
        </div>
<Slider  {...settings}>
    
    {drinks.length > 0 && drinks.map((drink) => drink.isActive === true && (
        <div key={drink._id}>
        <div className='!mx-2 flex'>
        <div className='bg-[#E5E7EB] w-full h-[110px] rounded-xl shadow-lg group flex items-center justify-start gap-2'>
                <div className='h-full w-[25%] rounded-r-none rounded-xl overflow-hidden'>
                    <Image onClick={()=> push(`/urun/${drink._id}`)} priority src={drink.img} alt="" width={100} height={100} className="w-full h-full cursor-pointer group-hover:scale-105 duration-300 object-cover rounded-xl rounded-r-none"/>
                </div>
    
                <div className='w-[75%] p-2 flex flex-col items-center justify-evenly h-full'>
                    <h4 className='font-semibold text-secondary text-lg text-center text-ellipsis max-md:text-sm whitespace-nowrap overflow-hidden'>{drink.title}</h4>
                    <span className='text-secondary my-1 font-medium text-sm max-md:text-xs'>{drink.price.toFixed(2)} ₺</span>
    
                    <button onClick={() => handleAdd(drink)} className='text-white bg-secondary border max-md:text-xs border-secondary duration-300 hover:text-secondary font-medium hover:bg-[#E5E7EB] px-2 w-1/2 py-1 rounded-full'>Sepete Ekle</button>
                </div>
            </div>
        </div>
        </div>
    ))}

</Slider> 
    </div>
  )
}

export default Drinks