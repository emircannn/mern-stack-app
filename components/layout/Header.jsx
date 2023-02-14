import Image from 'next/image'
import React, { useState } from 'react'
import {FaUserAlt, FaShoppingCart, FaSearch} from 'react-icons/fa'
import {GiHamburgerMenu} from 'react-icons/gi'
import {RiCloseCircleFill} from 'react-icons/ri'
import ModalSearch from '../ModalSearch'
import Link from 'next/link';
import OutsideClickHandler from 'react-outside-click-handler';
import { useSelector } from 'react-redux'

const Header = () => {

    const cart = useSelector((state) => state.cart.products)
    const [navbar, setNavbar] = useState(false)
    const [modalSearch, setModalSearch] = useState(false)


  return (
    <header className='bg-primary p-2'>
        <div className='flex  items-center justify-between container mx-auto'>
        <div className='flex gap-2 items-center justify-center'>
            {/* <Image alt='' src="/images/Duman.png" width={90} height={90} priority/> */}
            <h2 className='text-white font-semibold text-4xl flex items-center justify-center font-dancing h-[90px]'>Logo</h2>
        </div>

        <nav className='max-md:hidden'>
            <ul className='flex items-center justify-center gap-4 text-white cursor-pointer select-none'>
                <Link href='/'><li className='hover:text-dark text-lg duration-300 uppercase'>Ana Sayfa</li></Link>
                <Link href='/menu'><li className='hover:text-dark text-lg duration-300 uppercase'>Menü</li></Link>
                <Link href='/hakkimizda'><li className='hover:text-dark text-lg duration-300 uppercase'>Hakkımızda</li></Link>
                <Link href='/iletisim'><li className='hover:text-dark text-lg duration-300 uppercase'>İletişim</li></Link>
            </ul>
        </nav>

        <div className='flex items-center gap-4 text-white'>
        <Link href='/oturum/giris'><FaUserAlt size={18} className='hover:text-dark duration-300 cursor-pointer'/></Link>
        <div className='relative'>
        <Link href='/sepet'><FaShoppingCart size={18} className='hover:text-dark duration-300 cursor-pointer'/></Link>
        <span className='absolute -top-3 -right-3 bg-dark w-4 h-4 text-xs font-medium flex items-center justify-center rounded-full'>{cart.length ? cart.length : 0}</span>
        </div>
        <FaSearch onClick={() => setModalSearch(!modalSearch)} size={18} className='hover:text-dark duration-300 cursor-pointer'/>
        <GiHamburgerMenu onClick={() => setNavbar(!navbar)} size={18} className='hover:text-dark duration-300 cursor-pointer hidden max-md:flex'/>
        </div>
        </div>

        {/* MD Navbar */}
        {/* overlay */}
        {navbar ? (
        <div className="bg-black/80 fixed w-full h-screen z-20 top-0 left-0 
        duration-500 opacity-100"></div>
      ) : (
        <div className="bg-black/80 fixed w-full h-screen z-20 top-0 left-[-100%]
        duration-500 opacity-0"></div>
      )}
        {/* menu */}
        <OutsideClickHandler onOutsideClick={()=> setNavbar(false)} >
        <div
        className={
          navbar
            ? "fixed w-[300px] h-screen bg-rose-600 z-20 duration-500 top-0 right-0"
            : "fixed w-[300px] h-screen bg-rose-600 z-20 duration-500 top-0 right-[-100%]"
        }
      >
        <div className='flex flex-col'>
        <div className='flex flex-col mt-8 p-4 gap-2 items-center'>
            <Image alt='' src="/images/Duman.png" width={90} height={90} priority/>
            {/* <h2 className='text-white font-semibold text-lg uppercase'>Duman Izgara</h2> */}
        </div>

        <nav className='mt-8'>
            <ul className='flex flex-col items-center justify-center gap-4 text-white cursor-pointer select-none'>
                <Link href='/' onClick={() => setNavbar(!navbar)}><li className='hover:text-dark text-lg duration-300 uppercase'>Ana Sayfa</li></Link>
                <Link href='/menu' onClick={() => setNavbar(!navbar)}><li className='hover:text-dark text-lg duration-300 uppercase'>Menü</li></Link>
                <Link href='/hakkimizda' onClick={() => setNavbar(!navbar)}><li className='hover:text-dark text-lg duration-300 uppercase'>Hakkımızda</li></Link>
                <Link href='/iletisim' onClick={() => setNavbar(!navbar)}><li className='hover:text-dark text-lg duration-300 uppercase'>İletişim</li></Link>
            </ul>
        </nav>

        <div>
        <RiCloseCircleFill onClick={() => setNavbar(!navbar)} size={25} className='hover:text-dark duration-300 absolute right-4 top-4 cursor-pointer text-white'/>
        </div>
        </div>
      </div>
      </OutsideClickHandler>

      {/* MD Navbar */}

      {/* Modal Search */}
        {modalSearch && <ModalSearch setModalSearch={setModalSearch}/>}
      {/* Modal Search */}

    </header>
  )
}

export default Header