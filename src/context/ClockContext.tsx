import { createContext, useContext, ReactNode, useState } from 'react'

type Geofence = {
    id: string
    radius: number
    center: {
        lat: number
        lng: number
    }
}

type Shift = {
    id: string
    start: Date
    end?: Date
    location: string
    note: string
}

type ClockContextType = {
    isClockedIn: boolean
    clockIn: (location: string, note?: string) => void
    clockOut: (note?: string) => void
    shifts: Shift[]
    geofence?: Geofence
    updateGeofence?: (geofence: Geofence) => void;
}

const ClockContext = createContext<ClockContextType>(null!)

export function ClockProvider({ children }: { children: ReactNode }) {
    const [state, setState] = useState({
        isClockedIn: false,
        shifts: [] as Shift[]
    })

    const clockIn = (location: string, note = '') => {
        setState(prev => ({
            isClockedIn: true,
            shifts: [{
                id: Date.now().toString(),
                start: new Date(),
                location,
                note,
            }, ...prev.shifts]
        }))
    }

    const clockOut = (note = '') => {
        setState(prev => ({
            isClockedIn: false,
            shifts: prev.shifts.map(shift =>
                !shift.end ? {
                    ...shift,
                    end: new Date(),
                    note: note || shift.note
                } : shift
            )
        }))
    }

    return (
        <ClockContext.Provider value={{
            ...state,
            clockIn,
            clockOut
        }}>
            {children}
        </ClockContext.Provider>
    )
}

export const useClock = () => useContext(ClockContext)