import { RefObject } from 'react';
import { Form, Formik, FormikProps } from 'formik';
import { BegrunnelseTextArea } from '../../begrunnelseform/begrunnelse-textarea';
import BegrunnelseFooter from '../../begrunnelseform/begrunnelse-form-footer';
import { BegrunnelseValues } from '../../begrunnelseform/begrunnelse-form';
import { useHarUtkast } from '../../../../api/veilarbvedtaksstotte';
import { AvsluttOppfolgingInfoText } from './avslutt-oppfolging-info-text';

interface Props {
    harUtkast: ReturnType<typeof useHarUtkast>['data'];
    harUbehandledeDialoger: boolean;
    handleSubmit: (values: BegrunnelseValues) => void;
    formikRef: RefObject<FormikProps<BegrunnelseValues> | null>;
}

export function KanAvsluttesInnhold({ harUtkast, harUbehandledeDialoger, handleSubmit, formikRef }: Props) {
    return (
        <Formik<BegrunnelseValues> initialValues={{ begrunnelse: '' }} onSubmit={handleSubmit} innerRef={formikRef}>
            <>
                <AvsluttOppfolgingInfoText harUbehandledeDialoger={harUbehandledeDialoger} harUtkast={harUtkast} />
                <Form>
                    <BegrunnelseTextArea tekstariaLabel="Begrunnelse" />
                    <BegrunnelseFooter spinner={false} />
                </Form>
            </>
        </Formik>
    );
}
