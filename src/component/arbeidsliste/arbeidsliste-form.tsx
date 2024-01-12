import React from 'react';
import FormikInput from '../components/formik/formik-input';
import FormikTekstArea from '../components/formik/formik-textarea';
import FormikDatoVelger from '../components/formik/formik-datepicker';
import ArbeidslistekategoriVisning from './arbeidslisteikon/arbeidslisteikon-visning';
import {
    validerArbeidslisteDatoFelt,
    validerArbeidslisteKommentarFelt,
    validerArbeidslisteTittelFelt
} from '../../util/formik-validation';
import { toSimpleDateStr } from '../../util/date-utils';
import { OrNothing } from '../../util/type/utility-types';
import { Detail, Heading } from '@navikt/ds-react';
import './arbeidsliste.less';

interface ArbeidslisteFormProps {
    sistEndretAv?: OrNothing<{ veilederId: string }>;
    endringstidspunkt?: OrNothing<Date>;
    navn: string;
    fnr: string;
}

function ArbeidslisteForm({ sistEndretAv, endringstidspunkt, navn, fnr }: ArbeidslisteFormProps) {
    return (
        <div className="arbeidsliste__bruker">
            <div>
                <Heading size="small" as="h2">{`${navn}, ${fnr}`}</Heading>
                <FormikInput name="overskrift" label="Tittel" validate={validerArbeidslisteTittelFelt} />
                <FormikTekstArea
                    name="kommentar"
                    label="Kommentar"
                    maxLength={500}
                    validate={validerArbeidslisteKommentarFelt}
                    size="small"
                />
            </div>
            <div className="dato-kategori-wrapper">
                <FormikDatoVelger
                    name="frist"
                    validate={validerArbeidslisteDatoFelt}
                    label="Frist"
                    ariaLabel="Frist før arbeidslisten"
                    size="small"
                />
                <ArbeidslistekategoriVisning name="kategori" />
                {sistEndretAv && endringstidspunkt && (
                    <Detail className="arbeidsliste--modal-redigering">
                        {`Sist oppdatert ${toSimpleDateStr(endringstidspunkt)} av ${sistEndretAv.veilederId}`}
                    </Detail>
                )}
            </div>
        </div>
    );
}

export default ArbeidslisteForm;
