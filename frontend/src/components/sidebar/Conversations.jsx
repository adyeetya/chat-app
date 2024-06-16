import React, { useEffect, useState } from 'react'
import Conversation from './Conversation'
import useGetConversations from '../../hooks/useGetConversations'
import { useAuthContext } from '../../context/AuthContext'
import toast from 'react-hot-toast'

const Conversations = () => {
  const { loading, conversations } = useGetConversations()
  const { authUser } = useAuthContext()
  const [lastMessages, setLastMessages] = useState({})

  // you should not call hooks inside a loop, conditional statement, or nested functions because hooks must be called at the top level of the component to maintain consistent hook call order. 

  useEffect(() => {
    const fetchLastMessages = async () => {
      try {
        const results = await Promise.all(
          conversations.map(async (conversation) => {
            const res = await fetch(`/api/messages/${conversation._id}`)
            const data = await res.json()
            if (data.error) throw new Error(data.error)
            const lastMessage = data.length > 0 ? data[data.length - 1] : null
            const lastMessageFromMe = lastMessage
              ? lastMessage.senderId === authUser._id
              : false
            return { convoId: conversation._id, lastMessage, lastMessageFromMe }
          })
        )

        const lastMessagesMap = results.reduce(
          (acc, { convoId, lastMessage, lastMessageFromMe }) => {
            acc[convoId] = { lastMessage, lastMessageFromMe }
            return acc
          },
          {}
        )

        setLastMessages(lastMessagesMap)
      } catch (error) {
        toast.error(error.message)
      }
    }

    if (conversations.length > 0) fetchLastMessages()
  }, [conversations, authUser._id])

  if (loading) {
    return <span className="loading loading-spinner"></span>
  }

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations.map((conversation) => {
        const { lastMessage, lastMessageFromMe } =
          lastMessages[conversation._id] || {}

        return (
          <Conversation
            key={conversation._id}
            conversation={conversation}
            lastMessageFromMe={lastMessageFromMe}
            lastMessage={lastMessage}
          />
        )
      })}
    </div>
  )
}

export default Conversations
