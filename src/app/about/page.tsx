import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function About() {
  return (
    <>
    <Header />
    <main className="flex justify-between align-middle w-full">
        <div className='flex h-[calc(100vh-11rem)] items-end w-[100%] md:w-[100%] xl:w-[80%]'>
            <p className='text-[2rem] leading-[1.94rem] sm:text-[2.5rem] sm:leading-[2.42rem] md:text-[3rem] md:leading-[2.95rem] lg:text-5xl lg:leading-[2.9rem] xl:text-6xl xl:leading-[3.6rem] font-marist pl-4' style={{ wordBreak: "normal", hyphens: "none" }}>
                I’m a <b className='italic font-normal'>graphic designer</b> and <b className='italic font-normal'>art director</b> based in Paris. My work bridges between traditional and digital techniques to create <b className='italic font-normal'>impactful designs</b>. Deeply interested in artisanal and handmade practices, I strive to bring a more sensible and tangible approch to my projects while embracing an eco-friendly mindest.
            </p>
        </div>
    </main>
    <Footer />
    </>
    
  );
}
