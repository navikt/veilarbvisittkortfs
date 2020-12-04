import React from 'react';
import { Form, Formik, FormikProps } from 'formik';
import Modal from '../components/modal/modal';
import ArbeidslisteForm from './arbeidsliste-form';
import ArbeidslisteFooter from './arbeidsliste-footer';
import VeilederVerktoyModal from '../components/modal/veilederverktoy-modal';
import { logger } from '../../util/logger';
import { toReversedDateStr } from '../../util/date-utils';
import { Arbeidsliste, ArbeidslisteformValues, KategoriModell } from '../../api/veilarbportefolje';

interface ArbeidslisteProps {
    navn: string;
    fnr: string;
    isOpen: boolean;
    lukkModal: () => void;
    arbeidsliste: Arbeidsliste;
    arbeidslisteStatus: boolean;
    onSubmit: (values: any) => void;
    onDelete: () => void;
    kanFjerneArbeidsliste: boolean;
    tittel: string;
}

function ArbeidslisteModal(props: ArbeidslisteProps) {
    const arbeidslisteEmptyValues = {
        overskrift: '',
        kommentar: '',
        frist: '',
        kategori: KategoriModell.BLA,
    };

    const arbeidslisteValues = {
        overskrift: props.arbeidsliste.overskrift,
        kommentar: props.arbeidsliste.kommentar,
        frist: props.arbeidsliste.frist ? toReversedDateStr(props.arbeidsliste.frist) : '',
        kategori: props.arbeidsliste.kategori,
    };

    const initalValues = !props.arbeidsliste.endringstidspunkt ? arbeidslisteEmptyValues : arbeidslisteValues;

    const onRequestClose = (formikProps: FormikProps<ArbeidslisteformValues>) => {
        const dialogTekst = 'Alle endringer blir borte hvis du ikke lagrer. Er du sikker på at du vil lukke siden?';
        if (!formikProps.dirty || window.confirm(dialogTekst)) {
            props.lukkModal();
            logger.event('veilarbvisittkortfs.metrikker.arbeidslistekategori.avbryt');
            formikProps.resetForm();
        }
    };

    return (
        <Formik
            key={props.arbeidsliste.frist ? props.arbeidsliste.frist.toString() : Date.now().toString()}
            initialValues={initalValues}
            onSubmit={(values) => {
                props.lukkModal();
                props.onSubmit(values);
                logger.event('teamvoff.metrikker.arbeidslistekategori', {
                    kategori: values.kategori,
                    leggtil: !props.arbeidsliste.endringstidspunkt,
                    applikasjon: 'visittkort',
                });
            }}
        >
            {(formikProps) => (
                <Modal
                    contentLabel="Arbeidsliste"
                    isOpen={props.isOpen}
                    className="arbeidsliste-modal"
                    onRequestClose={() => onRequestClose(formikProps)}
                >
                    <div className="modal-innhold">
                        <div className="modal-info-tekst">
                            <VeilederVerktoyModal tittel={props.tittel}>
                                <Form>
                                    <ArbeidslisteForm
                                        navn={props.navn}
                                        fnr={props.fnr}
                                        endringstidspunkt={props.arbeidsliste.endringstidspunkt}
                                        sistEndretAv={props.arbeidsliste.sistEndretAv}
                                    />
                                    <ArbeidslisteFooter
                                        onRequestClose={() => onRequestClose(formikProps)}
                                        slettArbeidsliste={props.onDelete}
                                        kanFjerneArbeidsliste={props.kanFjerneArbeidsliste}
                                    />
                                </Form>
                            </VeilederVerktoyModal>
                        </div>
                    </div>
                </Modal>
            )}
        </Formik>
    );
}

export default ArbeidslisteModal;
