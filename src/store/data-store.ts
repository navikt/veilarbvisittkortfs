import constate from 'constate';
import { useState } from 'react';
import { Oppfolging } from '../api/veilarboppfolging';
import { HarBruktNivaa4Type, Personalia, FullmaktDTO, SpraakTolk, VergeOgFullmakt } from '../api/veilarbperson';
import { VeilederData, VeilederListe } from '../api/veilarbveileder';
import { GjeldendeEskaleringsvarsel } from '../api/veilarbdialog';
import { OboUnleashFeatures } from '../api/veilarbpersonflatefs';

const placeholder = {} as any; // eslint-disable-line

export const [DataStore, useDataStore] = constate(() => {
    const [oppfolging, setOppfolging] = useState<Oppfolging>();
    const [innloggetVeileder, setInnloggetVeileder] = useState<VeilederData>();
    const [personalia, setPersonalia] = useState<Personalia>();
    const [vergeOgFullmakt, setVergeOgFullmakt] = useState<VergeOgFullmakt>();
    const [fullmakter, setFullmakter] = useState<FullmaktDTO>();
    const [spraakTolk, setSpraakTolk] = useState<SpraakTolk>();
    const [harBruktNivaa4, setHarBruktNivaa4] = useState<HarBruktNivaa4Type>();
    const [features, setFeatures] = useState<OboUnleashFeatures>(placeholder);
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
        features,
        setFeatures,
        veilederePaEnhet,
        setVeilederePaEnhet,
        vergeOgFullmakt,
        setVergeOgFullmakt,
        fullmakter,
        setFullmakter,
        spraakTolk,
        setSpraakTolk,
        gjeldendeEskaleringsvarsel,
        setGjeldendeEskaleringsvarsel,
        veilederDataListe,
        setVeilederDataListe
    };
});
