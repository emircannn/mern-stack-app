/* eslint-disable @next/next/no-img-element */
import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { AiFillCloseCircle } from 'react-icons/ai'
import { toast } from 'react-toastify'

const Index = ({product}) => {

  const {push} = useRouter()

  const [file, setFile] = useState()
    const [srcImage, setSrcImage] = useState()

    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("-")
    const [category, setCategory] = useState("menüler")
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

    const handleUpdate = async (id) => {
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
                /* extraOptions, */
                isActive: isActive,
            }

            if(discount < price) {

            const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, newProduct,)

            if (res.status === 200) {
                push("/abika/profil")
                toast.success("Ürün Başarıyla Güncellendi");
            }

          } else {
              toast.error("İndirimli Fiyat, Ürün Fiyatından Yüksek Olamaz!");
          }
            

        } catch (err) {
            console.log(err)
            toast.error("Ürün Güncellenmesi Başarısız!");
        }
    };

  return (
    <div className='container mx-auto min-h-[calc(100vh_-_290px)] flex items-center justify-center'>
      <Head>
        <title>{product.title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
         <div className='fixed overflow-y-auto overflow-x-hidden top-0 left-0 flex bg-black/95 w-screen h-screen items-center justify-center'>

        
            <div className='bg-primary w-[600px] p-8 rounded-2xl relative'>
            <h3 className='font-dancing text-white text-[40px] text-center font-bold'>Ürünü Düzenle</h3>
            <div className="flex flex-col gap-2 my-4 w-full">

            <div className='flex flex-col text-sm text-white my-2'>
                           <label className='flex gap-4 items-center flex-col-reverse justify-center'>
                            <input className='hidden' required type="file" onChange={(e) => handleOnChange(e)}/>
                            <span className='py-2 cursor-pointer items-center justify-center flex px-4 rounded-full duration-300 font-semibold !bg-dark hover:!bg-white
                             hover:!text-dark w-full text-white'>Resim Seç</span>
                            {srcImage && <img src={srcImage} alt="" className='w-32 h-32 rounded-full object-cover mt-4' />}
                           </label>
                        </div>

                        <div className='flex flex-col text-sm text-white mt-2'>
                            <span className='font-semibold'>Ürün Başlığı</span>
                            <input onChange={(e) => setTitle(e.target.value)} required className='border w-full rounded-full focus:border-secondary/50 
                            p-2 outline-none text-secondary mt-1' type="text" placeholder={product.title}/>
                        </div>

                        <div className='flex flex-col text-sm text-white mt-2'>
                            <span className='font-semibold'>Ürün Açıklaması</span>
                            <textarea onChange={(e) => setDesc(e.target.value)} className='border w-full focus:border-secondary/50 p-2 
                            outline-none text-secondary mt-1 rounded-3xl' type="text" placeholder={product.desc}/>
                        </div>

                        <div className='flex flex-col text-sm text-white mt-2'>
                            <span className='font-semibold'>Fiyat</span>
                            <div className='flex items-center justify-center'>
                                <input placeholder={product.price} required type="number" className='border w-full focus:border-secondary/50 p-2 
                            outline-none text-secondary mt-1 rounded-full' 
                            onChange={(e) => setPrice(e.target.value)}/>
                        </div>
                        </div>


                        <div className='flex flex-col text-sm text-white mt-2'>
                            <span className='font-semibold'>Ürün Kategorisi</span>
                            <select className='border w-full focus:border-secondary/50 p-2 
                            outline-none text-secondary mt-1 rounded-full' 
                            name="" id="" onChange={(e) => setCategory(e.target.value)}>
                                {categories.length > 0 && categories.map((c) =>(
                                    <option key={c._id} value={c.title.toLowerCase()}>{c.title}</option>
                                ))}
                            </select>
                        </div>

{/*                     <div className='flex flex-col text-sm text-white mt-2'>
                            <span className='font-semibold'>İstemiyorum</span>
                            <div className='flex items-center justify-center gap-2'>
                                <input placeholder='İstemiyorum' type="text" className='border w-full focus:border-secondary/50 p-2 
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
                <button onClick={() => handleUpdate(product._id)}  className='py-2 px-4 rounded-full disabled:opacity-50 duration-300 font-semibold !bg-dark hover:!bg-white hover:!text-dark w-full text-white'>Ürünü Düzenle</button>
            </div>

      </div>

            <AiFillCloseCircle onClick={() =>push("/abika/profil")} className='absolute top-4 right-4 text-white hover:text-dark cursor-pointer' size={24}/>
            </div>

    </div>
    </div>
  )
}

export const getServerSideProps = async ({params}) => {

  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/${params.id}`)
    
  
    return {
      props : {
        product: res.data ? res.data : null,
      }
    }
  }

export default Index