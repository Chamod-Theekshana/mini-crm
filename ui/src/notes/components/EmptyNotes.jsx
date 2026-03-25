import { Link } from 'react-router-dom';
import Button from '../../shared/ui/Button';

const EmptyNotes = () => {
  return (
    <div className="flex min-h-[320px] flex-col items-center justify-center rounded-card border border-dashed border-venture-line bg-white p-8 text-center">
      <h3 className="font-display text-2xl font-bold text-venture-ink">No notes yet</h3>
      <p className="mt-2 max-w-md text-sm text-zinc-500">Start by creating your first note to populate the board with weekly, monthly, and business updates.</p>
      <Link to="/notes/new" className="mt-5">
        <Button>Add Note</Button>
      </Link>
    </div>
  );
};

export default EmptyNotes;
