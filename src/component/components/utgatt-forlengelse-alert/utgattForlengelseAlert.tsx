import { Button, GlobalAlert } from '@navikt/ds-react';
import { useState } from 'react';
import { useBrukerFnr } from '../../../store/app-store';
import { useOppfolging } from '../../../api/veilarboppfolging';
import { erUtmeldingsKandidat } from '../../veilederverktoy/forleng-oppfolging/utils';
import { LeaveIcon, TimerStartIcon } from '@navikt/aksel-icons';
import { useModalStore } from '../../../store/modal-store';

export const UtgattForlengelseAlert = () => {
    const [skjulModal, setSkjulModal] = useState<boolean>(false);

    const brukerFnr = useBrukerFnr();
    const { oppfolging } = useOppfolging(brukerFnr);
    const { showAvsluttOppfolgingModal, showForlengOppfolgingModal } = useModalStore();

    const harTilgang = (): boolean => {
        if (!oppfolging) return false;
        if (!oppfolging.harVeilederLeseTilgangTilBruker || !oppfolging.harVeilederLeseTilgangTilBrukersEnhet)
            return false;

        return erUtmeldingsKandidat(oppfolging);
    };

    if (!harTilgang()) return null;
    if (skjulModal) return null;

    return (
        <GlobalAlert
            status="warning"
            centered={false}
            size="small"
            className="w-full outline-ax-bg-warning-moderate utgatt-forlengelse-alert **:[[class*='alert']]:before:hidden"
        >
            <GlobalAlert.Header className="items-center w-full bg-ax-bg-warning-moderate p-2">
                <GlobalAlert.Title className="text-ax font-ax-regular text-ax-text-warning">
                    Skal denne brukeren fortsatt ha oppfølging?
                </GlobalAlert.Title>
                <div className="flex gap-2">
                    <Button
                        variant="secondary-neutral"
                        size="small"
                        icon={<TimerStartIcon aria-hidden />}
                        iconPosition="left"
                        className="bg-ax-neutral-100 hover:bg-ax-neutral-300"
                        onClick={() => showForlengOppfolgingModal()}
                    >
                        Ja, forleng oppfølging
                    </Button>
                    <Button
                        variant="secondary-neutral"
                        size="small"
                        icon={<LeaveIcon aria-hidden />}
                        iconPosition="left"
                        className="bg-ax-neutral-100 hover:bg-ax-neutral-300"
                        onClick={() => showAvsluttOppfolgingModal()}
                    >
                        Nei, avslutt nå
                    </Button>
                </div>
                <GlobalAlert.CloseButton onClick={() => setSkjulModal(true)} className="[&_svg]:text-ax-text-warning" />
            </GlobalAlert.Header>
        </GlobalAlert>
    );
};
