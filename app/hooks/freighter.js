"use client"

import { useState, useEffect } from "react"
import { getPublicKey } from "@stellar/freighter-api"

export function useAccount() {
  const [address, setAddress] = useState("")

  async function updateData() {
    // console.log("Updating wallet data")
    // console.log(await retrievePublicKey())
    setAddress(await getPublicKey())
  }

  useEffect(() => {
    updateData()
    const intervalId = setInterval(updateData, 3000)
    return () => clearInterval(intervalId)
  }, [])

  return { address }
}
