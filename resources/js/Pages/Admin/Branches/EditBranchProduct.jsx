import React from "react";
import { Head, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

export default function EditBranchProduct ({branchProduct, branches, products}) {
    const {data, setData, post, errors, processing} = useForm({
            branch_id: branchProduct.branch_id,
            productID: branchProduct.productID,
            stock: branchProduct.stock
        })
    
    function submit(e) {
        e.preventDefault();
    
        post(`/admin/branchproduct/${branchProduct.id}`, data);
    }

    return (
        <AdminLayout title="Edit Branch Product"
            breadcrumbs={[
                { label: "Admin", url: "/admin" },
                { label: "Branches", url: "/admin/branches" },
                { label: "Edit Branch Product" }
            ]}>
            <Head title="Edit Branch Product" />
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
                    <select 
                        value={data.productID}
                        onChange={(e) => setData("productID", e.target.value)}
                        className={errors.productID && "!ring-red-500"}
                    >
                        <option value="">Select a product</option>
                        {products.map((product) => (
                            <option key={product.productID} value={product.productID}>
                                {product.name}
                            </option>
                        ))}
                    </select>

                    <label>Stock</label>
                    {errors.stock && <div className="error">{errors.stock}</div>}
                    <input
                        type="number"
                        value={data.stock}
                        onChange={(e) => setData("stock", e.target.value)}
                        className={errors.stock && "!ring-red-500"}
                    />

                    <p>Changes:</p>
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
                                <td>{branchProduct.branch_id}</td>
                                <td>{branchProduct.productID}</td>
                                <td>{branchProduct.stock}</td>
                            </tr>
                        </tbody>

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