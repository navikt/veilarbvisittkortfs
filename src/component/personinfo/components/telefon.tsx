import { BodyShort, CopyButton, Detail } from '@navikt/ds-react';
import { Personalia, PersonaliaTelefon } from '../../../api/veilarbperson';
import EMDASH from '/util/util';
import { formaterTelefonnummer } from '/util/util';
import { hentKilde } from '/util/util';
import { isNotEmptyArray } from '/util/util';

function TelefonNrMedKilde(props: { telefon: PersonaliaTelefon }) {
    const { telefonNr, registrertDato, master } = props.telefon;

    return (
        <div>
            <BodyShort size="small" className="copy_tlf">
                {formaterTelefonnummer(telefonNr)}
                <CopyButton copyText={telefonNr} size="xsmall" />
            </BodyShort>
            <div className="tlf_registrert">
                {telefonNr && (
                    <Detail className="kilde_tekst">
                        Registrert {registrertDato && registrertDato}
                        {` ${hentKilde(master)}`}
                    </Detail>
                )}
            </div>
        </div>
    );
}

function Telefon({ telefon }: Pick<Personalia, 'telefon'>) {
    const telefonListe = isNotEmptyArray(telefon)
        ? telefon.map((telefon, index) => <TelefonNrMedKilde telefon={telefon} key={index} />)
        : EMDASH;

    return (
        <div>
            <BodyShort size="small" className="body_header">
                Telefon
            </BodyShort>
            <div className="enkeltinfo_value">{telefonListe}</div>
        </div>
    );
}

export default Telefon;
