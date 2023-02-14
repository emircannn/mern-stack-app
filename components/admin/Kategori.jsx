import React, { useEffect, useState } from 'react'
import Input from '../form'
import {AiFillCloseCircle} from 'react-icons/ai'
import OutsideClickHandler from 'react-outside-click-handler';
import axios from 'axios';
import { toast } from 'react-toastify';


const Kategori = () => {

    const [inputText, setInputText] = useState("")
    const [title, setTitle] = useState("")
    const [categories, setCategories] = useState([])
    const [editTitle, setEditTitle] = useState(false)


    useEffect(() => {
        const getCategories = async () => {
          try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
            setCategories(res?.data);
          } catch (err) {
            console.log(err);
          }
        };
        getCategories();
      }, [setCategories]);

      const handleCreate = async () => {
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/categories`, 
            {title: inputText});
            setCategories([...categories, res?.data]);
            setInputText("")
            toast.success('Kategori Başarı İle Oluşturuldu!')
        } catch (err) {
            console.log(err);
        }
      };

      const handleDelete = async (id) => {
        try {
            if(confirm("Bu Kategoriyi Silmek İstediğinize Emin Misiniz?")){
                await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/categories/${id}`);
                setCategories(categories.filter((cat) => cat._id !== id));
                toast.success('Kategori Başarı İle Silindi!')
            }
        } catch (err) {
            console.log(err);
        }
      };

      /* const handleUpdate = async (id) => {
        try {
            if(confirm("Bu Kategoriyi Güncellemek İstediğinize Emin Misiniz?")){
                const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/categories/${id}`, {title: title})
                setCategories([ res?.data]);
                setEditTitle(false)
                toast.success("Güncelleme İşlemi Başarılı!")
            }
          } catch (err) {
            console.log(err)
          };
      } */
      
    

  return (
    <div className='lg:p-8 lg:mt-0 mt-5 max-md:px-4 flex-1 relative'>
        <h3 className='font-dancing font-bold text-[2.5rem] text-primary'>Kategoriler</h3>
        <div className='mt-5'>
        <div className='flex gap-2 flex-1 items-center'>
            <Input value={inputText} placeholder="Yeni Kategori Ekle..." onChange={(e) => setInputText(e.target.value)}/>
            <button className='py-2 px-4 rounded-full duration-300 font-semibold !bg-primary hover:!bg-dark text-white' onClick={handleCreate}>Ekle</button>
        </div>

        <div className="mt-10 pb-4">
            {categories.map((category) => (
                <div className='flex justify-between items-center mt-4' key={category._id}>
                <b className='text-xl max-md:text-lg text-dark'>{category.title}</b>
                <div className='flex items-center justify-center gap-2'>
                {/* <button onClick={() =>setEditTitle(!editTitle)} className="py-2 px-4 rounded-full duration-300 font-semibold !bg-primary hover:!bg-dark text-white">Güncelle</button> */}
                <button onClick={() => handleDelete(category._id)} className="py-2 px-4 rounded-full duration-300 font-semibold !bg-primary hover:!bg-dark text-white">Sil</button>
                </div>

                {/* {editTitle ? <div className='bg-black/75 z-10 opacity-100 duration-300 top-0 left-0 w-screen h-screen fixed flex items-center justify-center'>
                <OutsideClickHandler onOutsideClick={()=> setEditTitle(false)} >
                <div className='p-16 bg-primary rounded-3xl flex items-center justify-center flex-col gap-4 relative'>
                <h3 className='font-dancing font-bold text-white text-[2.5rem]'>Kategori Güncelleme</h3>
                <div className='flex flex-col w-full items-stretch justify-center gap-2 mt-4'>
                <Input value={title} placeholder={category.title} onChange={(e) => setTitle(e.target.value)}/>
                <button onClick={() => handleUpdate(category._id)} className="py-2 px-4 rounded-full duration-300 font-semibold !bg-white text-dark  hover:!bg-dark hover:!text-white">Güncelle</button>
                </div>
                <AiFillCloseCircle onClick={() =>setEditTitle(!editTitle)} className='absolute top-4 right-4 text-white hover:text-dark cursor-pointer' size={24}/>
                </div>
                </OutsideClickHandler>
                </div> : <div className='bg-black/75 z-10 opacity-0 duration-300 hidden top-0 left-0 w-screen h-screen fixed items-center justify-center'></div>} */}
                </div>
            ))}
        </div>
        </div>


    </div>
  )
}

export default Kategori