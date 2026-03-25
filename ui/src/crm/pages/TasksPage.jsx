import { useMemo, useState } from 'react';
import AppShell from '../../shared/layout/AppShell';
import Button from '../../shared/ui/Button';
import Tag from '../../shared/ui/Tag';

const columns = [
  {
    title: 'Planned',
    count: '3 open tasks',
    cards: [
      { title: 'Monthly Product Discussion', due: '24 Jan 2023', labels: ['internal', 'marketing', 'urgent'], comments: 19, files: 5 },
      { title: 'Update New Social Media Post', due: '18 Jan 2023', labels: ['marketing', 'event', 'urgent'], comments: 1, files: 1 },
      { title: 'Input Data for Monthly Sales Revenue', due: '31 Jan 2023', labels: ['internal', 'document', 'marketing'], comments: 0, files: 2 }
    ]
  },
  {
    title: 'Upcoming',
    count: '5 open tasks',
    cards: [
      { title: 'Create Monthly Revenue Recap for AI Product Linear', due: '11 Jan 2023', labels: ['report', 'event', 'urgent'], comments: 1, files: 0 },
      { title: 'Uploading New Items to Marketplace', due: '09 Jan 2023', labels: ['report', 'document', 'marketing'], comments: 23, files: 1 },
      { title: 'Monthly Product Discussion', due: '12 Jan 2023', labels: ['internal', 'marketing', 'urgent'], comments: 51, files: 2 },
      { title: 'Update New Social Media Post', due: '15 Jan 2023', labels: ['marketing', 'event', 'urgent'], comments: 3, files: 4 },
      { title: 'Input Data for Monthly Sales Revenue', due: '15 Jan 2023', labels: ['marketing', 'event', 'urgent'], comments: 15, files: 1 }
    ]
  },
  {
    title: 'Completed',
    count: '2 completed tasks',
    cards: [
      { title: 'Uploading New Items to Marketplace', due: '09 Jan 2023', labels: ['report', 'document', 'marketing'], comments: 1, files: 12 },
      { title: 'Input Data for Monthly Sales Revenue', due: '13 Jan 2023', labels: ['internal', 'document', 'marketing'], comments: 21, files: 2 }
    ]
  }
];

const TasksPage = () => {
  const [openDetails, setOpenDetails] = useState(false);
  const actions = useMemo(
    () => (
      <>
        <Button variant="outline">Sort By</Button>
        <Button variant="outline">Filter</Button>
        <Button onClick={() => setOpenDetails(true)}>Add Task</Button>
      </>
    ),
    []
  );

  return (
    <>
      <AppShell title="Task" actions={actions}>
        <div className="grid gap-4 xl:grid-cols-3">
          {columns.map((column) => (
            <section key={column.title} className="rounded-card border border-venture-line bg-white p-3">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-display text-2xl font-semibold">{column.title}</h3>
                <span className="text-xs text-zinc-500">{column.count}</span>
              </div>
              <Button variant="subtle" className="mb-3 w-full">
                + Create Task
              </Button>
              <div className="space-y-3">
                {column.cards.map((card) => (
                  <article key={`${column.title}-${card.title}-${card.due}`} className="rounded-lg border border-venture-line bg-white p-3">
                    <div className="mb-2 flex flex-wrap gap-2">
                      {card.labels.map((label) => (
                        <Tag key={label} type={label}>
                          {label}
                        </Tag>
                      ))}
                    </div>
                    <h4 className="font-semibold">{card.title}</h4>
                    <p className="mt-2 text-xs text-zinc-500">Due Date {card.due}</p>
                    <div className="mt-2 flex items-center gap-3 text-xs text-zinc-500">
                      <span>{card.files} files</span>
                      <span>{card.comments} comments</span>
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
              <Tag type="internal">Internal</Tag>
              <Tag type="marketing">Marketing</Tag>
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
