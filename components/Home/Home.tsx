import css from './Home.module.css';

export default function Home({ children }: { children: React.ReactNode }) {
  return <div className={css.container}>{children}</div>;
}