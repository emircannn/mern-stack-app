import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, increase, decrease, reset } from "../../redux/cartSlice"
import { useSession } from "next-auth/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Drinks from "../../components/Drinks";
import Chat from "../../components/Chat";



const Index = ({userList}) => {
    
    const cart = useSelector((state) => state.cart)
    const {data : session} = useSession()
    const products = cart.products
    const {push} = useRouter()
    const dispatch = useDispatch()
    const [message, setMessage] = useState("")
    const [settings, setSettings] = useState([])

    const user = userList?.find((user) => user.email === session?.user?.email)


    const newOrder = {
        customer: user?.name,
        products: cart.products,
        address : user?.address,
        phone: user?.phone,
        total: cart.total,
        method: 0,
        status: 0,
        message,
    }

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

        const minwage= settings.map((setting) => setting.minwage)

    const createOrder = async () => {
        try {
            if(session){
                if(confirm("Siparişi Tamamladığınıza Emin Misin?")){
                    if(minwage[0] < cart.total){
                        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/orders`, newOrder)
                    if(res.status === 200){
                        dispatch(reset())
                        push("/")
                        toast.success("Siparişiniz Başarı ile Tamamlandı!")
                    }
                    }
                    else{
                        toast.error("Sepet Tutarı, Min. Tutarın Altında!")
                    }
                }
            }else{
                toast.error("Sipariş Vermek İçin Oturum Açın!")
            }
        } catch (err) {
            console.log(err);
        }
    }


  return (
    <div className='min-h-[calc(100vh_-_290px)] flex items-center max-lg:px-4 flex-col justify-center  overflow-x-hidden'>
        <Head>
        <title>Sepet</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        
        <div className="container mx-auto">
        <div className={`${ products.length > 0 && 'grid grid-cols-4 w-full max-lg:grid-cols-3  max-md:grid-cols-2 gap-3 my-8'}`}>

{products.length > 0 ? products.map((product) => (
    <div key={product._id}  className='bg-primary rounded-xl overflow-hidden shadow-lg w-full relative'>
    <div className='overflow-hidden rounded-bl-[150px] rounded-t-xl'>
        <Image priority src={product.img} alt='' onClick={() => push(`/urun/${product._id}`)} width={500} height={500} className='object-cover w-full cursor-pointer h-[200px]  hover:scale-110 duration-300 rounded-bl-[150px] rounded-t-xl'/>
    </div>

    <div className='p-5 flex flex-col max-md:gap-2 max-md:p-3 gap-2 text-white'>
        <div className='flex items-center gap-4 justify-between'>
        <h3 className='text-lg max-md:text-sm font-bold select-none whitespace-nowrap text-ellipsis overflow-hidden'>{product.title}</h3>
        </div>
        {product.desc ? <p className='text-sm max-md:text-xs select-none whitespace-nowrap text-ellipsis overflow-hidden'>{product.desc}</p> : "-"}
        {/* <div className='flex flex-col gap-2'>
        <p className='text-sm max-md:text-xs select-none whitespace-nowrap text-ellipsis overflow-hidden'>İstemiyorum:</p>
        <div className="flex gap-2">
        {product.removeItems.length > 0 ? product.removeItems.map((ri) => (
            <p key={ri.id} className='text-sm max-md:text-xs line-through opacity-90 select-none whitespace-nowrap text-ellipsis overflow-hidden'>{ri.text},</p>
        )) : <p className='text-sm max-md:text-xs line-through opacity-90 select-none whitespace-nowrap text-ellipsis overflow-hidden text-primary'>.</p>}
        </div>
        </div> */}

        <div className="flex items-center mt-2 justify-end gap-2">
            <span className=" font-medium max-md:text-xs select-none text-white">Adet: </span>
            <FaMinus className='cursor-pointer' onClick={() => {
                if(product.quantity === 1){
                    if(window.confirm("Ürünü Silmek İstediğinize Emin Misiniz?")){
                        dispatch(decrease(product))
                    }
                }
                if(product.quantity > 1) {
                    dispatch(decrease(product))
                }
            }} size={13}/>
            <span className=" font-bold max-md:text-xs select-none text-white">{product.quantity}</span>
            <FaPlus className='cursor-pointer' onClick={() => dispatch(increase(product))} size={13}/>
        </div>
        <div className='flex items-center gap-2 justify-end'>
        <span className=' font-semibold max-md:text-sm select-none flex justify-end'>Fiyat: <span className={`${ product.discount && 'line-through ml-1 opacity-80'}`}>
            {product.price.toFixed(2)}₺</span> 
        {product.discount && <span className='ml-2'> {product.discount.toFixed(2)}₺</span>}</span>
        </div>
        <div className='flex items-center justify-center gap-2'>
        <button  className='button !bg-white flex-1 !text-primary hover:!bg-dark hover:!text-white' onClick={()=> dispatch(deleteProduct(product))}>Sil</button>
        </div>
    </div>

    {product.discount && <span className='absolute max-md:top-2 max-md:right-2 max-md:text-xs top-4 right-4 text-white font-bold bg-primary p-2 rounded-full text-sm'>İndirim</span>}
    </div>
)) : <div className="flex items-center justify-center w-full h-full min-h-[400px]"><h2 className="font-bold text-2xl text-dark">Sepetiniz Boş!</h2></div>}

</div>
        </div>

                {
                    products.length > 0 && <div className="flex items-center justify-center px-8 max-md:px-4 my-4 w-full">
                    <Drinks/>
                    </div>
                }

        <div className='flex flex-col w-1/3 max-md:w-full bg-gray-200 p-4 gap-4 my-4 rounded-2xl items-center justify-center'>
            {products.length > 0 && <input type="text" value={message} placeholder="Sipariş Notunuz..." onChange={(e) => setMessage(e.target.value)}
            className="w-full px-4 py-2 rounded-full outline-none border max-md:px-2 max-md:py-1 max-md:text-sm border-dark/25" />}
            <div className='flex flex-col'>
            <span className='text-lg font-medium text-dark select-none'>Ara Toplam: <span className='font-bold'>{cart.subtotal > 0 ? (cart.subtotal).toFixed(2): cart.subtotal} ₺</span></span>
            <span className='text-lg font-medium text-dark select-none'>İndirim: <span className='font-bold'>{cart.discount > 0 ? (cart.discount).toFixed(2) : cart.discount} ₺</span></span>
            <span className='text-lg font-medium text-dark select-none'>Toplam: <span className='font-bold'>{cart.total > 0 ? (cart.total).toFixed(2) : cart.total} ₺</span></span>
            {settings.map((setting) => setting.minwage > cart.total && <span key={setting._id} className='text-lg font-medium text-dark select-none'>{cart.total === 0 ? "Min. Tutar" : "Eksik Sepet Tutarı:"} <span className='font-bold'>{(setting.minwage - cart.total).toFixed(2)} ₺</span></span>)}
            </div>
            {settings.map((setting) => <button key={setting._id} disabled={setting.work === false} className='button !w-full disabled:opacity-80 hover:!bg-dark !text-white' 
            onClick={createOrder}>{setting.work === true ? "Siparişi Tamamla" : "Mesai Saati Dışı"}</button>)}
        </div>

        <Chat/>
    </div>
  )
}

export const getServerSideProps = async () => {
  
    const category = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`)
  
    return {
      props: {
        userList: category.data ? category.data : [],
      }
    }
  } 

export default Index