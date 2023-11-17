import { test, expect } from '@playwright/test';
import { MainPage } from '../pages/main-page';
import { ReportsPage } from '../pages/reports-page';

test.describe('testing stock market website', () => {
  let main: MainPage;

  test.beforeEach(async ({ page }) => {
    main = new MainPage(page);
    await main.goto()
  });

  test('download pdf after the table is sorted', async ({ page }) => {
    const reports = new ReportsPage(page)
    await reports.fillEntirePage('בנק הפועלים בע"מ', 5, '2023', '2023')
    const downloadPromise = page.waitForEvent('download');
    await reports.downloadPDF()
    const download = await downloadPromise;
    expect(await download.failure()).toBeNull()
  })
})