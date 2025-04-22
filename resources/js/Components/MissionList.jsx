import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { usePage, router } from '@inertiajs/react';
import { Html5Qrcode } from 'html5-qrcode';
import MySpinWheel from '@/Components/SpinWheel';
import PrizeView from './PrizeView'; // Import PrizeView

const MissionList = () => {
  const { auth } = usePage().props;
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSpinWheel, setShowSpinWheel] = useState(false);
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [scanStatus, setScanStatus] = useState('');
  const [showPrizeModal, setShowPrizeModal] = useState(false);
  const qrScannerRef = useRef(null);

  useEffect(() => {
    initializeMissions();
  }, []);

  const initializeMissions = async () => {
    try {
      await axios.post('/user-missions/start');
      await fetchMissions();
    } catch (error) {
      console.error('Error initializing missions:', error);
    }
  };

  const fetchMissions = async () => {
    try {
      const { data } = await axios.get('/missions');
      setMissions(data);
    } catch (error) {
      console.error('Error fetching missions:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProgress = async (missionId, progress = 1) => {
    try {
      await axios.post(`/missions/${missionId}/progress`, { progress });
      await fetchMissions();
    } catch (error) {
      console.error('Failed to update progress', error);
    }
  };

  const startScanning = () => {
    if (qrScannerRef.current) return;

    qrScannerRef.current = new Html5Qrcode("reader");
    qrScannerRef.current.start(
      { facingMode: "environment" },
      { fps: 10, qrbox: 250 },
      async (decodedText) => {
        try {
          const response = await axios.post('/scan', { qr_value: decodedText });

          if (response.data.message === 'QR code scanned successfully!') {
            await updateProgress(1); // mission id 1
            setScanStatus('success');
            setTimeout(() => {
              stopScanning();
              setShowQRScanner(false);
            }, 1500);
          } else {
            setScanStatus('invalid');
          }
        } catch (error) {
          console.error('Failed to verify QR code:', error);
          setScanStatus('invalid');
        }
      },
      (error) => {
        console.warn('QR Code scanning error', error);
      }
    ).catch((err) => {
      console.error('Failed to start scanner', err);
    });
  };

  const stopScanning = () => {
    if (qrScannerRef.current) {
      qrScannerRef.current.stop().then(() => {
        qrScannerRef.current = null;
      });
    }
  };

  const handleStartMission = (mission) => {
    if (mission.id === 1) {
      setShowQRScanner(true);
      setTimeout(startScanning, 300);
    } else if (mission.id === 3) {
      setShowSpinWheel(true);
    } else {
      router.visit('/play?game=match3');
    }
  };

  useEffect(() => {
    return () => {
      stopScanning();
    };
  }, []);

  const completedMissions = missions.filter(m => m.progress >= m.mission_goal).length;
  const allMissionsCompleted = completedMissions === missions.length && missions.length > 0;

  return (
    <div className="p-6 bg-white rounded-lg shadow max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Your Missions</h2>

      {loading ? (
        <div className="text-center py-10 text-gray-400">
          Loading missions...
        </div>
      ) : (
        <>
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-700">Completed {completedMissions} / {missions.length}</span>
              <span className="text-sm text-gray-700">{Math.round((completedMissions / missions.length) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-green-500 h-2.5 rounded-full transition-all"
                style={{ width: `${(completedMissions / missions.length) * 100}%` }}
              />
            </div>
          </div>

          <ul className="space-y-4">
            {missions.map(mission => (
              <li
                key={mission.id}
                className={`p-4 border rounded-lg ${
                  mission.progress >= mission.mission_goal
                    ? 'border-green-300 bg-green-50'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{mission.mission_name}</h3>
                    <p className="text-sm text-gray-500">{mission.mission_description}</p>
                  </div>
                  {mission.progress >= mission.mission_goal ? (
                    <span className="text-green-600 font-semibold">Completed</span>
                  ) : (
                    <button
                      onClick={() => handleStartMission(mission)}
                      className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                    >
                      Start
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </>
      )}

      {showQRScanner && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Scan QR Code</h3>
            <div id="reader" className="w-full h-64 bg-gray-200" />
            <div className="mt-4 flex justify-center">
              <button
                onClick={() => {
                  stopScanning();
                  setShowQRScanner(false);
                }}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <MySpinWheel
        isOpen={showSpinWheel}
        onClose={() => setShowSpinWheel(false)}
        onComplete={async () => {
          await updateProgress(3); // Mission id 3
        }}
        updateProgress={updateProgress}
      />

      {allMissionsCompleted && (
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-center">
          <h3 className="text-xl font-bold text-yellow-800 mb-2">
            🎉 Congratulations!
          </h3>
          <p className="text-yellow-700 mb-3">
            You've completed all missions!
          </p>
          <button
            onClick={() => setShowPrizeModal(true)}
            className="mt-4 rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
          >
            Click Here to Claim
          </button>

          {showPrizeModal && (
            <PrizeView
              game="Mission"
              prize={3.00}
              onClose={() => setShowPrizeModal(false)}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default MissionList;
