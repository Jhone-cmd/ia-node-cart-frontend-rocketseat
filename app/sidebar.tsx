'use client'
import {
  ChefHat,
  Menu,
  MessageCircle,
  Search,
  ShoppingCart,
  X,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

const navigation = [
  { name: 'Chat Assistente', href: '/', icon: MessageCircle },
  { name: 'Buscar Produtos', href: '/products', icon: Search },
  { name: 'Meu Carrinho', href: '/cart', icon: ShoppingCart },
  { name: 'Minhas Receitas', href: '/recipes', icon: ChefHat },
]

export function Sidebar() {
  const pathname = usePathname()

  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      {/* Mobile menu button */}
      <div className="fixed top-4 left-4 z-50 lg:hidden">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="icon"
          variant="outline"
        >
          {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 transform border-gray-200 border-r bg-white transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center justify-center border-gray-200 border-b px-4">
            <h1 className="font-bold text-gray-900 text-xl">🛒 Grocery AI</h1>
          </div>

          <nav className="flex-1 space-y-2 px-4 py-6">
            {navigation.map(item => {
              const isActive = pathname === item.href

              return (
                <Link
                  className={`flex items-center rounded-md px-3 py-2 font-medium text-sm transition-colors ${isActive ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}


                  `}
                  href={item.href}
                  key={item.name}
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          <div className="border-gray-200 border-t p-4">
            <div className="space-y-1 text-gray-500 text-xs">
              <p>💡 Dica: Use o chat para:</p>
              <p>• Buscar receitas</p>
              <p>• Comparar preços</p>
              <p>• Montar carrinhos</p>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
