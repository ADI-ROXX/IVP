"use client";

import { TabsContent } from "@/components/ui/tabs";
import AlgorithmVisualizer from "./AlgorithmVisualizer";
import MetricsDisplay from "./MetricsDisplay";

const VisualizationTab = ({
  value,
  plotImage,
  metrics,
  isRunning,
  selectedAlgorithm,
  epochs,
}: any) => {
  return (
    <TabsContent value={value} className="mt-0 border-0 p-0">
      <div className="flex items-start h-full gap-5">
        <AlgorithmVisualizer plotImage={plotImage} />

        <div className="flex-1 p-4 bg-white rounded-lg border min-h-[400px]">
          <h2 className="text-lg font-semibold border-b pb-2 mb-4">
            Learning Metrics
          </h2>
          <MetricsDisplay
            metrics={isRunning || metrics ? metrics : null}
            algorithm={selectedAlgorithm}
            epochs={epochs}
          />
        </div>
      </div>
    </TabsContent>
  );
};

export default VisualizationTab;
