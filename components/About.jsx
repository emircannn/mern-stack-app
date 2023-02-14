import Image from 'next/image'
import React from 'react'

const About = () => {
  return (
    <div className=' my-8 bg-primary'>
        <div className='container py-16 px-4 mx-auto flex max-md:flex-col items-center justify-center gap-y-4 gap-x-16'>
            <div>
                <Image alt='' src='/images/about.png' className='object-contain ' width={500} height={500}/>
            </div>
            <div>
                <h3 className='font-dancing text-[40px] select-none text-white'>Hakkımızda</h3>
                <p className='text-white select-none'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto, quaerat aliquam voluptate, ab qui nihil non exercitationem suscipit accusamus dignissimos nobis incidunt soluta eligendi provident!</p>
            </div>
        </div>
    </div>
  )
}

export default About