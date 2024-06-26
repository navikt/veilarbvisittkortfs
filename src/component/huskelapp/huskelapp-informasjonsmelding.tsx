import { Alert, Link } from '@navikt/ds-react';
import { trackAmplitude } from '../../amplitude/amplitude';

export const HuskelappInformasjonsmelding = () => (
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
            Oppdatert info om personvern, sletting og innsyn for huskelapp
        </Link>{' '}
        (åpnes i ny fane)
    </Alert>
);
