'use client'

import { MessageCircle, MoreVertical, Plus } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import useSWR from 'swr'
import {
  createChatSession,
  getChatSession,
  getChatSessions,
} from '@/app/api/axios'
import { ChatSession, ChatSessionPopulated } from '@/app/types/chat'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ScrollArea } from '@/components/ui/scroll-area'

interface ConversationSidebarProps {
  isOpen: boolean

  onToggle: () => void
}

export default function ConversationSidebar({
  isOpen,
  onToggle,
}: ConversationSidebarProps) {
  const chats = useSWR<ChatSession[]>('/api/chats', () => getChatSessions())

  const chatId = useSearchParams().get('chatId')

  const chat = useSWR<ChatSessionPopulated>(`/api/chats/${chatId}`, () =>
    getChatSession(chatId ? Number(chatId) : 0)
  )

  const handleSelectConversation = (conversationId: number) => {
    window.history.pushState({}, '', `?chatId=${conversationId}`)
  }

  const formatDate = (dateString: string) => {
    const now = new Date()

    const date = new Date(dateString)

    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)

    if (diffInHours < 24) {
      return date.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
      })
    }
    if (diffInHours < 24 * 7) {
      return date.toLocaleDateString('pt-BR', { weekday: 'short' })
    }
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
    })
  }

  const createChat = async () => {
    const response = await createChatSession()

    if (!response) {
      console.error('Erro ao criar chat')

      return
    }

    window.history.pushState({}, '', `?chatId=${response.id}`)

    await chats.mutate()

    onToggle()
  }

  return (
    <>
      {/* Overlay for mobile */}

      {isOpen && (
        <div className="fixed inset-0 z-40 bg-[#0005]" onClick={onToggle} />
      )}

      {/* Sidebar - Right side */}

      <div
        className={`fixed top-0 right-0 z-50 h-full w-80 transform border-gray-200 border-l bg-white shadow-lg transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}


        `}
      >
        <div className="flex h-full flex-col">
          {/* Header */}

          <div className="border-gray-200 border-b p-4 pt-20 lg:pt-4">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-semibold text-gray-900 text-lg">Histórico</h2>

              {chat.data && (
                <Button onClick={() => createChat()} size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Nova
                </Button>
              )}
            </div>

            {/* New Conversation Button - Only show when no conversation is selected */}

            {!chat.data && (
              <Button className="w-full" onClick={() => createChat()} size="lg">
                <Plus className="mr-2 h-4 w-4" />
                Iniciar Nova Conversa
              </Button>
            )}
          </div>

          {/* Conversations List */}

          <ScrollArea className="flex-1">
            <div className="space-y-2 p-2">
              {chats.data?.map(conversation => (
                <div
                  className={`group relative cursor-pointer rounded-lg p-3 transition-colors ${chat.data?.id === conversation.id ? 'border border-blue-200 bg-blue-50' : 'hover:bg-gray-50'}


                  `}
                  key={conversation.id}
                  onClick={() => handleSelectConversation(conversation.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex items-center space-x-2">
                        <MessageCircle className="h-4 w-4 flex-shrink-0 text-gray-400" />

                        <h3 className="truncate font-medium text-gray-900 text-sm">
                          {conversation.messages.length > 0
                            ? conversation.messages[0].content.slice(0, 30)
                            : 'Nova conversa'}
                        </h3>
                      </div>

                      <div className="flex items-center justify-between">
                        <p className="text-gray-500 text-xs">
                          {conversation.messages.length} mensagens
                        </p>

                        <span className="text-gray-400 text-xs">
                          {formatDate(conversation.created_at)}
                        </span>
                      </div>

                      {/* Last message preview */}

                      {conversation.messages.length > 0 && (
                        <p className="mt-1 truncate text-gray-500 text-xs">
                          {conversation.messages[
                            conversation.messages.length - 1
                          ].content.slice(0, 40)}
                        </p>
                      )}
                    </div>

                    {/* Actions Menu */}

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                          onClick={e => e.stopPropagation()}
                          size="icon"
                          variant="ghost"
                        >
                          <MoreVertical className="h-3 w-3" />
                        </Button>
                      </DropdownMenuTrigger>
                    </DropdownMenu>
                  </div>
                </div>
              ))}

              {chats.data && chats.data.length === 0 && (
                <div className="py-8 text-center text-gray-500">
                  <MessageCircle className="mx-auto mb-2 h-8 w-8 opacity-50" />

                  <p className="text-sm">Nenhuma conversa salva</p>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Footer */}

          <div className="border-gray-200 border-t p-4">
            <div className="space-y-1 text-gray-500 text-xs">
              <p>💡 Suas conversas são salvas automaticamente</p>

              <p>🗑️ Use o menu ⋮ para deletar conversas</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
