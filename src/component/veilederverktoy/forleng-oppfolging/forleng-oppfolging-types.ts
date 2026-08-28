export interface ForlengHistorikkEntry {
    id: string;
    dato: string;
    forlengetTil: string;
    utfortAv: string;
    begrunnelse: string;
}

export interface ForlengOppfolgingEtikett {
    id: string;
    tekst: string;
}

export const mockForlengHistorikk: ForlengHistorikkEntry[] = [
    {
        id: '1',
        dato: '2026-08-01',
        forlengetTil: '2026-08-15',
        utfortAv: 'Z123456',
        begrunnelse: 'Mangler avklaring fra tiltaksarrangør'
    },
    {
        id: '2',
        dato: '2026-07-10',
        forlengetTil: '2026-07-31',
        utfortAv: 'Z654321',
        begrunnelse: 'Venter på dokumentasjon'
    }
];

export const mockForlengEtiketter: ForlengOppfolgingEtikett[] = [{ id: 'kandidat', tekst: 'Kandidat for avslutning' }];
