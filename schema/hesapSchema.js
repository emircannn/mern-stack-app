import * as Yup from 'yup';

export const hesapSchema = Yup.object({
        email: Yup.string().required("Bu Alan Boş Bırakılamaz!")
        .email("Geçersiz Email Adresi!"),
        name: Yup.string().required("Bu Alan Boş Bırakılamaz!").
        min(3, "Ad Soyad Alanı 3 karakterden az olamaz!"),
        phone: Yup.string().required("Telefon NumarasAlanı Boş Bırakılamaz!").min(10, "Telefon Numarası 10 karakterden az olamaz!"),
        address: Yup.string().required("Bu Alan Boş Bırakılamaz!").min(8, "Adres Alanı 8 karakterden az olamaz!")
}) 