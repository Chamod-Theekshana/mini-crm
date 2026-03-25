import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../auth/context/AuthContext';

const menu = [
  { label: 'Dashboard', path: '/dashboard', icon: 'dashboard' },
  { label: 'Notifications', path: '/notifications', icon: 'notification' },
  { label: 'Notes', path: '/notes', icon: 'notes' },
  { label: 'Tasks', path: '/tasks', icon: 'tasks' },
  { label: 'Emails', path: '/emails', icon: 'emails', hasCaret: true },
  { label: 'Calendars', path: '/calendars', icon: 'calendars' }
];

const dbMenu = [
  { label: 'Analytics', path: '/analytics', icon: 'analytics' },
  { label: 'Contacts', path: '/contacts', icon: 'contacts' },
  { label: 'Companies', path: '/companies', icon: 'companies' }
];

const bottomMenu = [
  { label: 'Integrations', path: '/integrations', icon: 'integrations' },
  { label: 'Settings', path: '/settings', icon: 'settings' }
];

const AppShell = ({ title, actions, children }) => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#f3f3f4] text-venture-ink">
      <div className="grid min-h-screen grid-cols-1 xl:grid-cols-[190px_1fr]">
        <aside className="flex min-h-screen flex-col border-r border-[#dfdfe1] bg-[#f4f4f5]">
          <div className="flex items-center justify-between border-b border-[#dfdfe1] px-4 py-4">
            <Link to="/dashboard" className="flex items-center gap-3">
              <img src="/Logogram.png" alt="Venture logo" className="h-5 w-5 object-contain" />
              <span className="font-display text-[19px] font-semibold leading-none tracking-tight text-[#131313]">Venture</span>
            </Link>
            <button
              type="button"
              className="grid h-5 w-5 place-items-center rounded border border-[#e5e5e6] bg-[#ececed] text-[#9a9a9d]"
              aria-label="Collapse sidebar"
            >
              <svg width="10" height="10" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.5 3.2L5 7L8.5 10.8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 3.2L8.5 7L12 10.8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <nav className="space-y-1 px-3 py-5">
            {menu.map((item) => (
              <NavLink
                key={item.label}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-[6px] px-3 py-[9px] text-[15px] font-medium ${isActive ? 'bg-[#e9e9eb] text-[#111111]' : 'text-[#737376] hover:bg-[#ececee]'}`
                }
              >
                {({ isActive }) => (
                  <>
                    <SidebarIcon name={item.icon} active={isActive} />
                    <span>{item.label}</span>
                    {item.hasCaret ? (
                      <span className="ml-auto text-[#8b8b8e]">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M3.5 5.3L7 8.8L10.5 5.3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    ) : null}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="border-y border-[#dfdfe1] px-3 py-5">
            <p className="mb-3 px-1 text-[12px] font-semibold uppercase tracking-wide text-[#6f6f72]">Database</p>
            <div className="space-y-1">
              {dbMenu.map((item) => (
                <NavLink
                  key={item.label}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-[6px] px-3 py-[9px] text-[15px] font-medium ${isActive ? 'bg-[#e9e9eb] text-[#111111]' : 'text-[#737376] hover:bg-[#ececee]'}`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <SidebarIcon name={item.icon} active={isActive} />
                      <span>{item.label}</span>
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </div>

          <div className="space-y-1 px-3 py-5">
            {bottomMenu.map((item) => (
              <NavLink
                key={item.label}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-[6px] px-3 py-[9px] text-[15px] font-medium ${isActive ? 'bg-[#e9e9eb] text-[#111111]' : 'text-[#737376] hover:bg-[#ececee]'}`
                }
              >
                {({ isActive }) => (
                  <>
                    <SidebarIcon name={item.icon} active={isActive} />
                    <span>{item.label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </aside>

        <section>
          <header className="border-b border-venture-line bg-[#f6f6f6] px-4 py-2 sm:px-6">
            <div className="mb-2 flex items-center justify-between gap-4">
              <div className="flex h-9 w-full max-w-[300px] items-center gap-2 rounded-md border border-venture-line bg-white px-3 text-sm text-zinc-400">
                <span className="text-zinc-400">Search</span>
                <span className="ml-auto text-xs text-zinc-400">⌘ F</span>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <span className="text-zinc-600">Help Center</span>
                <div className="rounded-full border border-venture-line bg-white px-3 py-2">{user?.name || 'Brian F.'}</div>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h1 className="font-display text-[38px] font-semibold leading-none tracking-tight">{title}</h1>
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

const SidebarIcon = ({ name, active }) => {
  const color = active ? '#141414' : '#77777A';
  const common = {
    width: 20,
    height: 20,
    viewBox: '0 0 20 20',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg'
  };

  switch (name) {
    case 'dashboard':
      return (
        <svg {...common}>
          <circle cx="10" cy="10" r="7" stroke={color} strokeWidth="1.7" />
          <path d="M10 10L14.5 7" stroke={color} strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      );
    case 'notification':
      return (
        <svg {...common}>
          <path d="M10 3.5C7.8 3.5 6 5.3 6 7.5V10.4L4.7 12.5H15.3L14 10.4V7.5C14 5.3 12.2 3.5 10 3.5Z" stroke={color} strokeWidth="1.7" strokeLinejoin="round" />
          <path d="M8.2 13.5C8.5 14.4 9.2 15 10 15C10.8 15 11.5 14.4 11.8 13.5" stroke={color} strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      );
    case 'notes':
      return (
        <svg {...common}>
          <path d="M4 4.5H12.5V13L8.8 16H4V4.5Z" stroke={color} strokeWidth="1.7" strokeLinejoin="round" />
          <path d="M12.5 13H9V16" stroke={color} strokeWidth="1.7" strokeLinejoin="round" />
        </svg>
      );
    case 'tasks':
      return (
        <svg {...common}>
          <rect x="4" y="4.5" width="12" height="11.5" rx="1.5" stroke={color} strokeWidth="1.7" />
          <path d="M7 3.5V6" stroke={color} strokeWidth="1.7" strokeLinecap="round" />
          <path d="M13 3.5V6" stroke={color} strokeWidth="1.7" strokeLinecap="round" />
          <path d="M4 8H16" stroke={color} strokeWidth="1.7" />
        </svg>
      );
    case 'emails':
      return (
        <svg {...common}>
          <rect x="3.7" y="5" width="12.6" height="10" rx="1.4" stroke={color} strokeWidth="1.7" />
          <path d="M4.7 6L10 10.2L15.3 6" stroke={color} strokeWidth="1.7" strokeLinejoin="round" />
        </svg>
      );
    case 'calendars':
      return (
        <svg {...common}>
          <rect x="4" y="4.5" width="12" height="11.5" rx="1.5" stroke={color} strokeWidth="1.7" />
          <path d="M7 3.5V6" stroke={color} strokeWidth="1.7" strokeLinecap="round" />
          <path d="M13 3.5V6" stroke={color} strokeWidth="1.7" strokeLinecap="round" />
          <path d="M4 8H16" stroke={color} strokeWidth="1.7" />
          <path d="M7.7 11.7H12.3" stroke={color} strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      );
    case 'analytics':
      return (
        <svg {...common}>
          <path d="M4 14.5H16" stroke={color} strokeWidth="1.7" strokeLinecap="round" />
          <path d="M5.3 12.5L8.1 9.8L10.4 11.5L14.7 7.2" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M13.4 7.2H14.7V8.5" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'contacts':
      return (
        <svg {...common}>
          <rect x="4" y="3.8" width="12" height="12.4" rx="1.8" stroke={color} strokeWidth="1.7" />
          <circle cx="10" cy="8" r="2" stroke={color} strokeWidth="1.7" />
          <path d="M7 12.7C7.6 11.8 8.7 11.2 10 11.2C11.3 11.2 12.4 11.8 13 12.7" stroke={color} strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      );
    case 'companies':
      return (
        <svg {...common}>
          <rect x="3.8" y="5.5" width="12.4" height="9.6" rx="1.5" stroke={color} strokeWidth="1.7" />
          <path d="M8 5.5V4.5C8 3.9 8.4 3.5 9 3.5H11C11.6 3.5 12 3.9 12 4.5V5.5" stroke={color} strokeWidth="1.7" />
        </svg>
      );
    case 'integrations':
      return (
        <svg {...common}>
          <rect x="4" y="4" width="4.7" height="4.7" stroke={color} strokeWidth="1.7" />
          <rect x="11.3" y="4" width="4.7" height="4.7" stroke={color} strokeWidth="1.7" />
          <rect x="4" y="11.3" width="4.7" height="4.7" stroke={color} strokeWidth="1.7" />
          <rect x="11.3" y="11.3" width="4.7" height="4.7" stroke={color} strokeWidth="1.7" />
        </svg>
      );
    case 'settings':
      return (
        <svg {...common}>
          <circle cx="10" cy="10" r="2.7" stroke={color} strokeWidth="1.7" />
          <path d="M10 3.3V5" stroke={color} strokeWidth="1.7" strokeLinecap="round" />
          <path d="M10 15V16.7" stroke={color} strokeWidth="1.7" strokeLinecap="round" />
          <path d="M3.3 10H5" stroke={color} strokeWidth="1.7" strokeLinecap="round" />
          <path d="M15 10H16.7" stroke={color} strokeWidth="1.7" strokeLinecap="round" />
          <path d="M5.3 5.3L6.5 6.5" stroke={color} strokeWidth="1.7" strokeLinecap="round" />
          <path d="M13.5 13.5L14.7 14.7" stroke={color} strokeWidth="1.7" strokeLinecap="round" />
          <path d="M14.7 5.3L13.5 6.5" stroke={color} strokeWidth="1.7" strokeLinecap="round" />
          <path d="M6.5 13.5L5.3 14.7" stroke={color} strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      );
    default:
      return <span className="h-5 w-5" />;
  }
};
