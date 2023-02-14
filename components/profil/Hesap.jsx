import { useFormik } from "formik";
import Input from '../form/index'
import { hesapSchema } from "../../schema/hesapSchema";
import { toast } from "react-toastify";
import axios from "axios";

const Hesap = ({user}) => {

  const onSubmit = async (values) => {
    try {
        const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/users/${user._id}`, values);
        toast.success("Güncelleme İşlemi Başarılı!")
    } catch (err) {
        console.log(err);
        toast.danger("Güncelleme İşlemi Başarısız!")
    }
};
    
      const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
        useFormik({
          initialValues: {
            name: user?.name,
            email: user?.email,
            phone: user?.phone,
            address: user?.address,
          },
          onSubmit,
          validationSchema: hesapSchema,
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
            type: "text",
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
      ]

  return (
    <form className='lg:p-8 lg:mt-0 mt-5 max-md:my-6 max-md:px-4  flex-1' onSubmit={handleSubmit}>
        <h3 className="font-dancing text-[40px] font-bold text-primary select-none">Hesap Ayarları</h3>
        <div className='grid lg:grid-cols-2 grid-cols-1 gap-4 mt-4'>
            {inputs.map((input) => (
                <Input key={input.id} {...input} onChange={handleChange} onBlur={handleBlur}/>
            ))}
        </div>
        <button type='submit' className="button hover:!bg-dark hover:!text-white mt-4">Güncelle</button>
    </form>
  )
}

export default Hesap