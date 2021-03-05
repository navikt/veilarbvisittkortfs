import { rest } from 'msw';
import { RequestHandlersList } from 'msw/lib/types/setupWorker/glossary';
import { HarBruktNivaa4Type, Personalia, PersonaliaV2 } from '../../api/veilarbperson';

const mockHarBruktNivaa4: HarBruktNivaa4Type = {
    harbruktnivaa4: false,
};

const mockPersonalia: Personalia = {
    fornavn: 'BRUCE BRUCE',
    mellomnavn: 'BATTY BATTY',
    etternavn: 'WAYNE',
    sammensattNavn: 'Bruce Batty Wayne',
    fodselsnummer: '10108000398',
    fodselsdato: '1974-09-16',
    dodsdato: null,
    diskresjonskode: null,
    sikkerhetstiltak: 'To ansatte i samtale',
    egenAnsatt: false,
    kjonn: 'K',
};

const mockPersonaliaV2: PersonaliaV2 = {
    fornavn: 'BRUCE BRUCE',
    mellomnavn: 'BATTY BATTY',
    etternavn: 'WAYNE',
    forkortetNavn: 'Bruce Batty Wayne',
    fodselsnummer: '10108000398',
    fodselsdato: '1974-09-16',
    dodsdato: null,
    diskresjonskode: null,
    sikkerhetstiltak: 'To ansatte i samtale',
    egenAnsatt: false,
    kjonn: 'K',
    harVergemaal: true,
    harFullmakt: true,
};

export const veilarbpersonHandlers: RequestHandlersList = [
    rest.get('/veilarbperson/api/person/:fnr', (req, res, ctx) => {
        return res(ctx.delay(500), ctx.json(mockPersonalia));
    }),
    rest.get('/veilarbperson/api/person/:fnr/harNivaa4', (req, res, ctx) => {
        return res(ctx.delay(500), ctx.json(mockHarBruktNivaa4));
    }),
    rest.get('/veilarbperson/api/person/:fnr', (req, res, ctx) => {
        return res(ctx.delay(500), ctx.json(mockPersonalia));
    }),
    rest.get('/veilarbperson/api/v2/person/:fnr', (req, res, ctx) => {
        return res(ctx.delay(500), ctx.json(mockPersonaliaV2));
    }),
];
