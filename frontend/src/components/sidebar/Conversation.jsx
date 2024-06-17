import React from 'react'
import useConversation from '../../zustand/useConversation'
import { extractTime } from '../../utils/extractTime'
import { useSocketContext } from '../../context/SocketContext'
const Conversation = ({ conversation, lastMessage, lastMessageFromMe }) => {
  const { selectedConversation, setSelectedConversation } = useConversation()
  const isSelected = conversation._id === selectedConversation?._id
  // console.log('last message: ', lastMessage)
  const formattedTime = extractTime(lastMessage?.createdAt)
  // console.log('formattedTime: ', formattedTime)

  const { onlineUsers } = useSocketContext()
  const isOnline = onlineUsers.includes(conversation._id)
  return (
    <>
      <div
        onClick={() => setSelectedConversation(conversation)}
        className={`flex gap-2 items-center rounded p-2 py-1 cursor-pointer ${
          isSelected && 'bg-blue-500'
        } ${!isSelected && 'hover:bg-slate-800'}`}
      >
        <div className={`avatar ${isOnline ? 'online' : ''}`}>
          <div className="w-12 rounded-full">
            <img alt="user avatar" src={conversation.profilePic} />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">{conversation.fullName}</p>
            <div className="flex flex-col justify-end">
              {lastMessage && !lastMessageFromMe && (
                <span className="text-sm text-gray-200">New Message</span>
              )}
              <div className="flex justify-end">
                <span className="text-[10px] text-gray-200">
                  {formattedTime !== 'NaN:NaN' ? formattedTime : ''}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="divider my-0 py-0 h-1"></div>
    </>
  )
}

export default Conversation
