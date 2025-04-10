# PM Board - Feature Voting System

A collaborative Kanban board application built with Next.js, Supabase, and Vercel that allows teams to propose and vote on new features for their SaaS product.

## Features

- Interactive Kanban board with drag-and-drop functionality
- Feature proposal and voting system
- Real-time updates
- Responsive design
- Dark mode support

## Prerequisites

- Node.js 18.17.0 or later
- npm or yarn
- Supabase account
- Vercel account (for deployment)

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd pmboard
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory and add your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment to Vercel

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)

2. Go to [Vercel](https://vercel.com) and sign in with your Git provider

3. Click "New Project" and import your repository

4. Configure the project:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: npm run build
   - Install Command: npm install
   - Output Directory: .next

5. Add your environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anon key

6. Click "Deploy"

7. Once deployed, Vercel will provide you with a URL for your application

## Project Structure

- `src/` - Source code directory
  - `app/` - Next.js app directory
    - `page.tsx` - Main page component
    - `layout.tsx` - Root layout component
    - `globals.css` - Global styles
  - `components/` - Reusable components
    - `ui/` - UI components (Button, Card, etc.)
    - `forms/` - Form components
    - `layout/` - Layout components
  - `lib/` - Utility functions and Supabase client
  - `types/` - TypeScript type definitions

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 