import Head from 'next/head'
import Image from 'next/image'
import Chat from '../../components/Chat'


const index = () => {
  return (
    <div className=''>
        <Head>
        <title>Hakkımızda</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <div className='min-h-[calc(100vh_-_290px)] flex items-center justify-center bg-primary'>
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
    <Chat/>
    </div>
  )
}

export default index