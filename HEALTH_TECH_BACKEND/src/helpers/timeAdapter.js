function adaptToTimeFormat(input) {
    let date;

    if (input instanceof Date) {
        date = input;
    } else if (typeof input === 'string') {
        date = new Date(input);
    } else {
        date = new Date();
    }

    if (isNaN(date.getTime())) {
        date = new Date();
    }

    return date.toISOString();
}

export { adaptToTimeFormat };
