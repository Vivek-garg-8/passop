# PassOP (LocalStorage Version) - Password Manager

This version of **PassOP** is a fully client-side React app that stores and manages website credentials directly in the browser using `localStorage`. It is perfect for offline use or simple demos.

## 🔧 Features

* 🔐 Add, edit, and delete passwords
* 🧠 All data stored in browser `localStorage`
* 👁️ Toggle password visibility with eye icon
* 📋 Copy to clipboard functionality
* 🎨 Interactive icons via [Lordicon](https://lordicon.com/)
* 🔔 User feedback via [React Toastify](https://fkhadra.github.io/react-toastify/introduction)

## 🛠️ Tech Stack

* **Frontend:** React
* **Styling:** Tailwind CSS
* **Icons:** Lordicon
* **Notifications:** React Toastify
* **Storage:** Browser `localStorage`

## 🚀 Getting Started

### Prerequisites

* Node.js and npm installed

### Setup Instructions

```bash
# Clone the repository
$ git clone https://github.com/yourusername/passop.git

# Go into the project directory
$ cd passop

# Install dependencies
$ npm install

# Start development server
$ npm run dev
```

## 📁 Folder Structure

```
src/
├── components/
│   └── Manager.jsx   # Main password manager logic
├── public/icons/     # Eye icons used for password visibility toggle
├── App.jsx           # App wrapper
├── main.jsx          # Entry point
```

## 🧪 Key Functionalities

* **Form Handling:** Controlled form inputs with validation
* **Password Toggle:** Eye icon toggles visibility using `useRef`
* **Copy to Clipboard:** Copies values using `navigator.clipboard.writeText`
* **Storage:** All passwords stored and retrieved from `localStorage`

## ⚠️ Notes

* Passwords are stored in plain text in localStorage. Do **not** use this for storing real or sensitive data.
* No backend/server is required.

## 🙌 Acknowledgments

* [React](https://reactjs.org/)
* [Tailwind CSS](https://tailwindcss.com/)
* [React Toastify](https://fkhadra.github.io/react-toastify/introduction)
* [Lordicon](https://lordicon.com/)
* [uuid](https://www.npmjs.com/package/uuid)

---

This version is great for testing and learning. For production, consider switching to a secure backend with encryption support.
