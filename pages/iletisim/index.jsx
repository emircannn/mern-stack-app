import Head from "next/head";
import Image from "next/image";
import Chat from "../../components/Chat";

const index = () => {
  return (
    <div className="min-h-[calc(100vh_-_290px)] flex items-center justify-center">
      <Head>
        <title>İletişim</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="container max-md:flex-col mx-auto flex-1 flex items-center !h-full justify-center gap-4">
        <div className="flex items-start  justify-evenly flex-col p-4">
          <h2 className="font-dancing text-primary text-[40px] font-bold">İletişim</h2>
          <div className="mt-8">
            <div>
              <h3 className="font-bold text-2xl uppercase">Adres:</h3>
              <p className="text-lg font-medium mt-2">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Itaque, repellendus.
              </p>
            </div>
            <div className="mt-8">
              <h3 className="font-bold text-2xl uppercase">Telefon:</h3>
              <p className="text-lg font-medium mt-2">
                055525779332
              </p>
            </div>
          </div>
        </div>
        <div className='lg:flex-1 p-4 w-full'>
          <div>
            <Image alt="" src='/images/contact.gif' width={800} height={800}/>
          </div>
        </div>
      </div>
      <Chat/>
    </div>
  );
};

export default index;
