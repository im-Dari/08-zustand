'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import css from './NotePreview.module.css';

export default function NotePreview({ noteId }: { noteId: string }) {
  const { data: note, isLoading, error } = useQuery({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error || !note) return <p>Failed to load note.</p>;

  return (
    <div className={css.container}>
      <h2>{note.title}</h2>
      <p className={css.tag}>{note.tag}</p>
      <p>{note.content}</p>
      <p>{note.createdAt}</p>
    </div>
  );
}