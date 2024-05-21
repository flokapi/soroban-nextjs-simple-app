import { useState, useEffect } from "react"

import { hello } from "../utils/soroban"

export default function HelloWorld() {
  const [result, setResult] = useState([])

  async function updateData() {
    setResult(await hello("it_works"))
  }

  useEffect(() => {
    updateData()
  }, [])

  console.log("Hello world results: ", result)

  return (
    <div className="  m-5">
      <div>Hello World</div>
      <div className="border-2 rounded p-4 border-gray-500">Hello: {result.toString()}</div>
    </div>
  )
}
