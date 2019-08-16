export const CLIENTID = '8c694af835d62f8fd490';

export const FILTEROPTIONS = () => {
    const options = {
        shouldSort: true,
        threshold: 0.3,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [
            'name',
        ]
    };
    return options;
};
