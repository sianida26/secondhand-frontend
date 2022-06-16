import React, { useState } from 'react'

import { useSelector } from 'react-redux'

export default function Home() {

  const [ count, setCount ] = useState(0);

  const name = useSelector(state => state.auth.name);

  const tambahSatu = () => setCount(count + 1)

  return (
    <div className="">
        <button onClick={tambahSatu} className="bg-purple-5 rounded-md text-white px-3 py-3 hover:bg-purple-3 md:bg-red-500 disabled:opacity-50">
          Aku button
        </button>

    Haloo, { name }

        <span>
          {count}
        </span>
    </div>
  )
}
