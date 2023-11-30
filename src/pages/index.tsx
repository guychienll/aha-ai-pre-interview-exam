import * as React from 'react';
import DatePicker from '@/components/DatePicker';

export default function Home() {
    const [date, setDate] = React.useState<string>('');
    return (
        <div id="root" className="p-8">
            <DatePicker
                id="date-picker"
                label="Birthday"
                value={date}
                onChange={(date) => {
                    setDate(date);
                }}
            />
        </div>
    );
}
