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

interface ArbeidslisteFormProps {
    sistEndretAv?: OrNothing<{ veilederId: string }>;
    endringstidspunkt?: OrNothing<Date>;
    navn: string;
    fnr: string;
}

function ArbeidslisteForm(props: ArbeidslisteFormProps) {
    return (
        <div className="arbeidsliste__bruker">
            <div className="blokk-s">
                <Heading size="small" as="h2">{`${props.navn}, ${props.fnr}`}</Heading>
                <FormikInput name="overskrift" label="Tittel" validate={validerArbeidslisteTittelFelt} bredde="L" />
                <FormikTekstArea
                    name="kommentar"
                    label="Kommentar"
                    maxLength={500}
                    validate={validerArbeidslisteKommentarFelt}
                />
                {props.sistEndretAv && props.endringstidspunkt && (
                    <Detail className="arbeidsliste--modal-redigering">
                        {`Oppdatert ${toSimpleDateStr(props.endringstidspunkt)} av ${props.sistEndretAv.veilederId}`}
                    </Detail>
                )}
            </div>
            <div className="dato-kategori-wrapper">
                <FormikDatoVelger
                    name="frist"
                    validate={validerArbeidslisteDatoFelt}
                    label="Frist"
                    ariaLabel="Frist før arbeidslisten"
                />
                <ArbeidslistekategoriVisning name="kategori" />
            </div>
        </div>
    );
}

export default ArbeidslisteForm;
