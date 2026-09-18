import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, test, vi } from 'vitest';
import dayjs from 'dayjs';
import ForlengOppfolgingModal from './forleng-oppfolging-modal';

const { mockUseOppfolging, mockForlengOppfolging, mockMutate } = vi.hoisted(() => ({
    mockHideModal: vi.fn(),
    mockUseOppfolging: vi.fn(),
    mockForlengOppfolging: vi.fn(),
    mockMutate: vi.fn()
}));

vi.mock('../../../api/veilarboppfolging', () => ({
    useOppfolging: mockUseOppfolging,
    useForlengOppfolging: () => ({
        forlengOppfolging: mockForlengOppfolging,
        isLoading: false,
        error: null
    })
}));

const defaultOppfolging = {
    underOppfolging: true,
    utmeldingskandidat: {
        tag: 'ARBEIDSSOKERPERIODE_AVSLUTTET_IKKE_LEVERT_MELDEKORT',
        utmeldingskandidatHendelser: [],
        aktivForlengelse: null
    }
};

const dagensDato = dayjs();

describe('Forhåndsvalgt dato', () => {
    afterEach(() => {
        cleanup();
        mockUseOppfolging.mockReset();
        mockForlengOppfolging.mockReset();
        mockMutate.mockReset();
    });

    test('viser i morgen som standarddato når bruker er utmeldingskandidat', async () => {
        mockUseOppfolging.mockReturnValue({
            oppfolging: defaultOppfolging,
            mutate: mockMutate
        });

        render(<ForlengOppfolgingModal brukerFnr="10108000398" />);

        const input = document.getElementById('forleng-til-dato') as HTMLInputElement;
        expect(input.value).toBe(dayjs().add(1, 'day').format('DD.MM.YYYY'));
    });

    test('viser aktiv forlengelsesdato som standard når bruker er en tidligere forlenget utmeldingskandidat', async () => {
        const forlengetTil = dayjs().add(5, 'day').format('YYYY-MM-DD');
        mockUseOppfolging.mockReturnValue({
            oppfolging: {
                ...defaultOppfolging,
                utmeldingskandidat: {
                    ...defaultOppfolging.utmeldingskandidat,
                    tag: null,
                    aktivForlengelse: {
                        utfortAvType: 'VEILEDER',
                        utfortAv: 'Z123456',
                        hendelseTidspunkt: '2026-09-08T13:28:40.558650Z',
                        forlengetTil
                    }
                }
            },
            mutate: mockMutate
        });

        render(<ForlengOppfolgingModal brukerFnr="10108000398" />);

        const input = document.getElementById('forleng-til-dato') as HTMLInputElement;
        expect(input.value).toBe(dayjs(forlengetTil).format('DD.MM.YYYY'));
    });
});

