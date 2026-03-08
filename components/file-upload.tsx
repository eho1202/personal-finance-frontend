"use client";

import React, { useState, useCallback } from "react";
import { IconUpload } from "@tabler/icons-react";
import { MIME_TYPES } from "@/constants";

export default function FileUpload({
  onFileSelect,
  allowedTypes = ['pdf'],
  maxSize = 5,
  formatHint = "Format: Month_Year.pdf (e.g. April_2025.pdf)",
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFile = useCallback(
    (file: File) => {
      const allowedMimes = allowedTypes.map((type) => MIME_TYPES[type]).filter(Boolean);

      if (!allowedMimes.includes(file.type)) {
      setError(`File type not allowed. Allowed: ${allowedTypes.map((t) => `.${t}`).join(", ")}`)
      return
    }

      if (file.size > maxSize * 1024 * 1024) {
        setError(`File too large. Maximum: ${maxSize}MB`);
        return;
      }

      setError(null);
      setSelectedFile(file);
      onFileSelect(file);
    },
    [allowedTypes, maxSize, onFileSelect]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      const dropped = e.dataTransfer.files?.[0];
      if (dropped) handleFile(dropped);
    },
    [handleFile]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selected = e.target.files?.[0];
      if (selected) handleFile(selected);
    },
    [handleFile]
  );

  return (
    <div className="space-y-1.5">
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
          ${isDragging
            ? "border-primary bg-primary/5"
            : "border-muted hover:border-primary/50"
          }`}
        onClick={() => document.getElementById("file-upload-input")?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          id="file-upload-input"
          type="file"
          accept={allowedTypes.map(type => `.${type}`).join(', ')}
          className="hidden"
          onChange={handleInputChange}
        />
        <IconUpload
          className={`w-6 h-6 mx-auto mb-2 transition-colors ${isDragging ? "text-primary" : "text-muted-foreground"
            }`}
        />
        {selectedFile ? (
          <p className="text-sm font-medium">{selectedFile.name}</p>
        ) : (
          <p className="text-sm text-muted-foreground">
            {isDragging ? (
              <span className="text-primary font-medium">Drop your file here</span>
            ) : (
              <>
                Drag and drop or click to upload
                <br />
                <span className="text-xs">Allowed formats: {allowedTypes.map(type => `.${type}`).join(', ')}</span>
                <br />
                <span className="text-xs">{formatHint}</span>
              </>
            )}
          </p>
        )}
      </div>

      {error && (
        <p className="text-xs text-red-500">{error}</p>
      )}
    </div>
  );
}