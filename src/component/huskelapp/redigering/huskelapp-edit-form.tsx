import { Heading } from '@navikt/ds-react';
import { HuskelappInformasjonsmelding } from '../huskelapp-informasjonsmelding';
import { Form } from 'formik';
import HuskelappForm from './huskelapp-form';

export const HuskelappEditForm = () => (
    <div>
        <Heading size="medium" visuallyHidden={true}>
            Huskelappinnhold
        </Heading>
        <HuskelappInformasjonsmelding />
        <Form id="huskelapp-form">
            <HuskelappForm />
        </Form>
    </div>
);
