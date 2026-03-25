import { describe, expect, it } from 'vitest';
import { formatDueDate, mapNoteToForm } from './noteUtils';

describe('noteUtils', () => {
  it('formats due date correctly', () => {
    expect(formatDueDate('2026-03-25T00:00:00.000Z')).toContain('2026');
  });

  it('maps note model to form values', () => {
    const form = mapNoteToForm({
      title: 'Task',
      description: 'Desc',
      status: 'weekly',
      image: 'https://example.com/i.png',
      dueDate: '2026-03-25T00:00:00.000Z'
    });

    expect(form).toEqual({
      title: 'Task',
      description: 'Desc',
      status: 'weekly',
      image: 'https://example.com/i.png',
      dueDate: '2026-03-25'
    });
  });
});
