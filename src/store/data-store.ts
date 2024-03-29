import constate from 'constate';
import { useState } from 'react';
import { Oppfolging, OppfolgingStatus, TilgangTilBrukersKontor } from '../api/veilarboppfolging';
import { HarBruktNivaa4Type, Personalia, SpraakTolk, VergeOgFullmakt } from '../api/veilarbperson';
import { Arbeidsliste, Huskelapp } from '../api/veilarbportefolje';
import { VeilederData, VeilederListe } from '../api/veilarbveileder';
import { GjeldendeEskaleringsvarsel } from '../api/veilarbdialog';
import { OboUnleashFeatures } from '../api/veilarbpersonflatefs';

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
    const [huskelapp, setHuskelapp] = useState<Huskelapp>();
    const [veilederePaEnhet, setVeilederePaEnhet] = useState<VeilederListe>();
    const [gjeldendeEskaleringsvarsel, setGjeldendeEskaleringsvarsel] = useState<GjeldendeEskaleringsvarsel | null>(
        null
    );
    const [veilederDataListe, setVeilederDataListe] = useState<VeilederData[]>([]);

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
        huskelapp,
        setHuskelapp,
        veilederePaEnhet,
        setVeilederePaEnhet,
        vergeOgFullmakt,
        setVergeOgFullmakt,
        spraakTolk,
        setSpraakTolk,
        gjeldendeEskaleringsvarsel,
        setGjeldendeEskaleringsvarsel,
        veilederDataListe,
        setVeilederDataListe
    };
});
