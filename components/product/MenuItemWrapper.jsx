import React, { useEffect, useState } from 'react'
import MenuItem from './MenuItem'

const MenuItemWrapper = ({categoryList, productList}) => {

  const [active, setActive] = useState(0);
  const [productLimit, setProductLimit] = useState(4);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    setFilter(productList.filter((product) => product.category ===
    categoryList[active].title.toLowerCase()))
  }, [categoryList, productList, active])

  const activeProducts = productList.filter((product) => {
    return product.isActive === true
  })

const getAllProducts = () => {
      setFilter(activeProducts);
  };
  



  return (
    <div className='container mx-auto py-12 px-4'>
        <div className='flex flex-col justify-center items-center gap-4'>

        <div>
            <h2 className='font-dancing text-[50px] text-primary font-semibold'>Menü</h2>
        </div>

        <div className=''>
            <p className='text-center text-primary text-xl font-medium'>Kategoriler</p>
            <div className='flex flex-wrap items-center justify-start gap-2 mt-4 mb-8'>

            <button onClick={() => getAllProducts()} className={`button hover:!bg-dark hover:border-dark hover:!text-white`}>Hepsi</button>
                {categoryList.map((category ,index) => (
                  <button key={category._id} onClick={() => {
                    setActive(index)
                    setProductLimit(4)
                  }} className={`button hover:!bg-dark hover:border-dark hover:!text-white`}>{category.title}</button>
                ))}
  
        </div>
        </div>

        <div className='min-h-[27.8125rem]'>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-4'>
        {filter.length > 0 && filter.slice(0, productLimit).map((product) => product.isActive === true && <MenuItem key={product._id} product={product}/> )}
        </div>
        </div>

        <div>
          <button onClick={() => setProductLimit(productLimit + 4)}
          className='button !bg-dark !text-white w-full flex-1 hover:!bg-primary border-none disabled:opacity-75 items-center flex justify-center gap-2'>
            Daha Falza Gör</button>
        </div>

        </div>
    </div>
  )
}

export default MenuItemWrapper