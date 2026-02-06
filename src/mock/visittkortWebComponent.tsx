interface VisittkortProps {
    fnr?: string;
    enhet?: string;
    tilbakeTilFlate?: string;
    visVeilederVerktoy?: string;
    skjulEtiketter?: string;
}

declare module 'react' {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace JSX {
        interface IntrinsicElements {
            'ao-visittkort': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & VisittkortProps, HTMLElement>;
        }
    }
}

export const Visittkort = () => {
    return (
        <ao-visittkort
            fnr={'10108000398'}
            enhet={'1234'}
            tilbakeTilFlate={''}
            visVeilederVerktoy={'true'}
        ></ao-visittkort>
    );
};
