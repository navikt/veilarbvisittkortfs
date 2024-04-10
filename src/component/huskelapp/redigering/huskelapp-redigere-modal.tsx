import { Formik, FormikBag, FormikProps } from 'formik';
import { Button, Modal } from '@navikt/ds-react';
import { ArrowRightIcon } from '@navikt/aksel-icons';
import {
    fetchHuskelapp,
    HuskelappformValues,
    lagreHuskelapp,
    redigerHuskelapp,
    slettArbeidsliste,
    slettArbeidslisteUtenFargekategori
} from '../../../api/veilarbportefolje';
import { useAppStore } from '../../../store/app-store';
import { useDataStore } from '../../../store/data-store';
import { useModalStore } from '../../../store/modal-store';
import { logMetrikk } from '../../../util/logger';
import { trackAmplitude } from '../../../amplitude/amplitude';
import HuskelappIkon from '../ikon/huskelapp.svg?react';
import { toReversedDateStr } from '../../../util/date-utils';
import { HuskelappEditForm } from './huskelapp-edit-form';
import { GammelArbeidsliste } from './gammelArbeidsliste';
import { SlettArbeidsliste } from './huskelapp-slett-arbeidsliste';
import { SlettHuskelapp } from './slett-huskelapp';
import './huskelapp-redigering.less';

const huskelappEmptyValues = {
    huskelappId: null,
    kommentar: '',
    frist: ''
};

function HuskelappRedigereModal() {
    const { brukerFnr, enhetId } = useAppStore();
    const { hideModal, showSpinnerModal, showErrorModal, showHuskelappModal } = useModalStore();
    const { huskelapp, setHuskelapp, arbeidsliste, setArbeidsliste } = useDataStore();

    const erArbeidslistaTom =
        arbeidsliste?.sistEndretAv == null ||
        (!arbeidsliste?.overskrift && !arbeidsliste?.kommentar && !arbeidsliste?.frist);
    const erIRedigeringModus = huskelapp?.endretDato;
    const erHuskelappTom = huskelapp?.huskelappId == null;

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

    function handleSubmit(
        values: HuskelappformValues,
        formikFunctions: FormikBag<FormikProps<HuskelappformValues>, HuskelappformValues>
    ) {
        if ((values.frist === null || values.frist === '') && (values.kommentar === null || values.kommentar === '')) {
            return formikFunctions.setErrors({
                frist: 'Du må legge til enten frist eller kommentar for å kunne lagre huskelappen',
                kommentar: 'Du må legge til enten frist eller kommentar for å kunne lagre huskelappen'
            });
        }
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
                .then(showHuskelappModal)
                .catch(showErrorModal);
            if (!erArbeidslistaTom) {
                slettArbeidslisteUtenFargekategori(brukerFnr)
                    .then(res => res.data)
                    .then(setArbeidsliste);
            }
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
                .then(showHuskelappModal)
                .catch(showErrorModal);
            slettArbeidslisteUtenFargekategori(brukerFnr)
                .then(res => res.data)
                .then(setArbeidsliste);
        }
    }

    return (
        <Formik key={brukerFnr} initialValues={initalValues} onSubmit={handleSubmit} validateOnBlur={false}>
            {formikProps => (
                <Modal
                    header={{
                        icon: <HuskelappIkon aria-hidden />,
                        heading: !erArbeidslistaTom ? 'Bytt fra gammel arbeidsliste til ny huskelapp' : 'Huskelapp',
                        size: 'small'
                    }}
                    open={true}
                    onClose={() => onRequestClose(formikProps)}
                    closeOnBackdropClick={true}
                    className="rediger-huskelapp-modal"
                >
                    <Modal.Body className="rediger-huskelapp-modal-body">
                        {!erArbeidslistaTom && (
                            <>
                                <GammelArbeidsliste arbeidsliste={arbeidsliste} />
                                <ArrowRightIcon title="Pil mot høyre" className="rediger-huskelapp-modal-pil" />
                            </>
                        )}
                        <HuskelappEditForm erArbeidslistaTom={erArbeidslistaTom} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button size="small" variant="primary" form="huskelapp-form" type="submit">
                            {erArbeidslistaTom ? 'Lagre' : 'Lagre ny huskelapp og slett arbeidsliste'}
                        </Button>
                        <Button
                            size="small"
                            variant="secondary"
                            type="button"
                            onClick={() => onRequestClose(formikProps)}
                        >
                            Avbryt
                        </Button>
                        {!erArbeidslistaTom && <SlettArbeidsliste />}
                        {erArbeidslistaTom && !erHuskelappTom && <SlettHuskelapp variant="tertiary" />}
                    </Modal.Footer>
                </Modal>
            )}
        </Formik>
    );
}

export default HuskelappRedigereModal;
