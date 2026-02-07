# 💰 Welth - AI-Powered Finance Management Platform

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-15.5-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.1-61DAFB?style=for-the-badge&logo=react)
![Prisma](https://img.shields.io/badge/Prisma-6.16-2D3748?style=for-the-badge&logo=prisma)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Latest-336791?style=for-the-badge&logo=postgresql)

**Take control of your finances with AI-powered insights**

[Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Environment Variables](#-environment-variables) • [Project Structure](#-project-structure)

</div>

---

## 🌟 Features

### 📊 **Dashboard & Analytics**
- Real-time financial overview with interactive charts
- Visual breakdown of income vs expenses
- Track your spending patterns over time

### 💳 **Account Management**
- Support for multiple account types (Current & Savings)
- Set default accounts for quick transactions
- Track balances across all your accounts

### 💸 **Transaction Tracking**
- Log income and expenses with detailed categorization
- Support for recurring transactions (Daily, Weekly, Monthly, Yearly)
- Receipt upload functionality
- Transaction status tracking (Pending, Completed, Failed)

### 📈 **Budget Management**
- Set monthly budgets
- Automated budget alerts when limits are approached
- Track spending against your budget goals

### 🤖 **AI-Powered Insights**
- Monthly AI-generated financial insights using OpenAI
- Category-wise expense breakdown analysis
- Personalized recommendations based on spending habits
- Savings tracking and optimization tips

### 📧 **Email Notifications**
- Budget alert notifications via Resend
- Beautiful email templates with React Email

### 🔒 **Security**
- Secure authentication with Clerk
- Rate limiting and bot protection with Arcjet
- Data encryption and secure API endpoints

---

## 🛠 Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 15.5 (App Router, Turbopack) |
| **Frontend** | React 19, Tailwind CSS 4, Radix UI |
| **Database** | PostgreSQL with Prisma ORM |
| **Authentication** | Clerk |
| **AI** | OpenAI GPT |
| **Email** | Resend + React Email |
| **Background Jobs** | Inngest |
| **Security** | Arcjet |
| **Charts** | Recharts |
| **Forms** | React Hook Form + Zod |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.17 or later
- **npm**, **yarn**, **pnpm**, or **bun**
- **PostgreSQL** database

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/welth.git
   cd welth
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory and add the required variables (see [Environment Variables](#-environment-variables))

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open the app**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🔐 Environment Variables

Create a `.env` file with the following variables:

```env
# Database
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# OpenAI
OPENAI_API_KEY=sk-...

# Resend (Email)
RESEND_API_KEY=re_...

# Arcjet (Security)
ARCJET_KEY=ajkey_...

# Inngest (Background Jobs)
INNGEST_SIGNING_KEY=...
INNGEST_EVENT_KEY=...
```

---

## 📁 Project Structure

```
welth/
├── actions/              # Server actions
│   ├── account.js        # Account CRUD operations
│   ├── budget.js         # Budget management
│   ├── dashboard.js      # Dashboard data fetching
│   ├── insights.js       # AI insights generation
│   ├── transaction.js    # Transaction operations
│   └── send-email.js     # Email utilities
├── app/
│   ├── (auth)/           # Authentication pages
│   ├── (main)/           # Main app routes
│   │   ├── accounts/     # Account pages
│   │   ├── dashboard/    # Dashboard page
│   │   └── transaction/  # Transaction pages
│   ├── api/              # API routes
│   └── page.jsx          # Landing page
├── components/
│   └── ui/               # Reusable UI components
├── data/                 # Static data & configurations
├── emails/               # React Email templates
├── hooks/                # Custom React hooks
├── lib/
│   ├── inngest/          # Background job definitions
│   ├── arcjet.js         # Security configuration
│   └── prisma.js         # Database client
├── prisma/
│   └── schema.prisma     # Database schema
└── public/               # Static assets
```

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run email` | Preview email templates |

---

## 📊 Database Schema

The application uses the following main models:

- **User** - User profiles synced with Clerk
- **Account** - Financial accounts (Current/Savings)
- **Transaction** - Income and expense records with recurring support
- **Budget** - Monthly budget limits with alerts
- **MonthlyInsight** - AI-generated financial insights

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

<div align="center">

**Built with ❤️ using Next.js and AI**

</div>
