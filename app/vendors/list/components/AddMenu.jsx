"use client";
import React, { useState } from "react";
import {
  Plus,
  Download,
  Upload,
  Eye,
  Check,
  X,
  FileSpreadsheet,
  Sparkles,
  ChefHat,
  Coffee,
} from "lucide-react";
import * as XLSX from "xlsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { createProductAction } from "../../actions/products";

const BulkMenuUploader = ({ vendor_id, children }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [step, setStep] = useState("upload"); // 'upload', 'preview', 'success'
  const [uploadedData, setUploadedData] = useState([]);
  const [fileName, setFileName] = useState("");

  // Sample data for Excel template
  const sampleData = [
    {
      title: "Classic Margherita Pizza",
      prices: "12.99",
      images: "https://example.com/margherita.jpg",
    },
    {
      title: "Chicken Caesar Salad",
      prices: "8.99",
      images: "https://example.com/caesar.jpg",
    },
    {
      title: "Grilled Salmon",
      prices: "18.99",
      images: "https://example.com/salmon.jpg",
    },
    {
      title: "Chocolate Lava Cake",
      prices: "6.99",
      images: "https://example.com/chocolate.jpg",
    },
  ];

  const downloadExcelTemplate = () => {
    const worksheet = XLSX.utils.json_to_sheet(sampleData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Menu Items");

    // Add some styling info in comments
    const range = XLSX.utils.decode_range(worksheet["!ref"]);
    for (let col = range.s.c; col <= range.e.c; col++) {
      const cellAddress = XLSX.utils.encode_cell({ r: 0, c: col });
      if (worksheet[cellAddress]) {
        worksheet[cellAddress].s = {
          font: { bold: true },
          fill: { fgColor: { rgb: "E5E7EB" } },
        };
      }
    }

    XLSX.writeFile(workbook, "menu_template.xlsx");
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        setUploadedData(jsonData);
        setStep("preview");
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleConfirmUpload = async () => {
    setStep("success");

    try {
      if (uploadedData?.length) {
        await Promise.all(
          uploadedData.map((product) => {
            createProductAction({
              title: product.title,
              images: product.images || null,
              prices: product.prices,
              vendorId: vendor_id,
            });
          })
        );
      }

      setDialogOpen(false);
      setStep("upload");
      setUploadedData([]);
      setFileName("");
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const renderUploadStep = () => (
    <DialogContent className="bg-gradient-to-br from-purple-50 to-pink-50">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2 text-purple-800">
          <ChefHat className="w-5 h-5" />
          Bulk Add Menu Items
        </DialogTitle>
        <DialogDescription className="text-purple-600">
          Download our template, add your menu items, and upload to bulk import!
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-4">
        <Card className="border-purple-200 bg-white/70">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">1</span>
              </div>
              <h4 className="font-semibold text-green-800">
                Download Template
              </h4>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Get our Excel template with sample menu items to see the format.
            </p>
            <Button
              onClick={downloadExcelTemplate}
              variant="secondary"
              className="w-full"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Excel Template
            </Button>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-white/70">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">2</span>
              </div>
              <h4 className="font-semibold text-blue-800">Fill Your Data</h4>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Add your menu items with title, prices, and image URLs.
            </p>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="bg-purple-100 p-2 rounded text-purple-800">
                <strong>Title:</strong> Menu item name
              </div>
              <div className="bg-pink-100 p-2 rounded text-pink-800">
                <strong>Prices:</strong> Price (e.g., 12.99)
              </div>
              <div className="bg-blue-100 p-2 rounded text-blue-800">
                <strong>Images:</strong> Image URL
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-white/70">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">3</span>
              </div>
              <h4 className="font-semibold text-orange-800">Upload File</h4>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Upload your completed Excel file to import all items at once.
            </p>
            <div className="relative">
              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFileUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <Button className="w-full bg-gradient-to-r from-orange-400 to-red-400 hover:from-orange-500 hover:to-red-500">
                <Upload className="w-4 h-4 mr-2" />
                Upload Excel File
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DialogContent>
  );

  const renderPreviewStep = () => (
    <DialogContent className="bg-gradient-to-br from-blue-50 to-cyan-50 max-w-4xl w-full">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2 text-blue-800">
          <Eye className="w-5 h-5" />
          Preview Import ({uploadedData.length} items)
        </DialogTitle>
        <DialogDescription className="text-blue-600">
          Review your menu items before importing. File: {fileName}
        </DialogDescription>
      </DialogHeader>

      {/* <div className="max-h-96 overflow-y-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Image URL</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {uploadedData.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{item.title}</TableCell>
                <TableCell className="text-green-600 font-semibold">
                  ${item.prices}
                </TableCell>
                <TableCell className="text-blue-600 text-xs truncate max-w-xs">
                  {item.images}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div> */}

      <div className="max-h-96 overflow-y-auto space-y-3 p-1">
        {uploadedData.map((item, index) => (
          <div
            key={index}
            className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-blue-200 hover:border-blue-300 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              {/* Item Number Badge */}
              <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm">
                  {index + 1}
                </span>
              </div>

              {/* Item Image */}
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg overflow-hidden flex-shrink-0">
                {item.images ? (
                  <img
                    src={item.images}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                ) : null}
                <div className="w-full h-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                  <FileSpreadsheet className="w-6 h-6 text-purple-600" />
                </div>
              </div>

              {/* Item Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 text-base mb-2 line-clamp-2">
                      {item.title}
                    </h4>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-2 bg-green-50 px-3 py-1 rounded-full">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="font-semibold text-green-700">
                          ${item.prices}
                        </span>
                      </span>
                      <span className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span className="text-blue-700 text-xs">
                          Image Ready
                        </span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Image URL Preview */}
                <div className="mt-3 p-2 bg-gray-50 rounded text-xs text-gray-500 truncate">
                  🔗 {item.images}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2 mt-4">
        <Button
          onClick={() => setStep("upload")}
          variant="outline"
          className="flex-1"
        >
          <X className="w-4 h-4 mr-2" />
          Cancel
        </Button>
        <Button
          onClick={handleConfirmUpload}
          className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
        >
          <Check className="w-4 h-4 mr-2" />
          Confirm Import
        </Button>
      </div>
    </DialogContent>
  );

  const renderSuccessStep = () => (
    <DialogContent className="bg-gradient-to-br from-green-50 to-emerald-50 text-center">
      <div className="space-y-4">
        <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center mx-auto animate-pulse">
          <Check className="w-8 h-8 text-white" />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-green-800 flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5" />
            Success!
          </h3>
          <p className="text-green-600">
            {uploadedData.length} menu items have been imported successfully!
          </p>
        </div>
        <div className="flex items-center justify-center gap-2 text-sm text-green-700">
          <Coffee className="w-4 h-4" />
          <span>Your menu is now updated and ready to serve!</span>
        </div>
      </div>
    </DialogContent>
  );

  return (
    <>
      <div onClick={() => setDialogOpen(true)}>
        {/* <Plus className="w-4 h-4    " />
        Add Menu */}
        {children}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        {step === "upload" && renderUploadStep()}
        {step === "preview" && renderPreviewStep()}
        {step === "success" && renderSuccessStep()}
      </Dialog>
    </>
  );
};

export default BulkMenuUploader;
