import { useFormik } from "formik";
import Input from '../form/index'
import { sifreSchema } from "../../schema/sifreSchema";
import { toast } from "react-toastify";
import axios from "axios";

const Sifre = ({user}) => {

  const onSubmit = async (values) => {
    try {
        const res = await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/users/${user._id}`, values);
        toast.success("Şifre Güncelleme İşlemi Başarılı!")
      } catch (err) {
        console.log(err);
        toast.success("Şifre Güncelleme İşlemi Başarısız!")
      }
};
    
      const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
        useFormik({
          initialValues: {
            password: "",
            confirmPassword: "",
          },
          onSubmit,
          validationSchema: sifreSchema,
        });
    
      const inputs= [
        {
            id: 1,
              name: "password",
              type: "password",
              placeholder: "Şifre",
              value: values.password,
              errorMessage: errors.password,
              touched: touched.password,
          },
          {
            id: 2,
              name: "confirmPassword",
              type: "password",
              placeholder: "Şifre Tekrarı",
              value: values.confirmPassword,
              errorMessage: errors.confirmPassword,
              touched: touched.confirmPassword,
          },
      ]

  return (
    <form className='lg:p-8 lg:mt-0 mt-5 max-md:my-6 max-md:px-4 flex-1' onSubmit={handleSubmit}>
        <h3 className="font-dancing text-[40px] font-bold text-primary select-none">Şifre</h3>
        <div className='grid lg:grid-cols-2 grid-cols-1 gap-4 mt-4'>
            {inputs.map((input) => (
                <Input key={input.id} {...input} onChange={handleChange} onBlur={handleBlur}/>
            ))}
        </div>
        <button type='submit' className="button hover:!bg-dark hover:!text-white mt-4">Güncelle</button>
    </form>
  )
}

export default Sifre