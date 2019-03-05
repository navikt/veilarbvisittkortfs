// tslint:disable object-literal-sort-keys
import { JSONValue } from 'yet-another-fetch-mock/dist/types/types';
import { Personalia } from '../types/personalia';

const personalia: Personalia & JSONValue = {
    'fornavn': 'BRUCE',
    'mellomnavn': 'BATTY',
    'etternavn': 'WAYNE',
    'sammensattNavn': 'Bruce Batty Wayne',
    'fodselsnummer': '10108000398',
    'fodselsdato': '1974-09-16',
    'dodsdato': null,
    'barn': [{
        'fornavn': 'BRUCE',
        'mellomnavn': null,
        'etternavn': 'BANNER',
        'sammensattNavn': 'BRUCE BANNER',
        'fodselsnummer': '10108000391',
        'fodselsdato': '2016-04-17',
        'dodsdato': null,
        'harSammeBosted': true,
        'kjonn': 'M'
    }, {
        'fornavn': 'HARRY',
        'mellomnavn': null,
        'etternavn': 'BOSCH',
        'sammensattNavn': 'HARRY BOSCH',
        'fodselsnummer': '10108000392',
        'fodselsdato': '2014-05-24',
        'dodsdato': null,
        'harSammeBosted': false,
        'kjonn': 'M'
    }, {
        'fornavn': 'SATOSHI',
        'mellomnavn': null,
        'etternavn': 'NAKAMOTO',
        'sammensattNavn': 'SATOSHI NAKAMOTO',
        'fodselsnummer': '10108000398',
        'fodselsdato': '2005-10-04',
        'dodsdato': '2010-10-04',
        'harSammeBosted': true,
        'kjonn': 'K'
    }],
    'diskresjonskode': '6',
    'kontonummer': '12345678910',
    'geografiskTilknytning': '0106',
    'geografiskEnhet': {
        'enhetsnummer': '0106',
        'navn': 'NAV Fredrikstad'
    },
    'telefon': '+4799999999',
    'epost': 'tester.scrambling-script@fellesregistre.no',
    'statsborgerskap': 'NORGE',
    'sikkerhetstiltak': 'To ansatte i samtale',
    'sivilstand': {
        'sivilstand': 'Gift',
        'fraDato': '2016-08-04'
    },
    'partner': null,
    'bostedsadresse': {
        'strukturertAdresse': {
            'Gateadresse': {
                'landkode': 'NORGE',
                'tilleggsadresse': null,
                'postnummer': '1621',
                'poststed': 'GRESSVIK',
                'husnummer': 2228,
                'husbokstav': null,
                'kommunenummer': '0106',
                'gatenavn': 'GATEVEIEN',
                'bolignummer': null,
                'gatenummer': null
            }
        }
    },
    'midlertidigAdresseNorge': null,
    'midlertidigAdresseUtland': null,
    'postAdresse': {
        'ustrukturertAdresse': {
            'adresselinje1': 'DOIDGE',
            'adresselinje2': null,
            'adresselinje3': null,
            'adresselinje4': '4001 STAVANGER',
            'landkode': 'NORGE'
        }
    },
    'egenAnsatt': true,
    'kjonn': 'K'
};

export default personalia;
