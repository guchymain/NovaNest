import './globals.css';
import { Manrope, Outfit } from 'next/font/google';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const metadata = {
  title: 'NovaNest - Luxury Real Estate',
  description: 'NovaNest Estates luxury real estate properties.',
  icons: {
    icon: '/Logo.png',
    shortcut: '/Logo.png',
    apple: '/Logo.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${manrope.variable} ${outfit.variable}`}>
      <head>
        <link rel="icon" href="/Logo.png" type="image/png" sizes="32x32" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Outfit:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#21433D] text-white min-h-screen font-manrope antialiased overflow-x-hidden">
        {/* Tiled background texture layer */}
        <div
          className="fixed inset-0 pointer-events-none z-0 bg-repeat opacity-60"
          style={{
            backgroundImage: "url('/bgimage.png')",
            backgroundRepeat: 'repeat',
            backgroundSize: '1024px 1024px',
          }}
        />
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
