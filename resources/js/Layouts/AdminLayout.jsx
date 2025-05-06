import { Link, useForm, usePage } from "@inertiajs/react";
import React, { useState, useEffect } from "react";

import "../../../public/dist/css/adminlte.min.css";
import "../../../public/plugins/fontawesome-free/css/all.min.css";

export default function AdminLayout({ children, title = "Dashboard", breadcrumbs = [] }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    
    const {auth} = usePage().props;
    console.log(auth);
    

    useEffect(() => {
        // Set sidebar state based on initial screen width
        setIsSidebarOpen(window.innerWidth > 992);

        // Update sidebar state on window resize
        const handleResize = () => setIsSidebarOpen(window.innerWidth > 992);
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className={`wrapper min-vh-100 ${isSidebarOpen ? "sidebar-open" : ""}`}>
            {/* Navbar */}
            <NavBar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

            {/* Sidebar */}
            <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} auth={auth} />

            {/* Content */}
            <Content title={title} breadcrumbs={breadcrumbs}>{children}</Content>

            {/* Footer */}
            <Footer />
        </div>
    );
}

function NavBar({ isSidebarOpen, setIsSidebarOpen }) {
    return (
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <button
                        className="nav-link border-0 bg-transparent"
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        style={{ display: window.innerWidth > 992 && isSidebarOpen ? "none" : "block" }}
                    >
                        <i className={`fas ${isSidebarOpen ? "fa-times" : "fa-bars"}`}></i>
                    </button>
                </li>
            </ul>
        </nav>
    );
}

function Sidebar({ isSidebarOpen, setIsSidebarOpen, auth }) {
    const { post } = useForm();
    const handleLogout = () => {
        post("/admin/logout");
    };

    return (
        <aside className={`main-sidebar sidebar-dark-primary elevation-4 ${isSidebarOpen ? "show-sidebar" : "hide-sidebar"}`}>
            <div className="d-flex align-items-center justify-content-between p-3">
                <Link href="#" className="brand-link m-0 text-white">
                    <span className="brand-text font-weight-light">Admin Panel</span>
                </Link>
                <button
                    className="btn btn-sm text-white border-0 bg-transparent"
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    title="Close Sidebar"
                >
                    <i className="fas fa-arrow-left"></i>
                </button>
            </div>

            <div className="sidebar">

                <div className="user-panel mt-2 pb-2 mb-2 d-flex">
                    
                    <div className="info">
                        <Link href="/admin/profile" className="d-block">
                            <h2 className="text-lg">{auth.admin ? "Admin Profile" : "Admin"}</h2>
                        </Link>
                </div>
            </div>

                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu">
                        <li className="nav-item">
                            <Link href="/admin" className="nav-link">
                                <i className="nav-icon fas fa-tachometer-alt"></i>
                                <p>Dashboard</p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/admin/users" className="nav-link">
                                <i className="nav-icon fas fa-users"></i>
                                <p>Users</p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/admin/products" className="nav-link">
                                <i className="nav-icon fas fa-box-open"></i>
                                <p>Products</p>
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link href="/admin/branches" className="nav-link">
                                <i className="nav-icon fas fa-building"></i>
                                <p>Branches</p>
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link href="/admin/categories" className="nav-link">
                                <i className="nav-icon fas fa-book"></i>
                                <p>Categories</p>
                            </Link>
                        </li>
    
                        <li className="nav-item">
                            <Link href="/admin/recipes" className="nav-link">
                                <i className="nav-icon fas fa-utensils"></i>
                                <p>Recipes</p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href='/admin/qrcodes' className='nav-link'>
                                <i className="nav-icon fas fa-qrcode"></i>
                                <p>QR Codes</p>
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link href="/admin/banners" className="nav-link">
                                <i className="nav-icon fas fa-ribbon"></i>
                                <p>Banners</p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/admin/games" className="nav-link">
                                <i className="nav-icon fas fa-gamepad"></i>
                                <p>Games</p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/admin/vouchers" className="nav-link">
                                <i className="nav-icon fas fa-ticket-alt"></i>
                                <p>Vouchers List</p>
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link href="/admin/uservouchers" className="nav-link">
                                <i className="nav-icon fas fa-ticket-alt"></i>
                                <p>User Vouchers</p>
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link href="/admin/claims" className="nav-link">
                                <i className="nav-icon fas fa-clipboard"></i>
                                <p>Claims</p>
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link href="/admin/missions" className="nav-link">
                                <i className="nav-icon fas fa-list"></i>
                                <p>Missions</p>
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link href="/admin/usermissions" className="nav-link">
                                <i className="nav-icon fas fa-list"></i>
                                <p>User Missions</p>
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link href="/admin/wheelrewards" className="nav-link">
                                <i className="nav-icon fas fa-gift"></i>
                                <p>Wheel Rewards</p>
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link href="/admin/resettimes" className="nav-link">
                                <i className="nav-icon fas fa-bell"></i>
                                <p>Reset Times</p>
                            </Link>
                        </li>

                        <li className="nav-item bg-white">
                            <Link href="/admin/import" className="nav-link">
                                <i className="nav-icon fas fa-file-import"></i>
                                <p>Import</p>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>

            

            <div className="sidebar-footer p-3">
                <button onClick={handleLogout} className="btn btn-danger btn-block">
                    <i className="fas fa-sign-out-alt"></i> Logout
                </button>
            </div>
        </aside>
    );
}

function Content({ title, breadcrumbs, children }) {
    return (
        <div className="content-wrapper">
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>{title}</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                {breadcrumbs.map((breadcrumb, index) => (
                                    <li key={index} className={`breadcrumb-item ${index === breadcrumbs.length - 1 ? "active" : ""}`}>
                                        {breadcrumb.url ? <Link href={breadcrumb.url}>{breadcrumb.label}</Link> : breadcrumb.label}
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </div>
                </div>
            </section>

            <section className="content">
                <div className="container-fluid">{children}</div>
            </section>
        </div>
    );
}

function Footer() {
    return (
        <footer className="main-footer">
            <div className="float-right d-none d-sm-block">
                <b>Version</b> 3.2.0
            </div>
            <strong>
                Copyright &copy; 2014-2021 <Link href="https://adminlte.io">AdminLTE.io</Link>.
            </strong> All rights reserved.
        </footer>
    );
}
