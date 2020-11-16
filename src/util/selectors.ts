import { storeForbokstaver } from './utils';
import { Personalia } from '../api/data/personalia';

export function selectSammensattNavn(personalia: Personalia): string {
    const { fornavn, mellomnavn, etternavn } = personalia;
    return storeForbokstaver([fornavn, mellomnavn || '', etternavn]);
}
