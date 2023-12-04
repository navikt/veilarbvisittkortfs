import React from 'react';
import FormikTekstArea from '../components/formik/formik-textarea';
import FormikDatoVelger from '../components/formik/formik-datepicker';
import { validerFristFelt, validerHuskelappKommentarFelt } from '../../util/formik-validation';
import { toSimpleDateStr } from '../../util/date-utils';
import { OrNothing } from '../../util/type/utility-types';
import { Detail } from '@navikt/ds-react';

interface HuskelappFormProps {
    sistEndretAv?: OrNothing<{ veilederId: string }>;
    endringstidspunkt?: OrNothing<Date>;
    navn: string;
    fnr: string;
}

function HuskelappForm(props: HuskelappFormProps) {
    return (
        <div className="huskelapp__bruker">
            <div className="blokk-s">
                {/* <Heading size="small" as="h2">{`${props.navn}, ${props.fnr}`}</Heading> */}
                <FormikTekstArea name="kommentar" label="" maxLength={140} validate={validerHuskelappKommentarFelt} />
                {props.sistEndretAv && props.endringstidspunkt && (
                    <Detail className="huskelapp--modal-redigering">
                        {`Oppdatert ${toSimpleDateStr(props.endringstidspunkt)} av ${props.sistEndretAv.veilederId}`}
                    </Detail>
                )}
            </div>
            <div className="dato-kategori-wrapper">
                <FormikDatoVelger
                    name="frist"
                    validate={validerFristFelt}
                    label="Frist"
                    ariaLabel="Frist før huskelapp"
                />
            </div>
        </div>
    );
}

export default HuskelappForm;
