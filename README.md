<div align="center">

# 🎌 AniTrack
### Your Modern Anime & Manga Companion

*Discover, track, and explore the world of anime and manga with style*

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg?style=for-the-badge)](https://github.com)
[![Version](https://img.shields.io/badge/version-0.1.0-blue.svg?style=for-the-badge)](https://github.com)
[![License](https://img.shields.io/badge/license-MIT-green.svg?style=for-the-badge)](./LICENSE)

[![Next.js](https://img.shields.io/badge/Next.js-15-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

[🚀 Live Demo](https://next-js-ani-track.vercel.app/)

</div>

---

## 🌟 Overview

**AniTrack** is a cutting-edge web application that brings the anime and manga experience to the modern web. Built with the latest technologies and designed with user experience at its core, AniTrack offers a seamless way to discover new content, track your progress, and dive deep into the rich world of Japanese animation and comics.

### ✨ Key Features

#### 🔍 **Discovery & Exploration**
- Browse extensive anime and manga catalogs
- Advanced search with intelligent filtering
- Character database with detailed profiles
- Weekly airing schedules

### 🎨 **Modern Design**
- **Responsive**: Perfect on desktop, tablet, and mobile
- **Accessible**: Built with accessibility in mind
- **Fast**: Optimized performance with Next.js 15 and Turbopack
- **Intuitive**: Clean, modern interface using shadcn/ui components

---

## 🛠️ Tech Stack

<div align="center">

| Category | Technologies |
|----------|-------------|
| **Frontend** | Next.js 15, TypeScript, Tailwind CSS, shadcn/ui |
| **State Management** | TanStack React Query |
| **Backend** | Next.js API Routes, Drizzle ORM |
| **Database** | Neon (Serverless PostgreSQL) |
| **Authentication** | Better Auth |
| **Development** | ESLint, Prettier, Turbopack |

</div>

---

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have:

- **Node.js** (v20.x or higher) - [Download here](https://nodejs.org/)
- **Package Manager** - npm, yarn, pnpm, or [Bun](https://bun.sh/) (recommended)
- **Database** - [Neon](https://neon.tech/) account (free tier available)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ShadowsDuck/next-js-AniTrack.git
   cd next-js-AniTrack
   ```

2. **Install dependencies**
   ```bash
   # Using npm
   npm install
   
   # Using Bun (recommended for speed)
   bun install
   ```

3. **Environment setup**
   ```bash
   # Copy the example environment file
   cp .env.example .env.local
   ```
   
   Fill in your environment variables (see [Configuration](#-configuration))

4. **Database setup**
   ```bash
   # Push database schema
   npm run drizzle:push
   ```

5. **Start development server**
   ```bash
   npm run dev
   # or
   bun dev
   ```

🎉 **That's it!** Open [http://localhost:3000](http://localhost:3000) and start exploring.

---

## ⚙️ Configuration

### Environment Variables

Create a `.env.local` file in your project root:

```bash
# Database Configuration
DATABASE_URL="postgresql://user:password@host.neon.tech/dbname?sslmode=require"

# Authentication
BETTER_AUTH_SECRET="your-key-here"
BETTER_AUTH_URL="http://localhost:3000"
GOOGLE_CLIENT_ID="your-key-here"
GOOGLE_CLIENT_SECRET="your-key-here"

# API Configuration
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
```

> 💡 **Tip**: Generate a secure AUTH_SECRET using: `openssl rand -base64 32`

---

## 📚 Usage

### Available Scripts

```bash
# Development
npm run dev          # Start development server with Turbopack
npm run dev:turbo    # Explicitly use Turbopack (faster)

# Production
npm run build        # Create production build
npm run start        # Start production server

# Database
npm run drizzle:push     # Push schema changes
npm run drizzle:studio   # Open Drizzle Studio (database GUI)

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run type-check   # Run TypeScript compiler
```

### API Endpoints

The application provides a comprehensive REST API:

| Endpoint | Description | Parameters |
|----------|-------------|------------|
| `GET /api/anime` | List anime | `page`, `limit`, `search`, `genre` |
| `GET /api/anime/[id]` | Anime details | - |
| `GET /api/manga` | List manga | `page`, `limit`, `search`, `genre` |
| `GET /api/manga/[id]` | Manga details | - |
| `GET /api/characters` | List characters | `page`, `limit`, `search` |
| `GET /api/characters/[id]` | Character details | - |
| `GET /api/schedule` | Weekly anime schedule | `day` |
| `POST /api/auth/*` | Authentication endpoints | - |

---

## 🏗️ Project Structure

```
next-js-AniTrack/
├── 📁 app/                    # Next.js App Router
│   ├── 📁 (auth)/            # Authentication pages
│   ├── 📁 (pages)/           # Main application pages
│   │   ├── 📁 anime/         # Anime-related pages
│   │   ├── 📁 manga/         # Manga-related pages
│   │   └── 📁 characters/    # Character pages
│   ├── 📁 api/               # API routes
│   ├── 📄 globals.css        # Global styles
│   └── 📄 layout.tsx         # Root layout
├── 📁 components/            # Reusable components
│   ├── 📁 ui/               # shadcn/ui components
│   ├── 📁 cards/            # Card components
│   ├── 📁 sections/         # Page sections
│   └── 📁 forms/            # Form components
├── 📁 db/                    # Database schema & config
├── 📁 lib/                   # Utilities & helpers
├── 📁 server/                # Server-side logic
├── 📁 types/                 # TypeScript definitions
└── 📁 public/               # Static assets
```

---

## 🧪 Development

### Running Tests

*Testing setup is planned for future releases*

```bash
# Coming soon
npm run test        # Run test suite
npm run test:watch  # Run tests in watch mode
npm run test:e2e    # Run end-to-end tests
```

### Code Quality

This project maintains high code quality with:

- **TypeScript** for type safety
- **ESLint** for code linting
- **Prettier** for code formatting
- **Husky** for git hooks (planned)

```bash
# Check everything
npm run lint && npm run type-check
```

---

## 🤝 Contributing

We love contributions! Here's how you can help:

<details>
<summary>🔧 <strong>Development Setup</strong></summary>

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run tests: `npm run test` (when available)
5. Commit: `git commit -m 'feat: add amazing feature'`
6. Push: `git push origin feature/amazing-feature`
7. Open a Pull Request

</details>

<details>
<summary>📝 <strong>Commit Convention</strong></summary>

We follow [Conventional Commits](https://conventionalcommits.org/):

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Test-related changes
- `chore:` Maintenance tasks

</details>

### Code of Conduct

Please be respectful and inclusive. See our [Code of Conduct](CODE_OF_CONDUCT.md) for details.

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

<div align="center">

**Special thanks to:**

[Jikan API](https://jikan.moe/) • [Next.js Team](https://nextjs.org/) • [Vercel](https://vercel.com/) • [shadcn/ui](https://ui.shadcn.com/)

**And all the amazing open-source contributors who make projects like this possible! 🎉**

---

<sub>Built with ❤️ by developers, for anime lovers</sub>

**[⬆ Back to Top](#-anitrack)**

</div>
