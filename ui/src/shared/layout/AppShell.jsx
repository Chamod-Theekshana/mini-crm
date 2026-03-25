import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/context/AuthContext';

const menu = [
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Notifications', path: '/notifications' },
  { label: 'Notes', path: '/notes' },
  { label: 'Tasks', path: '/tasks' },
  { label: 'Emails', path: '/emails' },
  { label: 'Calendars', path: '/calendars' }
];

const dbMenu = [
  { label: 'Analytics', path: '/analytics' },
  { label: 'Contacts', path: '/contacts' },
  { label: 'Companies', path: '/companies' }
];

const bottomMenu = [
  { label: 'Integrations', path: '/integrations' },
  { label: 'Settings', path: '/settings' }
];

const AppShell = ({ title, actions, children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#f3f3f4] text-venture-ink">
      <div className="grid min-h-screen grid-cols-1 xl:grid-cols-[190px_1fr]">
        <aside className="flex min-h-screen flex-col border-r border-venture-line bg-[#f2f2f3]">
          <div className="border-b border-venture-line px-5 py-4">
            <Link to="/dashboard" className="font-display text-[36px] font-bold tracking-tight">
              Venture
            </Link>
          </div>

          <nav className="space-y-1 px-3 py-4">
            {menu.map((item) => (
              <NavLink
                key={item.label}
                to={item.path}
                className={({ isActive }) =>
                  `block rounded-md px-3 py-2 text-sm ${isActive ? 'bg-zinc-200 text-black' : 'text-zinc-600 hover:bg-zinc-200/60'}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="border-y border-venture-line px-3 py-4">
            <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">Database</p>
            <div className="space-y-1">
              {dbMenu.map((item) => (
                <NavLink
                  key={item.label}
                  to={item.path}
                  className={({ isActive }) =>
                    `block rounded-md px-3 py-2 text-sm ${isActive ? 'bg-zinc-200 text-black' : 'text-zinc-600 hover:bg-zinc-200/60'}`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>

          <div className="space-y-1 px-3 py-4">
            {bottomMenu.map((item) => (
              <NavLink
                key={item.label}
                to={item.path}
                className={({ isActive }) =>
                  `block rounded-md px-3 py-2 text-sm ${isActive ? 'bg-zinc-200 text-black' : 'text-zinc-600 hover:bg-zinc-200/60'}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          <div className="mt-auto border-t border-venture-line px-3 py-4">
            <div className="mb-3 rounded-md border border-venture-line bg-white px-3 py-2 text-sm font-medium">Marketing Team's</div>
            <button type="button" className="w-full rounded-md border border-venture-line bg-white py-2 text-sm font-semibold hover:bg-zinc-50" onClick={onLogout}>
              Logout
            </button>
          </div>
        </aside>

        <section>
          <header className="border-b border-venture-line bg-[#f6f6f6] px-4 py-3 sm:px-6">
            <div className="mb-3 flex items-center justify-between gap-4">
              <div className="flex w-full max-w-sm items-center gap-2 rounded-md border border-venture-line bg-white px-3 py-2 text-sm text-zinc-400">
                <span>Search</span>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <span className="text-zinc-600">Help Center</span>
                <div className="rounded-full border border-venture-line bg-white px-3 py-2">{user?.name || 'Brian F.'}</div>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h1 className="font-display text-[36px] font-semibold leading-none tracking-tight">{title}</h1>
              <div className="flex items-center gap-2">
                {actions}
              </div>
            </div>
          </header>

          <main className="space-y-4 p-4 sm:p-5">{children}</main>
        </section>
      </div>
    </div>
  );
};

export default AppShell;
