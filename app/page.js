"use client"

import { useAccount } from "./hooks/freighter"
import { contracts } from "./constants"

export default function Home() {
  const { address } = useAccount()
  const { helloWorld } = contracts

  console.log("Rerendering home")

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <div>Hello world contract: {helloWorld}</div>
      </div>
    </main>
  )
}
