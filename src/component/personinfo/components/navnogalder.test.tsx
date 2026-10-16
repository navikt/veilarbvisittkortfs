import { render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import NavnOgAlder, { kalkulerAlder } from './navnogalder';

describe('tester utregning av alder', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('bør regne ut riktig alder dagen før og etter bursdag, i skuddår', () => {
        let iDag = new Date('2024-04-15');
        vi.setSystemTime(iDag);

        const fodselsdato = new Date('2003-04-16');

        const alder = kalkulerAlder(fodselsdato);
        expect(alder).toBe(20);

        iDag = new Date('2024-04-17');
        vi.setSystemTime(iDag);

        const alder2 = kalkulerAlder(fodselsdato);
        expect(alder2).toBe(21);
    });

    it('bør regne ut riktig alder dagen før og etter bursdag, i ikke-skuddår', () => {
        let iDag = new Date('2025-04-15');
        vi.setSystemTime(iDag);

        const fodselsdato = new Date('2005-04-16');

        const alder = kalkulerAlder(fodselsdato);
        expect(alder).toBe(19);

        iDag = new Date('2025-04-17');
        vi.setSystemTime(iDag);

        const alder2 = kalkulerAlder(fodselsdato);
        expect(alder2).toBe(20);
    });

    it('bør rendre riktig', () => {
        const iDag = new Date('2024-02-02');
        vi.setSystemTime(iDag);

        render(<NavnOgAlder fodselsdato="2000-01-01" navn="Test" brukerFnr="00000000000" />);
        const overskrift = screen.getByRole('heading', { level: 2 });
        const kopierFnr = screen.getByRole('button', { name: 'Kopier fødselsnummer' });
        expect(overskrift.textContent).toBe('Test (24 år)');
        expect(overskrift.classList.contains('aksel-heading--xsmall')).toBe(true);
        expect(kopierFnr.textContent).toContain('F.nr.: 00000000000');
        expect(kopierFnr.parentElement).toBe(overskrift.parentElement);
        expect(overskrift.parentElement?.classList.contains('personinfo__navn-og-alder')).toBe(true);
    });
});