describe('Valider forlenging', () => {
    afterEach(() => {
        cleanup();
        mockUseOppfolging.mockReset();
        mockForlengOppfolging.mockReset();
        mockMutate.mockReset();
    });

    const apiRespons = {
        underOppfolging: true,
        utmeldingskandidat: {
            tag: 'ARBEIDSSOKERPERIODE_AVSLUTTET_IKKE_LEVERT_MELDEKORT',
            utmeldingskandidatHendelser: [],
            aktivForlengelse: null
        },
        mutate: mockMutate
    };

    test('sender minst tillate dato frem i tid og viser kvittering når bekreft trykkes', async () => {
        const user = userEvent.setup();
        mockForlengOppfolging.mockResolvedValue({ ok: true });
        mockUseOppfolging.mockReturnValue(apiRespons);
        const forlengetTilDato = dayjs().add(1, 'day').format('YYYY-MM-DD');
        const forventetDato = dayjs().add(1, 'day').format('DD.MM.YYYY');

        render(<ForlengOppfolgingModal brukerFnr="10108000398" />);

        await user.click(await screen.findByLabelText(/Bekreft forleng oppfølging/i));

        expect(mockForlengOppfolging).toHaveBeenCalledTimes(1);
        expect(mockForlengOppfolging).toHaveBeenCalledWith(
            {
                fnr: '10108000398',
                forlengetTil: forlengetTilDato
            },
            { throwOnError: false }
        );

        const kvittering = await screen.findByText((_, element) => {
            if (!element || element.tagName.toLowerCase() !== 'p') return false;
            return element.textContent === `Oppfølging forlenget til ${forventetDato}`;
        });

        expect(kvittering).toBeTruthy();
    });

    test('Sender valgt dato frem i tid og viser kvittering ved bekreftelse', async () => {
        const user = userEvent.setup();
        mockForlengOppfolging.mockResolvedValue({ ok: true });
        mockUseOppfolging.mockReturnValue(apiRespons);
        render(<ForlengOppfolgingModal brukerFnr={'10108000398'} />);

        const forlengDato = dayjs().add(1, 'month');
        const input = document.getElementById('forleng-til-dato') as HTMLInputElement;
        await user.clear(input);

        await user.type(input, forlengDato.format('DD.MM.YYYY'));
        await user.click(await screen.findByLabelText(/Bekreft forleng oppfølging/i));

        expect(mockForlengOppfolging).toHaveBeenCalledTimes(1);
        expect(mockForlengOppfolging).toHaveBeenCalledWith(
            {
                fnr: '10108000398',
                forlengetTil: forlengDato.format('YYYY-MM-DD')
            },
            { throwOnError: false }
        );

        const kvittering = await screen.findByText((_, element) => {
            if (!element || element.tagName.toLowerCase() !== 'p') return false;
            return element.textContent === `Oppfølging forlenget til ${forlengDato.format('DD.MM.YYYY')}`;
        });

        expect(kvittering).toBeTruthy();
    });

    test('Endrer forlenget dato når bruker har aktiv forlengelse', async () => {
        const user = userEvent.setup();
        mockForlengOppfolging.mockResolvedValue({ ok: true });
        mockUseOppfolging.mockReturnValue({
            oppfolging: {
                underOppfolging: true,
                utmeldingskandidat: {
                    tag: null,
                    utmeldingskandidatHendelser: [],
                    aktivForlengelse: {
                        utfortAvType: 'VEILEDER',
                        utfortAv: 'Z123456',
                        hendelseTidspunkt: '2026-09-08T13:28:40.558650Z',
                        forlengetTil: dayjs().add(10, 'day').format('YYYY-MM-DD')
                    }
                }
            },
            mutate: mockMutate
        });
        render(<ForlengOppfolgingModal brukerFnr={'10108000398'} />);

        const forlengDato = dayjs().add(1, 'month');
        const inputDOM = document.getElementById('forleng-til-dato') as HTMLInputElement;

        await user.clear(inputDOM);
        await user.type(inputDOM, forlengDato.format('DD.MM.YYYY'));
        await user.click(await screen.findByLabelText(/Bekreft forleng oppfølging/i));

        expect(mockForlengOppfolging).toHaveBeenCalledTimes(1);
        expect(mockForlengOppfolging).toHaveBeenCalledWith(
            {
                fnr: '10108000398',
                forlengetTil: forlengDato.format('YYYY-MM-DD')
            },
            { throwOnError: false }
        );

        const kvittering = await screen.findByText((_, element) => {
            if (!element || element.tagName.toLowerCase() !== 'p') return false;
            return element.textContent === `Oppfølging forlenget til ${forlengDato.format('DD.MM.YYYY')}`;
        });

        expect(kvittering).toBeTruthy();
    });

    test('Feilmelding hvis bruker verken er utmeldindskandidat eller har aktiv forlengelse', async () => {
        const user = userEvent.setup();
        mockForlengOppfolging.mockResolvedValue({ ok: false });
        mockUseOppfolging.mockReturnValue({
            oppfolging: {
                underOppfolging: true,
                utmeldingskandidat: {
                    tag: null,
                    utmeldingskandidatHendelser: [],
                    aktivForlengelse: null
                }
            },
            mutate: mockMutate
        });
        render(<ForlengOppfolgingModal brukerFnr={'10108000398'} />);

        const input = document.getElementById('forleng-til-dato') as HTMLInputElement;
        await user.clear(input);
        await user.type(input, dayjs().add(1, 'day').format('DD.MM.YYYY'));

        await user.click(await screen.findByLabelText(/Bekreft forleng oppfølging/i));

        const feilmelding = await screen.findByText((_, element) => {
            if (!element || element.tagName.toLowerCase() !== 'p') return false;
            return element.textContent.includes('Forlengelse av oppfølging feilet.');
        });

        expect(feilmelding).toBeTruthy();
    });

    test('Bekreft knapp er deaktivert ved dagens dato', async () => {
        const user = userEvent.setup();
        mockForlengOppfolging.mockResolvedValue({ ok: false });
        mockUseOppfolging.mockReturnValue(apiRespons);
        render(<ForlengOppfolgingModal brukerFnr={'10108000398'} />);

        const input = document.getElementById('forleng-til-dato') as HTMLInputElement;
        await user.clear(input);

        await user.type(input, dagensDato.format('DD.MM.YYYY'));
        const bekreftKnapp = await screen.findByLabelText(/Bekreft forleng oppfølging/i);
        const bekreftKnappDOM = bekreftKnapp as HTMLButtonElement;
        await user.click(bekreftKnapp);

        expect(mockForlengOppfolging).toHaveBeenCalledTimes(0);
        expect(bekreftKnappDOM.disabled).toBe(true);
    });

    test('Bekreft knapp er deaktivert ved dato i fortiden', async () => {
        const user = userEvent.setup();
        mockForlengOppfolging.mockResolvedValue({ ok: false });
        mockUseOppfolging.mockReturnValue(apiRespons);
        render(<ForlengOppfolgingModal brukerFnr={'10108000398'} />);

        const input = document.getElementById('forleng-til-dato') as HTMLInputElement;
        await user.clear(input);

        await user.type(input, dagensDato.subtract(1, 'day').format('DD.MM.YYYY'));
        const bekreftKnapp = await screen.findByLabelText(/Bekreft forleng oppfølging/i);
        const bekreftKnappDOM = bekreftKnapp as HTMLButtonElement;
        await user.click(bekreftKnapp);

        expect(mockForlengOppfolging).toHaveBeenCalledTimes(0);
        expect(bekreftKnappDOM.disabled).toBe(true);
    });

    test('Bekreft knapp er deaktivert når dato er mer enn 6 måneder frem i tid', async () => {
        const user = userEvent.setup();
        mockForlengOppfolging.mockResolvedValue({ ok: false });
        mockUseOppfolging.mockReturnValue(apiRespons);
        render(<ForlengOppfolgingModal brukerFnr={'10108000398'} />);

        const input = document.getElementById('forleng-til-dato') as HTMLInputElement;
        await user.clear(input);
        await user.type(input, dagensDato.add(6, 'month').add(1, 'day').format('DD.MM.YYYY'));

        const bekreftKnapp = await screen.findByLabelText(/Bekreft forleng oppfølging/i);
        const bekreftKnappDOM = bekreftKnapp as HTMLButtonElement;
        await user.click(bekreftKnapp);

        expect(mockForlengOppfolging).toHaveBeenCalledTimes(0);
        expect(bekreftKnappDOM.disabled).toBe(true);
    });
});
