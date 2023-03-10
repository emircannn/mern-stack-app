/* eslint-disable @next/next/no-img-element */
import axios from "axios"
import { useEffect, useState } from "react"
import { AiFillCloseCircle } from "react-icons/ai"
import OutsideClickHandler from "react-outside-click-handler"
import { toast } from "react-toastify"


const AddProduct = ({setAddProduct}) => {

    const [file, setFile] = useState()
    const [srcImage, setSrcImage] = useState()

    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [category, setCategory] = useState("hamburger")
    const [categories, setCategories] = useState([])
    const [price, setPrice] = useState(0)
    const [discount, setDiscount] = useState(null)
/*     const [extra, setExtra] = useState("")
    const [extraOptions, setExtraOptions] = useState([]) */
    
    useEffect(() => {
      const getCategories = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`)
            setCategories(res?.data)
        } catch (err) {
            console.log(err);
        }
      }
      getCategories()
    }, [])
    


/*     const handleExtra = (e) => {
        if (extra) {
          if (extra.text) {
            setExtraOptions((prev) => [...prev, extra]);
          }
        }
    }; */

    const handleOnChange = (changeEvent) => {
        const reader = new FileReader();
        reader.onload = (onLoadEvent) => {
            setSrcImage(onLoadEvent.target.result)
            setFile(changeEvent.target.files[0])
        }

        reader.readAsDataURL(changeEvent.target.files[0])
    }

    const handleCreate = async () => {
        const data = new FormData()
        data.append('file', file) 
        data.append('upload_preset', 'dmn-izgara')

        
        try {
            const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/dmlbtwped/image/upload", data)
            const {url} = uploadRes.data
            const isActive = true

            const newProduct = {
                img: url,
                title,
                desc,
                category: category.toLowerCase(),
                price,
                discount,
                /* extraOptions, */
                isActive: isActive,
            }

            if(discount < price) {
                const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/products`, newProduct,)

            if (res.status === 200) {
                setAddProduct(false)
                toast.success("??r??n Ba??ar??yla Y??klendi");
            }

            } else {
                toast.error("??ndirimli Fiyat, ??r??n Fiyat??ndan Y??ksek Olamaz!");
            }

        } catch (err) {
            console.log(err)
            toast.error("??r??n Y??klemesi Ba??ar??s??z!");
        }
    };




  return (
    <div className='fixed overflow-y-auto overflow-x-hidden top-0 left-0 flex bg-black/75 w-screen h-screen items-center justify-center'>
        <OutsideClickHandler onOutsideClick={()=> setAddProduct(false)} >
        
            <div className='bg-primary w-[600px] p-8 rounded-2xl relative'>
            <h3 className='font-dancing text-white text-[40px] text-center font-bold'>??r??n Olu??tur</h3>
            <div className="flex flex-col gap-2 my-4 w-full">

            <div className='flex flex-col text-sm text-white my-2'>
                           <label className='flex gap-4 items-center flex-col-reverse justify-center'>
                            <input className='hidden' required type="file" onChange={(e) => handleOnChange(e)}/>
                            <span className='py-2 cursor-pointer items-center justify-center flex px-4 rounded-full duration-300 font-semibold !bg-dark hover:!bg-white
                             hover:!text-dark w-full text-white'>Resim Se??</span>
                            {srcImage && <img src={srcImage} alt="" className='w-32 h-32 rounded-full object-cover mt-4' />}
                           </label>
                        </div>

                        <div className='flex flex-col text-sm text-white mt-2'>
                            <span className='font-semibold'>??r??n Ba??l??????</span>
                            <input onChange={(e) => setTitle(e.target.value)} required className='border w-full rounded-full focus:border-secondary/50 
                            p-2 outline-none text-secondary mt-1' type="text" placeholder='Bir ??r??n Ad?? Yaz??n...'/>
                        </div>

                        <div className='flex flex-col text-sm text-white mt-2'>
                            <span className='font-semibold'>??r??n A????klamas??</span>
                            <textarea onChange={(e) => setDesc(e.target.value)} className='border w-full focus:border-secondary/50 p-2 
                            outline-none text-secondary mt-1 rounded-3xl' type="text" placeholder='Bir ??r??n A????klamas?? Yaz??n...'/>
                        </div>

                        <div className='flex flex-col text-sm text-white mt-2'>
                            <span className='font-semibold'>Fiyat</span>
                            <div className='flex items-center justify-center'>
                                <input placeholder='Fiyat' required type="number" className='border w-full focus:border-secondary/50 p-2 
                            outline-none text-secondary mt-1 rounded-full' 
                            onChange={(e) => setPrice(e.target.value)}/>
                        </div>
                        </div>

                        <div className='flex flex-col text-sm text-white mt-2'>
                            <span className='font-semibold'>??ndirimli Fiyat</span>
                            <div className='flex items-center justify-center gap-4'>
                                <input placeholder='??ndirimli Fiyat' type="number" className='border w-full focus:border-secondary/50 p-2 outline-none text-secondary mt-1 rounded-full' 
                                onChange={(e) => setDiscount(e.target.value)}/>
                        </div>
                        </div>


                        <div className='flex flex-col text-sm text-white mt-2'>
                            <span className='font-semibold'>??r??n Kategorisi</span>
                            <select className='border w-full focus:border-secondary/50 p-2 
                            outline-none text-secondary mt-1 rounded-full' 
                            name="" id="" onChange={(e) => setCategory(e.target.value)}>
                                {categories.length > 0 && categories.map((c) =>(
                                    <option key={c._id} value={c.title.toLowerCase()}>{c.title}</option>
                                ))}
                            </select>
                        </div>

{/*                     <div className='flex flex-col text-sm text-white mt-2'>
                            <span className='font-semibold'>??stemiyorum</span>
                            <div className='flex items-center justify-center gap-2'>
                                <input placeholder='??stemiyorum' type="text" className='border w-full focus:border-secondary/50 p-2 
                            outline-none text-secondary mt-1 rounded-full' 
                            name="text"  onChange={(e) => setExtra({ ...extra, [e.target.name]: e.target.value })
                              }/>

                            <span onClick={handleExtra} className='py-2 cursor-pointer items-center justify-center flex px-4 rounded-full duration-300 font-semibold !bg-dark hover:!bg-white hover:!text-dark w-full text-white' >Ekle</span>
                            </div>

                            <div className='mt-2 flex gap-2 items-center'>
                                {extraOptions.map((item, index) => (
                                    <span key={index} className='cursor-pointer inline-block 
                                    text-xs border border-white p-2 rounded-2xl' onClick={() => {
                                        setExtraOptions(extraOptions.filter((_,i) => i !== index))
                                    }}>{item.text}</span>
                                ))}
                                
                            </div>
                        </div> */}

            <div className='flex mt-5 w-full'>
                <button onClick={handleCreate}  className='py-2 px-4 rounded-full disabled:opacity-50 duration-300 font-semibold !bg-dark hover:!bg-white hover:!text-dark w-full text-white'>??r??n Olu??tur</button>
            </div>

      </div>

            <AiFillCloseCircle onClick={() =>setAddProduct(false)} className='absolute top-4 right-4 text-white hover:text-dark cursor-pointer' size={24}/>
            </div>
        </OutsideClickHandler>
    </div>
  )
}

export default AddProduct