import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import axios from 'axios';

const Timer = ({ sessionId, onExpire }) => {
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    if (!sessionId) return;

    // Fetch initial time from server
    const fetchTime = async () => {
      try {
        const res = await axios.post('/api/resume/session', { sessionId });
        const initialTimeLeft = Math.floor(res.data.timeLeft / 1000); // seconds
        setTimeLeft(initialTimeLeft);
        if (initialTimeLeft <= 0) {
          onExpire();
        }
      } catch (err) {
        console.error("Timer sync error", err);
      }
    };
    
    fetchTime();
    
    // Fallback sync every 30 seconds
    const syncInterval = setInterval(fetchTime, 30000);
    return () => clearInterval(syncInterval);
  }, [sessionId, onExpire]);

  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0) return;

    const intervalId = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(intervalId);
          onExpire();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft, onExpire]);

  if (timeLeft === null) return <div className="text-gray-500 font-medium">Loading lock status...</div>;
  if (timeLeft <= 0) return <div className="text-red-600 font-bold flex items-center gap-2"><Clock /> EXPIRED</div>;

  const m = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const s = (timeLeft % 60).toString().padStart(2, '0');
  
  const isWarning = timeLeft < 300; // < 5 mins

  return (
    <div className={`flex items-center gap-2 font-mono text-lg font-semibold px-4 py-2 rounded-lg border ${isWarning ? 'bg-red-50 text-red-600 border-red-200 animate-pulse' : 'bg-green-50 text-green-700 border-green-200'}`}>
      <Clock size={20} />
      <span>{m}:{s}</span>
    </div>
  );
};

export default Timer;
