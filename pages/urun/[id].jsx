import Head from "next/head";
import Image from "next/image";
import { addProduct } from "../../redux/cartSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import Chat from "../../components/Chat";




const Index = ({food}) => {


    const dispatch = useDispatch()
    /* const [removeItems, setRemoveItems] = useState([]) */

    /* const handleChange = (e, item) => {
        const checked = e.target.checked;

        if (checked) {
            setRemoveItems([...removeItems, item]);
        }
        else {
            setRemoveItems(removeItems.filter((ri) => ri.id !== item.id));
        }
    } */


    const handleAdd = () => {
        dispatch(addProduct({...food, quantity : 1 }))
    }


  return (
    <div className='min-h-[calc(100vh_-_290px)] flex items-center max-md:flex-col justify-between gap-8 h-full w-full'>
        <Head>
        <title>{food.title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>

        <div className="w-full max-md:h-[18.75rem] h-[calc(100vh_-_290px)] relative">
        <Image alt="" src={food.img} className="w-full h-full object-cover object-center" priority width={2000} height={2000}/>
        {/* <span className="w-full h-full absolute top-0 left-0 bg-black/50"></span> */}
        </div>

        <div className="container mx-auto">

            <div className="flex justify-center flex-col gap-4 max-md:px-4 my-32 w-full">
            <h1 className="text-[2.5rem] font-bold select-none font-dancing text-primary">{food.title}</h1>
            <h4 className="text-lg font-medium select-none">{food.desc}</h4>
            
            {/* <div className="flex flex-col gap-2">
            <span className="font-semibold select-none">İstemiyorum:</span>

            <div className="flex items-center gap-2">

             {food.extraOptions.map((item, e) => (
                <label key={item._id} className='flex items-center gap-1'>
                <input type="checkbox" onChange={(e) => handleChange(e, item)} className='w-5 h-5 accent-primary cursor-pointer' />
                        <span className='text-sm font-semibold select-none text-dark'>{item.text}</span>
                </label>
             ))}

            </div>

            </div> */}

            {/* <div className="flex items-center mt-2 gap-2">
                        <span className=" font-medium select-none">Adet: </span>
                        <FaMinus className='cursor-pointer' onClick={handleMinus} size={13}/>
                        <span className=" font-bold select-none ">{count}</span>
                        <FaPlus className='cursor-pointer' onClick={handlePlus} size={13}/>
            </div> */}

            <span className="font-medium text-lg select-none">Fiyat: <span className={`${food.discount && "font-semibold line-through opacity-80"} font-bold`}>{food.price.toFixed(2)}₺</span> {food.discount &&<span className="font-bold">{food.discount.toFixed(2)}</span>}</span>

            <button onClick={handleAdd} className="button !bg-primary !text-white hover:!bg-dark w-48 mt-4">Sepete Ekle</button>
            </div>

        </div>
        <Chat/>
    </div>
  )
}

export const getServerSideProps = async ({params}) => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/${params.id}`)
    const product = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`)

    return {
      props : {
        food: res.data ? res.data : null,
      }
    }
}

export default Index