import { Dropdown } from '@navikt/ds-react';
import withClickMetric, { ClickMetricProps } from '../../components/click-metric/click-metric';
import { useSetAvsluttOppfolgingOpptelt } from '../../../store/app-store';
import { useEffect } from 'react';

interface StartProsessProps {
    knappeTekst: string;
    onClick?: () => void;
}

const DropdownMenuListItem = withClickMetric(Dropdown.Menu.List.Item);

export const StartProsessKnapp = ({ knappeTekst, onClick, metricName }: StartProsessProps & ClickMetricProps) => {
    const setAvsluttOppfolgingOpptelt = useSetAvsluttOppfolgingOpptelt();

    useEffect(() => {
        if (metricName === 'avslutt_oppfolging') {
            setAvsluttOppfolgingOpptelt(false);
        }
    }, [setAvsluttOppfolgingOpptelt]);

    return (
        <DropdownMenuListItem as="button" variant="tertiary-neutral" onClick={onClick} metricName={metricName}>
            {knappeTekst}
        </DropdownMenuListItem>
    );
};
