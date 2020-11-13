import constate from 'constate';
import { useState } from 'react';
import { OppfolgingStatus } from '../api/data/oppfolging-status';
import { Oppfolging } from '../api/data/oppfolging';
import { VeilederData } from '../api/data/veilederdata';
import { Personalia } from '../api/data/personalia';
import { HarBruktNivaa4Type } from '../api/data/har-brukt-nivaa4';
import { TilgangTilBrukersKontor } from '../api/data/tilgangtilbrukerskontor';

const placeholder = {} as any;

export const [DataStore, useDataStore] = constate(() => {
    const [oppfolgingsstatus, setOppfolgingsstatus] = useState<OppfolgingStatus>(placeholder);
    const [oppfolging, setOppfolging] = useState<Oppfolging>(placeholder);
    const [innloggetVeileder, setInnloggetVeileder] = useState<VeilederData>(placeholder);
    const [personalia, setPersonalia] = useState<Personalia>(placeholder);
    const [tilgangTilBrukersKontor, setTilgangTilBrukersKontor] = useState<TilgangTilBrukersKontor>(placeholder);
    const [harBruktNivaa4, setHarBruktNivaa4] = useState<HarBruktNivaa4Type>(placeholder);

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
    };
});
