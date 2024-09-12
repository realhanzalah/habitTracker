import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Home, Share2 } from 'lucide-react';

// can use this when alerts function in use
// import { Alert, AlertDescription, AlertTitle } from './components/ui/alert';

const SimulatedApp = () => {
  const [currentTab, setCurrentTab] = useState('Dashboard');
  const [prayerStats, setPrayerStats] = useState({ completed: 0, missed: 0 });
  const [chartData, setChartData] = useState([
    {name: 'Mon', completed: 4, missed: 1},
    {name: 'Tue', completed: 5, missed: 0},
    {name: 'Wed', completed: 3, missed: 2},
    {name: 'Thu', completed: 5, missed: 0},
    {name: 'Fri', completed: 4, missed: 1},
    {name: 'Sat', completed: 5, missed: 0},
    {name: 'Sun', completed: 5, missed: 0},
  ]);

  const handlePrayerCompletion = () => {
    setPrayerStats(prev => ({ ...prev, completed: prev.completed + 1 }));
    updateChartData(true);
  };

  const handlePrayerMissed = () => {
    setPrayerStats(prev => ({ ...prev, missed: prev.missed + 1 }));
    updateChartData(false);
  };

  const decreaseMissedCount = () => {
    if (prayerStats.missed > 0) {
      setPrayerStats(prev => ({ 
        missed: prev.missed - 1, 
        completed: prev.completed + 1 
      }));
      updateChartData(true);
    }
  };

  const updateChartData = (completed) => {
    setChartData(prev => {
      const newData = [...prev];
      const today = newData[newData.length - 1];
      if (completed) {
        today.completed += 1;
      } else {
        today.missed += 1;
      }
      return newData;
    });
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white font-sans">
      <div className="flex-1 overflow-y-auto p-4">
        {currentTab === 'Dashboard' ? (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Dashboard</h2>
            <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
              <h3 className="text-lg font-semibold mb-2">This Week's Progress</h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="name" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip />
                  <Line type="monotone" dataKey="completed" stroke="#4CAF50" strokeWidth={2} />
                  <Line type="monotone" dataKey="missed" stroke="#F44336" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-between">
              <div className="text-center">
                <p className="text-3xl font-bold text-green-500">{prayerStats.completed}</p>
                <p className="text-sm text-gray-400">Completed</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-red-500">{prayerStats.missed}</p>
                <p className="text-sm text-gray-400">Missed</p>
              </div>
            </div>
            <div className="space-y-2">
              <button onClick={handlePrayerCompletion} className="w-full bg-green-700 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300">
                Confirm Prayer
              </button>
              <button onClick={handlePrayerMissed} className="w-full bg-red-700 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300">
                Mark Prayer as Missed
              </button>
              <button onClick={decreaseMissedCount} className="w-full bg-yellow-700 hover:bg-yellow-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300">
                Catch Up Missed Prayer
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">A Good Deed that Never Ends.</h2>
            <p className="text-gray-300"> When a man dies, his deeds come to an end except for three things: Sadaqah Jariyah (ceaseless charity); a knowledge which is beneficial, or a virtuous descendant who prays for him (for the deceased).” Muhammad,(P.B.U.H), (Muslim) </p>
            <button className="w-full bg-blue-700 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center">
              <Share2 className="mr-2" size={20} />
              Share Now
            </button>
          </div>
        )}
      </div>
      <div className="flex justify-around bg-gray-800 p-4 border-t border-gray-700">
        <button onClick={() => setCurrentTab('Dashboard')} className={`p-2 rounded-full ${currentTab === 'Dashboard' ? 'bg-gray-700' : ''}`}>
          <Home size={24} />
        </button>
        <button onClick={() => setCurrentTab('Share')} className={`p-2 rounded-full ${currentTab === 'Share' ? 'bg-gray-700' : ''}`}>
          <Share2 size={24} />
        </button>
      </div>
    </div>
  );
};

export default SimulatedApp;