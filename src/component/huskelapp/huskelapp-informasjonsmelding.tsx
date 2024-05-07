import { Alert, Link } from '@navikt/ds-react';
import { ExternalLinkIcon } from '@navikt/aksel-icons';
import { trackAmplitude } from '../../amplitude/amplitude';

export const HuskelappInformasjonsmelding = () => (
    <Alert variant="info" className="huskelapp-alert" size="small">
        Bruk huskelappen til informasjon som er viktig for oppfølgingen av personen.{' '}
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
            Oppdatert info om bruk av huskelappen <ExternalLinkIcon />
        </Link>
    </Alert>
);
