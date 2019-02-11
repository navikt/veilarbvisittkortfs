function toJsonOrError(response: Response) {
    if (!response.status) {
        throw new Error(response.statusText);
    }
    return response.json();
}

export async function fetchToJson<T>(url: string): Promise<T> {
    const response = await fetch(url);
    return toJsonOrError(response);
}
