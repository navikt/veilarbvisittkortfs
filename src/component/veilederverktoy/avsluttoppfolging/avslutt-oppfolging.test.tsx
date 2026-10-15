import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import AvsluttOppfolging from './avslutt-oppfolging';

const mocks = vi.hoisted(() => ({
    status: {
        avsluttOppfolgingStatus: undefined as
            | undefined
            | {
                  kanAvslutte: boolean;
                  harAktiveTiltaksdeltakelser?: boolean;
                  underKvp?: boolean;
                  erDeltakerIUngdomsprogrammet?: boolean;
                  erArbeidssoeker?: boolean;
                  harAap?: boolean;
              },
        avsluttOppfolgingStatusLoading: true
    },
    dialoger: { dialogerData: undefined as undefined | unknown[], dialogerLoading: true },
    utkast: { data: undefined as undefined | { data: boolean }, isLoading: false },
    useHarUtkast: vi.fn((fnr: string | null) => {
        void fnr;
        return mocks.utkast;
    }),
    setAvsluttOppfolgingOpptelt: vi.fn(),
    hideModal: vi.fn(),
    logMetrikk: vi.fn(),
    harUbehandledeDialoger: vi.fn(() => false)
}));

vi.mock('../../../api/veilarboppfolging', () => ({
    useAvsluttOppfolgingStatus: () => mocks.status
}));

vi.mock('../../../api/veilarbdialog', () => ({
    useDialoger: () => mocks.dialoger
}));

vi.mock('../../../api/veilarbvedtaksstotte', () => ({
    useHarUtkast: mocks.useHarUtkast
}));

vi.mock('../../../store/app-store', () => ({
    useAvsluttOppfolgingOpptelt: () => false,
    useSetAvsluttOppfolgingOpptelt: () => mocks.setAvsluttOppfolgingOpptelt
}));

vi.mock('../../../store/modal-store', () => ({
    useModalStore: () => ({
        showtAvsluttOppfolgingBekrefModal: vi.fn(),
        hideModal: mocks.hideModal
    })
}));

vi.mock('../../../util/selectors', () => ({
    selectHarUbehandledeDialoger: mocks.harUbehandledeDialoger
}));

vi.mock('../../../util/logger', () => ({
    logMetrikk: mocks.logMetrikk
}));

describe('AvsluttOppfolging', () => {
    afterEach(cleanup);

    beforeEach(() => {
        mocks.status = { avsluttOppfolgingStatus: undefined, avsluttOppfolgingStatusLoading: true };
        mocks.dialoger = { dialogerData: undefined, dialogerLoading: true };
        mocks.utkast = { data: undefined, isLoading: false };
        vi.clearAllMocks();
        mocks.harUbehandledeDialoger.mockReturnValue(false);
    });

    it('viser begrunnelse, knapper og relevante advarsler når brukeren kan avsluttes', () => {
        mocks.status = { avsluttOppfolgingStatus: { kanAvslutte: true }, avsluttOppfolgingStatusLoading: false };
        mocks.dialoger = { dialogerData: [], dialogerLoading: false };
        mocks.utkast = { data: { data: true }, isLoading: false };
        mocks.harUbehandledeDialoger.mockReturnValue(true);
        render(<AvsluttOppfolging brukerFnr="123" />);

        expect(
            screen.getByText(
                'Her avslutter du brukerens oppfølgingsperiode og legger inn en kort begrunnelse om hvorfor.'
            )
        ).toBeTruthy();
        expect(screen.getByText('Du kan avslutte oppfølgingsperioden selv om:')).toBeTruthy();
        expect(screen.getByText('Brukeren har ubehandlede dialoger')).toBeTruthy();
        expect(screen.getByText('Utkast til oppfølgingsvedtak vil bli slettet')).toBeTruthy();
        expect(screen.getByRole('textbox', { name: 'Begrunnelse' })).toBeTruthy();
        expect(screen.getByRole('button', { name: 'Bekreft' })).toBeTruthy();
        expect(screen.getByRole('button', { name: 'Avbryt' })).toBeTruthy();
        expect(screen.queryByText('Brukeren har aktive arbeidsmarkedstiltak.')).toBeNull();
        expect(mocks.useHarUtkast).toHaveBeenCalledWith('123');
    });

    it('viser årsakene uten begrunnelsesskjema når brukeren ikke kan avsluttes', () => {
        mocks.status = {
            avsluttOppfolgingStatus: {
                kanAvslutte: false,
                harAktiveTiltaksdeltakelser: true,
                underKvp: true,
                erDeltakerIUngdomsprogrammet: true,
                erArbeidssoeker: true,
                harAap: true
            },
            avsluttOppfolgingStatusLoading: false
        };
        mocks.dialoger = { dialogerData: [], dialogerLoading: false };
        render(<AvsluttOppfolging brukerFnr="123" />);

        expect(
            screen.getByText(
                (_, element) =>
                    element?.tagName === 'P' &&
                    element.textContent === 'Du kan ikke avslutte oppfølgingsperioden fordi:'
            )
        ).toBeTruthy();
        expect(screen.getByText('Brukeren har aktive arbeidsmarkedstiltak.')).toBeTruthy();
        expect(screen.getByText('Brukeren deltar i på KVP. KVP må avsluttes først.')).toBeTruthy();
        expect(
            screen.getByText('Brukeren deltar i Ungdomsprogrammet. Deltakelse i Ungdomsprogrammet må avsluttes først.')
        ).toBeTruthy();
        expect(screen.getByText('Brukeren er arbeidssøker.')).toBeTruthy();
        expect(screen.getByText('Brukeren har AAP.')).toBeTruthy();
        expect(screen.queryByRole('textbox', { name: 'Begrunnelse' })).toBeNull();
        expect(screen.queryByRole('button', { name: 'Bekreft' })).toBeNull();
        expect(screen.queryByRole('button', { name: 'Avbryt' })).toBeNull();
        expect(mocks.useHarUtkast).toHaveBeenCalledWith(null);
    });
});
