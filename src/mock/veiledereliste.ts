import { JSONValue } from 'yet-another-fetch-mock';
import { VeilederData } from '../types/veilederdata';

function lagVeileder() {
    const fornavn = 'Herpsderps';
    const etternavn = 'Apabepa';

    const id = 'Z' + (Math.floor(Math.random() * 1000000) + 100000);

    return {
        ident: id,
        navn: fornavn + ' ' + etternavn,
        fornavn: fornavn,
        etternavn: etternavn
    };
}
export interface VeilederListe {
    veilederListe: VeilederData[];
}

const veiledare: VeilederListe & JSONValue = { veilederListe: new Array(40).fill(0).map(() => lagVeileder()) };

export default veiledare;
