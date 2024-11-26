import { Dropdown } from '@navikt/ds-react';
import withClickMetric, { ClickMetricProps } from '../../components/click-metric/click-metric';
import { useAppStore } from '../../../store/app-store';

interface StartProsessProps {
    knappeTekst: string;
    onClick?: () => void;
}

const DropdownMenuListItem = withClickMetric(Dropdown.Menu.List.Item);

export const StartProsessKnapp = ({ knappeTekst, onClick, metricName }: StartProsessProps & ClickMetricProps) => {
    const { setAvsluttOppfolgingOpptelt } = useAppStore();

    if (metricName === 'avslutt_oppfolging') {
        setAvsluttOppfolgingOpptelt(false);
    }

    return (
        <DropdownMenuListItem as="button" variant="tertiary-neutral" onClick={onClick} metricName={metricName}>
            {knappeTekst}
        </DropdownMenuListItem>
    );
};
