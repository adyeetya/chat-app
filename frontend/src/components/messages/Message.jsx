import React from 'react'

const Message = () => {
  return (
    <div className="chat chat-end">
      <div className="avatar chat-image">
        <div className="w-10 rounded-full">
          <img
            alt="user avatar"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
          />
        </div>
      </div>
      {/* chat body */}
      <div className="chat-bubble text-white bg-blue-500 ">Hi what is upp?</div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">10:18</div>
    </div>
  )
}

export default Message
