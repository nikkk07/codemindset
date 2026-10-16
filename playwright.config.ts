import { defineConfig, devices } from '@playwright/test';

const PORT = Number(process.env.E2E_PORT ?? 3100);
const MOCK_PORT = 4010;

export default defineConfig({
  testDir: 'tests/e2e',
  fullyParallel: true,
  retries: 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: { baseURL: `http://127.0.0.1:${PORT}`, trace: 'retain-on-failure' },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: [
    {
      command: `node tests/e2e/mock-email-server.mjs ${MOCK_PORT}`,
      port: MOCK_PORT,
      reuseExistingServer: false,
    },
    {
      // Tests run against the production build in preview mode, with email pointed at the local mock.
      command: `npm run start -- -p ${PORT}`,
      port: PORT,
      reuseExistingServer: false,
      env: {
        SITE_ENV: 'preview',
        EMAIL_API_KEY: 'test-key',
        EMAIL_API_URL: `http://127.0.0.1:${MOCK_PORT}/emails`,
        ENQUIRY_TO: 'info@codemindset.in',
        ENQUIRY_FROM: 'CodeMindset website <website@codemindset.in>',
      },
    },
  ],
});
