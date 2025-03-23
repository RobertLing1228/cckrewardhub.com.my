import { Head, Link, usePage } from "@inertiajs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faGamepad, faUtensils, faBox, faTicket } from "@fortawesome/free-solid-svg-icons";
import CameraScan from "@/Components/CameraScan";
import Topbar from "@/Components/TopBar";

export default function MainLayout({ children, }) {
  const { url } = usePage(); // Get the current URL

  const isActive = (path) => url === path; // Exact match for home
  return (
    <>
      <Head>
        <meta
          head-key="description"
          name="description"
          content="This is the default description"
        />
      </Head>

      <Topbar />
      <CameraScan />
      <header>
        <nav className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white flex justify-around py-3 z-50 shadow-lg h-auto max-h-[calc(100vh/3)]">
          <Link 
            className={`nav-link flex flex-col items-center ${isActive("/") ? "text-blue-400" : ""}`}
            href="/"
          >
            <FontAwesomeIcon icon={faHome} className="h-6 w-6" />
            <span>Home</span>
          </Link>
          <Link 
            className={`nav-link flex flex-col items-center ${isActive("/games") ? "text-blue-400" : ""}`}
            href="/games"
          >
            <FontAwesomeIcon icon={faGamepad} className="h-6 w-6" />
            <span>Games</span>
          </Link>
          <Link 
            className={`nav-link flex flex-col items-center ${isActive("/recipes") ? "text-blue-400" : ""}`}
            href="/recipes"
          >
            <FontAwesomeIcon icon={faUtensils} className="h-6 w-6" />
            <span>Recipes</span>
          </Link>
          <Link 
            className={`nav-link flex flex-col items-center ${isActive("/products") ? "text-blue-400" : ""}`}
            href="/products"
          >
            <FontAwesomeIcon icon={faBox} className="h-6 w-6" />
            <span>Products</span>
          </Link>
          <Link 
            className={`nav-link flex flex-col items-center ${isActive("/products") ? "text-blue-400" : ""}`}
            href="/vouchers"
          >
            <FontAwesomeIcon icon={faTicket} className="h-6 w-6" />
            <span>Vouchers</span>
          </Link>
        </nav>
      </header>
      <main className="w-full max-w-screen-xl mx-auto pt-16 pb-16 bg-[#dcdcdc]">{children}</main> {/* More padding to prevent content overlap */}
    </>
  );
}

