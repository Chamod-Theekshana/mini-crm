import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AppShell from '../../shared/layout/AppShell';
import Button from '../../shared/ui/Button';
import Input from '../../shared/ui/Input';
import { createNote, getNoteById, updateNote } from '../services/noteService';
import { mapNoteToForm } from '../utils/noteUtils';

const statuses = ['weekly', 'monthly', 'personal', 'business', 'product', 'badge', 'internal', 'marketing', 'urgent'];

const NoteFormPage = ({ mode }) => {
  const isEdit = mode === 'edit';
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    title: '',
    description: '',
    status: 'weekly',
    image: '',
    dueDate: ''
  });
  const [loading, setLoading] = useState(isEdit);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadNote = async () => {
      if (!isEdit) {
        return;
      }

      try {
        setLoading(true);
        const data = await getNoteById(id);
        setForm(mapNoteToForm(data));
      } catch (err) {
        setError(err.response?.data?.message || 'Could not load note');
      } finally {
        setLoading(false);
      }
    };

    loadNote();
  }, [id, isEdit]);

  const title = useMemo(() => (isEdit ? 'Edit Task' : 'Add Task'), [isEdit]);

  const onChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSaving(true);

    try {
      const payload = {
        ...form,
        dueDate: form.dueDate || null
      };

      if (isEdit) {
        await updateNote(id, payload);
      } else {
        await createNote(payload);
      }

      navigate('/notes');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save note');
    } finally {
      setSaving(false);
    }
  };

  return (
    <AppShell
      title={title}
      actions={
        <Link to="/notes">
          <Button variant="outline">Back to Notes</Button>
        </Link>
      }
    >
      <div className="mx-auto max-w-4xl rounded-card border border-venture-line bg-white p-5 shadow-panel sm:p-7">
        {loading ? <p className="text-sm text-zinc-500">Loading note data...</p> : null}

        {!loading ? (
          <form className="space-y-5" onSubmit={onSubmit}>
            <Input label="Title" name="title" value={form.title} onChange={onChange} placeholder="Product Team Meeting" required />

            <label className="flex flex-col gap-2 text-sm font-medium text-zinc-700">
              <span>Description</span>
              <textarea
                name="description"
                value={form.description}
                onChange={onChange}
                rows={6}
                placeholder="Write a concise note description"
                className="w-full rounded-lg border border-venture-line bg-zinc-100 px-3 py-2 text-sm outline-none transition focus:border-zinc-500 focus:bg-white"
                required
              />
            </label>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm font-medium text-zinc-700">
                <span>Status</span>
                <select
                  name="status"
                  value={form.status}
                  onChange={onChange}
                  className="h-11 rounded-lg border border-venture-line bg-zinc-100 px-3 text-sm outline-none focus:border-zinc-500 focus:bg-white"
                >
                  {statuses.map((status) => (
                    <option value={status} key={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </label>

              <Input label="Due Date" name="dueDate" type="date" value={form.dueDate} onChange={onChange} />
            </div>

            <Input label="Image URL" name="image" value={form.image} onChange={onChange} placeholder="https://..." />

            {error ? <p className="text-sm text-red-600">{error}</p> : null}

            <div className="flex flex-wrap gap-3">
              <Button type="submit" isLoading={saving}>
                {isEdit ? 'Update Note' : 'Create Note'}
              </Button>
              <Link to="/notes">
                <Button variant="outline">Cancel</Button>
              </Link>
            </div>
          </form>
        ) : null}
      </div>
    </AppShell>
  );
};

export default NoteFormPage;
