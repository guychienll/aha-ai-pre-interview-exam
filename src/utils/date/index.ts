import dayjs from 'dayjs';

export type DateRange = { minDate?: Date; maxDate?: Date };

export const DefaultDateRange = {
    minDate: new Date('1969-12-31'),
    maxDate: new Date('2499-12-31'),
};
export const isDateOutOfRange = (date: Date, range?: DateRange) => {
    const _range = range || DefaultDateRange;
    const target = dayjs(date);
    const min = dayjs(_range.minDate);
    const max = dayjs(_range.maxDate);

    return target.isAfter(max) || target.isBefore(min);
};
