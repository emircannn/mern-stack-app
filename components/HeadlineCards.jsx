import Image from 'next/image'
import Link from 'next/link'
import Slider from 'react-slick'

const HeadlineCards = ({product}) => {

    const activeProducts = product?.filter((activeProduct) => 
    {return activeProduct.isActive === true}
    )

    const discountProucts = activeProducts?.filter((discountProduct) => { return discountProduct.discount !== null})

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
              breakpoint: 1278,
              settings: {
                slidesToShow: 3,
                arrows: false,
              },
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 2,
                arrows: false,
              },
            },
            {
              breakpoint: 500,
              settings: {
                slidesToShow: 1,
                arrows: false,
              },
            },
          ],
      };


  return (
    <div className='container mx-auto p-4 py-8'>
        <Slider  {...settings}>
        {discountProucts.length > 3 && discountProucts.map((discountProduct) => 

        <div key={discountProduct._id} className=" flex items-center justify-center " >
            <div  className='rounded-xl cursor-pointer group mx-4 overflow-hidden relative'>
            <Link href={`/urun/${discountProduct._id}`}>
            <div  className='absolute w-full z-10 h-full bg-black/70 group-hover:bg-black/50 duration-300 rounded-xl text-white flex flex-col gap-2 justify-center items-center'>
                <div className='bg-primary items-center flex justify-center flex-col p-2 group-hover:bg-secondary transition-all duration-300 group-hover:rounded-full'>
                <p className='text-2xl max-lg:text-lg max-lg:font-semibold text-center font-bold uppercase'>İndirimli Lezzetler</p>
                </div>
                <p className='text-xl max-lg:text-lg max-lg:font-medium text-center font-semibold uppercase'>{discountProduct.title}</p>
            </div>
            <div className='relative h-[160px] md:h-[200px] w-full'>
                <Image src={discountProduct.img} priority width={1000} height={1000} className='rounded-xl duration-300 group-hover:scale-110 w-full h-full object-cover' alt={discountProduct.title} />
            </div>
        </Link>
        </div>
        </div>
        )}
        </Slider>

        {   discountProucts.length < 4 && 
            <div className='grid grid-cols-3 max-md:grid-cols-1 gap-4'>
                <div className='rounded-xl relative'>
                    <div className='absolute w-full z-10 h-full bg-black/50 rounded-xl text-white flex flex-col gap-3 justify-center items-center'>
                            <p className='text-2xl max-md:text-xl font-bold uppercase'>Menüler</p>
                            <Link href="/menu">
                                <button className='button'>Sipariş Ver</button>
                            </Link>
                        </div>
                        <div className='relative h-[160px] md:h-[200px] w-full'>
                        <Image src="/images/menu.webp" width={1000} height={1000} priority className='rounded-xl w-full h-full object-cover' alt="" />
                        </div>
                </div>

                <div className='rounded-xl relative'>
                    <div className='absolute z-10 w-full h-full bg-black/50 rounded-xl text-white flex flex-col gap-3 justify-center items-center'>
                        <p className='text-2xl max-md:text-xl font-bold uppercase'>Tost Çeşitleri</p>
                        <Link href="/menu">
                        <button className='button'>Sipariş Ver</button>
                        </Link>
                    </div>
                    <div className='relative h-[160px] md:h-[200px] w-full'>
                        <Image src="/images/tost.jpg" width={1000} height={1000} priority className='rounded-xl w-full h-full object-cover' alt="" />
                    </div>
                </div>

                <div className='rounded-xl relative'>
                    <div className='absolute z-10 w-full h-full bg-black/50 rounded-xl text-white flex flex-col gap-3 justify-center items-center'>
                        <p className='text-2xl max-md:text-xl font-bold uppercase'>Tatlı Çeşitleri</p>
                        <Link href="/menu">
                        <button className='button'>Sipariş Ver</button>
                        </Link>
                    </div>
                    <div className='relative h-[160px] md:h-[200px] w-full'>
                        <Image src="/images/tatli.png" width={1000} height={1000} priority className='rounded-xl w-full h-full object-cover' alt="" />
                    </div>
                </div> 
            </div>
        }
    </div>
  )
}

export default HeadlineCards

