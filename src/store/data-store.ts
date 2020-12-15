import constate from 'constate';
import { useState } from 'react';
import { FeatureToggles, PILOT_TOGGLE, VEDTAKSSTTOTTE_PRELANSERING_TOGGLE } from '../api/veilarbpersonflatefs';
import { Oppfolging, OppfolgingStatus, TilgangTilBrukersKontor } from '../api/veilarboppfolging';
import { HarBruktNivaa4Type, Personalia } from '../api/veilarbperson';
import { Arbeidsliste } from '../api/veilarbportefolje';
import { VeilederData, VeilederListe } from '../api/veilarbveileder';

const defaultFeatureToggles: FeatureToggles = {
    [PILOT_TOGGLE]: false,
    [VEDTAKSSTTOTTE_PRELANSERING_TOGGLE]: false,
};

export const [DataStore, useDataStore] = constate(() => {
    const [oppfolgingsstatus, setOppfolgingsstatus] = useState<OppfolgingStatus>();
    const [oppfolging, setOppfolging] = useState<Oppfolging>();
    const [innloggetVeileder, setInnloggetVeileder] = useState<VeilederData>();
    const [personalia, setPersonalia] = useState<Personalia>();
    const [tilgangTilBrukersKontor, setTilgangTilBrukersKontor] = useState<TilgangTilBrukersKontor>();
    const [harBruktNivaa4, setHarBruktNivaa4] = useState<HarBruktNivaa4Type>();
    const [features, setFeatures] = useState<FeatureToggles>(defaultFeatureToggles);

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
