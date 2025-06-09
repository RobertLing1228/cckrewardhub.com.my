import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { usePage, router } from '@inertiajs/react';
import { Html5Qrcode } from 'html5-qrcode';
import MySpinWheel from '@/Components/SpinWheel';
import PrizeView from './PrizeView'; 
import MultipleImages from "@/Components/MultipleImages";


const MissionList = () => {
  const {props} = usePage();
  const [errors, setErrors] = useState([]);
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
            await updateProgress(1);
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
  const alreadyClaimedReward = missions.length > 0 && missions.every(m => m.reward_claimed === 1);

  const claimReward = async () => {
    try {
      router.post("/claim", { gameType: "Mission", prize: 3.00 }, {
        onSuccess: async () => {
          console.log("Claim successful");
          router.post('/user-missions/claim');
          await fetchMissions();
        },
        onError: (errors) => {
          setErrors(errors);
          console.error("Error claiming:", errors);
        },
      });
    } catch (error) {
      console.error("Error during reward claim:", error);
    }
  };

  return (
    <div className="p-6 bg-[#f9fafb] rounded-xl shadow max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-gray-800">Weekly Missions</h2>

      {loading ? (
        <div className="text-center py-10 text-gray-400">Loading missions...</div>
      ) : (
        <>
          <div className="mb-8">
            <div className="flex justify-between items-center mb-1 text-sm text-gray-600">
              <span>{completedMissions} of {missions.length} missions completed</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
               <div className="flex space-x-1">
              {missions.map((mission, index) => {
                const isCompleted = mission.progress >= mission.mission_goal;
                return (
                  <div
                    key={index}
                    className={`flex-1 h-4 rounded-md transition-all duration-300
                      ${isCompleted ? 'bg-green-500' : 'bg-gray-300'}
                    `}
                    title={`${mission.mission_name}: ${isCompleted ? 'Completed' : 'Incomplete'}`}
                  ></div>
                );
              })}
            </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {missions.map(mission => {
              const isCompleted = mission.progress >= mission.mission_goal;

              return (
                <div
                  key={mission.id}
                  className={`p-5 rounded-lg shadow-sm border transition-all ${
                    isCompleted ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'
                  }`}
                >
                  <div className="flex flex-col h-full justify-between gap-3">

                    <div className="flex justify-center">
                      <MultipleImages images={mission.mission_image} name={mission.mission_name} />
                    </div>


                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{mission.mission_name}</h3>
                      <p className="text-sm text-gray-500">{mission.mission_description}</p>
                    </div>

                    {isCompleted ? (
                      <div className="mt-4 flex justify-center">
                        <span className="inline-block mt-4 px-3 py-1 text-lg font-medium text-green-700 bg-green-100 rounded-full w-fit">
                          ✅ Done
                        </span>
                      </div>
                    ) : (
                      <div className="mt-4 flex justify-center">
                        <button
                          onClick={() => handleStartMission(mission)}
                          className="w-1/2 bg-white text-blue-800 border border-blue-800 font-semibold px-4 py-2 rounded-full shadow hover:brightness-110 transition"
                        >
                          Start Now
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}


      {showQRScanner && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4 text-center">Scan QR Code</h3>
            <p className={`text-center text-sm mb-4 ${
              scanStatus === 'success'
                ? 'text-green-600'
                : scanStatus === 'invalid'
                ? 'text-red-600'
                : 'text-gray-600'
            }`}>
              {scanStatus === 'success'
                ? 'Scan successful! 🎉'
                : scanStatus === 'invalid'
                ? 'Invalid QR code. Please try again.'
                : 'Scanning...'}
            </p>

            <div id="reader" className="w-full h-74 bg-gray-200 rounded" />

            <div className="mt-6 flex justify-center">
              <button
                onClick={() => {
                  stopScanning();
                  setShowQRScanner(false);
                  setScanStatus('');
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
          {alreadyClaimedReward ? (
            <>
              <h3 className="text-xl font-bold text-gray-700 mb-2">🎉 Reward Claimed</h3>
              <p className="text-gray-600">You have already claimed your RM3 Voucher.</p>
            </>
          ) : (
            <>
              <h3 className="text-xl font-bold text-yellow-800 mb-2">🎉 Congratulations!</h3>
              <p className="text-yellow-700 mb-3">
                You've completed all missions and earned a <strong>RM3 Voucher</strong>!
              </p>
              <button 
                onClick={claimReward}
                className="px-6 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
              >
                Click Here to Claim
              </button>
            </>
          )}
        </div>
      )}

      {showPrizeModal && (
        <PrizeView
          game="Mission"
          prizevalue={3.00}
          prizename="RM 3 Cash Voucher"
          onClose={() => setShowPrizeModal(false)}
        />
      )}
    </div>
  );
};

export default MissionList;
