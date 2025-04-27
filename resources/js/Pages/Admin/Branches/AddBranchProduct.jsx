import React, {useState, useEffect, useRef} from "react";
import { Head, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

export default function AddBranchProduct ({branches, products}) {
    const [productSearchTerm, setProductSearchTerm] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);
    const productListRef = useRef(null);
    const [visibleCount, setVisibleCount] = useState(15);

    useEffect(() => {
        const list = productListRef.current;
        if (!list) return;
      
        const handleScroll = () => {
          if (list.scrollTop + list.clientHeight >= list.scrollHeight - 5) {
            // Near bottom, load more
            setVisibleCount((prev) => prev + 15);
          }
        };
      
        list.addEventListener("scroll", handleScroll);
        return () => list.removeEventListener("scroll", handleScroll);
      }, [filteredProducts]);

    const {data, setData, post, errors, processing} = useForm({
            branch_id: '',
            productID: '',
            stock: ''
        })
    
    function submit(e) {
        e.preventDefault();
    
        post('/admin/branchproduct/add', data);
    }

    const handleProductSearchChange = (e) => {
        const value = e.target.value;
        setProductSearchTerm(value);
        const filtered = products.filter((p) =>
            `${p.productID} ${p.name}`.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredProducts(filtered);
        setVisibleCount(15);
    };
    
    const handleProductSelect = (product) => {
        setData("productID", product.productID);
        setProductSearchTerm(`${product.productID} - ${product.name}`);
        setFilteredProducts([]);
    };

    return (
        <AdminLayout title="Add Branch Product"
            breadcrumbs={[
                { label: "Admin", url: "/admin" },
                { label: "Branches", url: "/admin/branches" },
                { label: "Add Branch Product" }
            ]}>
            <Head title="Add Branch Product" />
            <div className="p-4 bg-white shadow-md rounded-lg">
            <div className="mx-auto">
                    
                <form className="flex flex-col gap-4" onSubmit={submit}>
                    <label>Branch</label>
                    {errors.branch_id && <div className="error">{errors.branch_id}</div>}
                    <select 
                        value={data.branch_id}
                        onChange={(e) => setData("branch_id", e.target.value)}
                        className={errors.branch_id && "!ring-red-500"}
                    >
                        <option value="">Select a branch</option>
                        {branches.map((branch) => (
                            <option key={branch.id} value={branch.id}>
                                {branch.name}
                            </option>
                        ))}
                    </select>

                    <label>Product</label>
                        {errors.productID && <div className="error">{errors.productID}</div>}
                        <input
                            type="text"
                            value={productSearchTerm}
                            onChange={handleProductSearchChange}
                            className={`border px-2 py-1 rounded ${errors.productID ? "!ring-red-500" : ""}`}
                            placeholder="Type Product ID or Name..."
                        />

                        {filteredProducts.length > 0 && (
                            <ul
                                ref={productListRef}
                                className="border rounded bg-white max-h-48 overflow-y-auto shadow z-50"
                            >
                                {filteredProducts.slice(0, visibleCount).map((product) => (
                                    <li
                                        key={product.productID}
                                        onClick={() => handleProductSelect(product)}
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                    >
                                        {product.productID} - {product.name}
                                    </li>
                                ))}
                            </ul>
                        )}

                    <label>Stock</label>
                    {errors.stock && <div className="error">{errors.stock}</div>}
                    <input
                        type="number"
                        value={data.stock}
                        onChange={(e) => setData("stock", e.target.value)}
                        className={errors.stock && "!ring-red-500"}
                    />

                    <p>Example table:</p>
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="font-bold">Branch</th>
                                <th className="font-bold">Product</th>
                                <th className="font-bold">Stock</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            <tr>
                                <td>{data.branch_id}</td>
                                <td>{data.productID}</td>
                                <td>{data.stock}</td>
                            </tr>
                        </tbody>
                        
                        
                    </table>

                    <button className="primary-btn mt-4" disabled={processing}>Submit</button>
                </form>
                
            </div>
            </div>
        </AdminLayout>
    );
}