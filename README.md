# ChatApp Violet

ChatApp Violet adalah aplikasi chat real-time yang dibangun menggunakan MERN Stack (MongoDB, Express.js, React.js, dan Node.js). Aplikasi ini memungkinkan pengguna untuk berkomunikasi secara langsung dengan fitur modern seperti autentikasi, chat rooms, dan notifikasi.

## 🚀 Fitur Utama
- **Real-time Chat**: Kirim dan terima pesan secara langsung menggunakan WebSockets (Socket.io).
- **Autentikasi Pengguna**: Sistem login dan register dengan JWT Authentication.
- **UI/UX Modern**: Dibangun dengan React.js dan Tailwind CSS.
- **Chat Rooms & Private Messaging**: Dapat mengirim pesan dalam grup atau secara pribadi.
- **Notifikasi**: Notifikasi pesan masuk secara real-time.
- **Penyimpanan Database**: Menggunakan MongoDB dengan Mongoose untuk menyimpan data pengguna dan pesan.

## 🛠️ Teknologi yang Digunakan
- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB dengan Mongoose
- **Real-time Communication**: Socket.io
- **Autentikasi**: JSON Web Token (JWT)

## 📦 Instalasi

### 1. Clone Repository
```sh
  git clone https://github.com/username/chatapp-violet.git
  cd chatapp-violet
```

### 2. Install Dependencies
#### Backend:
```sh
  cd server
  npm install
```
#### Frontend:
```sh
  cd client
  npm install
```

### 3. Konfigurasi Environment Variables
Buat file `.env` di dalam folder `server/` dan tambahkan:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLIENT_URL=http://localhost:3000
```

### 4. Menjalankan Aplikasi
#### Backend:
```sh
  cd server
  npm start
```
#### Frontend:
```sh
  cd client
  npm start
```
Akses aplikasi di `http://localhost:3000`

## 📌 Struktur Proyek
```
chatapp-violet/
├── client/          # Frontend (React.js)
├── server/          # Backend (Express.js, Node.js)
├── README.md        # Dokumentasi proyek
├── .gitignore       # File yang diabaikan oleh Git
├── package.json     # Konfigurasi npm
```

## 🔥 Penggunaan
1. Daftar atau login untuk mulai mengobrol.
2. Buat atau bergabung dengan chat room.
3. Kirim pesan dan lihat notifikasi real-time.

## 🤝 Kontribusi
Kontribusi sangat diterima! Silakan fork repo ini dan buat pull request untuk fitur baru atau perbaikan bug.

## 📜 Lisensi
Proyek ini dilisensikan di bawah **MIT License**. Silakan lihat `LICENSE` untuk detailnya.

---
Happy Coding! 💜

