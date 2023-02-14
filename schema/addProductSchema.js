import * as Yup from 'yup';

export const addProductSchema = Yup.object({
        title: Yup.string().required("Bu Alan Boş Bırakılamaz!"),
        desc: Yup.string(),
        price: Yup.number().required("Bu Alan Boş Bırakılamaz!"),
        discount: Yup.number()
}) 