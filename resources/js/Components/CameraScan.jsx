import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode";
import Modal from "./Modal"; // Import your custom modal

export default function CameraScan({onScan}) {
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
        if (isScanning || qrScannerRef.current) return;
    
        qrScannerRef.current = new Html5Qrcode("reader", {formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE]});
    
        qrScannerRef.current.start(
            { facingMode: "environment" },
            { qrbox: { width: 250, height: 250 }, fps: 5 },
            (decodedText) => {
                console.log("QR Code Scanned:", decodedText);
                onScan(decodedText);
                closePopup();
            },
            (error) => {
                console.warn("QR Scan Error:", error);
                setErrorMessage("Unable to scan the QR code. Please try again.");
            }
        ).then(() => {
            setIsScanning(true);
            setErrorMessage("");
        }).catch((err) => {
            console.error("Unable to start scanning.", err);
            setErrorMessage("Failed to start the camera. Please ensure camera access is allowed.");
        });
    };

    const stopScanning = () => {
        if (qrScannerRef.current && isScanning) {
            qrScannerRef.current.stop().then(() => {
                setIsScanning(false);
                qrScannerRef.current = null;
            }).catch((err) => {
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
            {/* Floating Camera Button */}
            <button
                className="bg-red-500 text-white p-4 rounded-full shadow-lg border-4 border-white flex justify-center items-center w-16 h-16 fixed bottom-20 right-5 z-50"
                onClick={openPopup}
            >
                <FontAwesomeIcon icon={faCamera} className="h-8 w-8" />
            </button>

            {/* Use the Modal component */}
            <Modal show={isPopupOpen} onClose={closePopup} maxWidth="md">
                <div className="p-6 text-center">
                    <h2 className="text-lg font-semibold mb-4">Scan QR Code</h2>
                    <div id="reader" className="w-full h-64"></div>
                    {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
                    <button
                        onClick={closePopup}
                        className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                        Close
                    </button>
                </div>
            </Modal>
        </div>
    );
}
