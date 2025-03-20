import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        memberID: '',
        phoneNumber: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('phoneNumber'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="memberID" value="Membership ID" />

                    <TextInput
                        id="memberID"
                        type="text"
                        name="memberID"
                        value={data.memberID}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('memberID', e.target.value)}
                    />
                    <InputError message={errors.memberID} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="phoneNumber" value="Phone Number" />

                    <TextInput
                        id="phoneNumber"
                        type="text"
                        name="phoneNumber"
                        value={data.phoneNumber}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('phoneNumber', e.target.value)}
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

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Log in
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
