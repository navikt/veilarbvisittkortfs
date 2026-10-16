import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { DataFetcher } from './data-fetcher';
import { useAppStore } from '../store/app-store';

const { usePersonalia, useOppfolgingsstatus, useInnloggetVeileder } = vi.hoisted(() => ({
    usePersonalia: vi.fn(),
    useOppfolgingsstatus: vi.fn(),
    useInnloggetVeileder: vi.fn()
}));

vi.mock('../api/veilarbperson', () => ({
    usePersonalia,
    useVerge: vi.fn(),
    useFullmakt: vi.fn(),
    useSpraakTolk: vi.fn()
}));
vi.mock('../api/veilarboppfolging', () => ({ useOppfolgingsstatus }));
vi.mock('../api/veilarbveileder', () => ({
    useInnloggetVeileder,
    useVeilederePaEnhet: vi.fn()
}));
vi.mock('../api/veilarbdialog', () => ({ useGjeldendeEskaleringsvarsel: vi.fn() }));

describe('DataFetcher', () => {
    beforeEach(() => {
        useAppStore.setState({ brukerFnr: '00000000000' });
        usePersonalia.mockReturnValue({ isLoading: true });
        useOppfolgingsstatus.mockReturnValue({ isLoading: false });
        useInnloggetVeileder.mockReturnValue({ isLoading: false });
    });

    test('viser faste feltnavn og skjelett kun for verdiene mens personalia lastes', () => {
        const { container } = render(<DataFetcher>{() => <span>Personopplysninger</span>}</DataFetcher>);

        expect(screen.getByRole('status', { name: 'Laster personopplysninger' })).toBeTruthy();
        expect(container.querySelector('.visittkortfs__container')?.classList.contains('flex-wrap')).toBe(true);
        expect(container.querySelector('.visittkortfs__container > div')?.classList.contains('min-w-max')).toBe(true);
        expect(container.querySelector('.personinfo__ikon.aksel-skeleton--circle')).toBeTruthy();
        expect(
            container
                .querySelector('.visittkortfs__container > div')
                ?.classList.contains('grid-cols-[2rem_16.5rem_max-content]')
        ).toBe(true);
        expect(
            container.querySelector('.visittkortfs__container h2')?.classList.contains('aksel-heading--xsmall')
        ).toBe(true);
        expect(
            container
                .querySelector('.visittkortfs__container h2')
                ?.parentElement?.classList.contains('personinfo__navn-og-alder')
        ).toBe(true);
        expect(container.querySelector('.visittkortfs__container h2 .aksel-skeleton')?.getAttribute('style')).toContain(
            'width: 100%'
        );
        expect(container.querySelector('.verktoylinje > div')).toBeTruthy();
        expect(container.querySelectorAll('.verktoylinje > div:last-child > span')).toHaveLength(1);
        expect(
            container.querySelectorAll('.verktoylinje > div:last-child > span.whitespace-nowrap.shrink-0')
        ).toHaveLength(1);
        expect(container.querySelector('.visittkortfs__container h2 + span')?.textContent).toContain('F.nr.:');
        expect(container.querySelector('.verktoylinje > div:last-child > span')?.textContent).toContain('Tlf.:');
        expect(container.querySelectorAll('.visittkortfs__container .aksel-label--small')).toHaveLength(2);
        expect(container.querySelectorAll('.visittkortfs__container .aksel-skeleton')).toHaveLength(4);
        expect(screen.queryByText('Personopplysninger')).toBeNull();
    });

    test('viser innholdet når dataene er lastet', () => {
        const { rerender, container } = render(<DataFetcher>{() => <span>Personopplysninger</span>}</DataFetcher>);
        usePersonalia.mockReturnValue({ isLoading: false });
        rerender(<DataFetcher>{() => <span>Personopplysninger</span>}</DataFetcher>);

        expect(screen.getByText('Personopplysninger')).toBeTruthy();
        expect(container.querySelectorAll('.aksel-skeleton')).toHaveLength(0);
    });
});
