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

            let phone = data.phoneNumber.trim();
            if (!phone.startsWith('+6')) {
                phone = '+6' + phone;
                setData('phoneNumber', phone);
            }

            const response = await axios.post('/check-member', { phoneNumber: phone });
            const fetchedMemberID = response.data.memberID;
            if (!fetchedMemberID) {
                alert('Member not found');
                return;
            }
            console.log("Member ID:", fetchedMemberID);// debug log
            setData("memberID", fetchedMemberID);

            router.post(route('login'), {
                memberID: fetchedMemberID,
                phoneNumber: phone,},
                {
                onFinish: () => reset('phoneNumber'),
            });

        } catch (error) {
            console.error('Error:', error);
            alert('Phone number not found.');
        }
    }


    return (
       <GuestLayout>
    <Head title="Log in" />

    <div className="bg-white shadow-md rounded-lg px-8 py-6 w-full max-w-md mx-auto">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Welcome Back</h2>

        {status && (
            <div className="mb-4 text-sm font-medium text-green-600 text-center">
                {status}
            </div>
        )}

        <form onSubmit={(e) => e.preventDefault()}>
            <div className="mb-4">
                <InputLabel htmlFor="phoneNumber" value="Phone Number" />
                <TextInput
                    id="phoneNumber"
                    type="text"
                    name="phoneNumber"
                    value={data.phoneNumber}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    onChange={(e) => setData("phoneNumber", e.target.value)}
                    placeholder="e.g. 0123456789"
                />
                <InputError message={errors.phoneNumber} className="mt-2" />
            </div>

            <div className="flex flex-col gap-3 mt-6">
                <PrimaryButton
                    disabled={processing}
                    onClick={handleCheckMember}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white justify-center"
                >
                    Login
                </PrimaryButton>

                <a
                    href="https://www.cckfm.com.my/V2/Login/Index/?rt=https%3A%2F%2Fwww.cckfm.com.my%2F&unLoginId=1a3901c0-ba0f-4fb8-b4e7-924205b8a856&reason=notlogin&officialShopId=200073&authRedirectType=Default#/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-center text-sm text-gray-500 hover:text-blue-700 underline transition"
                >
                    Not a member? Join now!
                </a>
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
    </div>
</GuestLayout>

    );
}
