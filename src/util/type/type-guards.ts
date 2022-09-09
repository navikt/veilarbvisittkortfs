export const isString = (subject: any): subject is string => {
    return typeof subject === 'string';
};

// https://stackoverflow.com/a/56006703
export const isNonEmptyArray = <T>(subject: T[] | undefined): subject is NonEmptyArray<T> => {
    return subject !== undefined && subject.length > 0;
};

export type NonEmptyArray<T> = [T, ...T[]];
