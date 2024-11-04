import { Alert, Button } from '@navikt/ds-react';
import withClickMetric from '../components/click-metric/click-metric';
import { trackAmplitude } from '../../amplitude/amplitude';
import HuskelappInaktivIkon from './ikon/Huskelappikon_stiplet.svg?react';
import HuskelappIkon from './ikon/Huskelappikon_bakgrunnsfarge.svg?react';
import { useHuskelapp } from '../../api/veilarbportefolje';
import { feilErIkke400, feilErIkke403 } from './harTilgangTilHuskelapp';

interface Props {
    brukerFnr: string;
    visVeilederVerktoy: boolean;
    onClick: () => void;
}

function HuskelappKnapp({ brukerFnr, visVeilederVerktoy, onClick }: Props) {
    const {
        data: huskelapp,
        isLoading: huskelappIsLoading,
        error: huskelappError
    } = useHuskelapp(brukerFnr, visVeilederVerktoy);

    const harHuskelapp = huskelapp?.huskelappId != null;

    const hasError = feilErIkke403(huskelappError) && feilErIkke400(huskelappError);

    const handleClick = () => {
        trackAmplitude({
            name: 'navigere',
            data: { lenketekst: 'visittkort-huskelapp-ikon', destinasjon: 'huskelapp' }
        });
        onClick();
    };

    return (
        <>
            {hasError && (
                <Alert variant="warning" size="small">
                    Feil i huskelapp
                </Alert>
            )}
            {!hasError && (
                <Button
                    variant="tertiary"
                    icon={harHuskelapp ? <HuskelappIkon /> : <HuskelappInaktivIkon />}
                    title={harHuskelapp ? 'Endre huskelapp' : 'Opprett huskelapp'}
                    onClick={handleClick}
                    loading={huskelappIsLoading}
                />
            )}
        </>
    );
}

export default withClickMetric(HuskelappKnapp);
