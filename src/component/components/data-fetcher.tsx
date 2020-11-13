import React, { useEffect, useState } from 'react';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { fetchToJson } from '../../api/api-utils';
import { OrNothing } from '../../util/type/ornothing';

interface DataFetcherProps<T> {
    fetchFunc: (args?: string[], errorHandler?: (response?: Response) => any) => T | null; // tslint:disable-line
    children: (data: T) => React.ReactNode;
}

interface DataFetcherState<T> {
    isLoading: boolean;
    data: OrNothing<T>;
}

function DataFetcher<T>(props: DataFetcherProps<T>) {
    const [dataFetcherState, setData] = useState<DataFetcherState<T>>({ data: null, isLoading: true });

    useEffect(() => {
        try {
            fetchToJson('/abs');
            const data = props.fetchFunc();
            setData({ data, isLoading: false });
        } catch (e) {
            throw new Error(e);
        }
    }, []);

    if (dataFetcherState.isLoading) {
        return (
            <div className="spinner-wrapper centered">
                <NavFrontendSpinner type="XXL" />
            </div>
        );
    }

    if (dataFetcherState.data === null) {
        return <div />;
    }

    return props.children(dataFetcherState.data as T);
}

export default DataFetcher;
