// components/ClockInCard.tsx
'use client'
import { useState, useEffect } from 'react';

export default function ClockInCard() {
    const [isClockedIn, setIsClockedIn] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-800 to-indigo-900 flex items-center justify-center p-4">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl w-full max-w-md transform transition-all hover:scale-105">
                <div className="flex flex-col items-center space-y-6">
                    {/* User Info */}
                    <div className="flex items-center space-x-4 w-full">
                        <div className="h-12 w-12 bg-purple-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-xl">JD</span>
                        </div>
                        <div className="flex flex-col">
                            <h2 className="text-white font-semibold text-lg">John Doe</h2>
                            <p className="text-purple-200 text-sm">Software Developer</p>
                        </div>
                    </div>

                    {/* Time Display */}
                    <div className="space-y-2 text-center">
                        <p className="text-purple-200 text-sm">{currentTime.toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}</p>
                        <div className="text-4xl font-bold text-white transition-all duration-300">
                            {formatTime(currentTime)}
                        </div>
                    </div>

                    {/* Clock In/Out Button */}
                    <button
                        onClick={() => setIsClockedIn(!isClockedIn)}
                        className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 ${isClockedIn
                            ? 'bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600'
                            : 'bg-gradient-to-r from-purple-400 to-blue-500 hover:from-purple-500 hover:to-blue-600'
                            } text-white shadow-lg hover:shadow-xl active:scale-95`}
                    >
                        {isClockedIn ? 'Clock Out' : 'Clock In'}
                    </button>

                    {/* Additional Info */}
                    <div className="flex justify-between w-full text-purple-200 text-sm">
                        <div className="flex items-center space-x-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <span>8h 24m Today</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                />
                            </svg>
                            <span>Acme Corp</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}