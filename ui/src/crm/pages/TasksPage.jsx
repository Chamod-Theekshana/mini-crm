import { useMemo, useState } from 'react';
import AppShell from '../../shared/layout/AppShell';
import Button from '../../shared/ui/Button';

const columns = [
  {
    title: 'Planned',
    count: '3 open tasks',
    cards: [
      {
        title: 'Monthly Product Discussion',
        due: '24 Jan 2023',
        labels: ['internal', 'marketing', 'urgent'],
        comments: 19,
        files: 5,
        checklist: '10/124',
        members: ['AR', 'JD', 'LM', 'PS']
      },
      {
        title: 'Update New Social Media Post',
        due: '18 Jan 2023',
        labels: ['marketing', 'event', 'urgent'],
        comments: 1,
        files: 1,
        checklist: '12/52',
        members: ['JW', 'BK', 'AT']
      },
      {
        title: 'Input Data for Monthly Sales Revenue',
        due: '31 Jan 2023',
        labels: ['internal', 'document', 'marketing'],
        comments: 0,
        files: 2,
        checklist: '4/5',
        members: ['AN', 'CW']
      }
    ]
  },
  {
    title: 'Upcoming',
    count: '5 open tasks',
    cards: [
      {
        title: 'Create Monthly Revenue Recap for AI Product Linear',
        due: '11 Jan 2023',
        labels: ['report', 'event', 'urgent'],
        comments: 1,
        files: 0,
        checklist: '4/12',
        members: ['DR', 'LF']
      },
      {
        title: 'Uploading New Items to Marketplace',
        due: '09 Jan 2023',
        labels: ['report', 'document', 'marketing'],
        comments: 23,
        files: 1,
        checklist: '12/64',
        members: ['CM', 'RT', 'NG']
      },
      {
        title: 'Monthly Product Discussion',
        due: '12 Jan 2023',
        labels: ['internal', 'marketing', 'urgent'],
        comments: 51,
        files: 2,
        checklist: '3/4',
        members: ['AW', 'PS', 'KL', 'CE']
      },
      {
        title: 'Update New Social Media Post',
        due: '15 Jan 2023',
        labels: ['marketing', 'event', 'urgent'],
        comments: 3,
        files: 4,
        checklist: '0/12',
        members: ['FK', 'SR', 'NL']
      },
      {
        title: 'Input Data for Monthly Sales Revenue',
        due: '15 Jan 2023',
        labels: ['marketing', 'event', 'urgent'],
        comments: 15,
        files: 1,
        checklist: '3/4',
        members: ['LM', 'AG', 'TW', 'PE']
      }
    ]
  },
  {
    title: 'Completed',
    count: '2 completed tasks',
    cards: [
      {
        title: 'Uploading New Items to Marketplace',
        due: '09 Jan 2023',
        labels: ['report', 'document', 'marketing'],
        comments: 1,
        files: 12,
        checklist: '2/15',
        members: ['KM', 'AE']
      },
      {
        title: 'Input Data for Monthly Sales Revenue',
        due: '13 Jan 2023',
        labels: ['internal', 'document', 'marketing'],
        comments: 21,
        files: 2,
        checklist: '1/53',
        members: ['BF', 'LM']
      }
    ]
  }
];

