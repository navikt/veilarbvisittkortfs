import { expect, test } from 'vitest';
import { toSimpleDateStr, toSimpleDateTimeStr } from './date-utils';

test('toSimpleDateStr formatterer dato', () => {
    expect(toSimpleDateStr('2026-06-02T14:05:00')).toBe('02.06.2026');
});

test('toSimpleDateTimeStr formatterer dato med klokkeslett', () => {
    expect(toSimpleDateTimeStr('2026-06-02T14:05:00')).toBe('02.06.2026 kl. 14:05');
});
