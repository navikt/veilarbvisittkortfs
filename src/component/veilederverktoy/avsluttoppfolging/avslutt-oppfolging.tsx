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

function AvsluttOppfolging({ brukerFnr }: { brukerFnr: string }) {
    const avsluttOppfolgingOpptelt = useAvsluttOppfolgingOpptelt();
    const setAvsluttOppfolgingOpptelt = useSetAvsluttOppfolgingOpptelt();
    const { showtAvsluttOppfolgingBekrefModal: showAvsluttOppfolgingBekrefModal, hideModal } = useModalStore();

    const { avsluttOppfolgingStatus, avsluttOppfolgingStatusLoading } = useAvsluttOppfolgingStatus(brukerFnr);
    const { dialogerData, dialogerLoading } = useDialoger(brukerFnr);
    const outerLoading = dialogerLoading || avsluttOppfolgingStatusLoading;
    const kanAvsluttes = avsluttOppfolgingStatus?.kanAvslutte === true;
    const { data: harUtkast, isLoading: harUtkastIsLoading } = useHarUtkast(brukerFnr, !outerLoading && kanAvsluttes);

    const harUbehandledeDialoger = dialogerData ? selectHarUbehandledeDialoger(dialogerData) : false;
    const isLoading = outerLoading || (kanAvsluttes && harUtkastIsLoading);
    const visKanIkkeAvsluttes = !isLoading && !kanAvsluttes;
    const formikRef = useRef<FormikProps<BegrunnelseValues>>(null);

    function handleSubmitAvsluttOppfolging(values: BegrunnelseValues) {
        showAvsluttOppfolgingBekrefModal({ begrunnelse: values.begrunnelse });
    }

    if (!outerLoading && !kanAvsluttes) {
        if (avsluttOppfolgingStatus?.kanAvslutte !== undefined && avsluttOppfolgingStatus?.kanAvslutte !== null) {
            if (!avsluttOppfolgingOpptelt) {
                logMetrikk(`veilarbvisittkortfs.metrikker.Avslutt_oppfolging_ikke_mulig`);
                setAvsluttOppfolgingOpptelt(true);
            }
        }
    }

    function handleBeforeClose() {
        if (isLoading) {
            return false;
        }

        if (!kanAvsluttes) {
            return true;
        }

        if (!formikRef.current?.dirty) {
            hideModal();
            return true;
        }

        const confirmTekst = 'Er du sikker på at du vil lukke siden? Ulagrede endringer vil da gå tapt.';
        if (window.confirm(confirmTekst)) {
            hideModal();
            return true;
        }
        return false;
    }

    return (
        <Modal
            className={visKanIkkeAvsluttes ? 'overflow-visible' : undefined}
            open
            width="medium"
            onBeforeClose={handleBeforeClose}
            closeOnBackdropClick={true}
            onClose={!outerLoading && !kanAvsluttes ? hideModal : () => {}}
            header={{
                heading: TITTEL,
                closeButton: !isLoading,
                icon: visKanIkkeAvsluttes ? (
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
                {isLoading ? (
                    <div className="flex h-full items-center justify-center">
                        <Loader size="3xlarge" title="Laster innhold" />
                    </div>
                ) : visKanIkkeAvsluttes ? (
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
