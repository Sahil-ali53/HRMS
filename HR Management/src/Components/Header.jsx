import React from 'react'
import { Menu } from 'lucide-react'
import { Link } from 'react-router-dom'
function Header() {

  return (
    <>
      <header className=" sticky bg-amber-300 shadow-2xl  shadow-black  top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="bg-green-60  py-10  cursor-pointer text-white size-10 rounded-lg flex items-center justify-center">
                <Menu  className='border text-black   border-amber-50' size={30}/>
              </div>
              <span className="text-2xl text-gray-900">Viva</span>
            </div>

            <nav className="  flex items-end gap-8">
              <button className="bg-green-500 text-2xl rounded-full cursor-pointer  py-2 px-5 hover:bg-green-700 text-white hidden sm:block">
                S
              </button>
              <Link to="/SignIn">
              <button className=" bg-blue-600   rounded cursor-pointer  py-2 px-2 hover:bg-green-700 text-white hidden sm:block">
                Sign In
              </button>
              </Link>
            </nav>
          </div>
        </div>


      </header>

    </>
  )
}

export default Header