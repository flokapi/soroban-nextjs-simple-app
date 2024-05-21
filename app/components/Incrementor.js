import { useState } from "react"

import { increment } from "../utils/soroban"

export default function Incrementor() {
  const [value, setValue] = useState(0)

  async function incrementCb() {
    const value = await increment()
    console.log(value)
    setValue(value)
  }

  return (
    <div className="  m-5">
      <div>Incrementor</div>
      <div className="border-2 rounded p-4 border-gray-500">
        <button className="bg-blue-500 text-white rounded px-3 py-1" onClick={incrementCb}>
          Increment
        </button>
        <div>Value: {value}</div>
      </div>
    </div>
  )
}
