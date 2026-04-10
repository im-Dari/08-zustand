import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Metadata } from 'next';
import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';

const tagDescriptions: Record<string, string> = {
  'all': 'View all your notes',
  'Todo': 'View all your todo notes and tasks',
  'Work': 'View all your work-related notes',
  'Personal': 'View all your personal notes',
  'Meeting': 'View all your meeting notes',
  'Shopping': 'View all your shopping notes',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug[0] || 'all';
  const displayTag = tag.charAt(0).toUpperCase() + tag.slice(1);
  const description = tagDescriptions[tag] || `View notes filtered by ${displayTag}`;

  return {
    title: `${displayTag} Notes | NoteHub`,
    description: description,
    openGraph: {
      title: `${displayTag} Notes | NoteHub`,
      description: description,
      url: `https://notehub.example.com/notes/filter/${tag}`,
      type: 'website',
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: `${displayTag} Notes in NoteHub`,
        },
      ],
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const tag = slug[0];

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, '', tag],
    queryFn: () =>
      fetchNotes({
        page: 1,
        perPage: 12,
        search: '',
        ...(tag !== 'all' && { tag }),
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}