'use client'

import { History, Loader2, Plus, Send, Upload } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import useSWR, { mutate } from 'swr'
import {
  chooseCartFromComparison,
  confirmAction,
  createChatSession,
  getChatSession,
  sendMessageToChat,
} from '@/app/api/axios'
import { ChatSessionPopulated } from '@/app/types/chat'
import ChatMessage from '@/components/ChatMessage'
import ConversationSidebar from '@/components/ConversationSidebar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function ChatPage() {
  const params = useSearchParams()
  const chatId = params.get('chatId')
  const chat = useSWR<ChatSessionPopulated>(`/api/chats/${chatId}`, () =>
    getChatSession(chatId ? Number(chatId) : 0)
  )
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [chat.data?.messages, scrollToBottom])

  const handleSendMessage = async () => {
    if (!message.trim() || loading) return

    const getChatId = async () => {
      if (chatId) return Number(chatId)
      const response = await createChatSession()
      if (!response) {
        console.error('Erro ao criar chat')
        return null
      }
      return response.id
    }

    const thisChatId = await getChatId()
    if (!thisChatId) {
      console.error('Erro ao criar ou obter chat. Tente novamente mais tarde.')
      return
    }

    setMessage('')
    setLoading(true)
    await sendMessageToChat(thisChatId, message)
    await chat.mutate()
    setLoading(false)
  }

  const handleApplyCart = async (cartId: number) => {
    setLoading(true)
    try {
      await chooseCartFromComparison(cartId)
      await mutate('/api/cart')
      toast.success('Carrinho aplicado com sucesso!')
    } catch (error) {
      console.error('Erro ao aplicar carrinho:', error)
    } finally {
      setLoading(false)
    }
  }

  const createNewConversation = async () => {
    const response = await createChatSession()
    if (response) {
      window.history.pushState({}, '', `?chatId=${response.id}`)
    } else {
      console.error('Erro ao criar nova conversa')
    }
  }

  const handleConfirmAction = async (actionId: number, sessionId: number) => {
    setLoading(true)
    try {
      await confirmAction(actionId, sessionId)
      await chat.mutate()
    } catch (error) {
      console.error('Erro ao confirmar ação:', error)
    } finally {
      setLoading(false)
    }
  }

  const suggestedPrompts = [
    'Sugira uma receita fácil para o jantar',
    'Quero comparar preços de ingredientes',
    'Busque produtos de massa',
    'Como fazer um risotto?',
  ]

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Conversation Sidebar */}
      <ConversationSidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Main Chat Area */}
      <div
        className={`flex h-screen w-full flex-col pt-16 transition-all duration-300 ease-in-out lg:pt-0 ${sidebarOpen ? 'lg:mr-80' : 'mr-0'}
        `}
      >
        {/* Header */}
        <div className="border-gray-200 border-b bg-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-bold text-2xl text-gray-900">Assistente</h1>
            </div>

            <div className="flex items-center space-x-3">
              {!(chat.data || chat.isLoading) && (
                <Button
                  className="hidden lg:block"
                  onClick={() => createNewConversation()}
                >
                  <Plus className="mr-2 h-4 w-4" />
                </Button>
              )}

              <Button
                className="relative"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                size="icon"
                variant="outline"
              >
                <History className="h-4 w-4" />
                {/* Badge for conversation count */}
                {/* {conversations.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {conversations.length}
                  </span>
                )} */}
              </Button>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 space-y-4 overflow-y-auto p-4">
          {chat.data || chat.isLoading ? (
            chat.data && chat.data.messages.length === 0 ? (
              <div className="py-8 text-center">
                <div className="mb-4 text-6xl">🤖</div>
                <h2 className="mb-2 font-semibold text-gray-900 text-xl">
                  Como posso te ajudar hoje?
                </h2>
                <p className="mb-6 text-gray-600">
                  Posso te ajudar com receitas, buscar produtos e comparar
                  preços!
                </p>

                <div className="mx-auto grid max-w-md grid-cols-1 gap-3 md:grid-cols-2">
                  {suggestedPrompts.map((prompt, index) => (
                    <Button
                      className="justify-start text-left"
                      key={index}
                      onClick={() => setMessage(prompt)}
                      size="sm"
                      variant="outline"
                    >
                      {prompt}
                    </Button>
                  ))}
                </div>
              </div>
            ) : (
              chat.data &&
              chat.data.messages.map(msg => (
                <ChatMessage
                  key={msg.id}
                  message={msg}
                  onApplyCart={handleApplyCart}
                  onConfirmAction={actionId =>
                    handleConfirmAction(actionId, chat.data!.id)
                  }
                />
              ))
            )
          ) : (
            <div className="py-8 text-center">
              <div className="mb-4 text-6xl">🤖</div>
              <h2 className="mb-2 font-semibold text-gray-900 text-xl">
                Olá! Sou seu assistente culinário
              </h2>
              <p className="mb-6 text-gray-600">
                Inicie uma nova conversa para começar!
              </p>

              <Button onClick={createNewConversation} size="lg">
                Iniciar Nova Conversa
              </Button>
            </div>
          )}

          {loading && (
            <div className="flex justify-start">
              <div className="flex items-center space-x-2 rounded-lg bg-gray-100 px-4 py-2 text-gray-900">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm">Assistente está pensando...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-gray-200 border-t bg-white p-4">
          <div className="flex space-x-2">
            <Button
              disabled={loading}
              onClick={() => fileInputRef.current?.click()}
              size="icon"
              title="Upload PDF"
              variant="outline"
            >
              <Upload className="h-4 w-4" />
            </Button>

            <Input
              className="flex-1"
              disabled={loading}
              onChange={e => setMessage(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && handleSendMessage()}
              placeholder="Digite sua mensagem..."
              value={message}
            />

            <Button
              disabled={loading || !message.trim()}
              onClick={handleSendMessage}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
