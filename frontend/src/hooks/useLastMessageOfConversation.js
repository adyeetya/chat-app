//  this is not being used any where beacause you should not call hooks inside a loop, conditional statement, or nested functions because hooks must be called at the top level of the component to maintain consistent hook call order.
import { useEffect, useState } from 'react'

import toast from 'react-hot-toast'
import { useAuthContext } from '../context/AuthContext'

const useLastMessageOfConversation = (convoId) => {
  const [loading, setLoading] = useState(false)
  const [lastMessage, setLastMessage] = useState(null)
  const [lastMessageFromMe, setLastMessageFromMe] = useState(false)
  const { authUser } = useAuthContext()

  useEffect(() => {
    const getLastMessages = async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/messages/${convoId}`)
        const data = await res.json()
        if (data.error) throw new Error(data.error)
        const messages = data
        const lastMsg =
          messages.length > 0 ? messages[messages.length - 1] : null

        setLastMessage(lastMsg)

        // Check if the last message is from the auth user
        const fromMe = lastMsg ? lastMsg.senderId === authUser._id : false
        setLastMessageFromMe(fromMe)

        console.log('messages:', messages)
        console.log('lastMessageFromMe:', fromMe)
      } catch (error) {
        toast.error(error.message)
      } finally {
        setLoading(false)
      }
    }

    if (convoId) getLastMessages()
  }, [convoId, authUser._id])

  return { lastMessage, lastMessageFromMe, loading }
}

export default useLastMessageOfConversation
