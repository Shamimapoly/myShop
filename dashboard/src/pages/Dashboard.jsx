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
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  ShoppingCart,
  TrendingUp,
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, to: "/" },
    { name: "Products", icon: Package, to: "/product" },
    { name: "Orders", icon: ShoppingBag, to: "/" },
    { name: "Customers", icon: Users, to: "/" },
    { name: "Analytics", icon: ChartNoAxesCombined, to: "/" },
    { name: "Settings", icon: Settings, to: "/" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const stats = [
    { title: "Total Revenue", value: "$45,890", change: "+12.5%", icon: DollarSign, positive: true },
    { title: "Total Orders", value: "2,450", change: "+8.2%", icon: ShoppingCart, positive: true },
    { title: "Total Products", value: "1,240", change: "+4.3%", icon: Package, positive: true },
    { title: "Total Customers", value: "8,549", change: "-2.4%", icon: Users, positive: false },
  ];

  const orders = [
    { id: "#ORD-001", customer: "Olivia Martin", product: "Classic Watch", date: "Nov 04, 2026", amount: "$120.00", status: "Completed" },
    { id: "#ORD-002", customer: "Jackson Lee", product: "Leather Bag", date: "Nov 03, 2026", amount: "$250.00", status: "Pending" },
    { id: "#ORD-003", customer: "Isabella Chen", product: "Sneakers", date: "Nov 02, 2026", amount: "$180.00", status: "Completed" },
    { id: "#ORD-004", customer: "William Kim", product: "Headphones", date: "Nov 01, 2026", amount: "$95.00", status: "Cancelled" },
    { id: "#ORD-005", customer: "Sophia Brown", product: "Smart Watch", date: "Oct 31, 2026", amount: "$320.00", status: "Pending" },
  ];

  const sales = [35, 55, 42, 75, 50, 85, 65, 95, 60, 78, 55, 90];

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
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={item.name}
                onClick={() => { setSidebarOpen(false); navigate(item.to); }}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${index === 0 ? "bg-black text-white" : "text-gray-500 hover:bg-gray-100 hover:text-black"}`}
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
              <h2 className="text-lg font-bold">Dashboard</h2>
              <p className="hidden text-xs text-gray-400 sm:block">Welcome back to your store</p>
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

        <section className="space-y-8 p-5 md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold">Overview</h1>
              <p className="mt-1 text-sm text-gray-400">Here's what's happening with your store today.</p>
            </div>
            <button onClick={() => navigate("/product/create")} className="rounded-xl bg-black px-5 py-3 text-sm font-medium text-white hover:bg-gray-800">
              + Add Product
            </button>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">{item.title}</p>
                    <div className="rounded-xl bg-gray-100 p-2.5"><Icon size={20} /></div>
                  </div>
                  <h2 className="mt-5 text-2xl font-bold">{item.value}</h2>
                  <div className="mt-3 flex items-center gap-2">
                    {item.positive ? <ArrowUpRight size={16} className="text-green-600" /> : <ArrowDownRight size={16} className="text-red-500" />}
                    <span className={`text-xs font-semibold ${item.positive ? "text-green-600" : "text-red-500"}`}>{item.change}</span>
                    <span className="text-xs text-gray-400">from last month</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm xl:col-span-2 md:p-7">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold">Sales Overview</h2>
                  <p className="mt-1 text-sm text-gray-400">Monthly sales performance</p>
                </div>
                <select className="rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none">
                  <option>Last 12 months</option>
                  <option>Last 6 months</option>
                </select>
              </div>
              <div className="mt-8 flex h-64 items-end justify-between gap-2 border-b border-gray-100 px-1">
                {sales.map((height, index) => (
                  <div key={index} className="flex h-full flex-1 flex-col justify-end">
                    <div style={{ height: `${height}%` }} className={`w-full rounded-t-md transition-all hover:bg-gray-500 ${index === 7 ? "bg-black" : "bg-gray-200"}`} />
                  </div>
                ))}
              </div>
              <div className="mt-3 flex justify-between text-xs text-gray-400">
                {["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map((m) => <span key={m}>{m}</span>)}
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm md:p-7">
              <h2 className="text-lg font-bold">Sales Summary</h2>
              <p className="mt-1 text-sm text-gray-400">This month's performance</p>
              <div className="my-8">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm text-gray-500">Total Sales</span>
                  <TrendingUp size={19} />
                </div>
                <h2 className="text-3xl font-bold">$12,450</h2>
                <p className="mt-2 text-xs text-green-600">+18.5% compared to last month</p>
              </div>
              <div className="space-y-5">
                {[
                  { name: "Online Sales", amount: "$8,450", width: "75%" },
                  { name: "Store Sales", amount: "$4,000", width: "45%" },
                ].map((item) => (
                  <div key={item.name}>
                    <div className="mb-2 flex justify-between text-sm">
                      <span className="text-gray-500">{item.name}</span>
                      <span className="font-semibold">{item.amount}</span>
                    </div>
                    <div className="h-2 rounded-full bg-gray-100">
                      <div style={{ width: item.width }} className="h-full rounded-full bg-black" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="flex items-center justify-between p-5 md:p-7">
              <div>
                <h2 className="text-lg font-bold">Recent Orders</h2>
                <p className="mt-1 text-sm text-gray-400">Latest orders from your customers</p>
              </div>
              <button className="text-sm font-semibold text-gray-500 hover:text-black">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[750px] text-left text-sm">
                <thead className="bg-gray-50 text-xs uppercase text-gray-400">
                  <tr>
                    <th className="px-6 py-4">Order ID</th>
                    <th className="px-6 py-4">Customer</th>
                    <th className="px-6 py-4">Product</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-5 font-semibold">{order.id}</td>
                      <td className="px-6 py-5">{order.customer}</td>
                      <td className="px-6 py-5 text-gray-500">{order.product}</td>
                      <td className="px-6 py-5 text-gray-500">{order.date}</td>
                      <td className="px-6 py-5 font-semibold">{order.amount}</td>
                      <td className="px-6 py-5">
                        <span className={`rounded-full px-3 py-1.5 text-xs font-medium ${order.status === "Completed" ? "bg-green-50 text-green-700" : order.status === "Pending" ? "bg-yellow-50 text-yellow-700" : "bg-red-50 text-red-600"}`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p className="pb-3 text-center text-xs text-gray-400">© 2026 myShop. All rights reserved.</p>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
