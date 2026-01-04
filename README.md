# Exam Management System

## 📌 Project Overview
The Exam Management System is a role-based web application designed to simplify the examination workflow in educational institutions.  
It provides separate dashboards for **Admin** and **Student**, allowing admins to create exams and manage applications, while students can apply for exams and download hall tickets after approval.

This project is built using modern web technologies with a clean, pastel-themed, professional UI.

---

## 👥 User Roles
### 🔑 Admin
- Login as Admin
- Create new exams
- View student applications
- Approve or reject exam applications
- Manage examination workflow

### 🎓 Student
- Login as Student
- Apply for available exams
- View application status
- Download hall ticket after approval

---

## ✨ Features
- Role-based authentication (Admin / Student)
- Protected routes using role checks
- Exam creation and management
- Student exam application system
- Application approval workflow
- Hall ticket availability after approval
- Clean pastel UI with modern layout
- Responsive and user-friendly design
- Frontend-only data simulation using localStorage

---

## 🛠 Tech Stack Used

### Frontend
- **Next.js (App Router)** – Framework for React applications
- **React** – Component-based UI development
- **TypeScript** – Type safety and better code maintainability
- **Tailwind CSS** – Utility-first CSS framework for styling
- **shadcn/ui** – Prebuilt accessible UI components
- **Lucide Icons** – Modern icon set

### State & Utilities
- **React Hooks** (`useState`, `useEffect`)
- **localStorage** – Simulated backend data storage
- **Next.js Navigation** – Routing and page transitions

### Tooling
- **pnpm** – Fast package manager
- **PostCSS** – CSS processing
- **ESLint** – Code quality and linting

---

## 📂 Project Structure
app/
├── admin/ # Admin routes and pages
├── student/ # Student routes and pages
├── login/ # Login page
├── layout.tsx # Root layout
├── page.tsx # Home page
components/
├── ui/ # shadcn UI components
├── navbar.tsx # Navigation bar
hooks/
├── use-toast.ts # Toast notifications
lib/
└── utils.ts # Utility functions
styles/
└── globals.css # Global styles


---

## 🔐 Authentication Logic
- Role (admin/student) is selected during login
- Selected role is stored in `localStorage`
- Routes are protected based on role
- Logout clears stored role and redirects to login

---
## Screenshots

<img width="1041" height="745" alt="image" src="https://github.com/user-attachments/assets/8aa0e03a-ca2e-4363-be73-c2d76dad1a26" />
<img width="1915" height="737" alt="image" src="https://github.com/user-attachments/assets/1e03dc8a-edf8-4319-a012-f2a65bb42e07" />
<img width="1364" height="813" alt="image" src="https://github.com/user-attachments/assets/5d0444d9-74ff-4a31-bb1d-ccdf48642a95" />
<img width="1914" height="739" alt="image" src="https://github.com/user-attachments/assets/7ec6f0b6-d20c-4dab-9fc4-e144fafc0c8f" />
<img width="1919" height="819" alt="image" src="https://github.com/user-attachments/assets/dfcb7f50-ca20-4cae-928b-dc5bec1e0486" />
<img width="1917" height="644" alt="image" src="https://github.com/user-attachments/assets/81df73d6-a0a3-435a-8d88-bb9f3ad01f40" />
<img width="1909" height="816" alt="image" src="https://github.com/user-attachments/assets/c8de6691-c1f7-4132-bb9f-8873ed6b2236" />
<img width="1058" height="844" alt="image" src="https://github.com/user-attachments/assets/7341cdfd-7fc5-4b7b-ad67-a8e59397b87f" />



## 🚀 How to Run the Project
```bash
pnpm install
pnpm dev
