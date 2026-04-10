import { Metadata } from 'next';
import css from '../components/Home/Home.module.css';

export const metadata: Metadata = {
  title: 'Home | NoteHub - Manage Your Personal Notes Efficiently',
  description: 'Welcome to NoteHub - a simple and efficient application for managing personal notes. Keep your thoughts organized and accessible in one place with support for keyword search and structured organization.',
  openGraph: {
    title: 'Home | NoteHub - Manage Your Personal Notes Efficiently',
    description: 'Welcome to NoteHub - a simple and efficient application for managing personal notes. Keep your thoughts organized and accessible in one place with support for keyword search and structured organization.',
    url: 'https://notehub.example.com',
    type: 'website',
    images: [
      {
        url: 'https://notehub.example.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'NoteHub - Note Management Application',
      },
    ],
  },
};

export default function Page() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Welcome to NoteHub</h1>

        <p className={css.description}>
          NoteHub is a simple and efficient application designed for managing
          personal notes. It helps keep your thoughts organized and accessible
          in one place, whether you are at home or on the go.
        </p>

        <p className={css.description}>
          The app provides a clean interface for writing, editing, and browsing
          notes. With support for keyword search and structured organization,
          NoteHub offers a streamlined experience for anyone who values clarity
          and productivity.
        </p>
      </div>
    </main>
  );
}