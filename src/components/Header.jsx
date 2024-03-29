import { Fragment, useState } from "react";
import Logo from "/logo.svg";
import { Dialog, Popover, Transition } from "@headlessui/react";
import ThemeToggle from "./ThemeToggle.jsx";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  let pathArray = useLocation().pathname.split("/");
  let lastPart = pathArray[pathArray.length - 1];

  return (
    <header>
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Nethma Kalpani</span>
            <img className="h-8 w-auto dark:invert" src={Logo} alt="Brand" />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon
              className="h-6 w-6 text-black dark:text-white"
              aria-hidden="true"
            />
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          <Link
            to="/home"
            className={`text-sm font-semibold leading-6 text-gray-900 dark:text-white ${
              lastPart === "home"
                ? "rounded-none border-b-2 border-black dark:border-white"
                : ""
            }`}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`text-sm font-semibold leading-6 text-gray-900 dark:text-white ${
              lastPart === "about"
                ? "rounded-none border-b-2 border-black dark:border-white"
                : ""
            }`}
          >
            About
          </Link>
          <Link
            to="/projects"
            className={`text-sm font-semibold leading-6 text-gray-900 dark:text-white ${
              lastPart === "projects"
                ? "rounded-none border-b-2 border-black dark:border-white"
                : ""
            }`}
          >
            Projects
          </Link>
          <Link
            to="/resume"
            className={`text-sm font-semibold leading-6 text-gray-900 dark:text-white ${
              lastPart === "resume"
                ? "rounded-none border-b-2 border-black dark:border-white"
                : ""
            }`}
          >
            Resume
          </Link>
          <Link
            to="/contact"
            className={`text-sm font-semibold leading-6 text-gray-900 dark:text-white ${
              lastPart === "contact"
                ? "rounded-none border-b-2 border-black dark:border-white"
                : ""
            }`}
          >
            Contact
          </Link>
        </Popover.Group>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <ThemeToggle />
        </div>
      </nav>
      <Transition.Root show={mobileMenuOpen} as={Fragment}>
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <div className="fixed inset-0 z-10" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white dark:bg-black px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link to="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Nethma Kalpani</span>
                <img
                  className="h-8 w-auto dark:invert"
                  src={Logo}
                  alt="Brand"
                />
              </Link>
              <ThemeToggle />
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon
                  className="h-6 w-6 text-black dark:text-white"
                  aria-hidden="true"
                />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <Link
                    to="/home"
                    className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 dark:text-white ${
                      lastPart === "home"
                        ? "rounded-none border-b-2 border-black dark:border-white"
                        : ""
                    }`}
                  >
                    Home
                  </Link>
                  <Link
                    to="/about"
                    className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 dark:text-white ${
                      lastPart === "about"
                        ? "rounded-none border-b-2 border-black dark:border-white"
                        : ""
                    }`}
                  >
                    About
                  </Link>
                  <Link
                    to="/projects"
                    className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 dark:text-white ${
                      lastPart === "projects"
                        ? "rounded-none border-b-2 border-black dark:border-white"
                        : ""
                    }`}
                  >
                    Projects
                  </Link>
                  <Link
                    to="/resume"
                    className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 dark:text-white ${
                      lastPart === "resume"
                        ? "rounded-none border-b-2 border-black dark:border-white"
                        : ""
                    }`}
                  >
                    Resume
                  </Link>
                  <Link
                    to="/contact"
                    className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 dark:text-white ${
                      lastPart === "contact"
                        ? "rounded-none border-b-2 border-black dark:border-white"
                        : ""
                    }`}
                  >
                    Contact
                  </Link>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </Transition.Root>
    </header>
  );
};

export default Header;
