"use client"

import { useState, useEffect } from "react"

import { requestAccess, signTransaction, setAllowed } from "@stellar/freighter-api"

const retrievePublicKey = async () => {
  return publicKey
}

export function useAccount() {
  const [address, setAddress] = useState("")

  async function updateData() {
    let publicKey = ""
    let error = ""
    try {
      publicKey = await requestAccess()
    } catch (e) {
      error = e
    }
    if (error) {
      return error
    }
    setAddress(publicKey)
  }

  useEffect(() => {
    updateData()
    const intervalId = setInterval(updateData, 3000)
    return () => clearInterval(intervalId)
  }, [])

  return { address }
}
