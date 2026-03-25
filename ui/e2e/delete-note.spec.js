import { expect, test } from '@playwright/test';
import { mockAuthAndInitialNotes } from './helpers';

test('delete note opens and confirms modal', async ({ page }) => {
  const notes = [
    {
      _id: 'n1',
      title: 'Product Team Meeting',
      description: 'Monthly agenda',
      status: 'monthly',
      dueDate: '2026-03-25T00:00:00.000Z'
    }
  ];

  await mockAuthAndInitialNotes(page, notes);

  await page.route('**/api/notes/n1', async (route, request) => {
    if (request.method() === 'DELETE') {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Note deleted successfully' })
      });
      return;
    }

    await route.continue();
  });

  await page.goto('/login');
  await page.getByPlaceholder('Email or phone number').fill('exam@example.com');
  await page.getByPlaceholder('Enter password').fill('Password123');
  await page.getByRole('button', { name: 'Sign in' }).click();

  await page.getByRole('button', { name: 'Delete' }).first().click();
  await expect(page.getByText('Delete note')).toBeVisible();
  await page.getByRole('button', { name: 'Delete' }).nth(1).click();
  await expect(page.getByRole('heading', { name: 'Notes' })).toBeVisible();
});
