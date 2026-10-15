import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
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
    logMetrikk: vi.fn()
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
    selectHarUbehandledeDialoger: () => false
}));

vi.mock('../../../util/logger', () => ({
    logMetrikk: mocks.logMetrikk
}));

describe('AvsluttOppfolging', () => {
    beforeEach(() => {
        mocks.status = { avsluttOppfolgingStatus: undefined, avsluttOppfolgingStatusLoading: true };
        mocks.dialoger = { dialogerData: undefined, dialogerLoading: true };
        mocks.utkast = { data: undefined, isLoading: false };
        vi.clearAllMocks();
    });

    it('keeps one fixed modal through loading until the warning branch is ready', () => {
        const { container, rerender } = render(<AvsluttOppfolging brukerFnr="123" />);

        const dialog = screen.getByRole('dialog', { name: 'Avslutt oppfølgingsperioden' });
        const body = dialog.querySelector('.aksel-modal__body');
        expect(dialog.classList.contains('aksel-modal--width-medium')).toBe(true);
        expect(dialog.classList.contains('h-88')).toBe(false);
        expect(body?.classList.contains('h-[min(16rem,calc(100dvh-var(--ax-space-28)))]')).toBe(true);
        expect(screen.queryByTestId('avsluttoppfolging-warning-icon')).toBeNull();
        expect(container.querySelector('.aksel-loader')).toBeTruthy();
        expect(screen.getByTitle('Laster innhold')).toBeTruthy();
        expect(screen.queryByRole('textbox')).toBeNull();
        expect(container.querySelector('form')).toBeNull();
        expect(screen.queryByText('Du kan ikke avslutte oppfølgingsperioden fordi:')).toBeNull();
        expect(mocks.useHarUtkast).toHaveBeenLastCalledWith(null);

        mocks.status = { avsluttOppfolgingStatus: { kanAvslutte: true }, avsluttOppfolgingStatusLoading: false };
        mocks.dialoger = { dialogerData: [], dialogerLoading: false };
        mocks.utkast = { data: undefined, isLoading: true };
        rerender(<AvsluttOppfolging brukerFnr="123" />);

        expect(screen.getByRole('dialog', { name: 'Avslutt oppfølgingsperioden' })).toBe(dialog);
        expect(dialog.querySelector('.aksel-modal__body')).toBe(body);
        expect(screen.queryByTestId('avsluttoppfolging-warning-icon')).toBeNull();
        expect(container.querySelector('.aksel-loader')).toBeTruthy();
        expect(screen.queryByRole('textbox')).toBeNull();
        expect(container.querySelector('form')).toBeNull();
        expect(screen.queryByText('Du kan ikke avslutte oppfølgingsperioden fordi:')).toBeNull();
        expect(mocks.useHarUtkast).toHaveBeenLastCalledWith('123');
        expect(mocks.useHarUtkast).toHaveBeenCalledTimes(2);

        mocks.utkast = { data: { data: true }, isLoading: false };
        rerender(<AvsluttOppfolging brukerFnr="123" />);

        expect(screen.getByRole('dialog', { name: 'Avslutt oppfølgingsperioden' })).toBe(dialog);
        expect(dialog.querySelector('.aksel-modal__body')).toBe(body);
        expect(container.querySelector('.aksel-loader')).toBeNull();
        const icon = screen.getByTestId('avsluttoppfolging-warning-icon');
        expect(icon.closest('.aksel-modal__header')).toBeTruthy();
        expect(screen.getByText('Du kan ikke avslutte oppfølgingsperioden fordi:')).toBeTruthy();
        expect(dialog.classList.contains('overflow-visible')).toBe(true);
        expect(screen.getByRole('dialog', { name: 'Avslutt oppfølgingsperioden' })).toBe(dialog);
    });

    it('does not show the warning icon in the allowed branch', () => {
        const { rerender } = render(<AvsluttOppfolging brukerFnr="123" />);

        mocks.status = {
            avsluttOppfolgingStatus: { kanAvslutte: false, harAktiveTiltaksdeltakelser: true },
            avsluttOppfolgingStatusLoading: false
        };
        mocks.dialoger = { dialogerData: [], dialogerLoading: false };
        rerender(<AvsluttOppfolging brukerFnr="123" />);

        const dialog = screen.getByRole('dialog', { name: 'Avslutt oppfølgingsperioden' });
        expect(dialog).toBeTruthy();
        expect(document.querySelector('.aksel-loader')).toBeNull();
        expect(screen.queryByTestId('avsluttoppfolging-warning-icon')).toBeNull();
        expect(dialog.classList.contains('overflow-visible')).toBe(false);
        expect(screen.queryByText('Du kan ikke avslutte oppfølgingsperioden fordi:')).toBeNull();
        expect(document.querySelector('form')).toBeTruthy();
        expect(mocks.useHarUtkast).toHaveBeenNthCalledWith(1, null);
        expect(mocks.useHarUtkast).toHaveBeenNthCalledWith(2, null);
        expect(mocks.useHarUtkast).toHaveBeenCalledTimes(2);
        expect(mocks.logMetrikk).toHaveBeenCalledTimes(1);
        expect(mocks.setAvsluttOppfolgingOpptelt).toHaveBeenCalledTimes(1);
    });
});
