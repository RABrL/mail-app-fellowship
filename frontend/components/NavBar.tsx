'use client'
import { type ReactElement, useState, useEffect } from "react"
import {IoIosSearch} from "react-icons/io"
import {IoReload} from "react-icons/io5"
import { useRouter } from "next/navigation"
import { usePathname } from "next/navigation"
import { useDebounce } from "use-debounce"

export function NavBar(): ReactElement {
  const [searchValue, setSearchValue] = useState('')
  const [query] = useDebounce(searchValue, 750)
  const router = useRouter()
  const pathname = usePathname()
  useEffect(() => {
    if(!query){
      router.push(`${pathname}`)
    }else {
      router.push(`${pathname}?search=${query}`)
    }
  },[query,pathname, router])
  return (
    <nav className="flex p-6 justify-between bg-navBarBg text-slate-50">
      <h2 className="text-lg">Fellowbox</h2>
      <div className="flex  bg-secondary pl-2 rounded-xl w-5/6 focus-within:border focus-within:border-button h-8">
        <IoIosSearch  className="text-lg  mt-1.5 text-gray-400"/>
        <input value={searchValue} onChange={(e) => setSearchValue(e.target.value)} type="search" placeholder="Search" className="w-full outline-none bg-transparent pl-2"/>
      </div>
      <button type="button">
        <IoReload className="text-xl  hover:text-rose-400 transition-all duration-75 text-button"/>
      </button>
    </nav>
  )
}
