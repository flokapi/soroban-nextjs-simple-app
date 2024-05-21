import { useState, useEffect } from "react"

import { increment } from "../utils/soroban"

export default function Incrementor() {
  const [value, setValue] = useState([])

  async function incrementCb() {
    setResult(await increment())
  }

  return (
    <div className="  m-5">
      <div>Incrementor</div>
      <div className="border-2 rounded p-4 border-gray-500">
        <button className="bg-blue-500 text-white rounded px-3 py-1" onClick={increment}>
          Increment
        </button>
        <div>Hello: {incrementCb}</div>
      </div>
    </div>
  )
}
