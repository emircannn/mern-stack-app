import { useFormik } from "formik";
import Input from '../../components/form'
import { girisSchema } from "../../schema/girisSchema";
import Head from "next/head";
import Link from "next/link";
import { getSession, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";


const Giris = () => {

  const {data : session} = useSession()
  const { push } = useRouter()

  const [currentUser, setCurrentUser] = useState()

  const onSubmit = async (values,actions) => {
    const {email, password} = values;
    let options = {redirect: false, email, password};

    try {
      const res = await signIn("credentials", options)
      push("/profil/" + currentUser?._id)
      actions.resetForm()
    } catch (err) {
      console.log(err)
      toast.error(err.response.data.message)
    }
  }

  useEffect(() => {
   const getUser = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`)
      setCurrentUser(res.data?.find((user) => user.email === session?.user?.email))
      session && push("/profil/" + currentUser?._id)
    } catch (err) {
      console.log(err);
    }
   }
   getUser()
  }, [session, push, currentUser])
  


  const {values, errors, touched, handleSubmit, handleChange, handleBlur} = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit,
    validationSchema: girisSchema
  })

  const inputs = [
    {
      id: 1,
        name: "email",
        type: "email",
        placeholder: "Email",
        value: values.email,
        errorMessage: errors.email,
        touched: touched.email,
    },
    {
      id: 2,
        name: "password",
        type: "password",
        placeholder: "Şifre",
        value: values.password,
        errorMessage: errors.password,
        touched: touched.password,
    },
  ]

  return (
    <div className='container max-md:px-4 mx-auto min-h-[calc(100vh_-_290px)] flex items-center justify-center'>
      <Head>
        <title>Giriş Yap</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <form onSubmit={handleSubmit} className="flex flex-col h-full items-center justify-center my-20 md:w-1/2 w-full mx-auto">
        <h3 className='font-dancing text-primary text-[40px] font-bold'>Giriş Yap</h3>
        
        <div className="flex flex-col gap-2 my-4 w-full">
          {inputs.map((input) => (
          <Input key={input.id}
          {...input}
          onChange={handleChange}
          onBlur={handleBlur}
          />
        ))}

        <div className='flex mt-5 w-full'>
          <button type="submit" className='button !w-full'>Giriş Yap</button>
        </div>
        <Link href="/oturum/kayit">
            <span className="text-sm underline text-secondary cursor-pointer">
              Hesabınız var mı?
            </span>
          </Link>
        </div>
      </form>
    </div>
  )
}

export async function getServerSideProps({req}) {
  const session = await getSession({req});

  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`)
  const user = res.data?.find((user) => user.email === session?.user?.email)
  if(session && user) {
      return {
        redirect: {
          destination: "/profil/" + user._id,
          permanent: false,
        },
      }
  }
  
  return {
    props: {},
  }

}

export default Giris