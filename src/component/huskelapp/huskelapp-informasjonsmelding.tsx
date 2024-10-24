import { Alert, Link } from '@navikt/ds-react';
import { trackAmplitude } from '../../amplitude/amplitude';
import { useDataStore } from '../../store/data-store';
import { SKJUL_ARBEIDSLISTEFUNKSJONALITET } from '../../api/veilarbpersonflatefs';

export const HuskelappInformasjonsmelding = () => {
    const { features } = useDataStore();
    const arbeidslistefunksjonalitetSkalVises = !features[SKJUL_ARBEIDSLISTEFUNKSJONALITET];

    if (arbeidslistefunksjonalitetSkalVises) {
        return (
            <Alert variant="warning" className="huskelapp-alert" size="small">
                <Link
                    href="https://navno.sharepoint.com/sites/fag-og-ytelser-arbeid-arbeidsrettet-brukeroppfolging/SitePages/Arbeidslisten-i-Oversikten-i-Modia.aspx"
                    target="_blank"
                    rel="noopener"
                    inlineText
                    onClick={() => {
                        trackAmplitude({
                            name: 'navigere',
                            data: { lenketekst: 'Oppdatert info om bruk av huskelappen', destinasjon: 'navet' }
                        });
                    }}
                >
                    Gamle arbeidslister blir slettet 25. oktober
                </Link>{' '}
                (åpnes i ny fane)
            </Alert>
        );
    } else {
        return (
            <Alert variant="info" className="huskelapp-alert" size="small">
                <Link
                    href="https://navno.sharepoint.com/sites/fag-og-ytelser-arbeid-arbeidsrettet-brukeroppfolging/SitePages/Arbeidslisten-i-Oversikten-i-Modia.aspx"
                    target="_blank"
                    rel="noopener"
                    inlineText
                    onClick={() => {
                        trackAmplitude({
                            name: 'navigere',
                            data: { lenketekst: 'Oppdatert info om bruk av huskelappen', destinasjon: 'navet' }
                        });
                    }}
                >
                    Personvern i huskelappen - har du lov, og er det nødvendig? (Navet)
                </Link>
            </Alert>
        );
    }
};
