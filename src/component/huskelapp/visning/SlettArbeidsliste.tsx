import { BodyShort, Button, Heading, Loader } from '@navikt/ds-react';
import { TrashIcon } from '@navikt/aksel-icons';
import { useState } from 'react';
import { useAppStore } from '../../../store/app-store';
import { useDataStore } from '../../../store/data-store';
import { logMetrikk } from '../../../util/logger';
import { trackAmplitude } from '../../../amplitude/amplitude';
import { slettArbeidsliste } from '../../../api/veilarbportefolje';
import { ifResponseHasData } from '../../../util/utils';

export const SlettArbeidsliste = () => {
    const [visSlettebekreftelse, setVisSlettebekreftelse] = useState(false);
    const [visLoader, setVisLoader] = useState(false);
    const [visFeilmelding, setVisFeilmelding] = useState(false); // TODO finn ut korleis vi kan vise feilmelding

    const { brukerFnr } = useAppStore();
    const { setArbeidsliste } = useDataStore();

    const handleSlettArbeidsListe = () => {
        logMetrikk('visittkort.metrikker.fjern_arbeidsliste');
        trackAmplitude({
            name: 'knapp klikket',
            data: { knapptekst: 'Fjern arbeidsliste', effekt: 'Fjern bruker fra arbeidslista' }
        });
        setVisLoader(true);

        // TODO fiks at hovud-modalen oppdaterar seg slik at den ikkje viser Eksisterende arbeidslisteinnhold meir
        slettArbeidsliste(brukerFnr)
            .then(ifResponseHasData(setArbeidsliste))
            .then(() => setVisLoader(false))
            .catch(() => setVisFeilmelding(true))
            .then(() => setVisSlettebekreftelse(false));
    };

    return (
        <>
            {!visSlettebekreftelse && (
                <Button
                    onClick={() => setVisSlettebekreftelse(true)}
                    size="xsmall"
                    variant="tertiary"
                    icon={<TrashIcon aria-hidden />}
                >
                    Slett
                </Button>
            )}
            {visSlettebekreftelse && (
                <div className="slettArbeidslisteContainer">
                    <Heading size="xsmall" as="h3">
                        Er du sikker på at du vil slette eksisterende innhold?
                    </Heading>
                    <BodyShort size="small">Dette vil slette tittel, kommentar og frist for denne brukeren.</BodyShort>
                    <div className="knappevalg">
                        <Button
                            variant="tertiary"
                            size="small"
                            type="button"
                            onClick={() => setVisSlettebekreftelse(false)}
                        >
                            Avbryt
                        </Button>
                        <Button
                            icon={visLoader && <Loader size="xsmall" />}
                            iconPosition="right"
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
