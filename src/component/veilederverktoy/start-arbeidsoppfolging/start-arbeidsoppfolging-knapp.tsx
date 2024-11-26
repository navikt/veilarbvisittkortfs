import { Dropdown } from '@navikt/ds-react';
import useSWRMutation from 'swr/mutation';
import { startArbeidsoppfolging, startArbeidsoppfolgingUrl } from '../../../api/veilarboppfolging';
import { useAppStore } from '../../../store/app-store';

export const StartArbeidsoppfolgingKnapp = () => {
    const { brukerFnr } = useAppStore();
    const { isMutating, trigger: postStartOppfolging } = useSWRMutation(
        startArbeidsoppfolgingUrl,
        startArbeidsoppfolging
    );
    const onStartArbeidsoppfolging = () => {
        return postStartOppfolging({ fnr: brukerFnr, henviserSystem: 'DEMO' });
    };

    return (
        <Dropdown.Menu.List.Item
            disabled={isMutating}
            onClick={() => {
                onStartArbeidsoppfolging();
                // logMetrikk('veilarbvisittkortfs.metrikker.registrering', {}, { brukerType: brukerType });
            }}
        >
            {'Start arbeidsoppfølging'}
        </Dropdown.Menu.List.Item>
    );
};
