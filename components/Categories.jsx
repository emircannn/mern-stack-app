import Image from 'next/image';
import Slider from 'react-slick'

const Categories = () => {

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
              breakpoint: 768,
              settings: {
                slidesToShow: 2,
                arrows: false,
              },
            },
          ],
      };

  return (
    <div className='container mx-auto my-16 p-4'>
        {/* <h1 className='text-primary font-bold text-[40px] font-dancing text-center mb-4'>Kategoriler</h1> */}

        <Slider {...settings}>

            <div className='mx-4 max-md:mx-2'>
            <div className='bg-gray-200 rounded-lg p-4 flex mx-4 max-md:px-2 gap-2 items-center justify-between'>
            <h2 className='font-bold text-lg max-sm:text-base text-secondary'>Burger</h2>
            <Image alt='' src="/images/hamburger.png" width={60} height={60} priority/>
            </div>
            </div>
            
            <div className='mx-4 max-md:mx-2'>
            <div className='bg-gray-200 rounded-lg p-4 flex mx-4 max-md:px-2 gap-2 items-center justify-between'>
            <h2 className='font-bold text-lg max-sm:text-base text-secondary'>Ekmek Arası</h2>
            <Image alt='' src="/images/ekmek.png" width={60} height={60} priority/>
            </div>
            </div>
            
            <div className='mx-4 max-md:mx-2'>
            <div className='bg-gray-200 rounded-lg p-4 flex mx-4 max-md:px-2 gap-2 items-center justify-between'>
            <h2 className='font-bold text-lg max-sm:text-base text-secondary'>Sandviç</h2>
            <Image alt='' src="/images/sandvic.png" width={60} height={60} priority/>
            </div>
            </div>

            <div className='mx-4 max-md:mx-2'>
            <div className='bg-gray-200 rounded-lg p-4 flex mx-4 max-md:px-2 gap-2 items-center justify-between'>
            <h2 className='font-bold text-lg max-sm:text-base text-secondary'>Tost</h2>
            <Image alt='' src="/images/tost.png" width={60} height={60} priority/>
            </div>
            </div>

            <div className='mx-4 max-md:mx-2'>
            <div className='bg-gray-200 rounded-lg p-4 flex mx-4 max-md:px-2 gap-2 items-center justify-between'>
            <h2 className='font-bold text-lg max-sm:text-base text-secondary'>Çıtır Lezzet</h2>
            <Image alt='' src="/images/citir.png" width={60} height={60} priority/>
            </div>
            </div>

            <div className='mx-4 max-md:mx-2'>
            <div className='bg-gray-200 rounded-lg p-4 flex mx-4 max-md:px-2 gap-2 items-center justify-between'>
            <h2 className='font-bold text-lg max-sm:text-base text-secondary'>İçecek</h2>
            <Image alt='' src="/images/icecek.png" width={60} height={60} priority/>
            </div>
            </div>

            <div className='mx-4 max-md:mx-2'>
            <div className='bg-gray-200 rounded-lg p-4 flex mx-4 max-md:px-2 gap-2 items-center justify-between'>
            <h2 className='font-bold text-lg max-sm:text-base text-secondary'>Tatlı</h2>
            <Image alt='' src="/images/tat.png" width={60} height={60} priority/>
            </div>
            </div>
        </Slider>
        
    </div>
  )
}

export default Categories