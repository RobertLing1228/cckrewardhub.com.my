import React, { useState, useEffect, useRef } from "react";
import { Head, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { QRCodeSVG } from "qrcode.react";

export default function Edit({ qrcode, products }) {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(`${qrcode.product_id || ""}`);
  const [visibleCount, setVisibleCount] = useState(15);
  const listRef = useRef();

  const { data, setData, post, errors, processing } = useForm({
    qr_type: qrcode.qr_type || "product",
    productID: qrcode.product_id || "",
    qr_value: qrcode.qr_value || "",
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
    setVisibleCount(15);

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
      setVisibleCount((prev) => prev + 10);
    }
  };

  function submit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("qr_type", data.qr_type);
    formData.append("productID", data.productID);
    formData.append("qr_value", data.qr_value);
    post(`/admin/qrcodes/${qrcode.id}`, { data: formData, forceFormData: true });
  }

  return (
    <AdminLayout
      title="Edit QRCode"
      breadcrumbs={[
        { label: "Admin", url: "/admin" },
        { label: "QRCodes", url: "/admin/qrcodes" },
        { label: "Edit QRCode" },
      ]}
    >
      <Head title="Edit QRCode" />
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
                placeholder="https://..."
              />
            </>
          )}

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
            Save Changes
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}
