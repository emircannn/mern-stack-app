import * as Yup from 'yup';

export const categorySchema = Yup.object({
    category: Yup.string().required("Bu Alan Boş Bırakılamaz!").min(3, 'Kategori Adı 3 harften az olamaz!'),
    
}) 