import React, { useState, useEffect, useRef } from "react";
import { Head, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { QRCodeSVG } from "qrcode.react";

export default function Create({ products }) {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(15);
  const listRef = useRef();

  const { data, setData, post, errors, processing } = useForm({
    qr_type: "product",
    productID: "",
    qr_image: "",
    qr_value: "",
    is_active: 0,
  });

  useEffect(() => {
    if (data.qr_type === "product" && data.productID) {
      const qrLink = `/products/${data.productID}`;
      setData("qr_value", qrLink);
    }
  }, [data.qr_type, data.productID]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setVisibleCount(15); // reset visible count on new search

    const filtered = products.filter((p) =>
      `${p.productID} ${p.name}`.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleProductSelect = (product) => {
    setData("productID", product.productID);
    setSearchTerm(`${product.productID} - ${product.name}`);
    setFilteredProducts([]);
  };

  const handleScroll = () => {
    const el = listRef.current;
    if (el && el.scrollTop + el.clientHeight >= el.scrollHeight - 10) {
      setVisibleCount((prev) => prev + 10); // lazy load 10 more
    }
  };

  function submit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("qr_type", data.qr_type);
    formData.append("product_id", data.productID);
    formData.append("qr_image", data.qr_image);
    formData.append("qr_value", data.qr_value);
    formData.append("is_active", data.is_active);
    post("/admin/qrcodes/add", { data: formData, forceFormData: true });
  }

  return (
    <AdminLayout
      title="Add QRCode"
      breadcrumbs={[
        { label: "Admin", url: "/admin" },
        { label: "QRCodes", url: "/admin/qrcodes" },
        { label: "Add QRCode" },
      ]}
    >
      <Head title="Add QRCode" />
      <div className="p-4 bg-white shadow-md rounded-lg max-w-xl mx-auto">
        <form className="flex flex-col gap-4" onSubmit={submit}>
          {/* QR Type Selector */}
          <label>QR Code Type</label>
          <select
            value={data.qr_type}
            onChange={(e) => {
              setData("qr_type", e.target.value);
              setData("productID", "");
              setSearchTerm("");
              setFilteredProducts([]);
              setData("qr_value", "");
            }}
            className="border px-2 py-1 rounded"
          >
            <option value="product">Product</option>
            <option value="text">Text / Link</option>
          </select>

          {/* PRODUCT SEARCH MODE */}
          {data.qr_type === "product" && (
            <>
              <label>Search Product</label>
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                className="border px-2 py-1 rounded"
                placeholder="Type ID or name..."
              />
              {filteredProducts.length > 0 && (
                <ul
                  ref={listRef}
                  onScroll={handleScroll}
                  className="border rounded bg-white max-h-48 overflow-y-auto shadow"
                >
                  {filteredProducts.slice(0, visibleCount).map((product) => (
                    <li
                      key={product.id}
                      onClick={() => handleProductSelect(product)}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {product.productID} - {product.name}
                    </li>
                  ))}
                  {visibleCount < filteredProducts.length && (
                    <li className="text-center py-2 text-gray-400">Loading more...</li>
                  )}
                </ul>
              )}
            </>
          )}

          {/* TEXT / LINK MODE */}
          {data.qr_type === "text" && (
            <>
              <label>Enter Text or URL</label>
              <input
                type="text"
                value={data.qr_value}
                onChange={(e) => setData("qr_value", e.target.value)}
                className="border px-2 py-1 rounded"
                placeholder="Type text or URL..."
              />
            </>
          )}

          {/* Is Active? */}
          <label>Is Active?</label>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="is_active"
                value= "1"
                checked={data.is_active === 1}
                onChange={() => setData("is_active", 1)}
              />
              Yes
            </label>

            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="is_active"
                value= "0"
                checked={data.is_active === 0}
                onChange={() => setData("is_active", 0)}
              />
              No
            </label>
          </div>

          {/* Summary */}
          {data.qr_value && (
            <>
              <div>
                <p className="font-semibold">QR Value:</p>
                <p>{data.qr_value}</p>
              </div>

              <div>
                <p className="font-semibold">QR Code:</p>
                <QRCodeSVG value={`${window.location.origin}${data.qr_value}`} />
              </div>
            </>
          )}

          <button className="primary-btn mt-4" disabled={processing}>
            Submit
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}
