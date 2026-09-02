"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardHeader, CardBody } from "@/components/ui";
import { apiClient } from "@/lib/api";
import { Activity, Contract, Document, PaymentMilestone } from "@/types";

interface DashboardStats {
  activeContracts: number;
  totalDocuments: number;
  pendingPayments: number;
  totalActivities: number;
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    activeContracts: 0,
    totalDocuments: 0,
    pendingPayments: 0,
    totalActivities: 0,
  });
  const [recentActivities, setRecentActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      apiClient.get<Contract[]>("/contracts"),
      apiClient.get<Document[]>("/documents"),
      apiClient.get<PaymentMilestone[]>("/payments"),
      apiClient.get<Activity[]>("/activities"),
    ])
      .then(([contracts, documents, payments, activities]) => {
        setStats({
          activeContracts: contracts.data.filter((c) => c.status === "ACTIVE")
            .length,
          totalDocuments: documents.data.length,
          pendingPayments: payments.data.filter((p) => p.status !== "PAID")
            .length,
          totalActivities: activities.data.length,
        });
        setRecentActivities(activities.data.slice(0, 3));
      })
      .catch(() => {
        // Leave stats at zero if the API is unreachable
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Welcome, {user?.name}
          </h1>
          <p className="text-slate-600 mt-2">
            Here's an overview of your operations
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">
                {isLoading ? "…" : stats.activeContracts}
              </div>
              <p className="text-slate-600 mt-2">Active Contracts</p>
            </div>
          </Card>

          <Card>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600">
                {isLoading ? "…" : stats.totalDocuments}
              </div>
              <p className="text-slate-600 mt-2">Documents</p>
            </div>
          </Card>

          <Card>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600">
                {isLoading ? "…" : stats.pendingPayments}
              </div>
              <p className="text-slate-600 mt-2">Pending Payments</p>
            </div>
          </Card>

          <Card>
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600">
                {isLoading ? "…" : stats.totalActivities}
              </div>
              <p className="text-slate-600 mt-2">Recent Activities</p>
            </div>
          </Card>
        </div>

        {/* Recent Activity Section */}
        <Card className="mb-8">
          <CardHeader
            title="Recent Activity"
            description="Latest updates across your organization"
          />
          <CardBody>
            {recentActivities.length === 0 ? (
              <p className="text-slate-600">No recent activity</p>
            ) : (
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div
                    key={activity.id}
                    className={`flex items-start gap-4 ${
                      index < recentActivities.length - 1
                        ? "pb-4 border-b border-slate-200"
                        : ""
                    }`}
                  >
                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <p className="font-medium text-slate-900">
                        {activity.message}
                      </p>
                      <p className="text-sm text-slate-600 mt-1">
                        {activity.actor?.displayName || "System"} •{" "}
                        {new Date(activity.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardBody>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader title="Quick Actions" />
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button className="p-4 border-2 border-slate-200 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-colors text-left">
                <p className="font-medium text-slate-900">New Contract</p>
                <p className="text-sm text-slate-600 mt-1">
                  Start a new contract
                </p>
              </button>

              <button className="p-4 border-2 border-slate-200 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-colors text-left">
                <p className="font-medium text-slate-900">Upload Document</p>
                <p className="text-sm text-slate-600 mt-1">
                  Add files to contracts
                </p>
              </button>

              <button className="p-4 border-2 border-slate-200 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-colors text-left">
                <p className="font-medium text-slate-900">View Compliance</p>
                <p className="text-sm text-slate-600 mt-1">
                  Check compliance status
                </p>
              </button>

              <button className="p-4 border-2 border-slate-200 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-colors text-left">
                <p className="font-medium text-slate-900">Review Payments</p>
                <p className="text-sm text-slate-600 mt-1">
                  Manage payment milestones
                </p>
              </button>
            </div>
          </CardBody>
        </Card>
      </div>
    </DashboardLayout>
  );
}
