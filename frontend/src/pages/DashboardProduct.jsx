import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  Package,
  ChartNoAxesCombined,
  Settings,
  LogOut,
  Menu,
  X,
  Search,
  Bell,
  Plus,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
} from "lucide-react";

const CATEGORIES = ["All", "Electronics", "Fashion", "Beauty", "Sports", "Books", "Toys"];

const initialProducts = [
  { id: 1, title: "Wireless Earbuds", description: "High-quality wireless earbuds with active noise cancellation and 24h battery life.", price: 49.99, category: "Electronics", stock: 120, status: "Active", image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=80" },
  { id: 2, title: "Smart Watch", description: "Feature-rich smartwatch with health tracking, GPS, and always-on display.", price: 89.99, category: "Electronics", stock: 45, status: "Active", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=80" },
  { id: 3, title: "Backpack", description: "Durable 30L backpack with laptop compartment and water-resistant material.", price: 39.99, category: "Fashion", stock: 80, status: "Active", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=80" },
  { id: 4, title: "Sneakers", description: "Lightweight running sneakers with cushioned sole and breathable mesh upper.", price: 69.99, category: "Fashion", stock: 0, status: "Out of Stock", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=80" },
  { id: 5, title: "Handbag", description: "Elegant vegan leather handbag with multiple pockets and gold-tone hardware.", price: 59.99, category: "Fashion", stock: 30, status: "Active", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=80" },
  { id: 6, title: "Perfume", description: "Long-lasting floral fragrance with notes of jasmine, rose, and sandalwood.", price: 29.99, category: "Beauty", stock: 200, status: "Active", image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=80" },
  { id: 7, title: "Headphones", description: "Studio-grade over-ear headphones with Hi-Fi sound and foldable design.", price: 79.99, category: "Electronics", stock: 15, status: "Low Stock", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80" },
  { id: 8, title: "Gaming Controller", description: "Ergonomic wireless controller compatible with PC and all major consoles.", price: 59.99, category: "Electronics", stock: 60, status: "Active", image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=80" },
];

const emptyForm = { title: "", description: "", price: "", category: "Electronics", stock: "", status: "Active", image: "" };

const ITEMS_PER_PAGE = 5;

const DashboardProduct = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [page, setPage] = useState(1);

  const [modal, setModal] = useState(null); // null | "add" | "edit" | "delete"
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, to: "/dashboard" },
    { name: "Products", icon: Package, to: "/dashboard/product" },
    { name: "Orders", icon: ShoppingBag, to: "/dashboard" },
    { name: "Customers", icon: Users, to: "/dashboard" },
    { name: "Analytics", icon: ChartNoAxesCombined, to: "/dashboard" },
    { name: "Settings", icon: Settings, to: "/dashboard" },
  ];

  const filtered = products.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchCat = categoryFilter === "All" || p.category === categoryFilter;
    return matchSearch && matchCat;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const openAdd = () => {
    setForm(emptyForm);
    setModal("add");
  };

  const openEdit = (product) => {
    setForm({ title: product.title, price: product.price, category: product.category, stock: product.stock, status: product.status, image: product.image });
    setEditId(product.id);
    setModal("edit");
  };

  const openDelete = (id) => {
    setDeleteId(id);
    setModal("delete");
  };

  const handleSave = () => {
    if (!form.title || !form.price || !form.stock) return;

    if (modal === "add") {
      const newProduct = { ...form, id: Date.now(), price: parseFloat(form.price), stock: parseInt(form.stock) };
      setProducts((prev) => [newProduct, ...prev]);
    } else {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editId ? { ...p, ...form, price: parseFloat(form.price), stock: parseInt(form.stock) } : p
        )
      );
    }
    setModal(null);
    setPage(1);
  };

  const handleDelete = () => {
    setProducts((prev) => prev.filter((p) => p.id !== deleteId));
    setModal(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const statusStyle = (status) => {
    if (status === "Active") return "bg-green-50 text-green-700";
    if (status === "Low Stock") return "bg-yellow-50 text-yellow-700";
    return "bg-red-50 text-red-600";
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">

      {sidebarOpen && (
        <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 z-40 bg-black/40 lg:hidden" />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r bg-white p-5 transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div className="mb-10 flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">
            my<span className="text-gray-400">Shop.</span>
          </h1>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
            <X size={22} />
          </button>
        </div>

        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-400">Main Menu</p>

        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.name === "Products";
            return (
              <button
                key={item.name}
                onClick={() => { setSidebarOpen(false); navigate(item.to); }}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition
                ${isActive ? "bg-black text-white" : "text-gray-500 hover:bg-gray-100 hover:text-black"}`}
              >
                <Icon size={19} />
                {item.name}
              </button>
            );
          })}
        </nav>

        <div className="border-t pt-5">
          <button onClick={handleLogout} className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-gray-500 hover:bg-gray-100">
            <LogOut size={19} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="min-h-screen lg:ml-64">

        {/* Navbar */}
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b bg-white px-5 md:px-8">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
              <Menu size={24} />
            </button>
            <div>
              <h2 className="text-lg font-bold">Products</h2>
              <p className="hidden text-xs text-gray-400 sm:block">Manage your store's products</p>
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-5">
            <div className="hidden items-center gap-2 rounded-xl bg-gray-100 px-3 py-2 md:flex">
              <Search size={17} className="text-gray-400" />
              <input
                placeholder="Search..."
                className="w-32 bg-transparent text-sm outline-none"
              />
            </div>

            <button className="relative rounded-xl bg-gray-100 p-2.5">
              <Bell size={19} />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
            </button>

            <div className="flex items-center gap-2">
              <img src="https://i.pravatar.cc/100?img=47" className="h-10 w-10 rounded-full object-cover" alt="Admin" />
              <div className="hidden sm:block">
                <p className="text-sm font-semibold">Admin User</p>
                <p className="text-xs text-gray-400">Administrator</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Body */}
        <section className="space-y-6 p-5 md:p-8">

          {/* Heading */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold">All Products</h1>
              <p className="mt-1 text-sm text-gray-400">{products.length} products total</p>
            </div>

            <button
              onClick={openAdd}
              className="flex items-center gap-2 rounded-xl bg-black px-5 py-3 text-sm font-medium text-white hover:bg-gray-800"
            >
              <Plus size={17} />
              Add Product
            </button>
          </div>

          {/* Filters */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 shadow-sm">
              <Search size={17} className="text-gray-400" />
              <input
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                placeholder="Search products..."
                className="w-48 bg-transparent text-sm outline-none"
              />
            </div>

            <div className="flex items-center gap-2">
              <SlidersHorizontal size={17} className="text-gray-400" />
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => { setCategoryFilter(cat); setPage(1); }}
                    className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                      categoryFilter === cat ? "bg-black text-white" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px] text-left text-sm">
                <thead className="bg-gray-50 text-xs uppercase text-gray-400">
                  <tr>
                    <th className="px-6 py-4">Product</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Price</th>
                    <th className="px-6 py-4">Stock</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {paginated.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.image}
                            alt={product.title}
                            className="h-11 w-11 rounded-xl object-cover"
                          />
                          <span className="font-semibold">{product.title}</span>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-gray-500">{product.category}</td>

                      <td className="px-6 py-4 font-semibold">${product.price.toFixed(2)}</td>

                      <td className="px-6 py-4 text-gray-500">{product.stock}</td>

                      <td className="px-6 py-4">
                        <span className={`rounded-full px-3 py-1.5 text-xs font-medium ${statusStyle(product.status)}`}>
                          {product.status}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEdit(product)}
                            className="rounded-lg border border-gray-200 p-2 text-gray-500 hover:bg-gray-100"
                          >
                            <Pencil size={15} />
                          </button>
                          <button
                            onClick={() => openDelete(product.id)}
                            className="rounded-lg border border-red-100 p-2 text-red-500 hover:bg-red-50"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {paginated.length === 0 && (
              <div className="py-16 text-center">
                <Package size={40} className="mx-auto mb-3 text-gray-300" />
                <p className="font-semibold text-gray-500">No products found</p>
                <p className="mt-1 text-sm text-gray-400">Try adjusting your search or filter.</p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between border-t px-6 py-4">
                <p className="text-sm text-gray-400">
                  Showing {(page - 1) * ITEMS_PER_PAGE + 1}–{Math.min(page * ITEMS_PER_PAGE, filtered.length)} of {filtered.length}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                    disabled={page === 1}
                    className="rounded-lg border border-gray-200 p-2 text-gray-500 hover:bg-gray-100 disabled:opacity-40"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                    <button
                      key={n}
                      onClick={() => setPage(n)}
                      className={`rounded-lg px-3 py-1.5 text-sm font-medium ${
                        n === page ? "bg-black text-white" : "border border-gray-200 text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                  <button
                    onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                    disabled={page === totalPages}
                    className="rounded-lg border border-gray-200 p-2 text-gray-500 hover:bg-gray-100 disabled:opacity-40"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>

          <p className="pb-3 text-center text-xs text-gray-400">© 2026 myShop. All rights reserved.</p>
        </section>
      </main>

      {/* Add / Edit Modal */}
      {(modal === "add" || modal === "edit") && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-lg font-bold">{modal === "add" ? "Add New Product" : "Edit Product"}</h3>
              <button onClick={() => setModal(null)} className="rounded-lg p-1 hover:bg-gray-100">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Product Name</label>
                <input
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  placeholder="e.g. Wireless Headphones"
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-black"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Price ($)</label>
                  <input
                    type="number"
                    min="0"
                    value={form.price}
                    onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                    placeholder="0.00"
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Stock</label>
                  <input
                    type="number"
                    min="0"
                    value={form.stock}
                    onChange={(e) => setForm((f) => ({ ...f, stock: e.target.value }))}
                    placeholder="0"
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-black"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-black"
                  >
                    {CATEGORIES.filter((c) => c !== "All").map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Status</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-black"
                  >
                    <option>Active</option>
                    <option>Low Stock</option>
                    <option>Out of Stock</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  placeholder="Short product description..."
                  className="w-full resize-none rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Image URL</label>
                <input
                  value={form.image}
                  onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
                  placeholder="https://..."
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-black"
                />
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button onClick={() => setModal(null)} className="flex-1 rounded-xl border border-gray-200 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100">
                Cancel
              </button>
              <button onClick={handleSave} className="flex-1 rounded-xl bg-black py-2.5 text-sm font-medium text-white hover:bg-gray-800">
                {modal === "add" ? "Add Product" : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {modal === "delete" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
              <Trash2 size={22} className="text-red-500" />
            </div>
            <h3 className="text-lg font-bold">Delete Product</h3>
            <p className="mt-2 text-sm text-gray-500">
              Are you sure you want to delete this product? This action cannot be undone.
            </p>
            <div className="mt-6 flex gap-3">
              <button onClick={() => setModal(null)} className="flex-1 rounded-xl border border-gray-200 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100">
                Cancel
              </button>
              <button onClick={handleDelete} className="flex-1 rounded-xl bg-red-500 py-2.5 text-sm font-medium text-white hover:bg-red-600">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardProduct;
