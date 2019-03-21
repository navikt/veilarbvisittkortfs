import React from 'react';
import './arbeidsliste.less';
import FormikInput from '../../components/formik/formik-input';
import FormikTekstArea from '../../components/formik/formik-textarea';
import FormikDatoVelger from '../../components/formik/formik-datepicker';
import {Hovedknapp, Knapp} from 'nav-frontend-knapper';
import { FormattedMessage } from 'react-intl';
import { Undertekst } from 'nav-frontend-typografi';
import { OrNothing } from '../../../types/utils/ornothing';
import moment from 'moment';
import {
    validerArbeidslisteDatoFeldt,
    validerArbeidslisteKommentarFeldt,
    validerArbeidslisteTittelFeldt
} from '../../utils/formik-validation';
import { injectIntl, InjectedIntlProps }  from 'react-intl';
import { Form } from 'formik';

interface ArbeidslisteFormProps {
    onRequestClose: () => void;
    laster: boolean;
    sistEndretAv?: OrNothing<{veilederId: string}>;
    endringstidspunkt?: OrNothing<Date>;

}

function ArbeidslisteForm (props: ArbeidslisteFormProps & InjectedIntlProps) {
    const labelInputArea = props.intl.formatMessage({id: 'arbeidsliste.modal.tittel'});

    return (
        <Form>
            <div className="blokk-s">
                <FormikInput
                    name="overskrift"
                    label={labelInputArea}
                    validate={validerArbeidslisteTittelFeldt}
                    bredde="M"
                />
                <FormikTekstArea
                    name="kommentar"
                    labelId="arbeidsliste.modal.kommentar"
                    maxLength={500}
                    validate={validerArbeidslisteKommentarFeldt}
                />
            </div>
            {props.sistEndretAv && props.endringstidspunkt && <Undertekst className="arbeidsliste--modal-redigering">
                <FormattedMessage
                    id="arbeidsliste.endringsinfo"
                    values={{
                        dato: moment(props.endringstidspunkt).format('DD.MM.YYYY'),
                        veileder: props.sistEndretAv.veilederId
                    }}
                />
            </Undertekst>}
            <FormikDatoVelger
                name="frist"
                validate={validerArbeidslisteDatoFeldt}
                label="Frist"
                ariaLabel="Frist før arbeidslisten"
            />
            <div>
                <div className="modal-footer">
                    <Hovedknapp htmlType="submit" className="btn--mr1" spinner={props.laster}>
                        <FormattedMessage id="modal.knapp.lagre" />
                    </Hovedknapp>
                    <Knapp onClick={props.onRequestClose}>
                        <FormattedMessage id="modal.knapp.avbryt" />
                    </Knapp>
                </div>
            </div>
        </Form>
    );
}

export default injectIntl(ArbeidslisteForm);