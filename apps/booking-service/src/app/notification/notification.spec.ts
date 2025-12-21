import { Test, TestingModule } from '@nestjs/testing';
import { NotificationService } from './notification.service';
import { ConfigService } from '@nestjs/config';

describe('NotificationService (integration)', () => {
  let service: NotificationService;

  // Control running the real-email integration test:
  // Set RUN_EMAIL_INTEGRATION_TESTS=true in your shell to run this test.
  const runIntegration =
    process.env.RUN_EMAIL_INTEGRATION_TESTS === 'true' &&
    process.env.EMAIL_ENABLED === 'true' &&
    !!process.env.EMAIL_USER &&
    !!process.env.EMAIL_PASSWORD;

  beforeAll(async () => {
    // Ensure .env is loaded (if not already)
    require('dotenv').config({ path: __dirname + '/../../../../.env' });

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationService,
        {
          provide: ConfigService,
          useValue: {
            get: (key: string, defaultValue?: any) => {
              const env = process.env;
              return env[key] ?? defaultValue;
            },
          },
        },
      ],
    }).compile();

    service = module.get<NotificationService>(NotificationService);
  });

  // Increase timeout for network operations
  jest.setTimeout(60_000);

  (runIntegration ? it : it.skip)(
    'sends a real email (integration)',
    async () => {
      const unique = Date.now();
      const to = "dieuxuanhien@gmail.com";
      const subject = `MovieHub Integration Test ${unique}`;
      const html = `<p>Integration test email (id=${unique}). If you received this, the SMTP setup works.</p>`;

      const result = await service.sendEmail({
        to,
        subject,
        html,
      });

      expect(result).toBe(true);
      // Note: also check your inbox for the subject above to confirm delivery.
    }
  );
});