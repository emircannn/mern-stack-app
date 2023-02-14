import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AiFillClockCircle } from 'react-icons/ai'
import {HiLockClosed} from 'react-icons/hi'
import { toast } from 'react-toastify';

const Settings = () => {

    const [settings, setSettings] = useState([])
    const [day, setDay] = useState("Hergün")
    const [clock, setClock] = useState("09.00-20.00")
    const [minwage, setMinwage] = useState(40)
    const router = useRouter()

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

    const handleStartWork = async(id) => {
        try {
            const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/settings/${id}`, {work: true})
            if(res.status === 200) {
                toast.success("Mesai Başladı!")
                setSettings([res.data, ...settings.filter((setting) => setting._id !== id)])
            }
        } catch (err) {
            console.log(err)
        }
    }

    const handleEndWork = async(id) => {
        try {
            const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/settings/${id}`, {work: false})
            if(res.status === 200) {
                toast.success("Mesai Sonlandırıldı!")
                setSettings([res.data, ...settings.filter((setting) => setting._id !== id)])
            }
        } catch (err) {
            console.log(err)
        }
    }

    const handleTime = async(id) => {
        try {
            const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/settings/${id}`, {day: day, clock: clock})
            if(res.status === 200) {
                toast.success("Çalışma Saatleri Ayarlandı!")
                setSettings([res.data, ...settings.filter((setting) => setting._id !== id)])
                setClock('')
                setDay('')
            }
        } catch (err) {
            console.log(err)
        }
    }

    const handleMinwage = async(id) => {
        try {
            const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/settings/${id}`, {minwage: minwage})
            if(res.status === 200) {
                toast.success("Min. Sepet Tutarı Ayarlandı!")
                setSettings([res.data, ...settings.filter((setting) => setting._id !== id)])
                router.reload()
            }
        } catch (err) {
            console.log(err)
        }
    }

  return (
    <div className='lg:p-8 lg:mt-0 mt-5 max-md:my-6 max-md:px-4  flex-1'>
        <h3 className='font-dancing text-[40px] text-primary font-bold'>Ayarlar</h3>

        {settings.map((setting) => (
            <div key={setting._id}>
            <h3 className='text-dark my-4 font-bold text-lg uppercase'>Mesai Ayarları</h3>
            <div className='flex items-center justify-between w-full gap-2'>
            <button onClick={()=> handleStartWork(setting._id)} disabled={setting.work === true} className='button !bg-dark !text-white flex-1 hover:!bg-primary border-none disabled:opacity-75 hover:!text-dark items-center flex justify-center gap-2'><AiFillClockCircle size={25}/> Mesai Başlangıcı</button>
            <button onClick={()=> handleEndWork(setting._id)} disabled={setting.work === false} className='button !bg-dark !text-white flex-1 hover:!bg-primary border-none disabled:opacity-75 hover:!text-dark items-center flex justify-center gap-2'><HiLockClosed size={25}/> Mesai Sonu</button>
            </div>

            <h3 className='text-dark mb-4 mt-8 font-bold text-lg uppercase'>Çalışma Saatleri Ayarı</h3>
            <div className='w-full flex items-center justify-center max-md:flex-col gap-2'>
                <input onChange={(e) => setClock(e.target.value)} type="text" placeholder='Saat Aralığı Örn. 09.00-19.30' className='outline-none px-4 py-2 flex-1 border w-full border-dark/50 focus:border-dark/75 rounded-full' />
                <input onChange={(e) => setDay(e.target.value)} type="text" placeholder='Çalışma Günleri Örn. Hergün' className='outline-none px-4 py-2 flex-1 border w-full border-dark/50 focus:border-dark/75 rounded-full' />
            </div>
            <button onClick={()=> handleTime(setting._id)} className='button !bg-dark !text-white w-full mt-2 hover:!bg-primary border-none disabled:opacity-75 hover:!text-dark items-center flex justify-center gap-2'>Çalışma Saatlerini Ayarla</button>
            
            <h3 className='text-dark mb-4 mt-8 font-bold text-lg uppercase'>Asgari Sepet Tutarı Ayarı</h3>
            <div className='w-full flex items-center justify-center max-md:flex-col gap-2'>
                <input onChange={(e) => setMinwage(e.target.value)} type="text" placeholder={`Min. Sepet Tutarı: ${setting.minwage}₺`} className='outline-none px-4 py-2 flex-1 border w-full border-dark/50 focus:border-dark/75 rounded-full' />
                <button onClick={()=> handleMinwage(setting._id)} className='button !bg-dark !text-white w-full flex-1 hover:!bg-primary border-none disabled:opacity-75 hover:!text-dark items-center flex justify-center gap-2'>Min. Sepet Tutarını Ayarla</button>
            </div>
            
        </div>
        ))}
    </div>
  )
}

export default Settings