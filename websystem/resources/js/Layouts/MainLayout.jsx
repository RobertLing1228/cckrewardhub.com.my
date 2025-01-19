import { Head, Link } from "@inertiajs/react";

export default function MainLayout({ children }) {
    return (
        <>
            <Head>
                <meta
                    head-key="description"
                    name="description"
                    content="This is the default description"
                />
            </Head>

            {/* Main Content Section */}
            <main className="pb-16 container mx-auto py-8 px-4">{children}</main>

            {/* Mobile Bottom Navigation */}
            <nav className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white shadow-t flex justify-around py-3">
                <Link
                    className="flex flex-col items-center text-white hover:text-blue-300 transition"
                    href="/"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 10l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V10z"
                        />
                    </svg>
                    <span className="text-xs">Home</span>
                </Link>
                <Link
                    className="flex flex-col items-center text-white hover:text-blue-300 transition"
                    href="/games"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M10.325 4.317c.426-1.756 3.924-1.756 4.35 0a1.992 1.992 0 002.758 1.167c1.64-.82 3.479 1.02 2.658 2.66a1.992 1.992 0 001.166 2.758c1.756.426 1.756 3.924 0 4.35a1.992 1.992 0 00-1.167 2.758c.82 1.64-1.02 3.479-2.66 2.658a1.992 1.992 0 00-2.757 1.166c-.426 1.756-3.924 1.756-4.35 0a1.992 1.992 0 00-2.758-1.167c-1.64.82-3.479-1.02-2.658-2.66a1.992 1.992 0 00-1.166-2.758c-1.756-.426-1.756-3.924 0-4.35a1.992 1.992 0 001.167-2.757c-.82-1.64 1.02-3.479 2.66-2.658a1.992 1.992 0 002.757-1.166z"
                        />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-xs">Games</span>
                </Link>
                <Link
                    className="flex flex-col items-center text-white hover:text-blue-300 transition"
                    href="/promotions"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 10l4.553 4.553a1 1 0 01-1.414 1.414L10 10.414l-5.553 5.553a1 1 0 01-1.414-1.414L10 10l-5.553-5.553a1 1 0 011.414-1.414L10 9.586l5.553-5.553a1 1 0 011.414 1.414L10 9.586l5.553 5.553a1 1 0 011.414 1.414L10 10z"
                        />
                    </svg>
                    <span className="text-xs">Promotions</span>
                </Link>
                <Link
                    className="flex flex-col items-center text-white hover:text-blue-300 transition"
                    href="/recipes"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M20 12l-1.8 1.8M9 15l5-5M20 4l-1.8 1.8M4 20l1.8-1.8"
                        />
                    </svg>
                    <span className="text-xs">Recipes</span>
                </Link>
                <Link
                    className="flex flex-col items-center text-white hover:text-blue-300 transition"
                    href="/products"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M10.325 4.317c.426-1.756 3.924-1.756 4.35 0a1.992 1.992 0 002.758 1.167c1.64-.82 3.479 1.02 2.658 2.66a1.992 1.992 0 001.166 2.758c1.756.426 1.756 3.924 0 4.35a1.992 1.992 0 00-1.167 2.758c.82 1.64-1.02 3.479-2.66 2.658a1.992 1.992 0 00-2.757 1.166c-.426 1.756-3.924 1.756-4.35 0a1.992 1.992 0 00-2.758-1.167c-1.64.82-3.479-1.02-2.658-2.66a1.992 1.992 0 00-1.166-2.758c-1.756-.426-1.756-3.924 0-4.35a1.992 1.992 0 001.167-2.757c-.82-1.64 1.02-3.479 2.66-2.658a1.992 1.992 0 002.757-1.166z"
                        />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-xs">Products</span>
                </Link>
            </nav>
        </>
    );
}
