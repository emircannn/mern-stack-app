/* eslint-disable @next/next/no-img-element */
import axios from 'axios'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const Campaigns = () => {

    const [file, setFile] = useState()
    const [srcImage, setSrcImage] = useState()
    const [campaigns, setCampaigns] = useState([])

    useEffect(() => {
        const getCampaigns = async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/campaigns`)
            setCampaigns(res.data)
        }
        getCampaigns()
    }, [])
    

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

            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/campaigns`, {img: url})

            if (res.status === 200) {
                toast.success("Kampanya Oluşturuldu!")
                setSrcImage(null)
            }
        } 
        catch (err) {
            console.log(err)
            toast.error("Kampanya Oluşturma İşlemi Başarısız!")
        }
    }

    const handleDelete = async (id) => {
        try {
            if(confirm("Kampanyayı Silmek İstediğinize Emin Misiniz?")){
                const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/campaigns/${id}`)
            if (res.status === 200) {
                toast.success("Kampanya Silindi!")
                setCampaigns(campaigns.filter((cam) => cam._id !== id));
            }
        }
        } catch (err) {
            console.log(err);
        }
    }

  return (
    <div className='lg:p-8 lg:mt-0 mt-5 max-md:px-4 flex-1 max-md:my-8'>
        <h3 className='font-dancing font-bold text-[2.5rem] text-primary'>Kampanyalar</h3>

        <div className='flex flex-col text-white my-2'>
            <label className='flex gap-4 items-center flex-col-reverse justify-center'>
                <input className='hidden' required type="file" onChange={(e) => handleOnChange(e)}/>
                <span className='py-2 cursor-pointer items-center justify-center flex px-4 rounded-full duration-300 font-semibold !bg-dark hover:!bg-white
                hover:!text-dark w-full text-white border border-dark'>Resim Seç <span className='ml-2 text-xs opacity-75'>-Önerilen Boyut: 1500 x 500-</span></span>
                {srcImage && <img src={srcImage} alt="" className='w-full h-24 rounded-full object-cover mt-4' />}
            </label>
        </div>

        <button onClick={handleCreate} className='py-2 cursor-pointer items-center justify-center flex px-4 rounded-full duration-300 font-semibold !bg-dark hover:!bg-white
        hover:!text-dark w-full text-white border border-dark'>Kampanya Oluştur</button>

        <h3 className='text-dark mb-4 mt-8 font-bold text-lg uppercase'>Kampanyalar</h3>

        <ul className='mt-4 flex flex-col items-center justify-center gap-2'>
            {campaigns.length > 0 ? campaigns.map((campaign) => (
                <li onClick={()=> handleDelete(campaign._id)} key={campaign._id} className='w-full h-28 rounded-full relative overflow-hidden group shadow-lg cursor-pointer'>
                <Image alt='' src={campaign.img} className='w-full h-full group-hover:scale-105 duration-300 object-cover rounded-full' width={1000} height={1000}/>
                <span className='absolute top-0 left-0 bg-black/75 w-full h-full group-hover:bg-black/50 duration-300 rounded-full flex items-center justify-center'>
                    <span className='text-white font-semibold text-lg opacity-0 group-hover:opacity-100 duration-300 uppercase tracking-widest'>Silmek İçin Tıklayınız</span>
                </span>
            </li>
            )): <b>Henüz Kampanya Oluşturulmadı</b>}
        </ul>
    </div>
  )
}

export default Campaigns