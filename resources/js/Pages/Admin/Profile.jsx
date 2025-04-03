
import AdminLayout from '@/Layouts/AdminLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { useForm, usePage } from '@inertiajs/react';

export default function UpdateAdminProfile({ className = '' }) {
    const {auth} = usePage().props 

    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            name: auth.admin?.name || '',
        });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.profile.update'));
    };

    return (
        <AdminLayout>
            <section className={className}>
                <header>
                    <h2 className="text-xl font-semibold leading-tight text-zinc-50">
                        Profile
                    </h2>
                    <p className="mt-1 text-sm text-gray-600">
                        Update your admin profile information.
                    </p>
                </header>

                <form onSubmit={submit} className="mt-6 space-y-6">
                    <div>
                        <InputLabel htmlFor="name" value="Admin Name" />
                        <TextInput
                            id="name"
                            className="mt-1 block w-full"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                            autoComplete="name"
                        />
                        <InputError className="mt-2" message={errors.name} />
                    </div>

                

                    <div className="flex items-center gap-4">
                        <PrimaryButton disabled={processing}>Save</PrimaryButton>
                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-gray-600">Saved.</p>
                        </Transition>
                    </div>
                </form>
            </section>
        </AdminLayout>
    );
}
