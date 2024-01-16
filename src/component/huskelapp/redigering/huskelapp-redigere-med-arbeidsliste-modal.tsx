import React from 'react';
import { Formik, FormikProps } from 'formik';
import {
    fetchHuskelapp,
    HuskelappformValues,
    lagreHuskelapp,
    redigerHuskelapp,
    slettArbeidsliste,
    slettHuskelapp
} from '../../../api/veilarbportefolje';
import { useAppStore } from '../../../store/app-store';
import { useDataStore } from '../../../store/data-store';
import { useModalStore } from '../../../store/modal-store';
import { logMetrikk } from '../../../util/logger';
import { trackAmplitude } from '../../../amplitude/amplitude';
import '../huskelapp.less';
import { Modal } from '@navikt/ds-react';
import { ReactComponent as HuskelappIkon } from '../ikon/huskelapp.svg';
import { toReversedDateStr } from '../../../util/date-utils';
import { HuskelappMedArbeidslisteEditForm } from './huskelapp-med-arbeidsliste-edit-form';

const huskelappEmptyValues = {
    huskelappId: null,
    kommentar: '',
    frist: ''
};

function HuskelappRedigereModal() {
    const { brukerFnr, enhetId } = useAppStore();
    const { hideModal, showSpinnerModal, showErrorModal } = useModalStore();
    const { huskelapp, setHuskelapp, arbeidsliste, setArbeidsliste } = useDataStore();

    const erIRedigeringModus = huskelapp?.endretDato;

    const huskelappValues: HuskelappformValues = {
        huskelappId: huskelapp?.huskelappId ? huskelapp.huskelappId : null,
        kommentar: huskelapp?.kommentar ?? '',
        frist: huskelapp?.frist ? toReversedDateStr(huskelapp.frist) : ''
    };

    const initalValues: HuskelappformValues = huskelapp?.endretDato ? huskelappValues : huskelappEmptyValues;

    function onRequestClose(formikProps: FormikProps<HuskelappformValues>) {
        const dialogTekst = 'Alle endringer blir borte hvis du ikke lagrer. Er du sikker på at du vil lukke siden?';
        if (!formikProps.dirty || window.confirm(dialogTekst)) {
            hideModal();
            logMetrikk('veilarbvisittkortfs.metrikker.huskelapp.avbryt');
            formikProps.resetForm();
        }
    }

    function handleSubmit(values: HuskelappformValues) {
        logMetrikk('veilarbvisittkortfs.metrikker.huskelapp', {
            leggtil: !erIRedigeringModus,
            applikasjon: 'visittkort'
        });

        trackAmplitude(
            {
                name: 'skjema fullført',
                data: {
                    skjemanavn: erIRedigeringModus ? 'Rediger huskelapp' : 'Opprett huskelapp',
                    skjemaId: 'veilarbvisittkortfs-huskelapp'
                }
            },
            {
                kommentarlengde: values.kommentar?.length,
                fristSatt: !!values.frist?.toString().length
            }
        );

        showSpinnerModal();

        if (erIRedigeringModus) {
            redigerHuskelapp({
                huskelappId: values.huskelappId ? values.huskelappId : null,
                kommentar: values.kommentar ? values.kommentar : null,
                frist: values.frist ? values.frist : null,
                brukerFnr: brukerFnr,
                enhetId: enhetId
            })
                .then(() => fetchHuskelapp(brukerFnr.toString(), enhetId ?? ''))
                .then(res => res.data)
                .then(setHuskelapp)
                .then(hideModal)
                .catch(showErrorModal);
        } else {
            lagreHuskelapp({
                kommentar: values.kommentar ? values.kommentar : null,
                frist: values.frist ? values.frist : null,
                brukerFnr: brukerFnr,
                enhetId: enhetId
            })
                .then(() => fetchHuskelapp(brukerFnr.toString(), enhetId ?? ''))
                .then(res => res.data)
                .then(setHuskelapp)
                .then(hideModal)
                .catch(showErrorModal);
            slettArbeidsliste(brukerFnr)
                .then(res => res.data)
                .then(setArbeidsliste);
        }
    }

    return (
        <Formik key={brukerFnr} initialValues={initalValues} onSubmit={handleSubmit}>
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
                    closeOnBackdropClick={true}
                >
                    <Modal.Body>
                        <HuskelappMedArbeidslisteEditForm
                            onRequestClose={() => onRequestClose(formikProps)}
                            slettHuskelapp={() => slettHuskelapp(huskelapp!.huskelappId!)}
                            arbeidsliste={arbeidsliste!}
                        />
                    </Modal.Body>
                </Modal>
            )}
        </Formik>
    );
}

export default HuskelappRedigereModal;
