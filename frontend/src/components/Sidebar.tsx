'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import LogoutIcon from '@mui/icons-material/Logout'
import ChatIcon from '@mui/icons-material/Chat'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import axios from 'axios'

interface Friend {
  _id: string
  username: string
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export default function Sidebar() {
  const router = useRouter()
  const [friends, setFriends] = useState<Friend[]>([])
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState<Friend[]>([])
  const [message, setMessage] = useState('')

  const token =
    typeof window !== 'undefined' ? localStorage.getItem('token') : ''
  const API = axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  // Fetch daftar teman dari API
  const fetchFriends = async () => {
    try {
      const res = await API.get<Friend[]>('/chats/listFriend')
      setFriends(res.data)
    } catch (error: any) {
      console.error(
        'Gagal fetch friends:',
        error?.response?.data || error.message
      )
    }
  }

  useEffect(() => {
    fetchFriends()
  }, [])

  // Logout user
  const logout = () => {
    localStorage.removeItem('token')
    router.push('/login')
  }

  // Membuka atau membuat chat
  const createOrGetChat = async (friendId: string) => {
    try {
      const res = await API.post(`/chats/create`, { userId: friendId })
      const chatRoomId = res.data._id

      // Arahkan ke halaman chat dengan roomId
      router.push(`/chat/${friendId}`) // atau `/chat/${chatRoomId}` tergantung frontend kamu
    } catch (error: any) {
      console.error('Gagal buka chat:', error?.response?.data || error.message)
      alert('Gagal membuka/membuat chat')
    }
  }

  // Pencarian teman
  const handleSearch = async () => {
    if (!search) return
    try {
      const res = await API.get(`/chats/search?username=${search}`)
      setSearchResults(res.data)
      setMessage('') // Reset message setelah pencarian sukses
    } catch (error: any) {
      console.error('Search error:', error?.response?.data || error.message)
      setMessage('Gagal mencari teman, coba lagi!')
    }
  }

  // Menambahkan teman
  const handleAddFriend = async (friendUsername: string) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/chats/addFriend`,
        { username: friendUsername },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      setMessage(response.data.message) // Menampilkan pesan dari API
    } catch (error: any) {
      setMessage(error?.response?.data?.message || 'Error adding friend')
    }
  }

  // Filter teman berdasarkan pencarian
  const filteredFriends = friends.filter((friend) =>
    friend.username.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="w-full sm:w-1/3 lg:w-1/4 bg-gray-800 p-4 flex flex-col justify-between shadow-lg text-white">
      <h2 className="text-2xl font-bold text-neon-blue mb-4 flex items-center">
        <ChatIcon fontSize="large" className="mr-2" /> Chat
      </h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Cari username"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-neon-blue"
        />
        <button
          onClick={handleSearch}
          className="w-full mt-2 p-2 bg-blue-600 rounded hover:bg-blue-700 transition"
        >
          Cari Teman 🔍
        </button>

        {message && <div className="text-red-500 text-sm mt-2">{message}</div>}

        {searchResults.length > 0 && (
          <div className="mt-2 max-h-40 overflow-y-auto space-y-2">
            {searchResults.map((user) => (
              <div
                key={user._id}
                className="flex items-center justify-between bg-gray-700 p-2 rounded"
              >
                <span>{user.username}</span>
                <button
                  onClick={() => handleAddFriend(user.username)} // Kirim username ke handler
                  className="text-green-400 hover:text-green-300"
                >
                  <PersonAddIcon />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex-grow space-y-2 overflow-y-auto pr-1">
        {filteredFriends.length > 0 ? (
          filteredFriends.map((friend) => (
            <div
              key={friend._id}
              onClick={() => createOrGetChat(friend._id)} // Kirim friendId ke URL
              className="flex items-center gap-2 p-3 bg-gray-700 rounded cursor-pointer hover:bg-gray-600 transition duration-200 border-l-4 border-transparent hover:border-neon-blue"
            >
              <AccountCircleIcon fontSize="large" />
              <div>
                <span className="block font-semibold">{friend.username}</span>
                <span className="text-sm text-gray-400">Online</span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-sm">Belum ada teman 😢</p>
        )}
      </div>

      <div className="flex items-center justify-between p-3 bg-gray-700 rounded mt-4">
        <div className="flex items-center gap-2">
          <div className="text-2xl text-neon-pink">👤</div>
          <span className="font-semibold">HaloZra</span>
        </div>
        <button
          onClick={logout}
          className="p-2 rounded bg-red-600 hover:bg-red-700 transition text-white"
        >
          <LogoutIcon />
        </button>
      </div>
    </div>
  )
}
