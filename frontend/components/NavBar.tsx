'use client'
import { type ReactElement, useState, useEffect } from 'react'
import { IoIosSearch } from 'react-icons/io'
import { CiLogout, CiLogin } from 'react-icons/ci'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { useDebounce } from 'use-debounce'
import useModal from '@/hooks/useModalStore'
import { useUser } from '@/hooks/useUser'

export function NavBar(): ReactElement {
  const [searchValue, setSearchValue] = useState('')
  const [query] = useDebounce(searchValue, 500)
  //to do not push the value directly debouncing by 500 ms 
  const router = useRouter()
  const pathname = usePathname()
  const onOpen = useModal((state) => state.onOpen)
  const { user } = useUser()

  const onClick = () => {
    if (user) {
      localStorage.removeItem('user')
      router.refresh()
      return
    }
    onOpen('signIn')
    //to logout or signIn depending on the user
  }

  useEffect(() => {
    if (!query) {
      router.push(`${pathname}`)
    } else {
      router.push(`${pathname}?search=${query}`)
    }
    //checking the input search pushing to the searchParam
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
      {user ? (
        <button
          onClick={onClick}
          type="button"
          title="Log out"
          className="flex items-center gap-3 text-button hover:text-rose-500 transition-colors duration-75"
        >
          <span className="text-nowrap">Log Out</span>
          <CiLogout size={26} />
        </button>
      ) : (
        <button
          onClick={onClick}
          type="button"
          title="Sign In"
          className="flex items-center gap-3 text-button hover:text-rose-500 transition-colors duration-75"
        >
          <span className="text-nowrap">Sign In</span>
          <CiLogin size={26} />
        </button>
      )}
    </nav>
  )
}
