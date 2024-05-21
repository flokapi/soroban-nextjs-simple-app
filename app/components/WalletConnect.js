"use client"

import { useAccount } from "../hooks/freighter"
import { requestAccess } from "@stellar/freighter-api"

export default function WalletConnect() {
  const { address } = useAccount()

  console.log("Rerendering connect button")
  console.log("Address:", address)

  return (
    <div className="flex flex-row space-x-4 items-center">
      {address && address.length > 4 ? (
        <div className="bg-gray-500 text-white px-3 py-2 rounded font-mono">
          {address.slice(0, 4)}...{address.slice(-4)}
        </div>
      ) : (
        <button
          className="bg-gray-500 text-white px-3 py-2 rounded font-mono"
          onClick={requestAccess}
        >
          Connect Wallet
        </button>
      )}
    </div>
  )
}
