import { useFormik } from "formik";
import Input from '../../components/form'
import { kayitSchema } from "../../schema/kayitSchema";
import Head from "next/head";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const Kayit = () => {

  const { push} = useRouter();

  const onSubmit = async (values, actions) => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/register`, values)

      if(res.status === 200) {
          toast.success("Kayıt İşlemi Başarılı!")
          push("/oturum/giris")
      }

    } catch (err) {
      toast.error(err.response.data.message)
      console.log(err);
    }

    actions.resetForm()
  }

  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    useFormik({
      initialValues: {
        name: "",
        password: "",
        confirmPassword: "",
        email: "",
        phone: "",
        address: "",
      },
      onSubmit,
      validationSchema: kayitSchema,
    });

  const inputs= [
    {
      id: 1,
        name: "name",
        type: "text",
        placeholder: "İsim-Soyisim",
        value: values.name,
        errorMessage: errors.name,
        touched: touched.name,
    },
    {
      id: 2,
        name: "email",
        type: "email",
        placeholder: "Email",
        value: values.email,
        errorMessage: errors.email,
        touched: touched.email,
    },
    {
      id: 3,
        name: "phone",
        type: "number",
        placeholder: "Telefon No",
        value: values.phone,
        errorMessage: errors.phone,
        touched: touched.phone,
    },
    {
      id: 4,
        name: "address",
        type: "text",
        placeholder: "Adres",
        value: values.address,
        errorMessage: errors.address,
        touched: touched.address,
    },
    {
      id: 5,
        name: "password",
        type: "password",
        placeholder: "Şifre",
        value: values.password,
        errorMessage: errors.password,
        touched: touched.password,
    },
    {
      id: 6,
        name: "confirmPassword",
        type: "password",
        placeholder: "Şifre Tekrarı",
        value: values.confirmPassword,
        errorMessage: errors.confirmPassword,
        touched: touched.confirmPassword,
    },
]

  return (
    <div className='container max-md:px-4 mx-auto min-h-[calc(100vh_-_290px)] flex items-center justify-center'>
      <Head>
        <title>Kayıt Ol</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <form onSubmit={handleSubmit} className="flex flex-col h-full items-center justify-center my-20 md:w-1/2 w-full mx-auto">
      <h3 className='font-dancing text-primary text-[40px] font-bold'>Kayıt Ol</h3>
      <div className="flex flex-col gap-2 my-4 w-full">

      {inputs.map((input) => (
        <Input key={input.id} {...input}
        onChange={handleChange}
        onBlur={handleBlur}/>
      ))}

      <div className='flex mt-5 w-full'>
        <button type="submit" className='button !w-full'>Kayıt Ol</button>
      </div>

      <Link href="/oturum/giris">
            <span className="text-sm underline text-secondary cursor-pointer">
              Hesabım zaten var.
            </span>
      </Link>
      </div>
      </form>

    </div>
  )
}

export default Kayit