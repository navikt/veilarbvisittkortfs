import { JSONValue } from 'yet-another-fetch-mock';
import { Arbeidsliste } from '../types/arbeidsliste';

const arbeidsliste: Arbeidsliste & JSONValue = {
    arbeidslisteAktiv: null,
    endringstidspunkt: 'dasdas',
    frist: null,
    harVeilederTilgang: true,
    isOppfolgendeVeileder: true,
    kommentar: 'herpsderots',
    overskrift: 'jeps',
    sistEndretAv: null,
    veilederId: null,
};

export default arbeidsliste;
