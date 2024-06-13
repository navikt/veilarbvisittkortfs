import { Alert, BodyShort, Button, Heading } from '@navikt/ds-react';
import { TrashIcon } from '@navikt/aksel-icons';
import { useState } from 'react';
import { useAppStore } from '../../../store/app-store';
import { useDataStore } from '../../../store/data-store';
import { logMetrikk } from '../../../util/logger';
import { trackAmplitude } from '../../../amplitude/amplitude';
import { slettArbeidslisteMenIkkeFargekategori } from '../../../api/veilarbportefolje';
import { ifResponseHasData } from '../../../util/utils';

export const SlettArbeidsliste = () => {
    const [visSlettebekreftelse, setVisSlettebekreftelse] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const { brukerFnr } = useAppStore();
    const { setArbeidsliste } = useDataStore();

    const handleSlettArbeidsListe = () => {
        logMetrikk('visittkort.metrikker.fjern_arbeidsliste');
        trackAmplitude({
            name: 'knapp klikket',
            data: { knapptekst: 'Fjern arbeidsliste', effekt: 'Fjern bruker fra arbeidslista' }
        });
        setLoading(true);

        slettArbeidslisteMenIkkeFargekategori(brukerFnr)
            .then(ifResponseHasData(setArbeidsliste))
            .then(() => setLoading(false))
            .catch(() => setError(true))
            .then(() => setVisSlettebekreftelse(false));
    };

    return (
        <>
            {error && (
                <Alert variant="error" size="small" className="sletting-av-arbeidsliste-feilet">
                    Noe gikk galt ved sletting av arbeidslista.
                    <br />
                    Avbryt og prøv igjen senere.
                </Alert>
            )}
            {!visSlettebekreftelse && !error && (
                <Button
                    onClick={() => {
                        setVisSlettebekreftelse(true);
                        setError(false);
                    }}
                    size="small"
                    variant="tertiary"
                    icon={<TrashIcon aria-hidden />}
                >
                    Slett gammel arbeidsliste uten å lage ny huskelapp
                </Button>
            )}
            {visSlettebekreftelse && (
                <div>
                    <Heading size="xsmall" level="3">
                        Er du sikker på at du vil slette gammel arbeidsliste?
                    </Heading>
                    <BodyShort size="small">Dette vil slette tittel, kommentar og frist for denne personen.</BodyShort>
                    <div id="slett-arbeidsliste__knappevalg">
                        <Button
                            variant="tertiary"
                            size="small"
                            type="button"
                            onClick={() => setVisSlettebekreftelse(false)}
                        >
                            Avbryt
                        </Button>
                        <Button
                            loading={loading}
                            variant="secondary"
                            size="small"
                            type="button"
                            onClick={handleSlettArbeidsListe}
                        >
                            Ja, slett arbeidslista
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
};
