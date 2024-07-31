import withClickMetric, { ClickMetricProps } from '../../components/click-metric/click-metric';
import { MenyKnapp } from '../../components/meny-knapp/meny-knapp';
import { useAppStore } from '../../../store/app-store';

interface StartProsessProps {
    knappeTekst: string;
    onClick?: () => void;
}

const ProcessKnapp = withClickMetric(MenyKnapp);

function StartProcess({ knappeTekst, onClick, metricName }: StartProsessProps & ClickMetricProps) {
    const { setAvsluttOppfolgingOpptelt } = useAppStore();

    if (metricName === 'avslutt_oppfolging') {
        setAvsluttOppfolgingOpptelt(false);
    }

    return (
        <li>
            <ProcessKnapp onClick={onClick} metricName={metricName}>
                {knappeTekst}
            </ProcessKnapp>
        </li>
    );
}

export default StartProcess;
