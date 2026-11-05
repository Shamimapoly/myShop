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
  ArrowLeft,
} from "lucide-react";

const DashboardProductCreate = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
    category: "Electronics",
    stock: "",
    status: "Active",
  });

  const [errors, setErrors] = useState({});

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, to: "/" },
    { name: "Products", icon: Package, to: "/product" },
    { name: "Orders", icon: ShoppingBag, to: "/" },
    { name: "Customers", icon: Users, to: "/" },
    { name: "Analytics", icon: ChartNoAxesCombined, to: "/" },
    { name: "Settings", icon: Settings, to: "/" },
  ];

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = "Product name is required.";
    if (!form.price || isNaN(form.price) || Number(form.price) <= 0) e.price = "Enter a valid price.";
    if (!form.description.trim()) e.description = "Description is required.";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    console.log("New product:", form);
    navigate("/product");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const field = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">

      {sidebarOpen && (
        <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 z-40 bg-black/40 lg:hidden" />
      )}

      <aside className={`fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r bg-white p-5 transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
        <div className="mb-10 flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">my<span className="text-gray-400">Shop.</span></h1>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden"><X size={22} /></button>
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
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${isActive ? "bg-black text-white" : "text-gray-500 hover:bg-gray-100 hover:text-black"}`}
              >
                <Icon size={19} />
                {item.name}
              </button>
            );
          })}
        </nav>

        <div className="border-t pt-5">
          <button onClick={handleLogout} className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-gray-500 hover:bg-gray-100">
            <LogOut size={19} /> Logout
          </button>
        </div>
      </aside>

      <main className="min-h-screen lg:ml-64">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b bg-white px-5 md:px-8">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden"><Menu size={24} /></button>
            <div>
              <h2 className="text-lg font-bold">Add Product</h2>
              <p className="hidden text-xs text-gray-400 sm:block">Fill in the details to add a new product</p>
            </div>
          </div>
          <div className="flex items-center gap-3 md:gap-5">
            <div className="hidden items-center gap-2 rounded-xl bg-gray-100 px-3 py-2 md:flex">
              <Search size={17} className="text-gray-400" />
              <input placeholder="Search..." className="w-32 bg-transparent text-sm outline-none" />
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

        <section className="p-5 md:p-8">
          <div className="mb-6 flex items-center gap-3">
            <button
              onClick={() => navigate("/product")}
              className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 shadow-sm hover:bg-gray-100"
            >
              <ArrowLeft size={16} /> Back
            </button>
            <div>
              <h1 className="text-xl font-bold">New Product</h1>
              <p className="text-xs text-gray-400">Add a new item to your store</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

              <div className="space-y-5 xl:col-span-2">
                <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                  <h3 className="mb-5 text-base font-bold">Basic Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700">Product Name <span className="text-red-500">*</span></label>
                      <input
                        value={form.title} onChange={(e) => field("title", e.target.value)} placeholder="e.g. Wireless Headphones"
                        className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition focus:border-black ${errors.title ? "border-red-400 bg-red-50" : "border-gray-200"}`}
                      />
                      {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title}</p>}
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700">Description <span className="text-red-500">*</span></label>
                      <textarea
                        rows={5} value={form.description} onChange={(e) => field("description", e.target.value)} placeholder="Write a short product description..."
                        className={`w-full resize-none rounded-xl border px-4 py-3 text-sm outline-none transition focus:border-black ${errors.description ? "border-red-400 bg-red-50" : "border-gray-200"}`}
                      />
                      {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description}</p>}
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                  <h3 className="mb-5 text-base font-bold">Pricing</h3>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">Price ($) <span className="text-red-500">*</span></label>
                    <input
                      type="number" min="0" step="0.01" value={form.price} onChange={(e) => field("price", e.target.value)} placeholder="0.00"
                      className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition focus:border-black ${errors.price ? "border-red-400 bg-red-50" : "border-gray-200"}`}
                    />
                    {errors.price && <p className="mt-1 text-xs text-red-500">{errors.price}</p>}
                  </div>
                </div>
              </div>

              <div className="space-y-5">
                <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                  <h3 className="mb-5 text-base font-bold">Product Image</h3>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">Image URL</label>
                    <input
                      value={form.image} onChange={(e) => field("image", e.target.value)} placeholder="https://images.unsplash.com/..."
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-black"
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <button type="button" onClick={() => navigate("/product")} className="flex-1 rounded-xl border border-gray-200 bg-white py-3 text-sm font-medium text-gray-600 shadow-sm hover:bg-gray-100">Cancel</button>
                  <button type="submit" className="flex-1 rounded-xl bg-black py-3 text-sm font-medium text-white hover:bg-gray-800">Add Product</button>
                </div>
              </div>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
};

export default DashboardProductCreate;
