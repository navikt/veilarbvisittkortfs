import { Formik, FormikBag, FormikProps } from 'formik';
import { BodyShort, Button, CopyButton, Heading, Modal } from '@navikt/ds-react';
import { ArrowRightIcon } from '@navikt/aksel-icons';
import {
    Huskelapp,
    HuskelappformValues,
    lagreHuskelapp,
    redigerHuskelapp,
    slettArbeidslisteMenIkkeFargekategori,
    useArbeidsliste,
    useHuskelapp
} from '../../../api/veilarbportefolje';
import { useAppStore } from '../../../store/app-store';
import { useModalStore } from '../../../store/modal-store';
import { logMetrikk } from '../../../util/logger';
import { trackAmplitude } from '../../../amplitude/amplitude';
import HuskelappIkon from '../ikon/Huskelappikon_bakgrunnsfarge.svg?react';
import { toReversedDateStr, toSimpleDateStr } from '../../../util/date-utils';
import { HuskelappEditForm } from './huskelapp-edit-form';
import { GammelArbeidsliste } from './gammelArbeidsliste';
import { SlettArbeidsliste } from './huskelapp-slett-arbeidsliste';
import { SlettHuskelapp } from './slett-huskelapp';
import './huskelapp-redigering.less';
import { useDataStore } from '../../../store/data-store';
import { selectSammensattNavn } from '../../../util/selectors';

const huskelappEmptyValues = {
    huskelappId: null,
    kommentar: '',
    frist: ''
};

function HuskelappRedigereModal() {
    const { brukerFnr, visVeilederVerktoy, enhetId } = useAppStore();
    const { innloggetVeileder } = useDataStore();
    const { hideModal, showSpinnerModal, showErrorModal } = useModalStore();
    const { data: arbeidsliste, mutate: setArbeidsliste } = useArbeidsliste(brukerFnr, visVeilederVerktoy);
    const { data: huskelapp, mutate: setHuskelapp } = useHuskelapp(brukerFnr, visVeilederVerktoy);

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
    const modalNavn = erArbeidslistaTom ? 'Huskelapp' : 'Bytt fra gammel arbeidsliste til ny huskelapp';
    const { personalia } = useDataStore();
    const navn = selectSammensattNavn(personalia);

    function onRequestClose(formikProps: FormikProps<HuskelappformValues>) {
        const dialogTekst = 'Alle endringer blir borte hvis du ikke lagrer. Er du sikker på at du vil lukke siden?';
        if (!formikProps.dirty || window.confirm(dialogTekst)) {
            hideModal();
            logMetrikk('veilarbvisittkortfs.metrikker.huskelapp.avbryt');
            formikProps.resetForm();
        }
    }

    function endretAv(huskelapp: Huskelapp | undefined): string {
        if (huskelapp?.endretAv && huskelapp?.endretAv?.length > 0)
            return `Endret ${toSimpleDateStr(huskelapp?.endretDato?.toString())} av ${huskelapp?.endretAv}`;
        return '';
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
                .then(() =>
                    setHuskelapp({
                        huskelappId: values.huskelappId ? values.huskelappId : null,
                        kommentar: values.kommentar ? values.kommentar : null,
                        frist: values.frist ? new Date(values.frist) : null,
                        enhetId: enhetId,
                        endretDato: new Date(),
                        endretAv: innloggetVeileder?.ident
                    })
                )
                .then(hideModal)
                .catch(showErrorModal);
            if (!erArbeidslistaTom) {
                slettArbeidslisteMenIkkeFargekategori(brukerFnr)
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
                .then(() =>
                    setHuskelapp({
                        huskelappId: 'midlertidig',
                        endretDato: new Date(),
                        endretAv: innloggetVeileder?.ident,
                        enhetId: enhetId,
                        kommentar: values.kommentar ? values.kommentar : null,
                        frist: values.frist ? new Date(values.frist) : null
                    })
                )
                .then(() => {
                    slettArbeidslisteMenIkkeFargekategori(brukerFnr)
                        .then(res => res.data)
                        .then(setArbeidsliste)
                        .catch(showErrorModal);
                })
                .then(hideModal)
                .catch(showErrorModal);
        }
    }

    return (
        <Formik key={brukerFnr} initialValues={initalValues} onSubmit={handleSubmit} validateOnBlur={false}>
            {formikProps => (
                <Modal
                    aria-label={modalNavn}
                    open={true}
                    onClose={() => onRequestClose(formikProps)}
                    closeOnBackdropClick={true}
                    className="rediger-huskelapp-modal"
                >
                    <Modal.Header>
                        <div className="rediger-huskelapp-modal-header">
                            <HuskelappIkon aria-hidden className="navds-modal__header-icon" />
                            <Heading size="small" className="rediger-huskelapp-modal-header-tekst">
                                {modalNavn}
                            </Heading>
                        </div>
                        <div className="rediger-huskelapp-modal-personinfo">
                            <BodyShort weight="semibold" size="small">
                                {navn}
                            </BodyShort>
                            <CopyButton
                                copyText={brukerFnr}
                                text={`F.nr.: ${brukerFnr}`}
                                activeText="Kopiert!"
                                size="xsmall"
                                iconPosition="right"
                                className="copybutton"
                            />
                        </div>
                    </Modal.Header>
                    <Modal.Body className="rediger-huskelapp-modal-body">
                        {!erArbeidslistaTom && (
                            <>
                                <GammelArbeidsliste arbeidsliste={arbeidsliste} />
                                <ArrowRightIcon title="Pil mot høyre" className="rediger-huskelapp-modal-pil" />
                            </>
                        )}
                        <HuskelappEditForm endretAv={endretAv(huskelapp)} erArbeidslistaTom={erArbeidslistaTom} />
                    </Modal.Body>
                    <Modal.Footer className="rediger-huskelapp-modal-footer">
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
