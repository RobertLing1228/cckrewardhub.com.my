import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';
import React, { useState } from 'react';
import { auth } from '../../firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import axios from 'axios';

import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

export default function Login({ status }) {
    const [otpSent, setOtpSent] = useState(false);
    const [otpCode, setOtpCode] = useState('');
    const [confirmationResult, setConfirmationResult] = useState(null);
    const [memberID, setMemberID] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [value, setValue] = useState('');


    const { post, processing, errors, reset } = useForm();

    const setupRecaptcha = () => {
        const recaptchaElement = document.getElementById('recaptcha-container');
        if (!recaptchaElement) {
            console.error('Recaptcha container not found in DOM!');
            return;
        }
        if (!window.recaptchaVerifier) {
            console.log("Setting up recaptcha with auth:", auth); // debug log

            window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
                'size': 'invisible',
                'callback': (response) => {
                    console.log("Recaptcha callback called with response:", response);
                },
            });
        }

        window.recaptchaVerifier.render().then((widgetId) => {
            window.recaptchaWidgetId = widgetId;
        });
    };

    const handleSendOtp = async () => {
        try {
            //Check if phone number exists in database

            const response = await axios.post('/check-member', { phoneNumber: value });
            const fetchedMemberID = response.data.memberID;
            if (!fetchedMemberID) {
                alert('Member not found');
                return;
            }
            setMemberID(fetchedMemberID);
            setPhoneNumber(value);
            console.log("Member ID:", fetchedMemberID);// debug log

            //Setup and send OTP
            if (!window.recaptchaVerifier) {
                console.log("Setting up recaptcha with auth:", auth); // debug log
    
                window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
                    'size': 'invisible',    
                    'callback': (response) => {
                        console.log("Recaptcha callback called with response:", response);
                    },
                });
            }
            const appVerifier = window.recaptchaVerifier;
            console.log("App verifier:", appVerifier);// debug log
            const result = await signInWithPhoneNumber(auth, value, appVerifier); 
            console.log("Sign in with phone number result:", result);// debug log
            setConfirmationResult(result);
            setOtpSent(true);
            alert('OTP sent!');
        } catch (error) {
            console.error('Error:', error);
            
            alert('Phone number not found or OTP failed.');
        }
    };

    const handleVerifyOtp = async () => {
        try {
            const result = await confirmationResult.confirm(otpCode);

            alert('OTP verified! Logging in...');

            // 3. Log in using Inertia POST
            router.post(route('login'), {
                memberID: memberID,
                phoneNumber: phoneNumber,
            }, {
                onSuccess: () => {
                    console.log('Login successful, redirecting...');
                },
                onFinish: () => reset('phoneNumber'),
            });
        } catch (error) {
            console.error('OTP failed:', error);
            alert('Invalid OTP');
        }
    };

    return (
        <GuestLayout>
            <Head title="Log in" />
            
            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">{status}</div>
            )}

            <form onSubmit={(e) => e.preventDefault()}>
                <div className="mt-4">
                    <InputLabel htmlFor="phoneNumber" value="Phone Number" />
                    <PhoneInput
                        id="phoneNumber"
                        name="phoneNumber"
                        placeholder="Enter phone number"
                        defaultCountry='MY'
                        value={value}
                        onChange={setValue}
                    />
                    <InputError message={errors.phoneNumber} className="mt-2" />

                    <div id="recaptcha-container"></div>
                </div>

                {!otpSent ? (
                    <div className="mt-4 flex items-center justify-end">
                        <a
                            href="https://www.cckfm.com.my/V2/Login/Index/?rt=https%3A%2F%2Fwww.cckfm.com.my%2F&unLoginId=1a3901c0-ba0f-4fb8-b4e7-924205b8a856&reason=notlogin&officialShopId=200073&authRedirectType=Default#/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Not a member? Join now!
                        </a>
                        <PrimaryButton disabled={processing} onClick={handleSendOtp}>Send OTP</PrimaryButton>
                    </div>
                ) : (
                    <>
                        <div className="mt-4">
                            <InputLabel htmlFor="otp" value="Enter OTP" />
                            <TextInput
                                id="otp"
                                type="text"
                                name="otp"
                                value={otpCode}
                                className="mt-1 block w-full"
                                onChange={(e) => setOtpCode(e.target.value)}
                            />
                        </div>
                        <div className="mt-4 flex justify-end">
                            <PrimaryButton disabled={processing} onClick={handleVerifyOtp}>Verify & Login</PrimaryButton>
                        </div>
                    </>
                )}
            </form>

            <div className="mt-6 text-center">
                <Link
                    href="/"
                    className="text-sm text-blue-600 underline hover:text-blue-800 transition duration-150 ease-in-out"
                >
                    Continue as guest
                </Link>
            </div>

            
        </GuestLayout>
    );
}
