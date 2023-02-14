import * as Yup from 'yup';

export const adminSchema = Yup.object({
    username: Yup.string().required("Bu Alan Boş Bırakılamaz!"),
    password: Yup.string().required("Bu Alan Boş Bırakılamaz!")
        .min(8, "Şifre 8 karakterden az olamaz!")
}) 