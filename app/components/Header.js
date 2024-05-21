"use client"

import Link from "next/link"

import WalletConnect from "./WalletConnect"

function Header() {
  return (
    <div>
      <div className="p-4 border-b-2 sm:mt-1">
        <div className="flex flex-row justify-between">
          <div className="font-bold text-3xl col-span-1">
            <Link href="/">Soroban nextjs</Link>
          </div>
          <div className="flex sm:justify-end col-span-3 pr-3 my-3 sm:my-0">
            <WalletConnect />
          </div>
        </div>
        <div className="mt-2">
          <Link href="/">Home</Link>
          <Link className="ml-4" href="/about">
            About
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Header
