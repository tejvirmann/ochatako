# Ochatako

Arash's creative art portfolio website

This is an art website offering creative and artistic services across eight different disciplines.

## Story Behind the Name

The name "ochatako" combines "cha" (tea - my favorite beverage) and "tako" (octopus in Japanese). The octopus represents doing 8 different things at once, just like an octopus with its 8 arms!

## Features

- 🎨 Portfolio showcase across 8 creative disciplines
- 💬 AI-powered chatbot assistant
- 🌓 Dark mode toggle
- 📱 Fully responsive design
- ✨ Parallax image effects
- 📧 Contact form with email integration
- ⚡ Built with React, TypeScript, and Vite

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository or navigate to the project directory:
```bash
cd ochatako
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory and add your API keys:
```env
# OpenRouter API Key for chatbot functionality
VITE_OPENAI_API_KEY=your_openrouter_api_key_here

# Resend API Key for contact form (only needed for production)
RESEND_API_KEY=your_resend_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and visit `http://localhost:5173`

## Deployment to Vercel

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI globally:
```bash
npm install -g vercel
```

2. Deploy to Vercel:
```bash
vercel
```

3. Follow the prompts to link your project

4. Add environment variables in the Vercel dashboard:
   - Go to your project settings
   - Navigate to "Environment Variables"
   - Add `VITE_OPENAI_API_KEY` (for chatbot)
   - Add `RESEND_API_KEY` (for contact form)

### Option 2: Deploy via Vercel Dashboard

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect the Vite framework
6. Add environment variables in the project settings:
   - `VITE_OPENAI_API_KEY` - Your OpenRouter API key
   - `RESEND_API_KEY` - Your Resend API key
7. Click "Deploy"

### Getting API Keys

**OpenRouter API Key** (for AI chatbot):
- Visit [https://openrouter.ai/](https://openrouter.ai/)
- Sign up and get your API key
- Add it as `VITE_OPENAI_API_KEY` in your environment variables

**Resend API Key** (for contact form emails):
- Visit [https://resend.com/](https://resend.com/)
- Sign up and get your API key
- Update `api/send-email.ts` with your verified domain
- Add it as `RESEND_API_KEY` in your environment variables

## Project Structure

```
ochatako/
├── api/                    # Serverless API functions
│   └── send-email.ts      # Contact form email handler
├── public/                 # Static assets
│   └── logo.svg           # Logo file
├── src/
│   ├── components/        # React components
│   │   ├── About.tsx
│   │   ├── Chatbot.tsx   # AI chatbot with OpenRouter
│   │   ├── Contact.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── Mission.tsx
│   │   ├── ParallaxImages.tsx
│   │   ├── Portfolio.tsx
│   │   └── Services.tsx
│   ├── App.tsx            # Main app component
│   ├── main.tsx           # Entry point
│   └── index.css          # Global styles
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── vercel.json            # Vercel configuration

```

## TODO

### 1. Set Up Contact Form Email

To make the contact form work:
- Sign up for [Resend.com](https://resend.com) (free for up to 3,000 emails/month)
- Get your API key from the Resend dashboard
- Update the recipient email in `api/send-email.ts`:
  ```typescript
  to: ['hello@ochatako.com'], // Replace with actual email
  ```
- Add `RESEND_API_KEY` to your `.env.local` file
- Add `RESEND_API_KEY` as an environment variable in Vercel project settings

### 2. Transfer to Arash's GitHub Repository

- Create a new repository under Arash's GitHub account
- Push this code to the new repository
- Connect the repository to Vercel for deployment

## Customization

### Update Portfolio Projects

Edit `src/components/Portfolio.tsx` to update the project showcase with your actual work.

### Update Services

Edit `src/components/Services.tsx` to modify the eight creative disciplines and their descriptions.

### Replace Placeholder Images

1. Add your images to the `public/` directory
2. Update image references in components
3. For parallax images, edit `src/components/ParallaxImages.tsx`

### Update Contact Information

Edit `src/components/Contact.tsx` and `src/components/Footer.tsx` to update email and other contact details.

### Customize Chatbot

Edit `src/components/Chatbot.tsx` to update the AI assistant's knowledge base and personality.

## Technologies Used

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Vercel** - Hosting and serverless functions
- **OpenRouter AI** - Chatbot powered by GPT-4
- **Resend** - Transactional email service

## License

© 2026 Ochatako. All rights reserved.
