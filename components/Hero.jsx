import axios from 'axios'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'

const Hero = () => {

  const [campaigns, setCampaigns] = useState([])

  useEffect(() => {
    const getCampaigns = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/campaigns`)
        setCampaigns(res.data)
    }
    getCampaigns()
}, [])

const settings = {
  dots: false,
  infinite: true,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 8000,
};

  return (
    <div className='container mx-auto p-4'>
        <div className='max-h-[500px] w-full relative rounded-3xl'>
        {campaigns.length > 0 ? <Slider {...settings}>
            {campaigns.map((campaign) => (
              <div key={campaign._id} className='relative h-[500px] max-md:h-[250px]'>
              <Image className='max-h-[500px] w-full h-full object-cover rounded-3xl shadow-xl' height={5000} width={5000} alt='' priority src={campaign.img} />
            </div>
            ))}
        </Slider> 
        
        : 
            <div className='relative h-[500px] max-md:h-[250px]'>
              <Image className='max-h-[500px] w-full h-full object-cover rounded-3xl shadow-xl' height={5000} width={5000} alt='' priority src="/images/hero.png" />
            </div>
            }
        </div>
    </div>
  )
}

export default Hero

