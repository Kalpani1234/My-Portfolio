import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";
import { SkillsLogos } from "../data/SkillsLogos.jsx";
import { CertificatesLogos } from "../data/CertificatesLogos.jsx";

const About = () => {
  const [activeTab, setActiveTab] = useState("Skills");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const Tab = ({ label, isActive, onClick }) => (
    <li className="me-2">
      <Link
        to="#"
        onClick={onClick}
        className={`inline-block p-4 border-b-2 ${
          isActive
            ? "border-black text-black dark:text-white active dark:border-white"
            : "border-transparent text-gray-500 hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 dark:hover:border-gray-300"
        } rounded-t-lg`}
      >
        {label}
      </Link>
    </li>
  );

  Tab.propTypes = {
    label: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "Skills":
        return (
          <div className="flex flex-wrap items-center justify-center mx-auto mt-12 mb-4 w-3/4">
            {SkillsLogos.map((logo, index) => (
              <img
                key={index}
                className={`me-4 mb-4 md:mb-4 h-10 w-10 ${
                  logo.alt === "microsoft sql server logo" ? "dark:invert" : ""
                }`}
                src={logo.src}
                alt={logo.alt}
              />
            ))}
          </div>
        );
      case "Experience":
        return (
          <div className="flex items-center justify-center mx-auto w-3/4">
            <ul
              aria-label="Alternative changelog feed"
              role="feed"
              className="relative flex flex-col gap-12 py-12 pl-6 text-sm before:absolute before:top-0 before:left-6 before:h-full before:-translate-x-1/2 before:border before:border-dashed before:border-slate-200 after:absolute after:top-6 after:left-6 after:bottom-6 after:-translate-x-1/2 after:border after:border-slate-200 lg:pl-0 lg:before:left-[8.5rem] lg:after:left-[8.5rem]"
            >
              <li
                role="article"
                className="relative pl-6 before:absolute before:left-0 before:top-2 before:z-10 before:h-2 before:w-2 before:-translate-x-1/2 before:rounded-full before:bg-white dark:before:bg-black before:ring-2 before:ring-black dark:before:ring-white lg:flex lg:gap-12 lg:pl-0 lg:before:left-[8.5rem]"
              >
                <h4 className="text-base font-medium leading-7 text-slate-500 lg:block lg:w-28 lg:text-right">
                  2024-02-01
                </h4>
                <div className="flex flex-col flex-1 gap-2">
                  <h3 className="text-base font-medium leading-7 text-black dark:text-white">
                    Web Developer- Intern
                    <br />
                    <span className="font-normal text-slate-600">
                      CodeAlpha
                    </span>
                  </h3>
                  <p className="text-slate-500">
                    Contributing to projects and enhancing coding skills. Proven
                    ability in problem-solving and effective collaboration in a
                    professional environment.
                  </p>
                </div>
              </li>
              <li
                role="article"
                className="relative pl-6 before:absolute before:left-0 before:top-2 before:z-10 before:h-2 before:w-2 before:-translate-x-1/2 before:rounded-full before:bg-white dark:before:bg-black before:ring-2 before:ring-black dark:before:ring-white lg:flex lg:gap-12 lg:pl-0 lg:before:left-[8.5rem]"
              >
                <h4 className="text-base font-medium leading-7 text-slate-500 lg:block lg:w-28 lg:text-right">
                  2024-01-01
                </h4>
                <div className="flex flex-col flex-1 gap-2">
                  <h3 className="text-base font-medium leading-7 text-black dark:text-white">
                    Web Developer- Intern
                    <br />
                    <span className="font-normal text-slate-600">
                      Prodigy InfoTech
                    </span>
                  </h3>
                  <p className="text-slate-500">
                    Interned as a web developer at Prodigy Infortech , gaining
                    hands-on experience in web development. Contributed to
                    projects, enhancing skills in coding, problem-solving, and
                    collaboration.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        );
      case "Education":
        return (
          <div className="flex items-center justify-center mx-auto w-3/4">
            <ul
              aria-label="Alternative changelog feed"
              role="feed"
              className="relative flex flex-col gap-12 py-12 pl-6 text-sm before:absolute before:top-0 before:left-6 before:h-full before:-translate-x-1/2 before:border before:border-dashed before:border-slate-200 after:absolute after:top-6 after:left-6 after:bottom-6 after:-translate-x-1/2 after:border after:border-slate-200 lg:pl-0 lg:before:left-[8.5rem] lg:after:left-[8.5rem]"
            >
              <li
                role="article"
                className="relative pl-6 before:absolute before:left-0 before:top-2 before:z-10 before:h-2 before:w-2 before:-translate-x-1/2 before:rounded-full before:bg-white dark:before:bg-black before:ring-2 before:ring-black dark:before:ring-white lg:flex lg:gap-12 lg:pl-0 lg:before:left-[8.5rem]"
              >
                <h4 className="text-base font-medium leading-7 text-slate-500 lg:block lg:w-28 lg:text-right">
                  2021
                </h4>
                <div className="flex flex-col flex-1 gap-2">
                  <h3 className="text-base font-medium leading-7 text-black dark:text-white">
                    Higher Education
                    <br />
                    <span className="font-normal text-slate-500">
                      B.Sc. (Hons) in Computer Science & Technology
                    </span>
                  </h3>
                  <p className="text-slate-500">
                    Uva Wellassa University - Badulla
                  </p>
                </div>
              </li>
              <li
                role="article"
                className="relative pl-6 before:absolute before:left-0 before:top-2 before:z-10 before:h-2 before:w-2 before:-translate-x-1/2 before:rounded-full before:bg-black dark:before:bg-white before:ring-2 before:ring-white lg:flex lg:gap-12 lg:pl-0 lg:before:left-[8.5rem]"
              >
                <h4 className="text-base font-medium leading-7 text-slate-500 lg:block lg:w-28 lg:text-right">
                  2019
                </h4>
                <div className="flex flex-col flex-1 gap-2">
                  <h3 className="text-base font-medium leading-7 text-black dark:text-white">
                    Secondary Education
                    <br />
                    <span className="font-normal text-slate-500">
                      G.C.E. Advanced Level Examination - 1B&apos;s & 2C&apos;s
                    </span>
                  </h3>
                  <p className="text-slate-500">
                    Rajapaksha Central College - Weeraketiya
                  </p>
                </div>
              </li>
              <li
                role="article"
                className="relative pl-6 before:absolute before:left-0 before:top-2 before:z-10 before:h-2 before:w-2 before:-translate-x-1/2 before:rounded-full before:bg-black dark:before:bg-white before:ring-2 before:ring-white lg:flex lg:gap-12 lg:pl-0 lg:before:left-[8.5rem]"
              >
                <h4 className=" text-base font-medium leading-7 text-slate-500 lg:block lg:w-28 lg:text-right">
                  2016
                </h4>
                <div className="flex flex-col flex-1 gap-2">
                  <h3 className="text-base font-medium leading-7 text-black dark:text-white">
                    Primary Education
                    <br />
                    <span className="font-normal text-slate-500">
                      G.C.E. Ordinary Level Examination - 8A&apos;s & 1B
                    </span>
                  </h3>
                  <p className="text-slate-500">
                    Rajapaksha Central College - Weeraketiya
                  </p>
                </div>
              </li>
            </ul>
          </div>
        );
      case "Certificates":
        return (
          <div className="flex items-center justify-center mx-auto w-3/4">
            <ul className="pt-4 pb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 mx-auto">
                {CertificatesLogos.map((logo, index) => (
                  <div key={index}>
                    <Link to={logo.url} target="_blank" className="block">
                      <li className="relative pl-6 my-4 md:mx-8">
                        <span className="absolute left-0 z-10 flex items-center justify-center w-8 h-8 text-white -translate-x-1/2 rounded-full bg-white dark:bg-black">
                          <img
                            className="h-10 w-10"
                            src={logo.src}
                            alt={logo.alt}
                          />
                        </span>
                        <div className="flex flex-col flex-1 gap-0">
                          <h4 className="text-lg font-medium text-black dark:text-white">
                            {logo.title}
                          </h4>
                          <p className="text-sm text-slate-500">
                            {logo.issuedBy}
                          </p>
                        </div>
                      </li>
                    </Link>
                  </div>
                ))}
              </div>
            </ul>
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-center mx-auto w-3/4">
            <p>No content</p>
          </div>
        );
    }
  };

  return (
    <>
      <div className="min-h-screen">
        <Header />
        <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
            About Me
          </h2>
          <p className="mb-8 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
            Hey there! I&apos;m Nethma Kalpani, currently working as a Web
            Development Intern at Prodigy InfoTech. Yep, you got it
            right—I&apos;m from the vibrant shores of Sri Lanka!
          </p>
          <p className="font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
            Right now, I&apos;m deep into the world of coding while pursuing my
            Bachelor&apos;s in Computer Science & Technology at Uva Wellassa
            University. Eager to learn and passionate about all things tech,
            I&apos;m on a mission to turn ideas into reality through lines of
            code. Let&apos;s connect and geek out over some cool projects!
          </p>
        </div>
        <div>
          <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700 mx-auto w-3/4">
            <ul className="flex items-center justify-center flex-wrap -mb-px">
              <Tab
                label="Skills"
                isActive={activeTab === "Skills"}
                onClick={() => handleTabClick("Skills")}
              ></Tab>
              <Tab
                label="Experience"
                isActive={activeTab === "Experience"}
                onClick={() => handleTabClick("Experience")}
              />
              <Tab
                label="Education"
                isActive={activeTab === "Education"}
                onClick={() => handleTabClick("Education")}
              />
              <Tab
                label="Certificates"
                isActive={activeTab === "Certificates"}
                onClick={() => handleTabClick("Certificates")}
              />
            </ul>
          </div>
          <div className="mt-4">{renderTabContent()}</div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default About;
