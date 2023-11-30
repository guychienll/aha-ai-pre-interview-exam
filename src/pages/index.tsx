import * as React from 'react';
import { useRef } from 'react';
import PasswordInput from '@/components/PasswordInput';
import Password from '@/components/PasswordInput';
import DatePicker from '@/components/DatePicker';

export default function Home() {
    const [date, setDate] = React.useState<string>('');
    const ref = useRef();
    return (
        <div id="root" className="p-8">
            <PasswordInput>
                <Password.Input
                    id="aha-password-input-default"
                    label="Password"
                    placeholder="Password"
                />
                <div className="py-2" />
                <Password.CheckList />
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
            ;
        </div>
    );
}