const TasksPage = () => {
  const [openDetails, setOpenDetails] = useState(false);

  const actions = useMemo(
    () => (
      <>
        <Button variant="outline" className="h-10 rounded-md border-[#1e1e20] px-4 text-[14px] font-semibold">
          Sort By
        </Button>
        <Button variant="outline" className="h-10 rounded-md border-[#1e1e20] px-4 text-[14px] font-semibold">
          Filter
        </Button>
        <Button className="h-10 rounded-md px-4 text-[14px] font-semibold" onClick={() => setOpenDetails(true)}>
          + Add Task
        </Button>
      </>
    ),
    []
  );

  return (
    <>
      <AppShell title="Task" actions={actions}>
        <section className="mb-4 border-b border-venture-line">
          <div className="flex items-center gap-8 pb-3 text-[16px]">
            <button type="button" className="text-zinc-500">
              ▤ List
            </button>
            <button type="button" className="border-b-2 border-black pb-3 font-medium text-black">
              ▯ Kanban
            </button>
            <button type="button" className="text-zinc-500">
              ▦ Table
            </button>
          </div>
        </section>

        <div className="grid gap-4 xl:grid-cols-3">
          {columns.map((column) => (
            <section key={column.title} className="rounded-[8px] border border-venture-line bg-white p-4">
              <div className="mb-4 flex items-center gap-3">
                <span className={`h-2.5 w-2.5 rounded-full ${column.title === 'Planned' ? 'bg-[#b7aa13]' : column.title === 'Upcoming' ? 'bg-[#6e83f8]' : 'bg-[#32b579]'}`} />
                <h3 className="text-[20px] font-semibold leading-none">{column.title}</h3>
                <span className="text-[14px] text-zinc-500">{column.count}</span>
              </div>

              <button type="button" className="mb-4 flex h-11 w-full items-center justify-center gap-2 rounded-md bg-[#f3f3f4] text-[18px] font-medium text-black">
                + Create Task
              </button>

              <div className="space-y-3">
                {column.cards.map((card) => (
                  <article key={`${column.title}-${card.title}-${card.due}`} className="rounded-[8px] border border-venture-line bg-[#fbfbfc] p-4">
                    <div className="mb-4 flex items-center justify-between gap-2">
                      <div className="flex flex-wrap gap-2">
                        {card.labels.map((label) => (
                          <LabelChip key={label} label={label} />
                        ))}
                      </div>
                      <button type="button" className="text-zinc-400">
                        •••
                      </button>
                    </div>

                    <h4 className="text-[18px] font-semibold leading-tight">{card.title}</h4>

                    <div className="mt-4 flex items-center justify-between text-[14px] text-zinc-500">
                      <span className="inline-flex items-center gap-2">🗓 Due Date {card.due}</span>
                      <span className="inline-flex items-center gap-1">☷ {card.checklist}</span>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex -space-x-2">
                        {card.members.map((member) => (
                          <div key={member} className="flex h-7 w-7 items-center justify-center rounded-full border border-white bg-zinc-300 text-[9px] font-semibold text-zinc-700">
                            {member}
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center gap-4 text-[14px] text-zinc-500">
                        <span className="inline-flex items-center gap-1">⌕ {card.files}</span>
                        <span className="inline-flex items-center gap-1">◌ {card.comments}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </AppShell>

      {openDetails ? <TaskDetailsModal onClose={() => setOpenDetails(false)} /> : null}
    </>
  );
};

const LabelChip = ({ label }) => {
  const palette = {
    internal: 'bg-[#f5eadf] text-[#9f6c3b]',
    marketing: 'bg-[#f2efcf] text-[#9b8a1f]',
    urgent: 'bg-[#f8e7e7] text-[#ba4848]',
    report: 'bg-[#e0f0e6] text-[#2e8b4c]',
    event: 'bg-[#efe4fb] text-[#8950c8]',
    document: 'bg-[#e4ebff] text-[#3c69de]'
  };

  return (
    <span className={`inline-flex rounded-md px-2 py-1 text-[12px] font-medium capitalize ${palette[label] || 'bg-zinc-100 text-zinc-700'}`}>
      {label}
    </span>
  );
};

const TaskDetailsModal = ({ onClose }) => (
  <div className="fixed inset-0 z-50 bg-black/25 p-4">
    <div className="mx-auto mt-14 max-h-[86vh] w-full max-w-4xl overflow-auto rounded-card bg-white p-5 shadow-2xl">
      <div className="mb-4 flex items-center justify-between border-b border-venture-line pb-4">
        <h3 className="font-display text-3xl font-semibold">Monthly Product Discussion</h3>
        <button type="button" onClick={onClose} className="text-zinc-500">
          x
        </button>
      </div>
      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div>
          <p className="text-sm text-zinc-500">Description</p>
          <p className="mt-1 text-sm text-zinc-700">
            Monthly Product Discussion by Design and Marketing Teams with CEO to plan our future products sales and reports.
          </p>

          <div className="mt-5 space-y-4 rounded-lg border border-venture-line p-4">
            <h4 className="font-semibold">Task Checklist</h4>
            <ChecklistItem text="Prepare Design Document" />
            <ChecklistItem text="Document Signature" />
            <ChecklistItem text="Pitch Deck Presentation Design" />
            <button type="button" className="text-sm font-semibold text-zinc-600">
              + Add Item
            </button>
          </div>

          <div className="mt-5 space-y-4 rounded-lg border border-venture-line p-4">
            <h4 className="font-semibold">Daily Sprint</h4>
            <ChecklistItem text="Prepare Design Document" />
            <ChecklistItem text="Document Signature" />
            <button type="button" className="text-sm font-semibold text-zinc-600">
              + Add Item
            </button>
          </div>

          <Button variant="outline" className="mt-4 w-full">
            + Add New Checklist
          </Button>

          <input className="mt-4 h-11 w-full rounded-lg border border-venture-line px-3 text-sm" placeholder="Add Your Comment" />

          <div className="mt-5">
            <div className="mb-2 flex items-center justify-between">
              <h4 className="font-semibold">Activity</h4>
              <Button size="sm" variant="outline">
                Hide Activity Details
              </Button>
            </div>
            <div className="space-y-3 text-sm">
              <div className="rounded-lg border border-venture-line p-3">
                <p>
                  <span className="font-semibold">Frank Edward</span> mentioned you in a comment in Design Team Reports
                </p>
                <p className="mt-2 rounded-md bg-zinc-100 p-2">@brianf have you update this design so we can use it on next meeting?</p>
              </div>
              <div className="rounded-lg border border-venture-line p-3">
                <p>
                  <span className="font-semibold">James Wong</span> changed the due date of Monthly Team Meeting to Sep 12
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4 border-l border-venture-line pl-5 text-sm">
          <section>
            <div className="mb-2 flex items-center justify-between">
              <h4 className="font-semibold">Member</h4>
              <button type="button">+</button>
            </div>
            <div className="flex -space-x-2">
              {['A', 'B', 'C', 'D'].map((member) => (
                <div key={member} className="flex h-8 w-8 items-center justify-center rounded-full border border-white bg-zinc-800 text-xs text-white">
                  {member}
                </div>
              ))}
            </div>
          </section>

          <section>
            <h4 className="mb-2 font-semibold">Due Date</h4>
            <Button variant="outline" className="w-full justify-between">
              24 Jan 2023
            </Button>
          </section>

          <section>
            <div className="mb-2 flex items-center justify-between">
              <h4 className="font-semibold">Labels</h4>
              <button type="button">+</button>
            </div>
            <div className="flex flex-wrap gap-2">
              <LabelChip label="internal" />
              <LabelChip label="marketing" />
            </div>
          </section>

          <section>
            <div className="mb-2 flex items-center justify-between">
              <h4 className="font-semibold">Attachment</h4>
              <button type="button">+</button>
            </div>
            <div className="rounded-lg border border-dashed border-venture-line p-3 text-zinc-500">No files attached</div>
          </section>
        </div>
      </div>
    </div>
  </div>
);

const ChecklistItem = ({ text }) => (
  <label className="flex items-center gap-2 text-sm">
    <input type="checkbox" className="h-4 w-4" />
    <span>{text}</span>
  </label>
);

export default TasksPage;
