import constate from 'constate';
import { useState } from 'react';
import { Features } from '../api/veilarbpersonflatefs';
import { Oppfolging, OppfolgingStatus, TilgangTilBrukersKontor } from '../api/veilarboppfolging';
import { HarBruktNivaa4Type, Personalia } from '../api/veilarbperson';
import { Arbeidsliste } from '../api/veilarbportefolje';
import { VeilederData, VeilederListe } from '../api/veilarbveileder';

const placeholder = {} as any;

export const [DataStore, useDataStore] = constate(() => {
    const [oppfolgingsstatus, setOppfolgingsstatus] = useState<OppfolgingStatus>(placeholder);
    const [oppfolging, setOppfolging] = useState<Oppfolging>(placeholder);
    const [innloggetVeileder, setInnloggetVeileder] = useState<VeilederData>(placeholder);
    const [personalia, setPersonalia] = useState<Personalia>(placeholder);
    const [tilgangTilBrukersKontor, setTilgangTilBrukersKontor] = useState<TilgangTilBrukersKontor>(placeholder);
    const [harBruktNivaa4, setHarBruktNivaa4] = useState<HarBruktNivaa4Type>(placeholder);
    const [features, setFeatures] = useState<Features>(placeholder);

    const [arbeidsliste, setArbeidsliste] = useState<Arbeidsliste>();
    const [veilederePaEnhet, setVeilederePaEnhet] = useState<VeilederListe>();

    return {
        oppfolgingsstatus,
        setOppfolgingsstatus,
        oppfolging,
        setOppfolging,
        innloggetVeileder,
        setInnloggetVeileder,
        personalia,
        setPersonalia,
        tilgangTilBrukersKontor,
        setTilgangTilBrukersKontor,
        harBruktNivaa4,
        setHarBruktNivaa4,
        features,
        setFeatures,
        arbeidsliste,
        setArbeidsliste,
        veilederePaEnhet,
        setVeilederePaEnhet,
    };
});
