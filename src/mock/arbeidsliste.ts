import { JSONValue } from 'yet-another-fetch-mock';
import { Arbeidsliste } from '../api/data/arbeidsliste';

const arbeidsliste: Arbeidsliste & JSONValue = {
    arbeidslisteAktiv: null,
    endringstidspunkt: null,
    frist: null,
    harVeilederTilgang: true,
    isOppfolgendeVeileder: true,
    kommentar: null,
    overskrift: null,
    sistEndretAv: null,
    kategori: null,
};

export default arbeidsliste;
