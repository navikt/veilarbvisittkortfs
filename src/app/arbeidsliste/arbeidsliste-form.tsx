import React from 'react';
import FormikInput from '../components/formik/formik-input';
import FormikTekstArea from '../components/formik/formik-textarea';
import FormikDatoVelger from '../components/formik/formik-datepicker';
import { Undertekst, Undertittel } from 'nav-frontend-typografi';
import { OrNothing } from '../../types/utils/ornothing';
import moment from 'moment';
import {
    validerArbeidslisteDatoFeldt,
    validerArbeidslisteKommentarFeldt,
    validerArbeidslisteTittelFeldt,
} from '../utils/formik-validation';
import ArbeidslistekategoriVisning from './arbeidslistekategori/arbeidslisteikon-visning';

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
                <Undertittel>{`${props.navn}, ${props.fnr}`}</Undertittel>
                <FormikInput name="overskrift" label="Tittel" validate={validerArbeidslisteTittelFeldt} bredde="L" />
                <FormikTekstArea
                    name="kommentar"
                    label="Kommentar"
                    maxLength={500}
                    validate={validerArbeidslisteKommentarFeldt}
                />
                {props.sistEndretAv && props.endringstidspunkt && (
                    <Undertekst className="arbeidsliste--modal-redigering">
                        {`Oppdatert ${moment(props.endringstidspunkt).format('DD.MM.YYYY')} av ${
                            props.sistEndretAv.veilederId
                        }`}
                    </Undertekst>
                )}
            </div>
            <div className="dato-kategori-wrapper">
                <FormikDatoVelger
                    name="frist"
                    validate={validerArbeidslisteDatoFeldt}
                    label="Frist"
                    ariaLabel="Frist før arbeidslisten"
                />
                <ArbeidslistekategoriVisning name="kategori" />
            </div>
        </div>
    );
}

export default ArbeidslisteForm;
