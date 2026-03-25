export const mockAuthAndInitialNotes = async (page, notes = []) => {
  await page.route('**/api/auth/login', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        id: 'u1',
        name: 'Exam User',
        email: 'exam@example.com',
        token: 'test-token'
      })
    });
  });

  await page.route('**/api/auth/profile', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        id: 'u1',
        name: 'Exam User',
        email: 'exam@example.com'
      })
    });
  });

  await page.route('**/api/notes', async (route, request) => {
    if (request.method() === 'GET') {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(notes)
      });
      return;
    }

    if (request.method() === 'POST') {
      const body = request.postDataJSON();
      await route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({ _id: 'n-created', ...body })
      });
      return;
    }

    await route.continue();
  });
};
