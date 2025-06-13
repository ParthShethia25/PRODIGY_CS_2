# 🛡️ Image Encryption Tool

A full-stack application to **encrypt** and **decrypt images** using pixel-level manipulation. This project combines a **C++ backend for high-performance image processing** with a **React frontend for a modern user interface**.

---

## 🌟 Features

### 🔐 Basic Image Encryption
- Adds or subtracts a key value to each pixel's RGB channel.
- Key-based operation ensures consistent encryption/decryption.
- Fast, lightweight algorithm suitable for low-spec machines.

### 🔁 Decryption
- Reverses the exact encryption steps using the same key.
- Ensures image fidelity on correct key usage.

### 🔄 Pixel Processing
- Supports per-pixel arithmetic (addition/subtraction).
- Easily extendable for XOR-based or swapping-based encryption.

### 🖼️ Visual Preview
- Displays original and processed images **side-by-side** in a sleek React UI.
- Showcases encryption and decryption results clearly.

### 💾 File Management
- Encrypted images saved in `/Backend/encrypted`
- Decrypted images saved in `/Backend/decrypted`

---

## 🛠️ Tech Stack

| Layer        | Technology           |
|--------------|----------------------|
| 🧠 Backend   | C++ (using `stb_image` and `stb_image_write`) |
| 🖼️ Frontend | React.js             |
| 🧩 API Layer | Express.js (Node)    |
| 📦 File Upload | `multer` (Node.js)  |
| 🎨 Styling   | CSS with 3D/modern visuals |

---

## 📂 Directory Structure

```SCT_CS_2/
├── Backend/
│ ├── main.cpp
│ ├── encryption.cpp
│ ├── encryption.hpp
│ ├── encrypted/ # Encrypted output images
│ ├── decrypted/ # Decrypted output images
│ └── stb_image.h/.cpp # stb image libs
├── server/
│ └── server.js # Node.js API server
├── frontend/
│ ├── src/
│ │ ├── App.js
│ │ ├── components/
│ │ │ └── ImageEncryptor.jsx
│ │ └── ImageEncryptor.css
│ └── public/
├── README.md

```

---

## ⚙️ Getting Started

### 1. Clone the Repo
```bash
git clone https://github.com/ParthShethia25/SCT_CS_2.git
cd SCT_CS_2
```

### 2. Compile C++ Backend (Image Processor)
Make sure you have g++ installed.

```bash
cd Backend
g++ main.cpp encryption.cpp -o encrypt_tool
```
This creates the image processor binary: encrypt_tool.exe (or ./encrypt_tool on Linux/Mac)

### 3. Start Node API Server

```bash
cd server
npm install
node server.js
```

### 4. Start Frontend React App
```
bash
cd frontend
npm install
npm run dev   # or npm start
```

--- 


🔍 Usage
Upload an image.

Choose operation: Encrypt or Decrypt

Enter a numeric key (e.g., 42)

Hit Submit

View the original and processed images side-by-side!

