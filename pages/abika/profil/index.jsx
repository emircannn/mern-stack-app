import Image from 'next/image'
import {GiFullPizza} from 'react-icons/gi'
import {BiCategory, BiSupport} from 'react-icons/bi'
import {RiEBikeLine} from 'react-icons/ri'
import {RxExit} from 'react-icons/rx'
import {AiFillSetting, AiOutlineAppstoreAdd} from 'react-icons/ai'
import { useState } from 'react'
import Siparis from '../../../components/admin/Siparis'
import Head from "next/head";
import Kategori from '../../../components/admin/Kategori'
import Urunler from '../../../components/admin/Urunler'
import axios from 'axios'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import AddProduct from '../../../components/admin/AddProduct'
import Settings from '../../../components/admin/Settings'
import { MdCampaign } from 'react-icons/md'
import Campaigns from '../../../components/admin/Campaigns'
import Support from '../../../components/admin/Support'


const Profil = () => {

    const {push} = useRouter()

    const [tab, setTab] = useState(0)
    const [addProduct, setAddProduct] = useState(false)

    const signOutAdmin = async () => {
        if (confirm("Çıkış Yapmak İstediğinize Emin Misiniz?")) {
        try {
            const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/admin`)

            if(res.status === 200) {
                push("/abika")
                toast.success("Çıkış İşlemi Başarılı!");
            }

        } catch (err) {
            console.log(err)
        }
    }
}

  return (

    <div className='min-h-[calc(100vh_-_290px)] flex max-md:flex-col'>
        <div className='w-[20%] max-lg:w-[30%] max-md:w-full flex flex-col items-center justify-start md:border-x border-primary/25'>
        <Head>
        <title>Admin Profil</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
            <div className='w-full flex items-center justify-center flex-col mt-2'>
            <Image priority className='w-[120px]' alt='' src="/images/admin.png" width={500} height={500}/>
            <span className='font-bold text-2xl uppercase'>Admin</span>
            </div>

            <ul className='flex items-center justify-center flex-col w-full mt-8'>
                <li onClick={() => setTab(0)} className={`bg-primary text-white w-full items-center justify-center flex p-4 select-none gap-2 cursor-pointer border-white border-y hover:bg-dark duration-300 ${tab === 0 && "bg-dark"}`}>
                    <GiFullPizza size={20}/>
                    <button className='uppercase font-bold text-lg'>Ürünler</button>
                    </li>
                <li onClick={() => setTab(1)} className={`bg-primary text-white w-full items-center justify-center flex p-4 select-none gap-2 cursor-pointer border-white border-y hover:bg-dark duration-300 ${tab === 1 && "bg-dark"}`}>
                    <BiCategory size={20}/>
                    <button className='uppercase font-bold text-lg'>Kategoriler</button>
                    </li>
                <li onClick={() => setTab(2)} className={`bg-primary text-white w-full items-center justify-center flex p-4 select-none gap-2 cursor-pointer border-white border-y hover:bg-dark duration-300 ${tab === 2 && "bg-dark"}`}>
                    <RiEBikeLine size={20}/>
                    <button className='uppercase font-bold text-lg'>Siparişler</button>
                    </li>
                    <li onClick={() => setTab(3)} className={`bg-primary text-white w-full items-center justify-center flex p-4 select-none gap-2 cursor-pointer border-white border-y hover:bg-dark duration-300 ${tab === 3 && "bg-dark"}`}>
                    <MdCampaign size={20}/>
                    <button className='uppercase font-bold text-lg'>Kampanyalar</button>
                    </li>
                <li onClick={() => setTab(4)} className={`bg-primary text-white w-full items-center justify-center flex p-4 select-none gap-2 cursor-pointer border-white border-y hover:bg-dark duration-300 ${tab === 4 && "bg-dark"}`}>
                    <BiSupport size={20}/>
                    <button className='uppercase font-bold text-lg'>Canlı Destek</button>
                    </li>
                <li onClick={() => setTab(5)} className={`bg-primary text-white w-full items-center justify-center flex p-4 select-none gap-2 cursor-pointer border-white border-y hover:bg-dark duration-300 ${tab === 5 && "bg-dark"}`}>
                    <AiFillSetting size={20}/>
                    <button className='uppercase font-bold text-lg'>Ayarlar</button>
                    </li>
                <li onClick={signOutAdmin} className={`bg-primary text-white w-full items-center justify-center flex p-4 select-none gap-2 cursor-pointer border-white border-y hover:bg-dark duration-300 ${tab === 6 && "bg-dark"}`}>
                    <RxExit size={20}/>
                    <button className='uppercase font-bold text-lg'>Çıkış</button>
                  </li>
            </ul>
        </div>

        <div className='w-[80%] max-md:w-full max-lg:w-[70%]'>
            
            {tab === 0 && <Urunler/>}
            {tab === 1 && <Kategori/>}
            {tab === 2 && <Siparis/>}
            {tab === 3 && <Campaigns/>}
            {tab === 4 && <Support/>}
            {tab === 5 && <Settings/>}
        </div>

        {addProduct ? <AddProduct setAddProduct={setAddProduct}/> : ""}

        <div onClick={() => setAddProduct(!addProduct)} className='bottom-8 right-8 fixed border border-dark bg-dark p-4 items-center justify-center cursor-pointer group duration-300 hover:bg-white rounded-full'> 
        <AiOutlineAppstoreAdd size={25} className='text-white group-hover:text-dark duration-300'/>
        </div>
    </div>
  )
}


export const getServerSideProps = async (contex) => {

    const myCookie = contex.req?.cookies || "";
    if (myCookie.token !== process.env.ADMIN_TOKEN) {
      return {
        redirect: {
          destination: "/abika",
          permament: false,
        }
      }
    }
  
    return {
      props : {
    
      }
    }
  }
export default Profil