import React, { useEffect, useRef, useState } from "react";
import MainLayout from "@/Layouts/MainLayout";
import { Html5Qrcode } from "html5-qrcode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

export default function Test() {
    const [scanResult, setScanResult] = useState(null);
    const [isScanning, setIsScanning] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const qrScannerRef = useRef(null);

    useEffect(() => {
        return () => {
            // Cleanup on unmount
            if (qrScannerRef.current) {
                qrScannerRef.current.stop().catch(() => {});
            }
        };
    }, []);

    const startScanning = () => {
        if (!qrScannerRef.current) {
            qrScannerRef.current = new Html5Qrcode("reader");
        }

        qrScannerRef.current
            .start(
                { facingMode: "environment" }, // Use the rear camera
                {
                    qrbox: { width: 250, height: 250 }, // Adjust the QR code scanning box
                    fps: 5, // Frames per second
                },
                (decodedText) => {
                    setScanResult(decodedText);
                    stopScanning();
                    setIsPopupOpen(false);
                    setErrorMessage(""); // Clear any previous error messages
                },
                (errorMessage) => {
                    console.warn(errorMessage);
                    setErrorMessage("Unable to scan the QR code. Please try again.");
                }
            )
            .then(() => {
                setIsScanning(true);
                setErrorMessage(""); // Clear any previous error messages
            })
            .catch((err) => {
                console.error("Unable to start scanning.", err);
                setErrorMessage("Failed to start the camera. Please ensure camera access is allowed.");
            });
    };

    const stopScanning = () => {
        if (qrScannerRef.current) {
            qrScannerRef.current
                .stop()
                .then(() => {
                    setIsScanning(false);
                })
                .catch((err) => {
                    console.error("Failed to stop scanning.", err);
                });
        }
    };

    const openPopup = () => {
        setIsPopupOpen(true);
        setTimeout(startScanning, 500); // Delay to ensure UI is rendered
    };

    const closePopup = () => {
        setIsPopupOpen(false);
        stopScanning();
    };

    const isValidUrl = (text) => {
        try {
            new URL(text);
            return true;
        } catch {
            return false;
        }
    };

    const formatUrl = (text) => {
        if (!text.startsWith("http://") && !text.startsWith("https://")) {
            return `https://${text}`;
        }
        return text;
    };

    return (
        <MainLayout>
            <div>
                <h1>Test</h1>
                <p>QR Scanner</p>

                <button
                    onClick={openPopup}
                    style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "24px",
                    }}
                    aria-label="Open QR Scanner"
                >
                    <FontAwesomeIcon icon={faCamera} />
                </button>

                {isPopupOpen && (
                    <div
                        style={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            backgroundColor: "rgba(0, 0, 0, 0.8)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            zIndex: 1000,
                        }}
                    >
                        <div
                            style={{
                                backgroundColor: "#fff",
                                padding: "20px",
                                borderRadius: "10px",
                                width: "90%",
                                maxWidth: "500px",
                                textAlign: "center",
                            }}
                        >
                            <h2>Scan QR Code</h2>
                            <div id="reader" style={{ width: "100%" }}></div>
                            {errorMessage && (
                                <p style={{ color: "red", marginTop: "10px" }}>{errorMessage}</p>
                            )}
                            <button
                                onClick={closePopup}
                                style={{
                                    marginTop: "20px",
                                    padding: "10px 20px",
                                    fontSize: "16px",
                                    cursor: "pointer",
                                    backgroundColor: "#ff4d4d",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "5px",
                                }}
                                aria-label="Close QR Scanner"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}

                {scanResult && (
                    <div>
                        Success:{" "}
                        {isValidUrl(scanResult) ? (
                            <a href={formatUrl(scanResult)} target="_blank" rel="noopener noreferrer">
                                {scanResult}
                            </a>
                        ) : (
                            <span>{scanResult}</span>
                        )}
                    </div>
                )}
            </div>
        </MainLayout>
    );
}