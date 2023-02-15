import MenuItemWrapper from '../../components/product/MenuItemWrapper'
import Head from 'next/head'
import axios from 'axios'
import Chat from '../../components/Chat'
import { useEffect, useState } from 'react'

const Index = ({categoryList, productList}) => {

  /* const [productList, setProductList] = useState([])
  const [categoryList, setCategoryList] = useState([])

  useEffect(() => {
    const getAll = async () => {
      const category = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`)
      setCategoryList(category.data)
      const product = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`)
      setProductList(product.data)
    }
    getAll()
  }, []) */

  return (
    <div className='min-h-[calc(100vh_-_290px)] flex items-center justify-center'>
        <Head>
        <title>Menü</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <MenuItemWrapper productList={productList} categoryList={categoryList}/>
        <Chat/>
    </div>
  )
}

export async function getServerSideProps() {

  const category = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`)
  const product = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`)

  return {
    props: {
      categoryList: category.data ? category.data : [],
      productList: product.data ? product.data : []
    }
  }
}

export default Index