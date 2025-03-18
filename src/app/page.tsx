'use client'; // Required for Next.js 13+ with client-side interactivity

import { useState, createContext, useContext, ReactNode } from 'react';
import { Box, Button, Text, TextInput, Table, TableHeader, TableRow, TableCell } from 'grommet';

// 1. Create Contexts
type User = {
    id: string;
    name: string;
    role: 'careworker' | 'manager';
};

type Shift = {
    id: string;
    start: Date;
    end?: Date;
    location: string;
    note: string;
};

const AuthContext = createContext<{
    user: User | null;
    login: (role: 'careworker' | 'manager') => void;
    logout: () => void;
} | null>(null);

const ClockContext = createContext<{
    isClockedIn: boolean;
    clockIn: (location: string, note?: string) => void;
    clockOut: (note?: string) => void;
    shifts: Shift[];
} | null>(null);

// 2. Create Providers
function Providers({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [clockState, setClockState] = useState({
        isClockedIn: false,
        shifts: [] as Shift[],
    });

    const authValue = {
        user,
        login: (role: 'careworker' | 'manager') =>
            setUser({ id: '123', name: role === 'careworker' ? 'Care Worker' : 'Manager', role }),
        logout: () => setUser(null),
    };

    const clockValue = {
        ...clockState,
        clockIn: (location: string, note = '') =>
            setClockState((prev) => ({
                isClockedIn: true,
                shifts: [
                    { id: Date.now().toString(), start: new Date(), location, note },
                    ...prev.shifts,
                ],
            })),
        clockOut: (note = '') =>
            setClockState((prev) => ({
                isClockedIn: false,
                shifts: prev.shifts.map((shift) =>
                    !shift.end
                        ? {
                            ...shift,
                            end: new Date(),
                            note: note || shift.note,
                        }
                        : shift
                ),
            })),
    };

    return (
        <AuthContext.Provider value={authValue}>
            <ClockContext.Provider value={clockValue}>{children}</ClockContext.Provider>
        </AuthContext.Provider>
    );
}

// 3. Create Components
function Login() {
    const auth = useContext(AuthContext);
    if (!auth) return null;

    return (
        <Box fill align="center" justify="center">
            <Box gap="medium" width="medium">
                <Text size="large" weight="bold">Lief Care Login</Text>
                <Button primary label="Login as Care Worker" onClick={() => auth.login('careworker')} />
                <Button label="Login as Manager" onClick={() => auth.login('manager')} />
            </Box>
        </Box>
    );
}

function ClockInOut() {
    const clock = useContext(ClockContext);
    if (!clock) return null;

    const [location, setLocation] = useState('');
    const [note, setNote] = useState('');

    return (
        <Box pad="medium" gap="medium" width="medium">
            <Text size="large" weight="bold">{clock.isClockedIn ? 'On Shift' : 'Clock In'}</Text>
            {!clock.isClockedIn && (
                <TextInput
                    placeholder="Enter your location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
            )}
            <TextInput
                placeholder="Add note (optional)"
                value={note}
                onChange={(e) => setNote(e.target.value)}
            />
            <Button
                primary
                label={clock.isClockedIn ? 'Clock Out' : 'Clock In'}
                onClick={() => {
                    clock.isClockedIn ? clock.clockOut(note) : clock.clockIn(location, note);
                    setNote('');
                    setLocation('');
                }}
            />
        </Box>
    );
}

function ShiftHistory() {
    const clock = useContext(ClockContext);
    if (!clock) return null;

    return (
        <Box pad="medium" gap="small">
            <Text size="large" weight="bold">Shift History</Text>
            {clock.shifts.map((shift) => (
                <Box key={shift.id} pad="small" border={{ side: 'bottom' }}>
                    <Text>
                        {new Date(shift.start).toLocaleString()} -
                        {shift.end ? new Date(shift.end).toLocaleTimeString() : ' Ongoing'}
                    </Text>
                    <Text size="small">{shift.location}</Text>
                    {shift.note && <Text size="small">Note: {shift.note}</Text>}
                </Box>
            ))}
        </Box>
    );
}

function StaffTable() {
    const clock = useContext(ClockContext);
    if (!clock) return null;

    return (
        <Box pad="medium">
            <Text size="large" weight="bold">Staff Shifts</Text>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableCell><Text weight="bold">Time</Text></TableCell>
                        <TableCell><Text weight="bold">Location</Text></TableCell>
                        <TableCell><Text weight="bold">Status</Text></TableCell>
                    </TableRow>
                </TableHeader>
                <tbody>
                    {clock.shifts.map((shift) => (
                        <TableRow key={shift.id}>
                            <TableCell>{new Date(shift.start).toLocaleTimeString()} - {shift.end ? new Date(shift.end).toLocaleTimeString() : 'Now'}</TableCell>
                            <TableCell>{shift.location}</TableCell>
                            <TableCell>{shift.end ? 'Completed' : 'In Progress'}</TableCell>
                        </TableRow>
                    ))}
                </tbody>
            </Table>
        </Box>
    );
}

// 4. Main Page Component
function HomePage() {
    const auth = useContext(AuthContext);
    if (!auth) return null;

    return !auth.user ? <Login /> : auth.user.role === 'careworker' ? <ClockInOut /> : <StaffTable />;
}

// 5. Wrap the Page with Providers
export default function App() {
    return (
        <Providers>
            <HomePage />
        </Providers>
    );
}