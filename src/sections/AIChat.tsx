import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { X, Send, Bot, Sparkles } from 'lucide-react'
import { CONTACT_EMAIL, generateSmartResponse, type ConversationContext } from './aiChatLogic.ts'

interface AIChatProps {
  onClose: () => void
}

interface Message {
  id: number
  type: 'user' | 'bot'
  text: string
  timestamp: Date
  suggestions?: string[]
}

export default function AIChat({ onClose }: AIChatProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const messagesRef = useRef<HTMLDivElement>(null)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'bot',
      text: "Hi there! 👋 I'm Karishma's AI assistant. I'm here to help you explore her portfolio, learn about her skills and projects, or discuss potential collaborations. What interests you most?",
      timestamp: new Date(),
      suggestions: ['Show me projects', 'What are your skills?', 'Tell me about services'],
    },
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [conversationContext] = useState<ConversationContext>({
    projectsDiscussed: [],
    askedAboutContact: false,
    askedAboutSkills: false,
  })
  const lastSuggestions = messages[messages.length - 1]?.suggestions ?? []

  useEffect(() => {
    gsap.fromTo(modalRef.current,
      { opacity: 0, scale: 0.9, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: 'power2.out' }
    )

    gsap.fromTo('.chat-backdrop',
      { opacity: 0 },
      { opacity: 1, duration: 0.2 }
    )
  }, [])

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight
    }
  }, [messages])

  const handleClose = () => {
    gsap.to(modalRef.current, {
      opacity: 0,
      scale: 0.9,
      y: 20,
      duration: 0.2,
      ease: 'power2.in',
      onComplete: onClose
    })
    gsap.to('.chat-backdrop', {
      opacity: 0,
      duration: 0.2
    })
  }

  const handleSend = async (text: string = inputValue) => {
    if (!text.trim()) return

    if (text.trim().toLowerCase() === 'email karishma') {
      window.location.href = `mailto:${CONTACT_EMAIL}`
      return
    }

    const userMessage: Message = {
      id: Date.now(),
      type: 'user',
      text: text.trim(),
      timestamp: new Date(),
    }
    
    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 700))

    const result = generateSmartResponse(text, conversationContext)

    const botMessage: Message = {
      id: Date.now() + 1,
      type: 'bot',
      text: result.response,
      timestamp: new Date(),
      suggestions: result.suggestions,
    }

    setMessages(prev => [...prev, botMessage])
    setIsTyping(false)
  }

  return (
    <>
      <div className="chat-backdrop fixed inset-0 bg-black/50 z-40" onClick={handleClose} />
      
      <div
        ref={modalRef}
        className="fixed inset-0 sm:inset-auto sm:bottom-4 sm:right-4 w-full sm:w-96 h-[100dvh] sm:h-[600px] sm:rounded-2xl bg-white shadow-2xl flex flex-col z-50 overflow-hidden"
        style={{
          backgroundColor: 'var(--chat-bg, white)',
        }}
      >
        {/* Header */}
        <div
          className="px-6 py-4 border-b flex items-center justify-between"
          style={{
            backgroundColor: 'var(--primary-color, #ec4899)',
            borderColor: 'var(--primary-color, #ec4899)',
          }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold">Karishma's AI</h3>
              <p className="text-white/80 text-xs">Always here to help</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div
          ref={messagesRef}
          className="flex-1 overflow-y-auto p-4 space-y-4"
          style={{
            backgroundColor: 'var(--chat-bg, #f9fafb)',
          }}
        >
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  msg.type === 'user'
                    ? 'bg-blue-600 text-white rounded-br-none'
                    : 'bg-gray-200 text-gray-900 rounded-bl-none'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-2 items-end">
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                <Bot className="w-4 h-4 text-gray-600" />
              </div>
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-100" />
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-200" />
              </div>
            </div>
          )}

          {!isTyping && lastSuggestions.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {lastSuggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => handleSend(suggestion)}
                  className="px-3 py-2 rounded-full text-xs font-medium transition-all hover:scale-105"
                  style={{
                    backgroundColor: 'var(--primary-color, #ec4899)',
                    color: 'white',
                  }}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Input */}
        <div className="border-t p-4 flex gap-2" style={{ borderColor: 'var(--primary-color, #ec4899)' }}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask me anything..."
            className="flex-1 px-4 py-2 rounded-full border outline-none text-sm"
            style={{
              borderColor: 'var(--primary-color, #ec4899)',
            }}
          />
          <button
            onClick={() => handleSend()}
            className="p-2 rounded-full text-white transition-all hover:scale-110"
            style={{
              backgroundColor: 'var(--primary-color, #ec4899)',
            }}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  )
}
