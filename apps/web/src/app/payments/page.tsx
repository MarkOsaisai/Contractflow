"use client";

import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, Button } from "@/components/ui";
import { apiClient } from "@/lib/api";
import { PaymentMilestone } from "@/types";

export default function PaymentsPage() {
  const [payments, setPayments] = useState<PaymentMilestone[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const loadPayments = () => {
    return apiClient
      .get<PaymentMilestone[]>("/payments")
      .then((response) => setPayments(response.data))
      .catch(() => setError("Failed to load payments"));
  };

  useEffect(() => {
    loadPayments().finally(() => setIsLoading(false));
  }, []);

  const markPaid = async (id: string) => {
    setUpdatingId(id);
    try {
      await apiClient.patch(`/payments/${id}/status`, { status: "PAID" });
      await loadPayments();
    } catch {
      setError("Failed to update payment status");
    } finally {
      setUpdatingId(null);
    }
  };

  const statusColors: Record<string, string> = {
    DRAFT: "bg-slate-100 text-slate-800",
    SUBMITTED: "bg-yellow-100 text-yellow-800",
    APPROVED: "bg-blue-100 text-blue-800",
    PAID: "bg-green-100 text-green-800",
    DISPUTED: "bg-red-100 text-red-800",
  };

  const totalAmount = payments.reduce((sum, p) => sum + p.amount, 0);
  const paidAmount = payments
    .filter((p) => p.status === "PAID")
    .reduce((sum, p) => sum + p.amount, 0);
  const pendingAmount = payments
    .filter((p) => p.status !== "PAID")
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Payment Milestones
            </h1>
            <p className="text-slate-600 mt-2">
              Track and manage contract payments
            </p>
          </div>
          <Button variant="primary">New Milestone</Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <div>
              <p className="text-slate-600 text-sm font-medium">Total Amount</p>
              <p className="text-3xl font-bold text-slate-900 mt-2">
                ${totalAmount.toLocaleString()}
              </p>
            </div>
          </Card>

          <Card>
            <div>
              <p className="text-slate-600 text-sm font-medium">Paid</p>
              <p className="text-3xl font-bold text-green-600 mt-2">
                ${paidAmount.toLocaleString()}
              </p>
              <p className="text-xs text-slate-600 mt-2">
                {totalAmount > 0
                  ? ((paidAmount / totalAmount) * 100).toFixed(0)
                  : 0}
                % of total
              </p>
            </div>
          </Card>

          <Card>
            <div>
              <p className="text-slate-600 text-sm font-medium">Pending</p>
              <p className="text-3xl font-bold text-orange-600 mt-2">
                ${pendingAmount.toLocaleString()}
              </p>
              <p className="text-xs text-slate-600 mt-2">
                {totalAmount > 0
                  ? ((pendingAmount / totalAmount) * 100).toFixed(0)
                  : 0}
                % of total
              </p>
            </div>
          </Card>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-slate-600">Loading payments...</p>
          </div>
        ) : error ? (
          <Card>
            <div className="text-center py-12">
              <p className="text-red-600 text-lg">{error}</p>
            </div>
          </Card>
        ) : payments.length === 0 ? (
          <Card>
            <div className="text-center py-12">
              <p className="text-slate-600 text-lg">
                No payment milestones yet
              </p>
              <p className="text-slate-500 mt-2">
                Create your first milestone to get started
              </p>
            </div>
          </Card>
        ) : (
          <div className="space-y-4">
            {payments.map((payment) => (
              <Card key={payment.id}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-900">
                      {payment.title}
                    </h3>
                    <div className="flex items-center gap-4 mt-4 text-sm">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          statusColors[payment.status]
                        }`}
                      >
                        {payment.status}
                      </span>
                      {payment.dueDate && (
                        <span className="text-slate-600">
                          Due: {new Date(payment.dueDate).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-slate-900">
                      ${payment.amount.toLocaleString()}
                    </p>
                    <p className="text-slate-600 text-sm mt-1">
                      {payment.currency}
                    </p>
                    {payment.status !== "PAID" && (
                      <Button
                        variant="secondary"
                        size="sm"
                        className="mt-4"
                        isLoading={updatingId === payment.id}
                        onClick={() => markPaid(payment.id)}
                      >
                        Mark Paid
                      </Button>
                    )}
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
