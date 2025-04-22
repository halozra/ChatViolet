'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Sidebar from '@/components/Sidebar'
import { ChatHeader } from '@/components/ChatHeader'
import MessageList from '@/components/MessageList'
import ChatInput from '@/components/ChatInput'
import API from '@/components/Api'

export default function Chat() {
  const router = useRouter()
  const params = useParams()
  const friendId = params.friendId as string // ✅ Ambil friendId dari URL

  const [messages, setMessages] = useState([
    { id: 1, text: 'Halo! Selamat datang di chat.', sender: 'system' },
    { id: 2, text: 'apakah aq sudah gila', sender: 'user' },
  ])
  const [newMessage, setNewMessage] = useState('')
  const [roomId, setRoomId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
    }
  }, [router])

  // Ambil pesan berdasarkan roomId
  useEffect(() => {
    const fetchMessages = async () => {
      if (!roomId) return
      try {
        setLoading(true)
        const response = await API.get(`/chats/${roomId}/messages`)
        setMessages(response.data.messages)
      } catch (error: any) {
        console.error(
          'Gagal mengambil pesan:',
          error?.response?.data || error.message
        )
        alert('Gagal mengambil pesan')
      } finally {
        setLoading(false)
      }
    }

    fetchMessages()
  }, [roomId])

  // Buat atau ambil chat room ketika friendId ada
  useEffect(() => {
    if (friendId) {
      createOrGetChat(friendId)
    }
  }, [friendId])

  const createOrGetChat = async (friendId: string) => {
    try {
      setLoading(true)
      const res = await API.post(`/chats/create`, { userId: friendId })
      setRoomId(res.data._id)
      setMessages([
        { id: 1, text: 'Selamat datang di room baru!', sender: 'system' },
      ])
      // opsional: router.push(`/chat/${res.data._id}`) kalau mau ganti URL
    } catch (error: any) {
      console.error('Gagal buka chat:', error?.response?.data || error.message)
      alert('Gagal membuka/membuat chat')
    } finally {
      setLoading(false)
    }
  }

  const sendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        { id: messages.length + 1, text: newMessage, sender: 'user' },
      ])
      setNewMessage('')
    }
  }

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <ChatHeader />
        <div className="flex-1 overflow-y-auto">
          <MessageList messages={messages} />
        </div>
        <ChatInput
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  )
}
