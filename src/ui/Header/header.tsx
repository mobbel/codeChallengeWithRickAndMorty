import Link from "next/link"

const Header = () => {
  return (
    <header className="relative bg-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-center justify-between border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <Link href={"/"}>
                <a>
                  <span className="text-gray-900 font-bold">Codechallenge with Rick and Morty</span>
                </a>
              </Link>
            </div>
            <nav className="hidden space-x-10 md:flex">
              <Link href={"/characters"}>
                <a className="text-base font-medium text-gray-700 hover:text-gray-900">Charakters</a>
              </Link>
              <Link href={"/episodes"}>
                <a className="text-base font-medium text-gray-700 hover:text-gray-900">Episodes</a>
              </Link>
            </nav>
            <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
              <a href="#" className="whitespace-nowrap text-base font-medium text-gray-700 hover:text-gray-900">Sign in</a>
              <a href="#" className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700">Sign up</a>
            </div>
          </div>
        </div>
    </header>
  );
};

export default Header;