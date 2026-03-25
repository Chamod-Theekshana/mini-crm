import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AppShell from '../../shared/layout/AppShell';
import Button from '../../shared/ui/Button';
import EmptyNotes from '../components/EmptyNotes';
import NoteCard from '../components/NoteCard';
import DeleteNoteModal from '../components/DeleteNoteModal';
import { deleteNote, getNotes } from '../services/noteService';

const NotesListPage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getNotes();
      setNotes(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not load notes right now.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const onConfirmDelete = async () => {
    if (!selectedNote) {
      return;
    }

    setDeleting(true);
    try {
      await deleteNote(selectedNote._id);
      setSelectedNote(null);
      await fetchNotes();
    } catch (err) {
      setError(err.response?.data?.message || 'Delete failed');
    } finally {
      setDeleting(false);
    }
  };

  const actions = (
    <>
      <Button variant="outline" className="h-10 rounded-md border-[#1d1d1f] px-4 text-[14px]">
        Sort By
      </Button>
      <Button variant="outline" className="h-10 rounded-md border-[#1d1d1f] px-4 text-[14px]">
        Filter
      </Button>
      <span className="mx-1 h-6 w-px bg-venture-line" />
      <Link to="/notes/new">
        <Button className="h-10 rounded-md px-4 text-[14px]">Add Notes</Button>
      </Link>
    </>
  );

  return (
    <AppShell title="Notes" actions={actions}>
      {loading ? <div className="rounded-card border border-venture-line bg-white p-6">Loading notes...</div> : null}

      {!loading && error ? <div className="mb-4 rounded-card border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div> : null}

      {!loading && notes.length === 0 ? <EmptyNotes /> : null}

      {!loading && notes.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {notes.map((note) => (
            <NoteCard key={note._id} note={note} onDelete={setSelectedNote} />
          ))}
        </div>
      ) : null}

      <DeleteNoteModal
        open={Boolean(selectedNote)}
        note={selectedNote}
        onCancel={() => setSelectedNote(null)}
        onConfirm={onConfirmDelete}
        isLoading={deleting}
      />
    </AppShell>
  );
};

export default NotesListPage;
