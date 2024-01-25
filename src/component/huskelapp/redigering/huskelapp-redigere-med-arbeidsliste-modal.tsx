import React from 'react';
import { Formik, FormikBag, FormikProps } from 'formik';
import { fetchHuskelapp, HuskelappformValues, lagreHuskelapp, slettArbeidsliste } from '../../../api/veilarbportefolje';
import { useAppStore } from '../../../store/app-store';
import { useDataStore } from '../../../store/data-store';
import { useModalStore } from '../../../store/modal-store';
import { logMetrikk } from '../../../util/logger';
import { trackAmplitude } from '../../../amplitude/amplitude';
import '../huskelapp.less';
import { Modal } from '@navikt/ds-react';
import { ReactComponent as HuskelappIkon } from '../ikon/huskelapp.svg';
import { HuskelappMedArbeidslisteEditForm } from './huskelapp-med-arbeidsliste-edit-form';

const huskelappEmptyValues = {
    huskelappId: null,
    kommentar: '',
    frist: ''
};

function HuskelappRedigereModal() {
    const { brukerFnr, enhetId } = useAppStore();
    const { hideModal, showSpinnerModal, showErrorModal, showHuskelappModal } = useModalStore();
    const { setHuskelapp, arbeidsliste, setArbeidsliste } = useDataStore();

    function onRequestClose(formikProps: FormikProps<HuskelappformValues>) {
        const dialogTekst = 'Alle endringer blir borte hvis du ikke lagrer. Er du sikker på at du vil lukke siden?';
        if (!formikProps.dirty || window.confirm(dialogTekst)) {
            hideModal();
            logMetrikk('veilarbvisittkortfs.metrikker.huskelapp.avbryt');
            formikProps.resetForm();
        }
    }

    function handleSubmit(values: HuskelappformValues, formikFunctions: FormikBag<any, any>) {
        if ((values.frist === null || values.frist === '') && (values.kommentar === null || values.kommentar === '')) {
            return formikFunctions.setErrors({
                huskelappId: 'Du må legge til enten frist eller kommentar for å kunne lagre huskelappen'
            });
        }
        logMetrikk('veilarbvisittkortfs.metrikker.huskelapp', {
            leggtil: true,
            applikasjon: 'visittkort'
        });

        trackAmplitude(
            {
                name: 'skjema fullført',
                data: {
                    skjemanavn: 'Opprett huskelapp',
                    skjemaId: 'veilarbvisittkortfs-huskelapp'
                }
            },
            {
                kommentarlengde: values.kommentar?.length,
                fristSatt: !!values.frist?.toString().length
            }
        );

        showSpinnerModal();

        lagreHuskelapp({
            kommentar: values.kommentar ? values.kommentar : null,
            frist: values.frist ? values.frist : null,
            brukerFnr: brukerFnr,
            enhetId: enhetId
        })
            .then(() => fetchHuskelapp(brukerFnr.toString(), enhetId ?? ''))
            .then(res => res.data)
            .then(setHuskelapp)
            .then(showHuskelappModal)
            .catch(showErrorModal);
        slettArbeidsliste(brukerFnr)
            .then(res => res.data)
            .then(setArbeidsliste);
    }

    return (
        <Formik key={brukerFnr} initialValues={huskelappEmptyValues} onSubmit={handleSubmit} validateOnBlur={false}>
            {formikProps => (
                <Modal
                    header={{
                        icon: <HuskelappIkon aria-hidden />,
                        heading: 'Huskelapp',
                        size: 'small'
                    }}
                    open={true}
                    onClose={() => onRequestClose(formikProps)}
                    width={'800px'}
                >
                    <Modal.Body>
                        <HuskelappMedArbeidslisteEditForm
                            onRequestClose={() => onRequestClose(formikProps)}
                            arbeidsliste={arbeidsliste!}
                        />
                    </Modal.Body>
                </Modal>
            )}
        </Formik>
    );
}

export default HuskelappRedigereModal;
