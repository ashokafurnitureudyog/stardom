"use client";
import React, { useState } from "react";
import {
  LayoutGrid,
  Box,
  Users,
  Building2,
  MessageSquare,
  Image,
  Star,
  Package,
  Search,
  Bell,
  ChevronDown,
  Plus,
  Edit2,
  Trash2,
  Upload,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  featured: boolean;
  image: string;
  description?: string;
}

interface SidebarItem {
  id: string;
  icon: React.ElementType;
  label: string;
}

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("products");

  const sidebarItems: SidebarItem[] = [
    { id: "products", icon: Package, label: "Products" },
    { id: "featured", icon: Star, label: "Featured Items" },
    { id: "categories", icon: LayoutGrid, label: "Categories" },
    { id: "inventory", icon: Box, label: "Inventory" },
    { id: "testimonials", icon: MessageSquare, label: "Testimonials" },
    { id: "portfolio", icon: Image, label: "Portfolio" },
    { id: "company", icon: Building2, label: "Company Info" },
    { id: "users", icon: Users, label: "User Management" },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "products":
        return <ProductsSection />;
      case "featured":
        return <FeaturedSection />;
      default:
        return <div className="text-muted-foreground">Select a section</div>;
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 bg-card border-r shadow-sm p-4">
        <div className="mb-8">
          <h1 className="text-2xl font-extralight tracking-tight mb-2">
            STARDOM
          </h1>
          <p className="text-sm text-muted-foreground">Admin Dashboard</p>
        </div>

        <nav className="space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeSection === item.id
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:bg-secondary"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="h-16 border-b bg-card px-8 flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input placeholder="Search..." className="pl-9 bg-background" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full text-[10px] text-primary-foreground flex items-center justify-center">
                3
              </span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="/api/placeholder/32/32" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-8 overflow-auto">
          <div className="max-w-6xl mx-auto">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};

const ProductsSection = () => {
  const [products] = useState<Product[]>([
    {
      id: 1,
      name: "Executive Desk X1",
      category: "Desks",
      price: 2499,
      stock: 5,
      featured: true,
      image: "/api/placeholder/400/300",
      description: "Premium executive desk with modern design",
    },
    {
      id: 2,
      name: "Ergonomic Chair Pro",
      category: "Chairs",
      price: 899,
      stock: 12,
      featured: false,
      image: "/api/placeholder/400/300",
      description: "Professional ergonomic office chair",
    },
  ]);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-light mb-2">Products</h2>
          <p className="text-muted-foreground">Manage your product catalog</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="lg" className="gap-2">
              <Plus className="w-4 h-4" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
              <DialogDescription>
                Create a new product in your catalog
              </DialogDescription>
            </DialogHeader>
            <ProductForm />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="group overflow-hidden">
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover transition-transform group-hover:scale-105"
              />
              {product.featured && (
                <Badge className="absolute top-4 right-4">Featured</Badge>
              )}
            </div>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{product.name}</CardTitle>
                  <CardDescription className="mt-1">
                    {product.category}
                  </CardDescription>
                </div>
                <span className="text-lg font-semibold">
                  ${product.price.toLocaleString()}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Stock: {product.stock}
                </span>
                <div className="space-x-2">
                  <Button variant="outline" size="sm" className="gap-1">
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm" className="gap-1">
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const ProductForm = () => {
  return (
    <form className="space-y-6">
      <div className="flex justify-center p-6 border-2 border-dashed rounded-lg bg-secondary/50">
        <div className="text-center">
          <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
          <div className="text-sm text-muted-foreground">
            Drag & drop product image or
            <Button variant="link" className="px-1">
              browse
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Product Name</Label>
          <Input id="name" placeholder="Enter product name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="desks">Desks</SelectItem>
              <SelectItem value="chairs">Chairs</SelectItem>
              <SelectItem value="storage">Storage</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">Price</Label>
          <Input id="price" type="number" placeholder="Enter price" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="stock">Stock</Label>
          <Input id="stock" type="number" placeholder="Enter stock quantity" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Enter product description"
          className="h-32"
        />
      </div>

      <div className="flex justify-end space-x-2">
        <Button variant="outline">Cancel</Button>
        <Button type="submit">Save Product</Button>
      </div>
    </form>
  );
};

const FeaturedSection = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-light mb-2">Featured Items</h2>
          <p className="text-muted-foreground">
            Manage featured products and categories
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Featured Products</CardTitle>
            <CardDescription>
              Select products to feature on the homepage
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-secondary/50 rounded-lg">
              <img
                src="/api/placeholder/80/80"
                alt="Product"
                className="w-20 h-20 rounded-md object-cover"
              />
              <div className="flex-1">
                <h4 className="font-medium">Executive Desk X1</h4>
                <p className="text-sm text-muted-foreground">
                  Featured position: 1
                </p>
              </div>
              <Button variant="ghost" size="icon">
                <ChevronDown className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Featured Categories</CardTitle>
            <CardDescription>Select categories to highlight</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-secondary/50 rounded-lg">
              <div className="w-20 h-20 rounded-md bg-primary/10 flex items-center justify-center">
                <Package className="w-8 h-8 text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium">Executive Furniture</h4>
                <p className="text-sm text-muted-foreground">
                  Featured position: 1
                </p>
              </div>
              <Button variant="ghost" size="icon">
                <ChevronDown className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
