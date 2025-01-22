import constate from 'constate';
import { useState } from 'react';
import { Oppfolging } from '../api/veilarboppfolging';
import { HarBruktNivaa4Type, Personalia, FullmaktDTO, SpraakTolk, Verge } from '../api/veilarbperson';
import { VeilederData, VeilederListe } from '../api/veilarbveileder';
import { GjeldendeEskaleringsvarsel } from '../api/veilarbdialog';

export const [DataStore, useDataStore] = constate(() => {
    const [oppfolging, setOppfolging] = useState<Oppfolging>();
    const [innloggetVeileder, setInnloggetVeileder] = useState<VeilederData>();
    const [personalia, setPersonalia] = useState<Personalia>();
    const [verge, setVerge] = useState<Verge>();
    const [fullmakt, setFullmakt] = useState<FullmaktDTO>();
    const [spraakTolk, setSpraakTolk] = useState<SpraakTolk>();
    const [harBruktNivaa4, setHarBruktNivaa4] = useState<HarBruktNivaa4Type>();
    const [veilederePaEnhet, setVeilederePaEnhet] = useState<VeilederListe>();
    const [gjeldendeEskaleringsvarsel, setGjeldendeEskaleringsvarsel] = useState<GjeldendeEskaleringsvarsel | null>(
        null
    );
    const [veilederDataListe, setVeilederDataListe] = useState<VeilederData[]>([]);

    return {
        oppfolging,
        setOppfolging,
        innloggetVeileder,
        setInnloggetVeileder,
        personalia,
        setPersonalia,
        harBruktNivaa4,
        setHarBruktNivaa4,
        veilederePaEnhet,
        setVeilederePaEnhet,
        verge,
        setVerge,
        fullmakt,
        setFullmakt,
        spraakTolk,
        setSpraakTolk,
        gjeldendeEskaleringsvarsel,
        setGjeldendeEskaleringsvarsel,
        veilederDataListe,
        setVeilederDataListe
    };
});
