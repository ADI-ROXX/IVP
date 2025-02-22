// "use client";
import { Poppins } from 'next/font/google'
import Spline from '@splinetool/react-spline/next';

const poppins = Poppins({
  weight: '400',
  subsets: ['latin'],
})

const HeroSection = () => {
  return (
    <section className={`flex ${poppins.className} min-h-screen w-full  bg-black items-center justify-center  text-white px-6 z-10`}>
      <div className="container  flex flex-col md:flex-row-reverse items-center justify-between gap-12">
        
        <div className="w-full h-[50vh] md:w-3/5 flex justify-center ">
        {/* <Spline
        scene="https://prod.spline.design/Zth8Weto0Lna2lRZ/scene.splinecode" 
      /> */}
        </div>

        <div className="w-full md:w-3/5 text-center md:text-left px-6 py-4">
          <h1 className="text-4xl md:text-6xl font-bold">
            Build Something Amazing
          </h1>
          <p className="mt-4 text-lg text-gray-300">
            Create modern web applications with Next.js and Tailwind CSS.
            Lightning-fast performance, seamless experience, and scalable design.
          </p>
          <a
            href="#"
            className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition"
          >
            Get Started
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
