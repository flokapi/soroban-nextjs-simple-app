"use client"

import { useState, useEffect } from "react"

import { retrievePublicKey } from "../utils.js/freighter"

export function useAccount() {
  const [address, setAddress] = useState("")

  async function updateData() {
    // console.log("Updating wallet data")
    // console.log(await retrievePublicKey())
    setAddress(await retrievePublicKey())
  }

  useEffect(() => {
    updateData()
    const intervalId = setInterval(updateData, 3000)
    return () => clearInterval(intervalId)
  }, [])

  return { address }
}
