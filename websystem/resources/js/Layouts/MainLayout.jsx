import { Head, Link } from "@inertiajs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faGamepad, faTag, faUtensils, faBox } from "@fortawesome/free-solid-svg-icons";

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
      <header>
        <nav className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white flex justify-around py-3">
          <Link className="nav-link flex flex-col items-center" href="/">
            <FontAwesomeIcon icon={faHome} className="h-6 w-6" />
            <span>Home</span>
          </Link>
          <Link className="nav-link flex flex-col items-center" href="/games">
            <FontAwesomeIcon icon={faGamepad} className="h-6 w-6" />
            <span>Games</span>
          </Link>
          <Link className="nav-link flex flex-col items-center" href="/promotions">
            <FontAwesomeIcon icon={faTag} className="h-6 w-6" />
            <span>Promotions</span>
          </Link>
          <Link className="nav-link flex flex-col items-center" href="/recipes">
            <FontAwesomeIcon icon={faUtensils} className="h-6 w-6" />
            <span>Recipes</span>
          </Link>
          <Link className="nav-link flex flex-col items-center" href="/products">
            <FontAwesomeIcon icon={faBox} className="h-6 w-6" />
            <span>Products</span>
          </Link>
        </nav>
      </header>
      <main className="pb-16">{children}</main> {/* Adds padding to prevent overlap */}
    </>
  );
}
