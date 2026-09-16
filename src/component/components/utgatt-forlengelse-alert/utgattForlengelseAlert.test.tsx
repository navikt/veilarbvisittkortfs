import { afterEach, describe, expect, test, vi } from 'vitest';
import { UtgattForlengelseAlert } from './utgattForlengelseAlert';
import { MedUtmeldingskandidat, Oppfolging } from '../../../api/veilarboppfolging';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UTMELDINGSKANDIDATER_TOGGLE } from '../../../api/veilarbpersonflatefs';

const { mockUseOppfolging, mockShowForleng, mockShowAvslutt } = vi.hoisted(() => ({
    mockUseOppfolging: vi.fn(),
    mockShowForleng: vi.fn(),
    mockShowAvslutt: vi.fn()
}));

vi.mock('../../../api/veilarbpersonflatefs', () => ({
    UTMELDINGSKANDIDATER_TOGGLE: 'veilarbvisittkortfs.utmeldingskandidater',
    useFeaturesFromOboUnleash: () => ({
        features: { [UTMELDINGSKANDIDATER_TOGGLE]: true }
    })
}));

vi.mock('../../../store/app-store', () => ({
    useBrukerFnr: () => '10108000398'
}));

vi.mock('../../../store/modal-store', () => ({
    useModalStore: () => ({
        showAvsluttOppfolgingModal: mockShowAvslutt,
        showForlengOppfolgingModal: mockShowForleng
    })
}));

vi.mock('../../../api/veilarboppfolging', () => ({
    useOppfolging: mockUseOppfolging
}));

describe('UtgattForlengelseAlert', () => {
    afterEach(() => {
        cleanup();
        mockUseOppfolging.mockReset();
        mockShowForleng.mockReset();
        mockShowAvslutt.mockReset();
    });

    test('vises når bruker er utmeldingskandidat', () => {
        const mockOppfolging: Partial<Oppfolging> & MedUtmeldingskandidat = {
            harVeilederLeseTilgangTilBruker: true,
            harVeilederLeseTilgangTilBrukersEnhet: true,
            inaktiveringsdato: '2019-02-22T00:00:00+01:00',
            utmeldingskandidat: {
                tag: 'ARBEIDSSOKERPERIODE_AVSLUTTET_SVARTE_NEI_I_BEKREFTELSE',
                utmeldingskandidatHendelser: [],
                aktivForlengelse: null
            }
        };

        mockUseOppfolging.mockReturnValue({ oppfolging: mockOppfolging });

        render(<UtgattForlengelseAlert />);

        expect(screen.getByText('Skal denne brukeren fortsatt ha oppfølging?')).toBeTruthy();
        expect(screen.getByRole('button', { name: 'Ja, forleng oppfølging' })).toBeTruthy();
        expect(screen.getByRole('button', { name: 'Nei, avslutt nå' })).toBeTruthy();
    });

    test('vises ikke når bruker ikke er utmeldingskandidat', () => {
        const mockOppfolging: Partial<Oppfolging> & MedUtmeldingskandidat = {
            harVeilederLeseTilgangTilBruker: true,
            harVeilederLeseTilgangTilBrukersEnhet: true,
            inaktiveringsdato: '2019-02-22T00:00:00+01:00',
            utmeldingskandidat: {
                tag: null,
                utmeldingskandidatHendelser: [],
                aktivForlengelse: null
            }
        };

        mockUseOppfolging.mockReturnValue({ oppfolging: mockOppfolging });

        render(<UtgattForlengelseAlert />);

        expect(screen.queryByText('Skal denne brukeren fortsatt ha oppfølging?')).toBeNull();
        expect(screen.queryByRole('button', { name: 'Ja, forleng oppfølging' })).toBeNull();
    });

    test('Kaller funksjon som åpner "avslutt oppfølgning" modal når "Nei, avslutt nå" knapp trykkes', async () => {
        const user = userEvent.setup();

        const mockOppfolging: Partial<Oppfolging> & MedUtmeldingskandidat = {
            harVeilederLeseTilgangTilBruker: true,
            harVeilederLeseTilgangTilBrukersEnhet: true,
            inaktiveringsdato: '2019-02-22T00:00:00+01:00',
            utmeldingskandidat: {
                tag: 'ARBEIDSSOKERPERIODE_AVSLUTTET_SVARTE_NEI_I_BEKREFTELSE',
                utmeldingskandidatHendelser: [],
                aktivForlengelse: null
            }
        };
        mockUseOppfolging.mockReturnValue({ oppfolging: mockOppfolging });

        render(<UtgattForlengelseAlert />);
        await user.click(screen.getByRole('button', { name: 'Nei, avslutt nå' }));

        expect(mockShowAvslutt).toHaveBeenCalledTimes(1);
        expect(mockShowForleng).not.toHaveBeenCalled();
    });

    test('Kaller funksjon som åpner "forleng oppfølging" modal når "Ja, forleng oppfølging" knapp trykkes', async () => {
        const user = userEvent.setup();

        const mockOppfolging: Partial<Oppfolging> & MedUtmeldingskandidat = {
            harVeilederLeseTilgangTilBruker: true,
            harVeilederLeseTilgangTilBrukersEnhet: true,
            inaktiveringsdato: '2019-02-22T00:00:00+01:00',
            utmeldingskandidat: {
                tag: 'ARBEIDSSOKERPERIODE_AVSLUTTET_SVARTE_NEI_I_BEKREFTELSE',
                utmeldingskandidatHendelser: [],
                aktivForlengelse: null
            }
        };
        mockUseOppfolging.mockReturnValue({ oppfolging: mockOppfolging });

        render(<UtgattForlengelseAlert />);
        await user.click(screen.getByRole('button', { name: 'Ja, forleng oppfølging' }));

        expect(mockShowForleng).toHaveBeenCalledTimes(1);
        expect(mockShowAvslutt).not.toHaveBeenCalled();
    });
});
