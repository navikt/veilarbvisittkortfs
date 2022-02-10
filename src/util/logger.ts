import {
	createFrontendLogger,
	createMockFrontendLogger,
	DEFAULT_FRONTENDLOGGER_API_URL
} from '@navikt/frontendlogger/lib';
import { APP_NAME, isDevelopment } from './utils';

export const logger = isDevelopment()
	? createMockFrontendLogger(APP_NAME)
	: createFrontendLogger(APP_NAME, DEFAULT_FRONTENDLOGGER_API_URL);
