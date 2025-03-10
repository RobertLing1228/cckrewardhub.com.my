import React, { useEffect, useState } from "react";
import MainLayout from "@/Layouts/MainLayout";
import { Html5Qrcode } from "html5-qrcode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

export default function Test() {
    const [scanResult, setScanResult] = useState(null);
    const [isScanning, setIsScanning] = useState(false);
    const [html5Qrcode, setHtml5Qrcode] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    useEffect(() => {
        // Initialize the Html5Qrcode instance only when the popup is open
        if (isPopupOpen && !html5Qrcode) {
            const qrCode = new Html5Qrcode("reader");
            setHtml5Qrcode(qrCode);
        }
    }, [isPopupOpen]);

    const startScanning = () => {
        if (html5Qrcode) {
            html5Qrcode.start(
                { facingMode: "environment" }, // Use the rear camera
                {
                    qrbox: { width: 250, height: 250 },
                    fps: 5,
                },
                (decodedText) => {
                    // Success callback
                    setScanResult(decodedText);
                    stopScanning();
                    setIsPopupOpen(false); // Close the popup after successful scan
                },
                (errorMessage) => {
                    // Error callback
                    console.warn(errorMessage);
                }
            )
            .then(() => {
                setIsScanning(true);
            })
            .catch((err) => {
                console.error("Unable to start scanning.", err);
            });
        }
    };

    const stopScanning = () => {
        if (html5Qrcode && html5Qrcode.isScanning) {
            html5Qrcode
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
    };

    const closePopup = () => {
        setIsPopupOpen(false);
        stopScanning();
    };

    // Start scanning when the popup is opened
    useEffect(() => {
        if (isPopupOpen && html5Qrcode) {
            startScanning();
        }
    }, [isPopupOpen, html5Qrcode]);

    return (
        <MainLayout>
            <div>
                <h1>Test</h1>
                <p>QR Scanner</p>

                {/* Camera Icon Button */}
                <button
                    onClick={openPopup}
                    style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "24px",
                    }}
                >
                    <FontAwesomeIcon icon={faCamera} />
                </button>

                {/* Popup for QR Scanner */}
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
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}

                {/* Display Scan Result */}
                {scanResult && (
                    <div>
                        Success: <a href={`http://${scanResult}`}>{scanResult}</a>
                    </div>
                )}
            </div>
        </MainLayout>
    );
}