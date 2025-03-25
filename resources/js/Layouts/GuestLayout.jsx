import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-gray-100 pt-6 sm:justify-center sm:pt-0">
            <div>
                <Link href="/">
                    {/*<ApplicationLogo className="h-20 w-20 fill-current text-gray-500" /> */}
                    <div className="flex items-center justify-center h-20 w-20 bg-gradient-to-r from-yellow-500 to-red-500 rounded-full shadow-lg">
                        <span className="text-white text-3xl font-bold tracking-wide">CCK</span>
                    </div>
                </Link>
            </div>

            <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
