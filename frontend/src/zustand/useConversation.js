import { create } from "zustand";

const useConversation = create((set) => ({
    selectedConversation: null,
    isAiSelected: false, // Added this
    messages: [],
    setSelectedConversation: (selectedConversation) =>
        set({ selectedConversation, isAiSelected: false }), // Deselect AI bot
    setMessages: (messages) => set({ messages }),
    setAiSelected: () =>
        set({ selectedConversation: null, isAiSelected: true }), // Select AI bot
}));

export default useConversation;
