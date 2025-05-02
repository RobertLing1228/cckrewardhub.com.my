import React, { useState } from 'react';
import { usePage, Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';

const MissionHistory = () => {
  const { history } = usePage().props;
  const [activeTab, setActiveTab] = useState('incomplete'); // 'incomplete' or 'completed'
  const [sortOrder, setSortOrder] = useState('latest'); // 'latest' or 'oldest'

  // Sort function
  const sortMissions = (missions, dateKey) => {
    return missions.sort((a, b) => {
      const dateA = new Date(a[dateKey]);
      const dateB = new Date(b[dateKey]);
      return sortOrder === 'latest' ? dateB - dateA : dateA - dateB;
    });
  };

  const completedMissions = sortMissions(
    history.filter(m => m.progress >= m.mission?.mission_goal && m.completed_at),
    'completed_at'
  );

  const incompleteMissions = sortMissions(
    history.filter(m => m.progress < m.mission?.mission_goal && m.created_at),
    'created_at'
  );

  return (
    <MainLayout>
      <Head title="Mission History" />

      <div className="p-4 sm:p-6 bg-white rounded-lg shadow max-w-3xl mx-auto mt-4 sm:mt-10">

        {/* Back Button */}
        <div className="mb-4">
          <button
            onClick={() => window.history.back()}
            className="text-gray-700 hover:text-blue-600 text-sm font-medium transition"
          >
            &larr; Back to Missions
          </button>
        </div>

        <h2 className="text-center text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Mission History</h2>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-4">
          <button
            className={`px-4 py-2 rounded font-medium transition ${
              activeTab === 'incomplete'
                ? 'bg-red-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => setActiveTab('incomplete')}
          >
            🕒 Incomplete Missions
          </button>
          <button
            className={`px-4 py-2 rounded font-medium transition ${
              activeTab === 'completed'
                ? 'bg-green-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => setActiveTab('completed')}
          >
            ✅ Completed Missions
          </button>
        </div>

        {/* Sort Filter */}
        <div className="flex justify-end mb-4">
          <label className="text-sm mr-2 self-center text-gray-700">Sort by:</label>
          <select
            className="text-sm border rounded px-3 py-2 min-w-[130px] appearance-none"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>

        {/* Main Content */}
        {history.length === 0 ? (
          <p className="text-center text-gray-500 py-10">No mission history available.</p>
        ) : (
          <>
            {/* Incomplete Missions */}
            {activeTab === 'incomplete' && (
              <div>
                {incompleteMissions.length > 0 ? (
                  <ul className="space-y-3 sm:space-y-4">
                    {incompleteMissions.map((item) => (
                      <li key={item.id} className="p-3 sm:p-4 border rounded-lg bg-red-50 border-red-300">
                        <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                          <div className="flex-1">
                            <h4 className="font-bold text-sm sm:text-base">
                              {item.mission?.mission_name || 'Unnamed Mission'}
                            </h4>
                            <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
                              {item.mission?.mission_description}
                            </p>
                            <p className="text-xs sm:text-sm text-gray-500 mt-1">
                              Started at: {item.created_at ? new Date(item.created_at).toLocaleString() : '—'}
                            </p>
                          </div>
                          <span className="text-red-600 font-semibold text-sm sm:text-base">
                            {item.progress}/{item.mission?.mission_goal}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 text-sm sm:text-base text-center">All missions completed!</p>
                )}
              </div>
            )}

            {/* Completed Missions */}
            {activeTab === 'completed' && (
              <div>
                {completedMissions.length > 0 ? (
                  <ul className="space-y-3 sm:space-y-4">
                    {completedMissions.map((item) => (
                      <li key={item.id} className="p-3 sm:p-4 border rounded-lg bg-green-50 border-green-300">
                        <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                          <div className="flex-1">
                            <h4 className="font-bold text-sm sm:text-base">
                              {item.mission?.mission_name || 'Unnamed Mission'}
                            </h4>
                            <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
                              {item.mission?.mission_description}
                            </p>
                            <p className="text-xs sm:text-sm text-gray-500 mt-1">
                              Completed at: {item.completed_at ? new Date(item.completed_at).toLocaleString() : '—'}
                            </p>
                          </div>
                          <span className="text-green-600 font-semibold text-sm sm:text-base sm:self-center">
                            Done
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 text-sm sm:text-base text-center">No completed missions yet.</p>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default MissionHistory;
