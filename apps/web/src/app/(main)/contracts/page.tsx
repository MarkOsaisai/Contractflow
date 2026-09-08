"use client";

import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, Button } from "@/components/ui";
import { apiClient } from "@/lib/api";
import { Contract } from "@/types";

export default function ContractsPage() {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    apiClient
      .get<Contract[]>("/contracts")
      .then((response) => setContracts(response.data))
      .catch(() => setError("Failed to load contracts"))
      .finally(() => setIsLoading(false));
  }, []);

  const stageColors: Record<string, string> = {
    BID: "bg-blue-100 text-blue-800",
    AWARD: "bg-purple-100 text-purple-800",
    MOBILIZATION: "bg-yellow-100 text-yellow-800",
    EXECUTION: "bg-green-100 text-green-800",
    COMPLETION: "bg-orange-100 text-orange-800",
    COMMISSIONING: "bg-teal-100 text-teal-800",
    CLOSED: "bg-slate-100 text-slate-800",
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Contracts</h1>
            <p className="text-slate-600 mt-2">Manage all your contracts</p>
          </div>
          <Button variant="primary">New Contract</Button>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-slate-600">Loading contracts...</p>
          </div>
        ) : error ? (
          <Card>
            <div className="text-center py-12">
              <p className="text-red-600 text-lg">{error}</p>
            </div>
          </Card>
        ) : contracts.length === 0 ? (
          <Card>
            <div className="text-center py-12">
              <p className="text-slate-600 text-lg">No contracts yet</p>
              <p className="text-slate-500 mt-2">
                Create your first contract to get started
              </p>
            </div>
          </Card>
        ) : (
          <div className="space-y-4">
            {contracts.map((contract) => (
              <Card key={contract.id}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold text-slate-900">
                        {contract.title}
                      </h3>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          stageColors[contract.stage]
                        }`}
                      >
                        {contract.stage}
                      </span>
                    </div>
                    <p className="text-slate-600 mt-2">
                      Reference: {contract.reference}
                    </p>
                    <div className="flex gap-6 mt-4 text-sm">
                      <div>
                        <p className="text-slate-600">Client</p>
                        <p className="font-medium text-slate-900">
                          {contract.clientOrganization?.name || "—"}
                        </p>
                      </div>
                      <div>
                        <p className="text-slate-600">Status</p>
                        <p className="font-medium text-slate-900">
                          {contract.status}
                        </p>
                      </div>
                      <div>
                        <p className="text-slate-600">Last Updated</p>
                        <p className="font-medium text-slate-900">
                          {new Date(contract.updatedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="secondary" size="sm">
                      View
                    </Button>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
