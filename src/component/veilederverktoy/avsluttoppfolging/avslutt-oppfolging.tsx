import { useRef } from 'react';
import { FormikProps } from 'formik';
import { Loader, Modal } from '@navikt/ds-react';
import { BegrunnelseValues } from '../begrunnelseform/begrunnelse-form';
import { useAvsluttOppfolgingOpptelt, useSetAvsluttOppfolgingOpptelt } from '../../../store/app-store';
import { useModalStore } from '../../../store/modal-store';
import { selectHarUbehandledeDialoger } from '../../../util/selectors';
import { useDialoger } from '../../../api/veilarbdialog';
import { useAvsluttOppfolgingStatus } from '../../../api/veilarboppfolging';
import { logMetrikk } from '../../../util/logger';
import { useHarUtkast } from '../../../api/veilarbvedtaksstotte';
import { KanAvsluttesInnhold } from './components/kan-avsluttes-innhold';
import { KanIkkeAvsluttesInnhold } from './components/kan-ikke-avsluttes-innhold';
import AdvarselSirkelIkon from '../../components/varselmodal/advarsel-sirkel.svg?react';

const TITTEL = 'Avslutt oppfølgingsperioden';

enum KanAvslutteModalState {
    loading = 'loading',
    kanIkkeAvslutte = 'kanIkkeAvslutte',
    kanAvslutte = 'kanAvslutte'
}

function AvsluttOppfolging({ brukerFnr }: { brukerFnr: string }) {
    const avsluttOppfolgingOpptelt = useAvsluttOppfolgingOpptelt();
    const setAvsluttOppfolgingOpptelt = useSetAvsluttOppfolgingOpptelt();
    const { showtAvsluttOppfolgingBekrefModal: showAvsluttOppfolgingBekrefModal, hideModal } = useModalStore();

    const { avsluttOppfolgingStatus, avsluttOppfolgingStatusLoading } = useAvsluttOppfolgingStatus(brukerFnr);
    const { dialogerData, dialogerLoading } = useDialoger(brukerFnr);
    const statusState =
        dialogerLoading || avsluttOppfolgingStatusLoading
            ? KanAvslutteModalState.loading
            : avsluttOppfolgingStatus?.kanAvslutte === true
              ? KanAvslutteModalState.kanAvslutte
              : KanAvslutteModalState.kanIkkeAvslutte;
    const { data: harUtkast, isLoading: harUtkastIsLoading } = useHarUtkast(
        statusState === KanAvslutteModalState.kanAvslutte ? brukerFnr : null
    );

    const harUbehandledeDialoger = dialogerData ? selectHarUbehandledeDialoger(dialogerData) : false;
    const modalState =
        statusState === KanAvslutteModalState.kanAvslutte && harUtkastIsLoading
            ? KanAvslutteModalState.loading
            : statusState;
    const formikRef = useRef<FormikProps<BegrunnelseValues>>(null);

    function handleSubmitAvsluttOppfolging(values: BegrunnelseValues) {
        showAvsluttOppfolgingBekrefModal({ begrunnelse: values.begrunnelse });
    }

    if (modalState === KanAvslutteModalState.kanIkkeAvslutte) {
        if (avsluttOppfolgingStatus?.kanAvslutte !== undefined && avsluttOppfolgingStatus?.kanAvslutte !== null) {
            if (!avsluttOppfolgingOpptelt) {
                logMetrikk(`veilarbvisittkortfs.metrikker.Avslutt_oppfolging_ikke_mulig`);
                setAvsluttOppfolgingOpptelt(true);
            }
        }
    }

    function kanModalLukkes() {
        if (modalState === KanAvslutteModalState.loading) {
            return false;
        }
        if (modalState === KanAvslutteModalState.kanIkkeAvslutte) {
            return true;
        }
        if (!formikRef.current?.dirty) {
            return true;
        }
        const confirmTekst = 'Er du sikker på at du vil lukke siden? Ulagrede endringer vil da gå tapt.';
        return window.confirm(confirmTekst);
    }

    return (
        <Modal
            className={modalState === KanAvslutteModalState.kanIkkeAvslutte ? 'overflow-visible' : undefined}
            open
            width="medium"
            onBeforeClose={kanModalLukkes}
            closeOnBackdropClick={true}
            onClose={hideModal}
            header={{
                heading: TITTEL,
                closeButton: modalState !== KanAvslutteModalState.loading,
                icon:
                    modalState === KanAvslutteModalState.kanIkkeAvslutte ? (
                        <span
                            aria-hidden="true"
                            data-testid="avsluttoppfolging-warning-icon"
                            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 -mt-4"
                        >
                            <AdvarselSirkelIkon className="h-16 w-16" />
                        </span>
                    ) : undefined
            }}
        >
            <Modal.Body className="rounded-2xl h-[min(16rem,calc(100dvh-var(--ax-space-28)))] min-h-0 overflow-auto">
                {modalState === KanAvslutteModalState.loading ? (
                    <div className="flex h-full items-center justify-center">
                        <Loader size="3xlarge" title="Laster innhold" />
                    </div>
                ) : modalState === KanAvslutteModalState.kanIkkeAvslutte ? (
                    <KanIkkeAvsluttesInnhold status={avsluttOppfolgingStatus} />
                ) : (
                    <KanAvsluttesInnhold
                        harUtkast={harUtkast}
                        harUbehandledeDialoger={harUbehandledeDialoger}
                        handleSubmit={handleSubmitAvsluttOppfolging}
                        formikRef={formikRef}
                    />
                )}
            </Modal.Body>
        </Modal>
    );
}

export default AvsluttOppfolging;
