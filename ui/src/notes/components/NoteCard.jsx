import { Link } from 'react-router-dom';
import Tag from '../../shared/ui/Tag';
import { formatDueDate } from '../utils/noteUtils';

const fallbackImage =
  'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80';

const NoteCard = ({ note, onDelete }) => {
  return (
    <article className="rounded-card border border-venture-line bg-white shadow-panel">
      <div className="border-b border-venture-line px-4 pb-3 pt-3">
        <div className="mb-3 flex items-center gap-2">
          <Tag type={note.status}>{note.status}</Tag>
          <Tag type="product">Product</Tag>
        </div>
        <h3 className="text-[25px] font-semibold leading-tight tracking-tight text-venture-ink">{note.title}</h3>
        <p className="mt-2 line-clamp-3 text-sm text-zinc-500">{note.description}</p>
      </div>

      {note.image ? (
        <img src={note.image || fallbackImage} alt={note.title} className="h-28 w-full object-cover" />
      ) : null}

      <div className="flex items-center justify-between px-4 py-3">
        <p className="text-sm font-semibold text-zinc-800">{formatDueDate(note.dueDate)}</p>
        <div className="flex gap-2">
          <Link to={`/notes/${note._id}/edit`} className="rounded-md border border-venture-line px-2 py-1 text-xs hover:bg-zinc-100">
            Edit
          </Link>
          <button
            type="button"
            onClick={() => onDelete(note)}
            className="rounded-md border border-red-200 px-2 py-1 text-xs text-red-600 hover:bg-red-50"
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  );
};

export default NoteCard;
