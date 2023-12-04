import * as React from 'react';
import { useRef } from 'react';
import DatePicker from '@/components/DatePicker';
import PasswordInput from '@/components/PasswordInput';

export default function Home() {
    const [date, setDate] = React.useState<string>('');
    const ref = useRef();
    return (
        <div id="root" className="p-8">
            <PasswordInput>
                <PasswordInput.Input
                    id="aha-password-input-default"
                    label="Password"
                    placeholder="Password"
                />
                <div className="py-2" />
                <PasswordInput.CheckList />
            </PasswordInput>
            <div className="py-4" />
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
