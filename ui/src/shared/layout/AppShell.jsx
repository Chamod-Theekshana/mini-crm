import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/context/AuthContext';

const menu = [
  { label: 'Dashboard', path: '/notes' },
  { label: 'Notifications', path: '/notes' },
  { label: 'Notes', path: '/notes' },
  { label: 'Tasks', path: '/notes' },
  { label: 'Emails', path: '/notes' },
  { label: 'Calendars', path: '/notes' }
];

const AppShell = ({ title, actions, children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#f7f7f8] text-venture-ink">
      <div className="grid min-h-screen grid-cols-1 xl:grid-cols-[216px_1fr]">
        <aside className="border-r border-venture-line bg-[#f4f4f5]">
          <div className="border-b border-venture-line px-6 py-5">
            <Link to="/notes" className="font-display text-3xl font-bold tracking-tight">
              Venture
            </Link>
          </div>
          <nav className="space-y-1 px-4 py-5">
            {menu.map((item) => (
              <NavLink
                key={item.label}
                to={item.path}
                className={({ isActive }) =>
                  `block rounded-lg px-4 py-2 text-sm font-medium ${isActive ? 'bg-zinc-200 text-zinc-900' : 'text-zinc-600 hover:bg-zinc-200/60'}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="mt-auto border-t border-venture-line px-4 py-4">
            <button
              type="button"
              className="w-full rounded-lg border border-venture-line bg-white py-2 text-sm font-semibold hover:bg-zinc-50"
              onClick={onLogout}
            >
              Logout
            </button>
          </div>
        </aside>
        <section>
          <header className="flex flex-wrap items-center justify-between gap-4 border-b border-venture-line bg-[#f7f7f8] px-6 py-4 sm:px-8">
            <h1 className="font-display text-[30px] font-bold leading-none tracking-tight">{title}</h1>
            <div className="flex items-center gap-3">
              {actions}
              <div className="rounded-full bg-white px-4 py-2 text-sm shadow-panel">{user?.name || 'User'}</div>
            </div>
          </header>
          <main className="p-4 sm:p-6 lg:p-7">{children}</main>
        </section>
      </div>
    </div>
  );
};

export default AppShell;
