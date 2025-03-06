// components/FormField.tsx
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Eye, EyeOff } from "lucide-react";

export const FormField = ({
  label,
  id,
  type = "text",
  icon,
  error,
  placeholder,
  required = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label htmlFor={id} className="text-sm font-medium">
          {label}
        </Label>
        {error && (
          <span className="text-xs text-red-500 flex items-center gap-1">
            <AlertCircle size={12} />
            {error}
          </span>
        )}
      </div>
      <div className="relative">
        <div className="absolute left-3 top-3 text-gray-400">{icon}</div>
        <Input
          id={id}
          name={id}
          type={inputType}
          className={`pl-10 ${
            error ? "border-red-500 focus-visible:ring-red-300" : ""
          }`}
          placeholder={placeholder}
          required={required}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 focus:outline-none"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </div>
  );
};
