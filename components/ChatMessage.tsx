'use client'

import { Bot, Check, ShoppingCart, User } from 'lucide-react'
import { ChatMessagePopulated } from '@/app/types/chat'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface ChatMessageProps {
  message: ChatMessagePopulated
  onConfirmAction: (actionId: number) => void
  onApplyCart: (cartId: number) => void
}

export default function ChatMessage({
  message,
  onConfirmAction,
  onApplyCart,
}: ChatMessageProps) {
  const isUser = message.sender === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-xs lg:max-w-md ${isUser ? 'order-2' : 'order-1'}`}>
        <div
          className={`rounded-lg px-4 py-2 ${isUser ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'}`}
        >
          <div className="mb-1 flex items-center space-x-2">
            {isUser ? (
              <User className="h-4 w-4" />
            ) : (
              <Bot className="h-4 w-4" />
            )}

            <span className="text-xs opacity-75">
              {new Date(message.created_at).toLocaleTimeString()}
            </span>
          </div>

          <p className="text-sm">{message.content}</p>
        </div>

        {message.message_type === 'suggest_carts_result' && message.carts && (
          <div className="mt-3 space-y-3">
            <h4 className="font-medium text-sm">{message.content}</h4>

            {message.carts.map((cart, index: number) => (
              <Card
                className={index === 0 ? 'border-2 border-green-500' : ''}
                key={cart.store_name}
              >
                <CardContent className="p-3">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div>
                          <h5 className="font-medium text-sm">
                            {cart.store_name}
                          </h5>
                        </div>
                      </div>

                      {index === 0 && (
                        <Badge className="bg-green-500">Melhor opção</Badge>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm">
                        Relevância: {cart.score.toFixed(0)}%
                      </span>

                      <span className="font-bold text-green-600">
                        R$ {(cart.total / 100).toFixed(2)}
                      </span>
                    </div>

                    <Button
                      className="w-full"
                      onClick={() => onApplyCart?.(cart.id)}
                      size="sm"
                      variant={index === 0 ? 'default' : 'outline'}
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Aplicar este carrinho
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Botão para confirmar ação caso a mensagem seja do tipo 'action' */}

        {message.action && (
          <div className="mt-3">
            <Button
              className="flex w-full items-center justify-center bg-green-500 hover:bg-green-500"
              disabled={Boolean(message.action.confirmed_at)}
              onClick={async () => {
                onConfirmAction(message.action!.id)
              }}
              size="sm"
            >
              <Check />
              Confirmar ação
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
