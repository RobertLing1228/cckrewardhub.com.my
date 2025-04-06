import React, { useState, useEffect, useRef } from 'react';
import { usePage, router } from '@inertiajs/react';
import { Html5Qrcode } from 'html5-qrcode';
import MySpinWheel from '@/Components/SpinWheel';

const initialMissions = [
  { 
    id: 1, 
    name: 'Scan QR Code', 
    completed: false,
    description: 'Scan the QR code at our store',
  },
  { 
    id: 2, 
    name: 'Play Match-3 Game', 
    completed: false,
    actionLink: '/play?game=match3',
    description: 'Reach 300 points to complete'
  },
  { 
    id: 3, 
    name: 'Spin the Wheel', 
    completed: false,
    description: 'Try your luck on our prize wheel'
  },
];

const MissionItem = ({ mission, onStart }) => (
  <li className={`p-4 border rounded-lg transition-colors ${
    mission.completed ? 'border-green-300 bg-green-50' : 'border-gray-200 hover:bg-gray-50'
  }`}>
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <div className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center ${
          mission.completed ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'
        }`}>
          {mission.completed ? '✓' : mission.id}
        </div>
        <div>
          <h3 className={`font-medium ${mission.completed ? 'text-green-600' : 'text-gray-800'}`}>
            {mission.name}
          </h3>
          <p className="text-sm text-gray-600 mt-1">{mission.description}</p>
        </div>
      </div>
      {mission.completed ? (
        <span className="px-3 py-1 text-sm font-medium text-green-800 bg-green-100 rounded-full">
          Completed
        </span>
      ) : (
        <button
          onClick={() => onStart(mission)}
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
        >
          Start
        </button>
      )}
    </div>
  </li>
);

const ProgressBar = ({ completed, total }) => {
  const percentage = (completed / total) * 100;
  return (
    <div className="mb-8">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium">Progress: {completed}/{total}</span>
        <span className="text-sm font-medium">{Math.round(percentage)}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-green-500 h-2.5 rounded-full transition-all duration-300" 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

const MissionList = () => {
  const { url } = usePage();
  const [missions, setMissions] = useState(() => {
    const saved = localStorage.getItem('missions');
    return saved ? JSON.parse(saved) : initialMissions;
  });
  const [showSpinWheel, setShowSpinWheel] = useState(false);
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [scanStatus, setScanStatus] = useState('');
  const qrScannerRef = useRef(null);

  // Game completion listener
  useEffect(() => {
    const handleMissionComplete = (event) => {
      if (event.data.type === 'missionComplete') {
        completeMission(event.data.missionId);
      }
      // Backward compatibility with gameScore messages
      else if (event.data.gameScore >= 300) {
        completeMission(2);
      }
    };

    window.addEventListener('message', handleMissionComplete);
    return () => window.removeEventListener('message', handleMissionComplete);
  }, []);

  // Persist missions to localStorage
  useEffect(() => {
    localStorage.setItem('missions', JSON.stringify(missions));
  }, [missions]);

  const completeMission = (id) => {
    setMissions(prev => prev.map(mission => 
      mission.id === id ? { ...mission, completed: true } : mission
    ));
  };

  const startScanning = () => {
    if (qrScannerRef.current) return;
    
    qrScannerRef.current = new Html5Qrcode("mission-scanner");
    
    qrScannerRef.current.start(
      { facingMode: "environment" },
      { qrbox: { width: 250, height: 250 }, fps: 5 },
      (decodedText) => {
        if (decodedText.includes('complete_mission=1')) {
          completeMission(1);
          setScanStatus('success');
          setTimeout(() => {
            stopScanning();
            setShowQRScanner(false);
          }, 1500);
        } else {
          setScanStatus('invalid');
        }
      },
      (error) => {
        console.warn("QR Scan Error:", error);
        setScanStatus("Unable to scan the QR code. Please try again.");
      }
    ).catch((err) => {
      console.error("Unable to start scanning.", err);
      setScanStatus("Failed to start the camera. Please ensure camera access is allowed.");
    });
  };

  const stopScanning = () => {
    if (qrScannerRef.current) {
      qrScannerRef.current.stop()
        .then(() => {
          qrScannerRef.current = null;
        })
        .catch((err) => {
          console.error("Failed to stop scanning.", err);
        });
    }
  };

  const handleStartMission = (mission) => {
    if (mission.id === 1) {
      setShowQRScanner(true);
      setScanStatus('');
      setTimeout(startScanning, 100);
    } else if (mission.id === 3) {
      setShowSpinWheel(true);
    } else {
      router.visit(mission.actionLink);
    }
  };

  useEffect(() => {
    return () => {
      stopScanning();
    };
  }, []);

  const completedCount = missions.filter(m => m.completed).length;
  const allMissionsCompleted = completedCount === missions.length;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Your Missions</h2>
      <ProgressBar completed={completedCount} total={missions.length} />

      <ul className="space-y-4 mb-8">
        {missions.map(mission => (
          <MissionItem 
            key={mission.id} 
            mission={mission} 
            onStart={handleStartMission} 
          />
        ))}
      </ul>

      {/* QR Scanner Modal */}
      {showQRScanner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md overflow-hidden flex flex-col">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">Scan Mission QR Code</h3>
              
              {scanStatus === 'success' && (
                <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-lg">
                  ✓ Mission completed successfully!
                </div>
              )}
              {scanStatus === 'invalid' && (
                <div className="mb-4 p-3 bg-yellow-100 text-yellow-800 rounded-lg">
                  This QR code is not valid for missions
                </div>
              )}
              {scanStatus === 'error' && (
                <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-lg">
                  Error scanning QR code
                </div>
              )}

              <div id="mission-scanner" className="w-full h-64 bg-black"></div>
            </div>
            
            <div className="p-6 border-t bg-gray-50 flex justify-center">
              <button
                onClick={() => {
                  stopScanning();
                  setShowQRScanner(false);
                }}
                className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <MySpinWheel 
        isOpen={showSpinWheel}
        onClose={() => setShowSpinWheel(false)}
        onComplete={() => {
          completeMission(3);
          setShowSpinWheel(false);
        }}
      />

      {allMissionsCompleted && (
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-center">
          <h3 className="text-xl font-bold text-yellow-800 mb-2">
            🎉 Congratulations!
          </h3>
          <p className="text-yellow-700 mb-3">
            You've completed all missions and earned a <strong>RM2 Voucher</strong>!
          </p>
          <button 
            onClick={() => router.visit('/rewards')}
            className="px-6 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
          >
            Claim Your Reward
          </button>
        </div>
      )}
    </div>
  );
};
export default MissionList;