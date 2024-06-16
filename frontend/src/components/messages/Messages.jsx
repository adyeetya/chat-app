import React from 'react'
import Message from './Message'
import useGetMessage from '../../hooks/useGetMessage'
import MessageSkeleton from '../skeletons/MessageSkeleton'
const Messages = () => {
  const { loading, messages } = useGetMessage()

  return (
    <div className="px-4 flex-1 overflow-auto">
    {!loading && messages.length>0 && messages.map((message, idx) => <Message key={idx} message={message} />)}
      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!loading && messages.length === 0 && (
        <div className="text-center text-white">
          {'Send a message to start the conversation :)'}
        </div>
      )}
 
    </div>
  )
}

export default Messages
