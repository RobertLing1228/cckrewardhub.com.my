import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { router, Head, Link, useForm } from '@inertiajs/react';
import React from 'react';

export default function Login({ status }) {

    const { data, setData, post, processing, errors, reset } = useForm({
        memberID: '',
        phoneNumber: '',
    });

    const handleCheckMember = async () => {

        try {
            //Check if phone number exists in database

            const response = await axios.post('/check-member', { phoneNumber: data.phoneNumber });
            const fetchedMemberID = response.data.memberID;
            if (!fetchedMemberID) {
                alert('Member not found');
                return;
            }
            setData("memberID", fetchedMemberID);

            router.post(route('login'), {
                memberID: fetchedMemberID,
                phoneNumber: data.phoneNumber,
            }, {
                onSuccess: () => {
                    reset('phoneNumber');
                },
                onError: () => {
                    alert('Login failed. Please try again.');
                },
            });
            
        } catch (error) {
            console.error('Error:', error);
            alert('Phone number not found.');
        }
    }


    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={(e) => e.preventDefault()}>
                <div className="mt-4">
                    <InputLabel htmlFor="phoneNumber" value="Phone Number" />

                    <TextInput
                        id="phoneNumber"
                        type="text"
                        name="phoneNumber"
                        value={data.phoneNumber}
                        className="mt-1 block w-full"
                        onChange={(e) => setData("phoneNumber", e.target.value)}
                    />
                    <InputError message={errors.phoneNumber} className="mt-2" />
                </div>

                <div className="mt-4 flex items-center justify-end">
                        <a
                            href="https://www.cckfm.com.my/V2/Login/Index/?rt=https%3A%2F%2Fwww.cckfm.com.my%2F&unLoginId=1a3901c0-ba0f-4fb8-b4e7-924205b8a856&reason=notlogin&officialShopId=200073&authRedirectType=Default#/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Not a member? Join now!
                        </a>

                    <PrimaryButton disabled={processing} onClick={handleCheckMember}>Login</PrimaryButton>
                </div>
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
