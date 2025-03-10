import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { Html5Qrcode } from "html5-qrcode";

export default function CameraScan() {
    const [scanResult, setScanResult] = useState(null);
    const [isScanning, setIsScanning] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const qrScannerRef = useRef(null);

    useEffect(() => {
        return () => {
            stopScanning();
        };
    }, []);

    const startScanning = () => {
        if (isScanning || qrScannerRef.current) return; // Prevent multiple scanners
    
        qrScannerRef.current = new Html5Qrcode("reader");
    
        qrScannerRef.current
            .start(
                { facingMode: "environment" },
                { qrbox: { width: 250, height: 250 }, fps: 5 },
                (decodedText) => {
                    setScanResult(decodedText);
                    closePopup();
                },
                (error) => {
                    console.warn("QR Scan Error:", error);
                    setErrorMessage("Unable to scan the QR code. Please try again.");
                }
            )
            .then(() => {
                setIsScanning(true);
                setErrorMessage("");
            })
            .catch((err) => {
                console.error("Unable to start scanning.", err);
                setErrorMessage("Failed to start the camera. Please ensure camera access is allowed.");
            });
    };
    

    const stopScanning = () => {
        if (qrScannerRef.current && isScanning) {
            qrScannerRef.current
                .stop()
                .then(() => {
                    setIsScanning(false);
                    qrScannerRef.current = null;
                })  
                .catch((err) => {
                    console.error("Failed to stop scanning.", err);
                });
        }
    };

    const openPopup = () => {
        setIsPopupOpen(true);
        setTimeout(startScanning, 500);
    };

    const closePopup = () => {
        stopScanning();
        setIsPopupOpen(false);
    };

    return (
        <div className="relative">
            <button
                className="bg-red-500 text-white p-4 rounded-full shadow-lg border-4 border-white flex justify-center items-center w-16 h-16 fixed bottom-20 right-5 z-50"
                onClick={openPopup}
            >
                <FontAwesomeIcon icon={faCamera} className="h-8 w-8" />
            </button>

            {isPopupOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50 overflow-hidden">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md text-center">
                        <h2 className="text-lg font-semibold mb-4">Scan QR Code</h2>
                        <div id="reader" className="w-full h-64"></div>
                        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
                        <button
                            onClick={closePopup}
                            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                            aria-label="Close QR Scanner"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {scanResult && (
                <div className="mt-4 text-center">
                    Success: <a href={scanResult} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">{scanResult}</a>
                </div>
            )}
        </div>
    );
}
