import { useMemo } from 'react';
import AppShell from '../../shared/layout/AppShell';
import Button from '../../shared/ui/Button';
import Tag from '../../shared/ui/Tag';

const contacts = [
  { name: 'Robert Fox', email: 'robertfox@example.com', city: 'Austin', type: 'employee' },
  { name: 'Floyd Miles', email: 'floydmiles@example.com', city: 'Austin', type: 'employee' },
  { name: 'Arlene McCoy', email: 'arleneccoy@example.com', city: 'Austin', type: 'partners' },
  { name: 'Jacob Jones', email: 'jacobjones@example.com', city: 'Austin', type: 'partners' },
  { name: 'Wade Warren', email: 'wadewarren@example.com', city: 'Austin', type: 'partners' }
];

const notifications = [
  {
    author: 'Frank Edward',
    line: 'mentioned you in a comment in Design Team Reports',
    message: '@brianf have you update this design so we can use it on next meeting?',
    time: '3 hours ago',
    team: 'Design Team'
  },
  {
    author: 'Elsa Wright',
    line: 'Asking for edit access in Monthly Team Progress',
    message: 'Please grant me edit access for this report before noon.',
    time: 'Yesterday',
    team: 'Marketing Team'
  },
  {
    author: 'James Wong',
    line: 'mentioned you in a comment in Monthly Team Meeting',
    message: '@brianf lets we plan all this event by now',
    time: 'Aug 24',
    team: 'Design Team'
  }
];

const NotificationsPage = () => {
  const actions = useMemo(
    () => (
      <>
        <Button variant="outline">Sort By</Button>
        <Button variant="outline">Filter</Button>
        <Button>Add Contact</Button>
      </>
    ),
    []
  );

  return (
    <AppShell title="Contacts" actions={actions}>
      <section className="grid gap-4 xl:grid-cols-[1.2fr_2fr]">
        <article className="rounded-card border border-venture-line bg-white p-4">
          <div className="mb-3 flex items-center justify-between border-b border-venture-line pb-3">
            <h3 className="font-display text-2xl font-semibold">Notifications</h3>
            <button type="button" className="text-zinc-500">
              x
            </button>
          </div>
          <div className="mb-4 flex items-center gap-3 border-b border-venture-line pb-3 text-sm text-zinc-500">
            <span className="font-medium text-black">All</span>
            <Tag type="urgent">12</Tag>
            <span>Tasks</span>
            <span>Archived</span>
          </div>
          <div className="mb-3 flex items-center justify-between">
            <Button variant="outline" size="sm">
              Mark All as Read
            </Button>
            <span className="text-zinc-500">Settings</span>
          </div>

          <div className="space-y-3">
            {notifications.map((item) => (
              <div key={item.author} className="rounded-lg border border-venture-line p-3">
                <p className="text-sm">
                  <span className="font-semibold">{item.author}</span> {item.line}
                </p>
                <p className="mt-2 rounded-md bg-zinc-100 p-2 text-sm">{item.message}</p>
                <div className="mt-2 flex items-center justify-between text-xs text-zinc-500">
                  <span>{item.time}</span>
                  <span>{item.team}</span>
                </div>
              </div>
            ))}
          </div>
          <Button className="mt-4 w-full">See all notifications</Button>
        </article>

        <article className="rounded-card border border-venture-line bg-white p-4">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-display text-xl font-semibold">Kanban</h3>
            <div className="text-sm text-zinc-500">Employee and Partners</div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3 rounded-lg border border-venture-line bg-zinc-50 p-3">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">Employee</h4>
                <Tag type="monthly">3</Tag>
              </div>
              {contacts
                .filter((contact) => contact.type === 'employee')
                .map((contact) => (
                  <ContactCard key={contact.email} contact={contact} />
                ))}
            </div>
            <div className="space-y-3 rounded-lg border border-venture-line bg-zinc-50 p-3">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">Partners</h4>
                <Tag type="internal">3</Tag>
              </div>
              {contacts
                .filter((contact) => contact.type === 'partners')
                .map((contact) => (
                  <ContactCard key={contact.email} contact={contact} />
                ))}
            </div>
          </div>
        </article>
      </section>
    </AppShell>
  );
};

const ContactCard = ({ contact }) => (
  <div className="rounded-lg border border-venture-line bg-white p-3 text-sm">
    <p className="font-semibold">{contact.name}</p>
    <p className="text-xs text-zinc-500">{contact.city}</p>
    <p className="mt-1 underline decoration-zinc-300 decoration-1">{contact.email}</p>
    <div className="mt-3 flex gap-2">
      <Button variant="outline" size="sm" className="flex-1">
        Call
      </Button>
      <Button variant="outline" size="sm" className="flex-1">
        Mail
      </Button>
    </div>
  </div>
);

export default NotificationsPage;
