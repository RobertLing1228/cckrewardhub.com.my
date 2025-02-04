import { Link, usePage } from "@inertiajs/react";
import React from "react";

import "../../../public/dist/css/adminlte.min.css";
import "../../../public/plugins/fontawesome-free/css/all.min.css";




export default function AdminLayout ({ children, title = "Dashboard", breadcrumbs = [] }) {
    return (
        <div className="wrapper">
            {/* Navbar */}
            <NavBar  />

            {/* Sidebar */}
            <Sidebar />

            {/* Content */}
            <Content  title={title} breadcrumbs={breadcrumbs} children={children}  />

            {/* Footer */}
            <Footer     />
        </div>
    );
};

    function NavBar({}) {
      return (
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" data-widget="pushmenu" href="#" role="button">
                            <i className="fas fa-bars"></i>
                        </Link>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto"></ul>
            </nav>
            );
    }

    function Sidebar({}) {
        return (
            <aside className="main-sidebar sidebar-dark-primary elevation-4">
                <Link href="#" className="brand-link">
                    <span className="brand-text font-weight-light">ReactJS</span>
                </Link>
                <div className="sidebar">
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
                                <Link href="/admin/promotions" className="nav-link">
                                    <i className="nav-icon fas fa-tags"></i>
                                    <p>Promotions</p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/admin/recipes" className="nav-link">
                                    <i className="nav-icon fas fa-utensils"></i>
                                    <p>Recipes</p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/admin/games" className="nav-link">
                                    <i className="nav-icon fas fa-gamepad"></i>
                                    <p>Games</p>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </aside>
        );
    }
  


    function Content({title, breadcrumbs, children}) {
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
            </div>);
    }

    function Footer({}) {
        return (<footer className="main-footer">
                  <div className="float-right d-none d-sm-block">
                      <b>Version</b> 3.2.0
                  </div>
                  <strong>
                      Copyright &copy; 2014-2021 <Link href="https://adminlte.io">AdminLTE.io</Link>.
                  </strong> All rights reserved.
              </footer>);
      }
      