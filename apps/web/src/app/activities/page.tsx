"use client";

import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card } from "@/components/ui";
import { apiClient } from "@/lib/api";
import { Activity } from "@/types";

export default function ActivitiesPage() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    apiClient
      .get<Activity[]>("/activities")
      .then((response) => setActivities(response.data))
      .catch(() => setError("Failed to load activities"))
      .finally(() => setIsLoading(false));
  }, []);

  const typeColors: Record<string, string> = {
    stage_change: "bg-blue-100 text-blue-800",
    document_upload: "bg-purple-100 text-purple-800",
    payment_received: "bg-green-100 text-green-800",
    compliance_update: "bg-orange-100 text-orange-800",
    comment: "bg-slate-100 text-slate-800",
  };

  const typeEmojis: Record<string, string> = {
    stage_change: "📊",
    document_upload: "📄",
    payment_received: "💰",
    compliance_update: "✅",
    comment: "💬",
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Activity Log</h1>
          <p className="text-slate-600 mt-2">
            Track all updates across your contracts
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-slate-600">Loading activities...</p>
          </div>
        ) : error ? (
          <Card className="mt-8">
            <div className="text-center py-12">
              <p className="text-red-600 text-lg">{error}</p>
            </div>
          </Card>
        ) : activities.length === 0 ? (
          <Card className="mt-8">
            <div className="text-center py-12">
              <p className="text-slate-600 text-lg">No activities yet</p>
              <p className="text-slate-500 mt-2">
                Start working on contracts to see activity here
              </p>
            </div>
          </Card>
        ) : (
          <div className="mt-8 space-y-4">
            {activities.map((activity) => (
              <Card key={activity.id}>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 text-2xl">
                    {typeEmojis[activity.type] || "📌"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold text-slate-900">
                        {activity.message}
                      </h3>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${
                          typeColors[activity.type] ||
                          "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {activity.type.replace("_", " ")}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 mt-3 text-xs text-slate-600">
                      <span>By: {activity.actor?.displayName || "System"}</span>
                      <span>Contract: {activity.contractId}</span>
                      <span>
                        {new Date(activity.createdAt).toLocaleDateString()} at{" "}
                        {new Date(activity.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
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
