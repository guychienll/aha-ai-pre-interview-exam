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

type HandleNextStep = (params: {
    origin: Date;
    nextManipulation: {
        value: number;
        unit: 'day' | 'month' | 'year';
    };
    range: DateRange;
}) => Date;

export const handleNextStep: HandleNextStep = (params) => {
    const { origin, nextManipulation, range } = params;

    if (nextManipulation.value === 0) {
        throw new Error('nextManipulation.value should not be 0');
    }

    let _nextDate = dayjs(origin)
        .add(nextManipulation.value, nextManipulation.unit)
        .toDate();

    const isPrev = nextManipulation.value < 0;

    if (isDateOutOfRange(_nextDate, range)) {
        if (isPrev) {
            return dayjs(range.minDate).add(1, 'day').toDate();
        } else {
            return dayjs(range.maxDate).toDate();
        }
    }
    return _nextDate;
};
