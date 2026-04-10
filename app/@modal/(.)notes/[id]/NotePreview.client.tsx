'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { fetchNoteById } from '@/lib/api';
import Modal from '@/components/Modal/Modal';

interface NotePreviewClientProps {
  noteId: string;
}

export default function NotePreviewClient({ noteId }: NotePreviewClientProps) {
  const router = useRouter();

  const { data: note, isLoading, error } = useQuery({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
  });

  return (
    <Modal isOpen={true} onClose={() => router.back()}>
      {isLoading && <p>Loading note...</p>}
      {error && <p>Failed to load note.</p>}
      {note && (
        <div>
          <h2>{note.title}</h2>
          <p>Tag: {note.tag}</p>
          <p>{note.content}</p>
          <p>Created: {note.createdAt}</p>
        </div>
      )}
    </Modal>
  );
}
