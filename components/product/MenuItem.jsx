import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useDispatch } from 'react-redux'
import { addProduct } from '../../redux/cartSlice'

const MenuItem = ({product}) => {

  const dispatch = useDispatch()

  const handleAdd = (product) => {
    dispatch(addProduct({...product, price: product.price, quantity : 1 }))
}

  return (
    <div className='bg-primary rounded-xl overflow-hidden relative shadow-lg'>
      <Link href={`/urun/${product._id}`}>
        <div className='overflow-hidden rounded-bl-[150px] cursor-pointer rounded-t-xl'>
            <Image priority src={product.img} alt={product.title} name={product.title} width={500} height={500} className='object-cover w-[380px] h-[220px]  hover:scale-110 duration-300 rounded-bl-[150px] rounded-t-xl'/>
        </div>
      </Link>

        <div className='p-5 flex flex-col max-md:gap-2 max-md:p-3 gap-4 justify-between w-full text-white'>
            <div className='flex items-center gap-4 justify-between'>
            <h3 className='text-xl max-md:text-sm font-bold select-none whitespace-nowrap text-ellipsis overflow-hidden'>{product.title}</h3>
            </div>
            <p className='text-sm max-md:text-xs select-none whitespace-nowrap text-ellipsis overflow-hidden'>{product.desc}</p>
            {/* <span className='select-none font-semibold text-xl max-md:text-sm hidden max-md:flex justify-end'>40.00₺</span> */}
            <div className='flex items-center justify-end gap-2'>
              <span className={`font-semibold text-xl max-md:text-sm ${product.discount && 'line-through opacity-80'}`}>{(product.price).toFixed(2)}₺</span>
              {product.discount && <span className=' font-semibold text-xl max-md:text-sm'>{(product.discount).toFixed(2)}₺</span>}
            </div>
            <button onClick={() => handleAdd(product)} className='button !bg-white !text-primary hover:!bg-dark hover:!text-white'>Sepete Ekle</button>
        </div>

        {product.discount && <span className='absolute max-md:top-2 max-md:right-2 max-md:text-xs top-4 right-4 text-white font-bold bg-primary p-2 rounded-full text-sm'>İndirim</span>}
    </div>
  )
}

export default MenuItem