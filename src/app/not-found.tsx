import Header from "@/components/Header";

export default function Custom404() {
    return (
    <>
        <Header />
        <main className="flex justify-center items-center w-full h-[calc(100vh-10rem)] flex-col">
          <h1 className="text-[2rem] leading-[1.8rem] sm:text-[2.5rem] sm:leading-[2.25rem] md:text-[3rem] md:leading-[2.5rem] lg:text-5xl lg:leading-[2.5rem] xl:text-6xl xl:leading-[3.35rem] font-marist pl-4 oldstyle-nums">404</h1>
          <p className="text-[2rem] leading-[1.8rem] sm:text-[2.5rem] sm:leading-[2.25rem] md:text-[3rem] md:leading-[2.5rem] lg:text-5xl lg:leading-[2.5rem] xl:text-6xl xl:leading-[3.35rem] font-marist pl-4 oldstyle-nums">Page not found</p>
        </main>
    </>)
  }