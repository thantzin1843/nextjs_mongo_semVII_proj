import React from 'react'
import { doLogout } from '../actions'

function page() {
  return (
    <div>
      <form action={doLogout} >
        <button type="submit">Logout</button>
      </form>
    </div>
  )
}

export default page