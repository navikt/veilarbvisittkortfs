import { VeilederData, VeilederListe } from '../../api/veilarbveileder';

function lagVeileder(): VeilederData {
    const fornavn = 'Herpsderps';
    const etternavn = 'Apabepa';

    const id = 'Z' + (Math.floor(Math.random() * 1000000) + 100000);

    return {
        ident: id,
        navn: fornavn + ' ' + etternavn,
        fornavn: fornavn,
        etternavn: etternavn,
    };
}

export const mockEnhetVeiledere: VeilederListe = { veilederListe: new Array(40).fill(0).map(() => lagVeileder()) };
