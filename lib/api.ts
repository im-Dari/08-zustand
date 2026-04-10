import axios from 'axios';
import type { Note } from '../types/note';

const BASE_URL = 'https://notehub-public.goit.study/api';
const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

if (!token) throw new Error('NEXT_PUBLIC_NOTEHUB_TOKEN is not set');

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes(
  params: FetchNotesParams = {}
): Promise<FetchNotesResponse> {
  const { page = 1, perPage = 12, search = '', tag } = params;

  const { data } = await instance.get<FetchNotesResponse>('/notes', {
    params: { page, perPage, search, ...(tag && tag !== 'all' ? { tag } : {}) },
  });

  return data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  if (!id) throw new Error('Note ID is required');

  const { data } = await instance.get<Note>(`/notes/${id}`);
  return data;
}

export async function createNote(
  note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Note> {
  const { data } = await instance.post<Note>('/notes', note);
  return data;
}

export async function deleteNote(id: string): Promise<Note> {
  if (!id) throw new Error('Note ID is required');

  const { data } = await instance.delete<Note>(`/notes/${id}`);
  return data;
}