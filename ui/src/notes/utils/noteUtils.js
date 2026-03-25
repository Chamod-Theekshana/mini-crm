export const formatDueDate = (input) => {
  if (!input) {
    return 'No due date';
  }

  const date = new Date(input);
  if (Number.isNaN(date.getTime())) {
    return 'No due date';
  }

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric'
  });
};

export const mapNoteToForm = (note) => ({
  title: note?.title || '',
  description: note?.description || '',
  status: note?.status || 'weekly',
  image: note?.image || '',
  dueDate: note?.dueDate ? note.dueDate.slice(0, 10) : ''
});
