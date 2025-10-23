'use client';

import { useState, useRef } from 'react';
import { Button } from './button';
import { Card } from './card';
import { Upload, X, Image as ImageIcon, FileText } from 'lucide-react';

interface FileUploadProps {
  onUpload: (url: string, key: string) => void;
  onDelete?: (key: string) => void;
  folder?: string;
  accept?: string;
  maxSize?: number;
  className?: string;
}

interface UploadedFile {
  url: string;
  key: string;
  filename: string;
  type: string;
}

export function FileUpload({
  onUpload,
  onDelete,
  folder = 'images',
  accept = 'image/*',
  maxSize = 10 * 1024 * 1024, // 10MB
  className = '',
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setError(null);
    setUploading(true);

    try {
      // Validate file size
      if (file.size > maxSize) {
        throw new Error(`ไฟล์ใหญ่เกินไป ขนาดสูงสุด ${Math.round(maxSize / 1024 / 1024)}MB`);
      }

      // Validate file type
      const allowedTypes = accept.split(',').map(type => type.trim());
      const isAllowed = allowedTypes.some(type => {
        if (type.includes('*')) {
          return file.type.startsWith(type.replace('*', ''));
        }
        return file.type === type;
      });

      if (!isAllowed) {
        throw new Error(`ประเภทไฟล์ไม่ถูกต้อง กรุณาเลือกไฟล์ประเภท: ${accept}`);
      }

      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'เกิดข้อผิดพลาดในการอัปโหลด');
      }

      const uploadedFile: UploadedFile = {
        url: result.url,
        key: result.key,
        filename: result.filename,
        type: file.type,
      };

      setUploadedFiles(prev => [...prev, uploadedFile]);
      onUpload(result.url, result.key);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาด');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDelete = async (key: string) => {
    try {
      const response = await fetch(`/api/upload?key=${encodeURIComponent(key)}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (result.success) {
        setUploadedFiles(prev => prev.filter(file => file.key !== key));
        onDelete?.(key);
      } else {
        setError(result.error || 'เกิดข้อผิดพลาดในการลบไฟล์');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาด');
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    // Create a fake event for handleFileSelect
    const fakeEvent = {
      target: {
        files: [file]
      }
    } as React.ChangeEvent<HTMLInputElement>;

    await handleFileSelect(fakeEvent);
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) {
      return <ImageIcon className="w-4 h-4" />;
    }
    return <FileText className="w-4 h-4" />;
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <Card 
        className={`p-6 border-2 border-dashed transition-colors ${
          isDragOver 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="text-center">
          <Upload className={`w-8 h-8 mx-auto mb-2 ${isDragOver ? 'text-blue-500' : 'text-gray-400'}`} />
          <p className={`text-sm mb-4 ${isDragOver ? 'text-blue-600' : 'text-gray-600'}`}>
            {isDragOver 
              ? 'ปล่อยไฟล์ที่นี่' 
              : 'คลิกเพื่อเลือกไฟล์หรือลากไฟล์มาวางที่นี่'
            }
          </p>
          <Button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            variant="outline"
          >
            {uploading ? 'กำลังอัปโหลด...' : 'เลือกไฟล์'}
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      </Card>

      {error && (
        <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
          {error}
        </div>
      )}

      {uploadedFiles.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium">ไฟล์ที่อัปโหลดแล้ว:</h4>
          {uploadedFiles.map((file) => (
            <div
              key={file.key}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
            >
              <div className="flex items-center space-x-3">
                {file.type.startsWith('image/') ? (
                  <img
                    src={file.url}
                    alt={file.filename}
                    className="w-12 h-12 object-cover rounded-md"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center">
                    {getFileIcon(file.type)}
                  </div>
                )}
                <div className="flex flex-col">
                  <span className="text-sm text-gray-700 font-medium">{file.filename}</span>
                  <span className="text-xs text-gray-500">{file.type}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <a
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 text-sm px-2 py-1 rounded hover:bg-blue-50"
                >
                  ดู
                </a>
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={() => handleDelete(file.key)}
                  className="text-red-600 hover:text-red-800 hover:bg-red-50 p-1"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
