import { JSONValue } from 'yet-another-fetch-mock';
import { Arbeidsliste } from '../types/arbeidsliste';

const arbeidsliste: Arbeidsliste & JSONValue = {
    arbeidslisteAktiv: null,
    endringstidspunkt: "hasdsa",
    frist: null,
    harVeilederTilgang: true,
    isOppfolgendeVeileder: true,
    kommentar: null,
    overskrift: null,
    sistEndretAv: null,
    veilederId: null,
};

export default arbeidsliste;