import { type ReactElement } from "react"
import {IoIosSearch} from "react-icons/io"
import {IoReload} from "react-icons/io5"

export interface NavBarProps {
  
}

export function NavBar(props: NavBarProps): ReactElement {
  return (
    <nav className="flex p-6 justify-between bg-navBarBg text-slate-50">
      <h2 className="text-lg">Fellowbox</h2>
      <div className="flex  bg-secondary pl-2 rounded-xl w-5/6 focus-within:border focus-within:border-button h-8">
        <IoIosSearch className="text-lg  mt-1.5 text-gray-400"/>
        <input type="search" placeholder="Search" className="w-full outline-none bg-transparent pl-2"/>
      </div>
      <button>
        <IoReload className="text-xl  hover:text-rose-400 transition-all duration-75 text-button"/>
      </button>
    </nav>
  )
}
