import React from 'react'
import { BiLogOut } from 'react-icons/bi'
const LogoutButton = () => {
  return (
    <div className="mt-4 flex gap-4 items-center cursor-pointer">
      <BiLogOut className="w-6 h-6 text-white " />
      <span>Logout</span>
    </div>
  )
}

export default LogoutButton
