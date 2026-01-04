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

## 🚀 How to Run the Project
```bash
pnpm install
pnpm dev
