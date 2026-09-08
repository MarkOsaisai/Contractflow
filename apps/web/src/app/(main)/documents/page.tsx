"use client";

import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, Button } from "@/components/ui";
import { apiClient } from "@/lib/api";
import { Document } from "@/types";

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    apiClient
      .get<Document[]>("/documents")
      .then((response) => setDocuments(response.data))
      .catch(() => setError("Failed to load documents"))
      .finally(() => setIsLoading(false));
  }, []);

  const categoryEmojis: Record<string, string> = {
    insurance: "🛡️",
    permit: "📜",
    certification: "✅",
    contract: "📋",
    compliance: "✓",
    other: "📄",
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB";
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Documents</h1>
            <p className="text-slate-600 mt-2">
              Manage and track your contract documents
            </p>
          </div>
          <Button variant="primary">Upload Document</Button>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-slate-600">Loading documents...</p>
          </div>
        ) : error ? (
          <Card>
            <div className="text-center py-12">
              <p className="text-red-600 text-lg">{error}</p>
            </div>
          </Card>
        ) : documents.length === 0 ? (
          <Card>
            <div className="text-center py-12">
              <p className="text-slate-600 text-lg">No documents yet</p>
              <p className="text-slate-500 mt-2">
                Upload documents to get started
              </p>
            </div>
          </Card>
        ) : (
          <div className="space-y-4">
            {documents.map((doc) => {
              const latest = doc.versions?.[0];
              return (
                <Card key={doc.id}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1 flex gap-4">
                      <div className="text-3xl">
                        {categoryEmojis[doc.category] || "📄"}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-slate-900">
                          {doc.name}
                        </h3>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                            {doc.category}
                          </span>
                          <span className="text-sm text-slate-600">
                            v{doc.currentVersion}
                          </span>
                          {latest && (
                            <span className="text-sm text-slate-600">
                              {formatFileSize(latest.sizeBytes)}
                            </span>
                          )}
                          <span className="text-sm text-slate-600">
                            Updated{" "}
                            {new Date(doc.updatedAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="secondary" size="sm">
                        Download
                      </Button>
                      <Button variant="ghost" size="sm">
                        Delete
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
