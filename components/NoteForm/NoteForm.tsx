'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { NoteTag } from '../../types/note';
import { useNoteStore } from '../../lib/store/noteStore';
import { createNote } from '../../lib/api';
import css from './NoteForm.module.css';

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { draft, setDraft, clearDraft } = useNoteStore();
  const [formData, setFormData] = useState(draft);

  useEffect(() => {
    setFormData(draft);
  }, [draft]);

  const handleChange = (field: keyof typeof formData, value: string) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    setDraft(newData);
  };

  const mutation = useMutation({
    mutationFn: createNote,

    onSuccess: async () => {
      // 🔥 ключова частина — оновлення списку нотаток
      await queryClient.invalidateQueries({ queryKey: ['notes'] });

      clearDraft();
      router.back();
    },

    onError: (error) => {
      console.error('Failed to create note:', error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    mutation.mutate({
      title: formData.title,
      content: formData.content,
      tag: formData.tag,
    });
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          className={css.input}
          placeholder="Enter note title"
          required
          minLength={3}
          maxLength={50}
          value={formData.title}
          onChange={(e) => handleChange('title', e.target.value)}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          className={css.input}
          placeholder="Enter note content"
          required
          minLength={1}
          rows={10}
          value={formData.content}
          onChange={(e) => handleChange('content', e.target.value)}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          className={css.select}
          value={formData.tag}
          onChange={(e) => handleChange('tag', e.target.value as NoteTag)}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={handleCancel}
        >
          Cancel
        </button>

        <button
          type="submit"
          className={css.submitButton}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? 'Creating...' : 'Create'}
        </button>
      </div>
    </form>
  );
}