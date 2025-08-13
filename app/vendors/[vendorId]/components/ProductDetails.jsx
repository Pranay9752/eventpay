"use client";
import React, { useState, useMemo } from "react";
import {
  Search,
  Filter,
  Edit,
  Trash2,
  Plus,
  Calendar,
  DollarSign,
  Package,
  Eye,
  MoreVertical,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const ProductDetails = ({ products = [] }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [editingProduct, setEditingProduct] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  //   const [products, setProducts] = useState([
  //     {
  //       _id: "68943b654feeddd49b791d46",
  //       productId: "PROD7894",
  //       vendorId: "VEND7822",
  //       prices: 1100.99,
  //       imageLink: [
  //         "https://pub-587c434b50b54fe78a5825017b04c9a0.r2.dev/1754544994487-farhad-ibrahimzade-Sk6my6_KTK0-unsplash.jpg",
  //       ],
  //       title: "Greek Pizza California",
  //       createdAt: "2025-08-07T05:36:37.669Z",
  //       updatedAt: "2025-08-07T05:36:37.669Z",
  //       __v: 0,
  //     },
  //     {
  //       _id: "68943b884feeddd49b791d48",
  //       productId: "PROD9357",
  //       vendorId: "VEND7822",
  //       prices: 1100.99,
  //       imageLink: [
  //         "https://pub-587c434b50b54fe78a5825017b04c9a0.r2.dev/1754545028832-haseeb-jamil-J9lD6FS6_cs-unsplash.jpg",
  //       ],
  //       title: "Mediterranean Delight",
  //       createdAt: "2025-08-07T05:37:12.441Z",
  //       updatedAt: "2025-08-07T05:37:12.441Z",
  //       __v: 0,
  //     },
  //     {
  //       _id: "68943b974feeddd49b791d4a",
  //       productId: "PROD9430",
  //       vendorId: "VEND7822",
  //       prices: 1100.99,
  //       imageLink: [
  //         "https://pub-587c434b50b54fe78a5825017b04c9a0.r2.dev/1754545044484-janice-lin-yUIN4QWKCTw-unsplash.jpg",
  //         "https://pub-587c434b50b54fe78a5825017b04c9a0.r2.dev/1754545046451-nicolas-perondi-UxRhrU8fPHQ-unsplash.jpg",
  //       ],
  //       title: "California Special",
  //       createdAt: "2025-08-07T05:37:27.932Z",
  //       updatedAt: "2025-08-07T05:37:27.932Z",
  //       __v: 0,
  //     },
  //     {
  //       _id: "68943ba34feeddd49b791d4c",
  //       productId: "PROD1231",
  //       vendorId: "VEND7822",
  //       prices: 1100.99,
  //       imageLink: [
  //         "https://pub-587c434b50b54fe78a5825017b04c9a0.r2.dev/1754545057585-pixzolo-photography-3tL4vtrFqTQ-unsplash.jpg",
  //       ],
  //       title: "Artisan Greek Pizza",
  //       createdAt: "2025-08-07T05:37:39.515Z",
  //       updatedAt: "2025-08-07T05:37:39.515Z",
  //       __v: 0,
  //     },
  //     {
  //       _id: "68943bb24feeddd49b791d4e",
  //       productId: "PROD9662",
  //       vendorId: "VEND7822",
  //       prices: 1100.99,
  //       imageLink: [
  //         "https://pub-587c434b50b54fe78a5825017b04c9a0.r2.dev/1754545070290-ulvi-safari-9-_8faGPQrU-unsplash.jpg",
  //         "https://pub-587c434b50b54fe78a5825017b04c9a0.r2.dev/1754545072839-ulvi-safari-Mb6M52y_flw-unsplash.jpg",
  //       ],
  //       title: "Supreme Greek Fusion",
  //       createdAt: "2025-08-07T05:37:54.901Z",
  //       updatedAt: "2025-08-07T05:37:54.901Z",
  //       __v: 0,
  //     },
  //   ]);

  // Simulate server-side filtering and sorting

  const filteredProducts = useMemo(() => {
    let filtered = products.filter(
      (product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.productId.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Price filtering
    if (priceFilter !== "all") {
      if (priceFilter === "under1000") {
        filtered = filtered.filter((product) => product.prices < 1000);
      } else if (priceFilter === "over1000") {
        filtered = filtered.filter((product) => product.prices >= 1000);
      }
    }

    // Sorting
    if (sortBy === "newest") {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === "oldest") {
      filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sortBy === "price-high") {
      filtered.sort((a, b) => b.prices - a.prices);
    } else if (sortBy === "price-low") {
      filtered.sort((a, b) => a.prices - b.prices);
    } else if (sortBy === "name") {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    }

    return filtered;
  }, [products, searchQuery, priceFilter, sortBy]);

  const handleDeleteProduct = (productId) => {
    // Simulate server-side delete
    // setProducts(products.filter((product) => product.productId !== productId));
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setIsEditModalOpen(true);
  };

  const handleSaveProduct = (updatedProduct) => {
    // Simulate server-side update
    // setProducts(
    //   products.map((product) =>
    //     product.productId === updatedProduct.productId
    //       ? updatedProduct
    //       : product
    //   )
    // );
    setIsEditModalOpen(false);
    setEditingProduct(null);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <>
      {/* Filters and Search */}
      <Card className=" backdrop-blur-sm border-0 shadow-none mb-4 p-0">
        <CardContent className="p-0">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search products or product IDs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/80 border-slate-200 focus:border-blue-400"
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 lg:gap-2">
              <Select value={priceFilter} onValueChange={setPriceFilter}>
                <SelectTrigger className="w-full sm:w-40 bg-white/80 border-slate-200">
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="under1000">Under $1000</SelectItem>
                  <SelectItem value="over1000">Over $1000</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-40 bg-white/80 border-slate-200">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="name">Name A-Z</SelectItem>
                  <SelectItem value="price-high">Price High-Low</SelectItem>
                  <SelectItem value="price-low">Price Low-High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products List */}
      <div className="space-y-4">
        {filteredProducts.map((product) => (
          <Card
            key={product._id}
            className="bg-white/70 backdrop-blur-sm border  shadow-lg hover:shadow-xl transition-all duration-300 p-0"
          >
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Product Image */}
                <div className="w-full lg:w-32 h-48 lg:h-32 flex-shrink-0">
                  <img
                    src={product?.imageLink?.[0]}
                    alt={product?.title || ""}
                    className="w-full h-full object-cover rounded-lg bg-gradient-to-br from-orange-100 to-yellow-100"
                    onError={(e) => {
                      e.target.src =
                        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmVmM2UyIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzk5NzI2YSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==";
                    }}
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-slate-900 mb-2">
                        {product.title || ""}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 mb-4">
                        <Badge
                          variant="outline"
                          className="bg-blue-50 text-blue-700 border-blue-200"
                        >
                          {product.productId || ""}
                        </Badge>
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          Created: {formatDate(product.createdAt)}
                        </span>
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          Updated: {formatDate(product.updatedAt)}
                        </span>
                      </div>
                      <div className="text-2xl font-bold text-green-600">
                        {formatPrice(product.prices || 0)}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditProduct(product)}
                        className="bg-white/80 border-slate-200 text-slate-700 hover:bg-slate-50"
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-white/80 border-red-200 text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-white/95 backdrop-blur-sm">
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Product</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete "{product.title}
                              "? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() =>
                                handleDeleteProduct(product.productId)
                              }
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-12 text-center">
            <Package className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              No products found
            </h3>
            <p className="text-slate-600">
              Try adjusting your search or filters
            </p>
          </CardContent>
        </Card>
      )}

      {/* Edit Product Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="bg-white/95 backdrop-blur-sm max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>
              Update your product information below.
            </DialogDescription>
          </DialogHeader>
          {editingProduct && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Product Title</Label>
                  <Input
                    id="title"
                    defaultValue={editingProduct.title}
                    className="bg-white/80"
                  />
                </div>
                <div>
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    defaultValue={editingProduct.prices}
                    className="bg-white/80"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="productId">Product ID</Label>
                <Input
                  id="productId"
                  defaultValue={editingProduct.productId}
                  className="bg-white/80"
                  disabled
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter product description..."
                  className="bg-white/80"
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="images">Image URLs (one per line)</Label>
                <Textarea
                  id="images"
                  defaultValue={editingProduct.imageLink.join("\n")}
                  className="bg-white/80"
                  rows={3}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => handleSaveProduct(editingProduct)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductDetails;
