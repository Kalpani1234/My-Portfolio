import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

const Home = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <section>
          <div className="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
            <div className="flex flex-col items-start pt-10">
              <h1 className="text-4xl sm:text-8xl font-bold text-black dark:text-white mb-5 sm:mb-10">
                Hello,
              </h1>
              <h1 className="text-4xl sm:text-8xl font-bold text-black dark:text-white mb-5 sm:mb-10">
                I’m Nethma Kalpani
              </h1>
              <h1 className="text-xl sm:text-3xl font-bold text-black dark:text-white mb-5 sm:mb-10">
                Software Engineer
              </h1>
            </div>
            <img
              className="w-full h-full rounded-lg shadow-lg md:h-96 md:w-96"
              src="/image.jpg"
              alt="My image"
            />
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
};

export default Home;
