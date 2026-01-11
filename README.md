# 🌟 Modern Portfolio

A stunning, interactive portfolio website built with Next.js 15, featuring an AI-powered chatbot, smooth animations, and a modern design.

![Next.js](https://img.shields.io/badge/Next.js-16.1-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.24-0055FF?style=for-the-badge&logo=framer&logoColor=white)

## ✨ Features

- 🤖 **AI-Powered Chatbot** - Interactive assistant using LangChain and Google Gemini AI
- 🎬 **Smooth Animations** - Beautiful transitions powered by Framer Motion
- 📱 **Fully Responsive** - Optimized for all devices
- 🎨 **Modern UI/UX** - Clean, professional design with Tailwind CSS
- 📊 **Project Showcase** - Dynamic project gallery with detailed information
- 🏆 **Certifications Display** - Professional certificates showcase
- ⚡ **Fast Performance** - Built with Next.js 15 for optimal speed
- 🎯 **Vector Search** - Pinecone integration for intelligent content search

## 🚀 Tech Stack

### Frontend
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)

### AI & Backend
![LangChain](https://img.shields.io/badge/LangChain-121212?style=for-the-badge&logo=chainlink&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Google_Gemini-8E75B2?style=for-the-badge&logo=google&logoColor=white)
![Pinecone](https://img.shields.io/badge/Pinecone-000000?style=for-the-badge&logo=pinecone&logoColor=white)

### UI Libraries
![Lucide React](https://img.shields.io/badge/Lucide_Icons-F56565?style=for-the-badge&logo=lucide&logoColor=white)
![clsx](https://img.shields.io/badge/clsx-6366F1?style=for-the-badge)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js 20.x or higher
- npm or yarn package manager
- Git

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/shubh-a11y/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   GOOGLE_API_KEY=your_google_gemini_api_key
   PINECONE_API_KEY=your_pinecone_api_key
   PINECONE_INDEX_NAME=your_index_name
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📂 Project Structure

```
portfolio/
├── app/
│   ├── api/
│   │   └── chat/          # AI chatbot API route
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/
│   ├── Hero/              # Hero section components
│   ├── Loader/            # Loading animations
│   └── Sections/          # Page sections
├── data/                  # Project and personal data
├── public/                # Static assets
│   ├── Certificate_Images/
│   ├── ProjectImages/
│   └── webp_sequence/    # Animation sequences
└── scripts/               # Utility scripts
```

## 🎨 Components

- **Hero Section** - Eye-catching landing with animated sequences
- **About Section** - Personal introduction and background
- **Tech Stack** - Skills and technologies showcase
- **Projects** - Portfolio of work with detailed descriptions
- **Certifications** - Professional certifications display
- **AI Chat Interface** - Interactive chatbot for visitor engagement

## 🔧 Configuration

### Tailwind CSS
The project uses Tailwind CSS v4 with custom configurations in `app/globals.css`.

### TypeScript
TypeScript configuration is in `tsconfig.json` with strict mode enabled.

### ESLint
Linting rules are defined in `eslint.config.mjs`.

## 📱 Responsive Design

The portfolio is fully responsive and optimized for:
- 📱 Mobile devices (320px+)
- 📲 Tablets (768px+)
- 💻 Laptops (1024px+)
- 🖥️ Desktops (1440px+)

## 🚢 Deployment

### Deploy on Vercel

The easiest way to deploy is using [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/shubh-a11y/portfolio)

1. Push your code to GitHub
2. Import your repository on Vercel
3. Add environment variables
4. Deploy!

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/shubh-a11y/portfolio/issues).

## 📝 License

This project is [MIT](LICENSE) licensed.

## 👤 Author

**Shubhang Singh**

- GitHub: [@shubh-a11y](https://github.com/shubh-a11y)
- Email: singhshubhang10906@gmail.com

## ⭐ Show your support

Give a ⭐️ if you like this project!

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting
- Google for Gemini AI
- Pinecone for vector database
- Framer Motion for smooth animations

---

<div align="center">
  Made with ❤️ by Shubhang Singh
</div>
