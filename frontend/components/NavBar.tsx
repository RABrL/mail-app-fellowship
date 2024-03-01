'use client'
import { type ReactElement, useState, useEffect } from 'react'
import { IoIosSearch } from 'react-icons/io'
import { CiLogout } from 'react-icons/ci'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { useDebounce } from 'use-debounce'
import useModal from '@/hooks/useModalStore'

export function NavBar(): ReactElement {
  const [searchValue, setSearchValue] = useState('')
  const [query] = useDebounce(searchValue, 300)
  const router = useRouter()
  const pathname = usePathname()
  const onOpen = useModal((state) => state.onOpen)

  const onClick = () => {
    onOpen('signIn')
  }

  useEffect(() => {
    if (!query) {
      router.push(`${pathname}`)
    } else {
      router.push(`${pathname}?search=${query}`)
    }
  }, [query, pathname, router])
  return (
    <nav className="flex p-6 justify-between gap-3 bg-navBarBg text-slate-50">
      <h2 className="text-lg">Fellowbox</h2>
      <div className="flex  bg-secondary pl-2 rounded-xl w-5/6 focus-within:border focus-within:border-button h-8">
        <IoIosSearch className="text-lg  mt-1.5 text-gray-400" />
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          type="search"
          placeholder="Search"
          className="w-full outline-none bg-transparent pl-2"
        />
      </div>
      <button
        onClick={onClick}
        type="button"
        title="Log out"
        className="flex items-center gap-3 text-button hover:text-rose-500 transition-colors duration-75"
      >
        <span className="text-nowrap">Log Out</span>
        <CiLogout size={26} />
      </button>
    </nav>
  )
}
