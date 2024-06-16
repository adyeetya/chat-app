import { useState } from 'react'
import { BsSend } from 'react-icons/bs'
import useSendMessage from '../../hooks/useSendMessage'

const MessageInput = () => {
  const [message, setMessage] = useState('')
  const { loading, sendMessage } = useSendMessage()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!message) return
    await sendMessage(message)
    setMessage('')
  }
  return (
    <form className="px-4 my-3" onSubmit={handleSubmit}>
      <div className="relative w-full">
        <input
          type="text"
          value={message}
          className="border text-sm rounded-full block w-full p-2.5  bg-gray-700 border-gray-600 text-white"
          placeholder="Send a message"
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading}
          className="absolute inset-y-0 right-0 flex items-center pe-4"
        >
          {loading ? (
            <div className="loading loading-spinner "></div>
          ) : (
            <BsSend />
          )}
        </button>
      </div>
    </form>
  )
}
export default MessageInput
