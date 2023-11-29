type DateRange = { minDate?: Date; maxDate?: Date };
export const isDateOutOfRange = (date: Date, range?: DateRange) => {
    const {
        minDate = new Date('1970-01-01'),
        maxDate = new Date('2500-01-01'),
    } = range || {};

    return date < minDate || date > maxDate;
};
