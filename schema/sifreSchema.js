import * as Yup from 'yup';

export const sifreSchema = Yup.object({
    
        password: Yup.string().required("Bu Alan Boş Bırakılamaz!")
        .min(8, "Şifre 8 karakterden az olamaz!")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.-_%$#?&!@])[A-Za-z\d.-_%$#?&!@]{8,}$/,
        "En az bir tane büyük, küçük harf ve özel karakter olmak zorundadır!"),
        confirmPassword: Yup.string().required("Bu Alan Boş Bırakılamaz!")
        .oneOf([Yup.ref('password'), null], "Şifreniz eşleşmiyor!"),
}) 