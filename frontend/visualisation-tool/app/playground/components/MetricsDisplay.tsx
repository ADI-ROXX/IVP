"use client";

import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Helper function to safely access nested properties
const safelyAccessProperty = (obj: any, path: any, defaultValue = "N/A") => {
  try {
    const result = path
      .split(".")
      .reduce((o: any, p: any) => (o && o[p] !== undefined ? o[p] : null), obj);
    return result !== null ? result : defaultValue;
  } catch (e) {
    return defaultValue;
  }
};

// Common metrics card style
const MetricCard = ({ title, value, unit = "" }: any) => (
  <Card className="overflow-hidden">
    <CardHeader className="p-2 bg-slate-50">
      <CardTitle className="text-xs font-medium text-slate-500">
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent className="p-4">
      <p className="text-2xl font-bold">
        {typeof value === "number" ? value.toFixed(4) : value}
        {unit}
      </p>
    </CardContent>
  </Card>
);

export default function MetricsDisplay({ metrics, algorithm, epochs }: any) {
  if (!metrics) {
    return (
      <div className="h-full flex items-center justify-center text-slate-500">
        <p>Start the algorithm to see metrics</p>
      </div>
    );
  }

  switch (algorithm) {
    case "Linear Regression":
    case "Ridge Regression":
    case "Lasso Regression":
      return (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">
              Epoch: {safelyAccessProperty(metrics, "epoch")} / {epochs}
            </h3>
            <Progress
              value={(safelyAccessProperty(metrics, "epoch", 0) / epochs) * 100}
              className="w-1/3"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <MetricCard
              title="Mean Square Error (Loss)"
              value={safelyAccessProperty(metrics, "loss", 0)}
            />
            <MetricCard
              title="R² Score"
              value={safelyAccessProperty(metrics, "r_squared", 0)}
            />
            <MetricCard
              title="Slope"
              value={safelyAccessProperty(metrics, "slope", 0)}
            />
            <MetricCard
              title="Intercept"
              value={safelyAccessProperty(metrics, "intercept", 0)}
            />
          </div>

          <Card className="p-3">
            <h3 className="font-semibold mb-2">Current Equation</h3>
            <p className="text-lg font-mono bg-slate-50 p-2 rounded">
              y = {safelyAccessProperty(metrics, "slope", 0).toFixed(4)}x +{" "}
              {safelyAccessProperty(metrics, "intercept", 0).toFixed(4)}
            </p>
          </Card>

          <div className="text-sm text-slate-500 mt-4">
            <p>
              Gradient Magnitude:{" "}
              {safelyAccessProperty(metrics, "gradient_magnitude", 0).toFixed(
                6
              )}
            </p>
          </div>
        </div>
      );

    case "Logistic Regression":
      return (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">
              Epoch: {safelyAccessProperty(metrics, "epoch")} / {epochs}
            </h3>
            <Progress
              value={(safelyAccessProperty(metrics, "epoch", 0) / epochs) * 100}
              className="w-1/3"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <MetricCard
              title="Binary Cross-Entropy Loss"
              value={safelyAccessProperty(metrics, "loss", 0)}
            />
            <MetricCard
              title="Accuracy"
              value={safelyAccessProperty(metrics, "accuracy", 0)}
              unit="%"
            />
          </div>

          {safelyAccessProperty(metrics, "weights", null) && (
            <Card className="p-3">
              <h3 className="font-semibold mb-2">Decision Boundary</h3>
              <p className="text-sm font-mono bg-slate-50 p-2 rounded">
                w₁ = {safelyAccessProperty(metrics, "weights.0", 0).toFixed(4)},
                w₂ = {safelyAccessProperty(metrics, "weights.1", 0).toFixed(4)},
                b = {safelyAccessProperty(metrics, "intercept", 0).toFixed(4)}
              </p>
            </Card>
          )}

          <div className="text-sm text-slate-500 mt-4">
            <p>
              Gradient Magnitude:{" "}
              {safelyAccessProperty(metrics, "gradient_magnitude", 0).toFixed(
                6
              )}
            </p>
          </div>
        </div>
      );

    case "K-Means":
      return (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">
              Epoch: {safelyAccessProperty(metrics, "epoch")} / {epochs}
            </h3>
            <Progress
              value={(safelyAccessProperty(metrics, "epoch", 0) / epochs) * 100}
              className="w-1/3"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <MetricCard
              title="Inertia"
              value={safelyAccessProperty(metrics, "inertia", 0)}
            />
            <MetricCard
              title="Silhouette Score"
              value={safelyAccessProperty(metrics, "silhouette", 0)}
            />
          </div>

          {safelyAccessProperty(metrics, "cluster_counts", null) && (
            <Card className="p-3">
              <h3 className="font-semibold mb-2">Cluster Points</h3>
              <div className="flex justify-around text-center">
                {safelyAccessProperty(metrics, "cluster_counts", []).map(
                  (count, idx) => (
                    <div key={idx} className="flex flex-col items-center">
                      <div
                        className={`w-4 h-4 rounded-full mb-1 bg-${
                          ["blue", "green", "red"][idx % 3]
                        }-500`}
                      ></div>
                      <p>
                        Cluster {idx + 1}:{" "}
                        <span className="font-bold">{count}</span>
                      </p>
                    </div>
                  )
                )}
              </div>
            </Card>
          )}

          <div className="text-sm text-slate-500 mt-4">
            <p>
              Points Changed:{" "}
              {(safelyAccessProperty(metrics, "change_ratio", 0) * 100).toFixed(
                2
              )}
              %
            </p>
          </div>
        </div>
      );

    default:
      return <div>No metrics available for this algorithm</div>;
  }
}
