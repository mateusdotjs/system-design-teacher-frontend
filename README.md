# 📐 System Design Teacher - Frontend

A interactive web application designed to help software engineers learn, practice, and master system design. Build visual architectures for classic design problems and receive instant AI-powered reviews and structured feedback.

---

## 🚀 Key Features

- **Interactive Canvas/Editor**: Build robust system architectures using a custom drag-and-drop canvas powered by [@xyflow/react](https://github.com/xyflow/xyflow).
- **Rich Component Library**: Support for standard system design components such as Load Balancers, API Gateways, Web/Worker Servers, Caches, Relational/NoSQL Databases, Message Queues, CDN, Search Engines, and more.
- **Problem Set Dashboard**: Access curated system design challenges, complete with functional and non-functional requirements.
- **AI Evaluation & Feedback**: Submit diagrams to get granular evaluations (positives, areas of improvement, and architectural scores).
- **Submissions Tracker**: Track your progression and review historical submission diagrams along with their feedback history.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vite.dev/)
- **Diagram Engine**: [@xyflow/react](https://reactflow.dev/) (React Flow)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Data Fetching**: [TanStack React Query v5](https://tanstack.com/query/latest)
- **Styling**: [TailwindCSS v4](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/) / Radix UI primitives
- **Routing**: [React Router v7](https://reactrouter.com/)

---

## 📦 Project Structure

```text
src/
├── assets/             # Images and SVG assets
├── components/
│   ├── editor/         # Diagram editor components (Sidebar, Node configs, Custom nodes/edges)
│   ├── layout/         # General application Shell (Navbar, Footer, Layout wraps)
│   └── ui/             # Reusable core UI components (Button, Card, Badge, etc.)
├── lib/
│   ├── api.ts          # API Client utilities and React hooks for backend communication
│   └── utils.ts        # Tailwind merge helpers
├── pages/
│   ├── landing-page    # Marketing landing page
│   ├── problems-page   # Challenge list dashboard
│   ├── editor-page     # Interactive diagram editor canvas
│   └── submissions-page# Submissions history
├── providers/          # Global application providers (QueryClient, Routing)
├── app.tsx             # Main router config & views
└── main.tsx            # App entrypoint
```

---

## ⚙️ Getting Started

### 📋 Prerequisites

Make sure you have the following installed on your machine:
- **Node.js** (v18+ recommended)
- **npm** or **yarn** / **pnpm**

---

### 🔧 Installation Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/mateusdotjs/system-design-teacher-frontend.git
   cd system-design-teacher-frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up Environment Variables**:
   Create a `.env` or `.env.local` file in the root directory:
   ```env
   # Backend API Endpoint
   VITE_API_URL=http://localhost:3000
   ```

---

### 💻 Running Locally

To start the Vite development server:

```bash
npm run dev
```

The application will be running at `http://localhost:5173`. Make sure the companion backend is running on `http://localhost:3000` (or the URL specified in your `VITE_API_URL`).

---

### 🏗️ Production Build

To build the project for production deployment:

```bash
npm run build
```

This generates optimized static files in the `dist` directory. You can preview the production build locally using:

```bash
npm run preview
```

---

### 🧹 Linting & Formatting

To run the linter and format code:

```bash
npm run lint
```
