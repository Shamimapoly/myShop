import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  Search,
  Heart,
  Menu,
  Headphones,
  Shirt,
  House,
  Flower2,
  Dumbbell,
  BookOpen,
  Gamepad2,
  Grid2X2,
  Truck,
  ChevronDown,
  ArrowRight,
} from "lucide-react";

const Products = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Products");

  const products = [
    { id: 1, title: "Wireless Earbuds", price: 49.99, category: "Electronics", image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=500" },
    { id: 2, title: "Smart Watch", price: 89.99, category: "Electronics", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500" },
    { id: 3, title: "Backpack", price: 39.99, category: "Fashion", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500" },
    { id: 4, title: "Sneakers", price: 69.99, category: "Fashion", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500" },
    { id: 5, title: "Handbag", price: 59.99, category: "Fashion", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500" },
    { id: 6, title: "Perfume", price: 29.99, category: "Beauty", image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=500" },
    { id: 7, title: "Headphones", price: 79.99, category: "Electronics", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500" },
    { id: 8, title: "Gaming Controller", price: 59.99, category: "Electronics", image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=500" },
  ];

  const categories = [
    { name: "All Products", icon: Grid2X2 },
    { name: "Electronics", icon: Headphones },
    { name: "Fashion", icon: Shirt },
    { name: "Home & Living", icon: House },
    { name: "Beauty", icon: Flower2 },
    { name: "Sports", icon: Dumbbell },
    { name: "Books", icon: BookOpen },
    { name: "Toys", icon: Gamepad2 },
  ];

  const filteredProducts = products.filter((product) => {
    const matchSearch = product.title.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === "All Products" || product.category === category;
    return matchSearch && matchCategory;
  });

  const addToCart = (product) => {
    console.log("Selected product:", product);
    navigate("/cart");
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">

      {/* Hero Banner */}
      <section className="relative mx-5 mt-6 overflow-hidden rounded-2xl bg-gray-100">
        <div className="grid md:grid-cols-2 items-center min-h-[280px] px-8 md:px-16">

          <div className="py-12 z-10">
            <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">Discover something new</p>
            <h1 className="text-4xl md:text-6xl font-bold mt-3">Our Products</h1>
            <p className="text-gray-600 mt-4 text-lg">Discover the best products at the best price.</p>

            <button
              onClick={() => document.getElementById("product-list")?.scrollIntoView({ behavior: "smooth" })}
              className="mt-6 bg-black text-white px-7 py-3 rounded-full flex items-center gap-2 hover:bg-gray-800 transition"
            >
              Shop Smart <ArrowRight size={18} />
            </button>
          </div>

          <div className="hidden md:flex justify-center h-[280px]">
            <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=900" alt="Shopping" className="h-full w-full object-cover rounded-l-full" />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section id="product-list" className="max-w-[1500px] mx-auto px-5 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-7">

          {/* Sidebar */}
          <aside>
            <div className="border border-gray-200 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <Menu size={23} />
                <h2 className="text-xl font-bold">Categories</h2>
              </div>

              <div className="space-y-2">
                {categories.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.name}
                      onClick={() => setCategory(item.name)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition ${
                        category === item.name ? "bg-black text-white" : "hover:bg-gray-100 text-gray-700"
                      }`}
                    >
                      <Icon size={21} />
                      <span className="font-medium">{item.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 bg-black text-white rounded-2xl p-7">
              <Truck size={40} />
              <h3 className="text-2xl font-bold mt-5">Free Shipping</h3>
              <p className="text-gray-300 mt-2">On orders over $50</p>
            </div>
          </aside>

          {/* Products Section */}
          <main>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 flex items-center gap-3 border border-gray-200 rounded-full px-5 py-3">
                <Search size={21} className="text-gray-500" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full outline-none bg-transparent"
                />
              </div>

              <button className="border border-gray-200 rounded-full px-5 py-3 flex items-center justify-between gap-5">
                Sort by: Default
                <ChevronDown size={18} />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
              {filteredProducts.map((product) => (
                <div key={product.id} className="group border border-gray-200 rounded-2xl p-3 hover:shadow-lg transition duration-300">
                  <div className="relative overflow-hidden rounded-xl bg-gray-100">
                    <img src={product.image} alt={product.title} className="w-full h-52 object-cover group-hover:scale-105 transition duration-500" />
                    <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow"><Heart size={19} /></button>
                  </div>
                  <div className="p-2">
                    <p className="text-xs text-gray-500 mt-2">{product.category}</p>
                    <h3 className="font-bold text-lg mt-1">{product.title}</h3>
                    <p className="text-xl font-bold mt-2">${product.price.toFixed(2)}</p>
                    <button onClick={() => addToCart(product)} className="w-full mt-3 bg-black text-white py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-800 transition">
                      <ShoppingCart size={18} />
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-20">
                <h2 className="text-2xl font-bold">No products found!</h2>
                <p className="text-gray-500 mt-2">Try searching with another product name.</p>
              </div>
            )}
          </main>
        </div>
      </section>
    </div>
  );
};

export default Products;
