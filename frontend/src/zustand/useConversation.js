// this is handling each individual convo and its messages and the selected convo
import { create } from 'zustand'

const useConversation = create((set) => {
  return {
    selectedConversation: null,
    setSelectedConversation: (selectedConversation) =>
      set({ selectedConversation }),
    messages: [],
    setMessages: (messages) => set({ messages }),
  }
})

export default useConversation
