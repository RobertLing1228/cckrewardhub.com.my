import { Head, Link, usePage } from "@inertiajs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faGamepad, faUtensils, faBox, faTicket } from "@fortawesome/free-solid-svg-icons";
import CameraScan from "@/Components/CameraScan";
import Topbar from "@/Components/TopBar";

export default function MainLayout({ children }) {
  const { url } = usePage();

  const isActive = (path) => url === path;

  const handleScan = (result) => {
    console.log(result);
  };

  return (
    <>
      <Head>
        <meta head-key="description" name="description" content="Customer Experience App" />
      </Head>

      {/* Top bar and optional scan */}
      <Topbar />
      <CameraScan onScan={handleScan} />

      {/* Main content with padding */}
      <main className="w-full max-w-screen-xl mx-auto pt-20 pb-24 bg-[#f9f9f9] min-h-screen">
        {children}
      </main>

      {/* Bottom navigation bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.05)] border-t border-gray-200 flex justify-around py-2 z-50 rounded-t-2xl">
        <NavItem icon={faHome} path="/" label="Home" isActive={isActive("/")} />
        <NavItem icon={faGamepad} path="/games" label="Games" isActive={isActive("/games")} />
        <NavItem icon={faUtensils} path="/recipes" label="Recipes" isActive={isActive("/recipes")} />
        <NavItem icon={faBox} path="/products" label="Products" isActive={isActive("/products")} />
        <NavItem icon={faTicket} path="/vouchers" label="Vouchers" isActive={isActive("/vouchers")} />
      </nav>
    </>
  );
}

function NavItem({ icon, path, label, isActive }) {
  return (
    <Link
      href={path}
      className={`flex flex-col items-center text-sm transition-colors duration-200 ${
        isActive ? "text-[#F59E0B]" : "text-gray-500 hover:text-yellow-500"
      }`}
    >
      <FontAwesomeIcon icon={icon} className="h-5 w-5 mb-1" />
      <span className="text-xs">{label}</span>
    </Link>
  );
}


