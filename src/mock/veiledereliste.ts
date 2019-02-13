import faker from 'nav-faker';

import { JSONValue } from 'yet-another-fetch-mock';
import {VeilederData} from "../types/veilederdata";

function lagVeileder() {
    const fornavn = faker.navn.fornavn();
    const etternavn= "apabepa";

    const id = 'Z' + (Math.floor(Math.random() * 1000000) + 100000);

    return {
        ident: id,
        navn: fornavn + ' ' + etternavn,
        fornavn: fornavn,
        etternavn: etternavn,
    };
}
 interface VeilederListe {
     veilederListe: VeilederData[];
 }


const veiledare :VeilederListe & JSONValue = {veilederListe: new Array(20).fill(0).map(() => lagVeileder())};



export default veiledare;