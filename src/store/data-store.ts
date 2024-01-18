import constate from 'constate';
import { useState } from 'react';
import { OboUnleashFeatures } from '../api/obo-unleash';
import { Oppfolging, OppfolgingStatus, TilgangTilBrukersKontor } from '../api/veilarboppfolging';
import {HarBruktNivaa4Type, Personalia, RegistreringData, SpraakTolk, VergeOgFullmakt} from '../api/veilarbperson';
import { Arbeidsliste } from '../api/veilarbportefolje';
import { VeilederData, VeilederListe } from '../api/veilarbveileder';
import { GjeldendeEskaleringsvarsel } from '../api/veilarbdialog';

const placeholder = {} as any;

export const [DataStore, useDataStore] = constate(() => {
    const [oppfolgingsstatus, setOppfolgingsstatus] = useState<OppfolgingStatus>();
    const [oppfolging, setOppfolging] = useState<Oppfolging>();
    const [innloggetVeileder, setInnloggetVeileder] = useState<VeilederData>();
    const [personalia, setPersonalia] = useState<Personalia>();
    const [vergeOgFullmakt, setVergeOgFullmakt] = useState<VergeOgFullmakt>();
    const [spraakTolk, setSpraakTolk] = useState<SpraakTolk>();
    const [tilgangTilBrukersKontor, setTilgangTilBrukersKontor] = useState<TilgangTilBrukersKontor>();
    const [harBruktNivaa4, setHarBruktNivaa4] = useState<HarBruktNivaa4Type>();
    const [features, setFeatures] = useState<OboUnleashFeatures>(placeholder);
    const [arbeidsliste, setArbeidsliste] = useState<Arbeidsliste>();
    const [veilederePaEnhet, setVeilederePaEnhet] = useState<VeilederListe>();
    const [gjeldendeEskaleringsvarsel, setGjeldendeEskaleringsvarsel] = useState<GjeldendeEskaleringsvarsel | null>(
        null
    );
    const [veilederDataListe, setVeilederDataListe] = useState<VeilederData[]>([]);
    const [erUtrulletTilEnhet, setErUtrulletTilEnhet] = useState<boolean>(false);
    const [registreringData, setRegistreringData] = useState<RegistreringData | null>(null);

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
        vergeOgFullmakt,
        setVergeOgFullmakt,
        spraakTolk,
        setSpraakTolk,
        gjeldendeEskaleringsvarsel,
        setGjeldendeEskaleringsvarsel,
        veilederDataListe,
        setVeilederDataListe,
        erUtrulletTilEnhet,
        setErUtrulletTilEnhet,
        registreringData,
        setRegistreringData
    };
});
