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
        expect(container.querySelector('.personinfo__ikon.aksel-skeleton--circle')).toBeTruthy();
        expect(container.querySelector('.personinfo h2 .aksel-skeleton')?.getAttribute('style')).toContain(
            'width: 100%'
        );
        expect(container.querySelector('.verktoylinje__ikonplass')).toBeTruthy();
        expect(container.querySelectorAll('.verktoylinje__lastverdi')).toHaveLength(2);
        expect(container.querySelectorAll('.verktoylinje__lastverdi .aksel-label--small')).toHaveLength(2);
        expect(container.querySelectorAll('.verktoylinje__kopiikonplass')).toHaveLength(2);
        expect(container.querySelector('.verktoylinje__lastverdi')?.textContent).toContain('F.nr.:');
        expect(container.querySelectorAll('.verktoylinje__lastverdi')[1]?.textContent).toContain('Tlf.:');
        expect(container.querySelectorAll('.verktoylinje__lastverdi .aksel-skeleton')).toHaveLength(2);
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
