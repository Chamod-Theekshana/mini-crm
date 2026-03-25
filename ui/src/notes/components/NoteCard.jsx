import { Link } from 'react-router-dom';
import Tag from '../../shared/ui/Tag';
import { formatDueDate } from '../utils/noteUtils';

const fallbackImage =
  'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80';

const names = ['Floyd Miles', 'Dianne Russell', 'Annette Black', 'Robert Fox', 'Brooklyn Simmons', 'Cameron Williamson', 'Ronald Richards', 'Albert Flores'];

const pickName = (text) => {
  const seed = (text || '').split('').reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
  return names[seed % names.length];
};

const secondaryTag = (status) => {
  if (status === 'monthly' || status === 'personal') {
    return 'business';
  }
  return 'product';
};

const bulletPoints = (description) => {
  if (!description) {
    return [];
  }

  const rows = description
    .split(/[.\n]/)
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 2);

  return rows;
};

const NoteCard = ({ note, onDelete }) => {
  const person = pickName(note.title);
  const points = bulletPoints(note.description);

  return (
    <article className="overflow-hidden rounded-[6px] border border-venture-line bg-[#fbfbfc] shadow-panel">
      <div className="px-5 pb-3 pt-4">
        <div className="mb-3 flex items-center gap-2">
          <Tag type={note.status}>{note.status}</Tag>
          <Tag type={secondaryTag(note.status)}>{secondaryTag(note.status)}</Tag>
        </div>
        <h3 className="line-clamp-1 text-[32px] font-semibold leading-tight tracking-tight text-venture-ink">{note.title}</h3>
        <p className="mt-2 text-[15px] text-zinc-500">This monthly progress agenda is following this items:</p>

        {points.length > 0 ? (
          <ul className="mt-2 space-y-1 text-[15px] text-zinc-500">
            {points.map((point) => (
              <li key={point} className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-zinc-500" />
                <span className="line-clamp-1">{point}</span>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="mt-2 space-y-1 text-[15px] text-zinc-500">
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-zinc-500" />
              <span className="line-clamp-1">Introduction to Newest Product Plan</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-zinc-500" />
              <span className="line-clamp-1">Monthly Revenue updates for each</span>
            </li>
          </ul>
        )}
      </div>

      {note.image ? (
        <img src={note.image || fallbackImage} alt={note.title} className="h-[72px] w-full object-cover" />
      ) : null}

      <div className="flex items-center justify-between border-t border-venture-line px-5 py-3">
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 rounded-full bg-zinc-300" />
          <p className="text-[15px] font-semibold text-zinc-800">{person}</p>
        </div>
        <div className="flex items-center gap-3">
          <p className="text-[15px] text-zinc-500">{formatDueDate(note.dueDate).replace(',', '')}</p>
          <Link to={`/notes/${note._id}/edit`} className="rounded-md border border-venture-line px-2 py-1 text-[12px] font-medium hover:bg-zinc-100">
            Edit
          </Link>
          <button
            type="button"
            onClick={() => onDelete(note)}
            className="rounded-md border border-red-200 px-2 py-1 text-[12px] font-medium text-red-600 hover:bg-red-50"
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  );
};

export default NoteCard;
