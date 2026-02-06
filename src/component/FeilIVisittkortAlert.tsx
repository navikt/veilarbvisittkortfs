import { Alert } from '@navikt/ds-react';
import { useOppfolging } from '../api/veilarboppfolging';
import { useBrukerFnr } from '../store/app-store';

export const FeilIVisittkortAlert = () => {
    const brukerFnr = useBrukerFnr();
    const { error: oppfolgingError } = useOppfolging(brukerFnr);

    if (!oppfolgingError) {
        return null;
    }

    return (
        <Alert fullWidth variant={'error'}>
            {'Noe gikk galt med henting av oppfølgingsdata'}
        </Alert>
    );
};
