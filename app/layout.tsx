import { Roboto } from 'next/font/google';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import TanStackProvider from '../components/TanStackProvider/TanStackProvider';
import './globals.css';

const roboto = Roboto({
  weight: ['400', '500', '700'],
  variable: '--font-roboto',
  display: 'swap',
  subsets: ['cyrillic', 'latin'],
});

export const metadata = {
  title: 'NoteHub - Manage Your Personal Notes Efficiently',
  description: 'NoteHub is a simple and efficient application designed for managing personal notes. Keep your thoughts organized and accessible in one place with support for keyword search and structured organization.',
  openGraph: {
    title: 'NoteHub - Manage Your Personal Notes Efficiently',
    description: 'NoteHub is a simple and efficient application designed for managing personal notes. Keep your thoughts organized and accessible in one place with support for keyword search and structured organization.',
    url: 'https://notehub.example.com',
    siteName: 'NoteHub',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub - Note Management Application',
      },
    ],
    type: 'website',
  },
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en" className={roboto.variable}>
      <body className="appContainer">
        <TanStackProvider>
          <Header />
          <main className="appContent">{children}</main>
          {modal}
          <Footer />
          <div id="root"></div>
          <div id="modal-root"></div>
        </TanStackProvider>
      </body>
    </html>
  );
}