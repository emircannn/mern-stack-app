import { useFormik } from 'formik'
import React from 'react'
import Input from '../../components/form'
import { adminSchema } from '../../schema/adminSchema'
import Head from "next/head";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const Admin = () => {

  const {push} = useRouter();

  const onSubmit = async (values, actions) => {
    try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/admin`, values)
        if (res.status === 200) {
            actions.resetForm();
            toast.success("Giriş İşlemi Başarılı!")
            push("abika/profil")
        }
    } catch (err) {
        console.log(err);
    }
};

    const {values, errors, touched, handleSubmit, handleChange, handleBlur} = useFormik({
        initialValues: {
        username: '',
        password: '',
        },
        onSubmit,
        validationSchema: adminSchema
      })

    const inputs = [
        {
            id: 1,
            name: "username",
            type: "text",
            placeholder: "Admin Girişi",
            value: values.username,
            errorMessage: errors.username,
            touched: touched.username
        },
        {
            id: 2,
            name: "password",
            type: "password",
            placeholder: "Şifre",
            value: values.password,
            errorMessage: errors.password,
            touched: touched.password
        }
    ]

  return (
    <div className='container mx-auto min-h-[calc(100vh_-_290px)] flex items-center justify-center'>
      <Head>
        <title>Admin Giriş</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
        <form onSubmit={handleSubmit} className="flex flex-col h-full items-center justify-center my-20 md:w-1/2 w-full mx-auto">
        <h3 className='font-dancing text-primary text-[40px] font-bold'>Admin Giriş</h3>

        <div className="flex flex-col gap-2 my-4 w-full"> 
            
            {inputs.map((input) => (
                <Input key={input.id} {...input}
                onChange={handleChange}
                onBlur={handleBlur}/>
            ))}

            <div className='flex mt-5 w-full'>
          <button type="submit" className='button !w-full'>Giriş Yap</button>
        </div>
        </div>
        </form>
    </div>
  )
}

export const getServerSideProps = (contex) => {
  const myCookie = contex.req?.cookies || "";
  if (myCookie.token === process.env.ADMIN_TOKEN) {
    return {
      redirect: {
        destination: "abika/profil",
        permament: false,
      }
    }
  }

  return {
    props : {
      
    }
  }
}

export default Admin