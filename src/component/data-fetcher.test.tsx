import { cleanup, render, screen } from '@testing-library/react';
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, test, vi } from 'vitest';
import { graphql, http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { SWRConfig } from 'swr';
import { DataFetcher } from './data-fetcher';
import { PersonaliaGraphqlRequest, useVisittkortEtiketter } from '../api/veilarbperson';
import { mockPersonalia, mockVisittkortEtiketter, veilarbpersonHandlers } from '../mock/api/veilarbperson';
import { veilarboppfolgingHandlers } from '../mock/api/veilarboppfolging';
import { veilarbveilederHandlers } from '../mock/api/veilarbveileder';
import { useAppStore, useBrukerFnr } from '../store/app-store';
import { VisittKortConfigContext } from '../store/visittkort-config';

vi.mock('../mock/config', () => ({ defaultNetworkResponseDelay: 0 }));

const brukerFnr = '10108000398';
const server = setupServer(...veilarbpersonHandlers, ...veilarboppfolgingHandlers, ...veilarbveilederHandlers);
const personGraphql = graphql.link('/veilarbperson/graphql');

function EtikettStatus() {
    const { error, isLoading } = useVisittkortEtiketter(useBrukerFnr());
    return <p>{error ? 'Etikettfeil' : isLoading ? 'Henter etiketter' : 'Etiketter hentet'}</p>;
}

const renderDataFetcher = () =>
    render(
        <SWRConfig value={{ provider: () => new Map(), shouldRetryOnError: false }}>
            <VisittKortConfigContext.Provider value={{ tilbakeTilFlate: '', visVeilederVerktoy: false }}>
                <DataFetcher>
                    {() => (
                        <>
                            <p>Visittkort</p>
                            <EtikettStatus />
                        </>
                    )}
                </DataFetcher>
            </VisittKortConfigContext.Provider>
        </SWRConfig>
    );

describe('DataFetcher', () => {
    beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
    beforeEach(() => useAppStore.setState({ brukerFnr }));
    afterEach(() => {
        cleanup();
        server.resetHandlers();
        useAppStore.setState({ brukerFnr: undefined });
    });
    afterAll(() => server.close());

    test('starter etikettkallet parallelt med personalia uten en etikettkonsument', async () => {
        const personaliaKlar = Promise.withResolvers<void>();
        const etikettkallStartet = Promise.withResolvers<void>();
        server.use(
            http.post<never, PersonaliaGraphqlRequest>('/veilarbperson/graphql', async ({ request }) => {
                const { query, variables } = await request.json();
                if (query.includes('HentVisittkortEtiketter')) {
                    expect(variables.fnr).toBe(brukerFnr);
                    etikettkallStartet.resolve();
                    return HttpResponse.json({ data: { visittkortEtiketter: mockVisittkortEtiketter } });
                }
                await personaliaKlar.promise;
                return HttpResponse.json({ data: { person: mockPersonalia }, errors: null });
            })
        );

        renderDataFetcher();

        try {
            await etikettkallStartet.promise;
            expect(screen.queryByText('Visittkort')).toBeNull();
        } finally {
            personaliaKlar.resolve();
        }
        expect(await screen.findByText('Visittkort')).toBeTruthy();
    });

    test('viser visittkortet mens etikettkallet venter', async () => {
        const etiketterKlar = Promise.withResolvers<void>();
        server.use(
            personGraphql.query('HentVisittkortEtiketter', async () => {
                await etiketterKlar.promise;
                return HttpResponse.json({ data: { visittkortEtiketter: mockVisittkortEtiketter } });
            })
        );

        renderDataFetcher();

        try {
            expect(await screen.findByText('Visittkort')).toBeTruthy();
            expect(screen.getByText('Henter etiketter')).toBeTruthy();
        } finally {
            etiketterKlar.resolve();
        }
        expect(await screen.findByText('Etiketter hentet')).toBeTruthy();
    });

    test('beholder visittkortet ved GraphQL-feil i etikettkallet', async () => {
        server.use(
            personGraphql.query('HentVisittkortEtiketter', () =>
                HttpResponse.json({
                    data: { visittkortEtiketter: null },
                    errors: [{ message: 'KILDE_IKKE_KONFIGURERT' }]
                })
            )
        );

        renderDataFetcher();

        expect(await screen.findByText('Etikettfeil')).toBeTruthy();
        expect(screen.getByText('Visittkort')).toBeTruthy();
    });
});
