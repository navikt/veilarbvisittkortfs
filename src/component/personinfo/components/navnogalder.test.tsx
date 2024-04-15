import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { kalkulerAlder } from './navnogalder';

describe('tester utregning av alder', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('bør regne ut riktig alder dagen før bursdag, i skuddår', () => {
        const iDag = new Date('2024-04-15');
        vi.setSystemTime(iDag);

        const fodselsdato = new Date('2003-04-16');
        const alder = kalkulerAlder(fodselsdato);
        expect(alder).toBe(20);
    });
});
