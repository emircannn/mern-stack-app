import React from 'react'
import Categories from '../Categories'
import Chat from '../Chat'
import HeadlineCards from '../HeadlineCards'
import Hero from '../Hero'
import MenuItemWrapper from '../product/MenuItemWrapper'

const Home = ({categoryList, productList}) => {
   
  return (
    <div>
      <Hero/>
      <HeadlineCards product={productList}/>
      <MenuItemWrapper categoryList={categoryList} productList={productList} />
      <Categories/>
      <Chat/>
    </div>
  )
}

export default Home