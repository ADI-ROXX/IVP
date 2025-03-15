"use client";

import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { ModelSelector } from "./model-selector";
import { MaxEpochSelector } from "./maxepoch-selector";
import DatasetSelector from "./DatasetSelector";
import { MaxKSelector } from "./MaxKSelector";

const ControlPanel = ({
  isRunning,
  handleDatasetChange,
  handleAlgorithmChange,
  setEpochs,
  startAlgorithm,
  resetState,
  types,
  models,
  selectedAlgorithm,
  setK,
}: any) => {
  return (
    <div className="hidden flex-col space-y-4 sm:flex md:order-2">
      <DatasetSelector
        isRunning={isRunning}
        handleDatasetChange={handleDatasetChange}
      />

      <ModelSelector
        isRunning={isRunning}
        setSelectedAlgorithm={handleAlgorithmChange}
        types={types}
        models={models}
      />

      <MaxEpochSelector defaultValue={[50]} setEpochs={setEpochs} />
      {selectedAlgorithm === "K-Means Clustering" && (
        <MaxKSelector defaultValue={[3]} setK={setK} />
      )}

      <div className="flex w-full items-center space-x-2">
        <Button onClick={startAlgorithm} disabled={isRunning}>
          {isRunning ? "Running..." : "Start Algorithm"}
        </Button>
        <Button variant="secondary" onClick={resetState} disabled={isRunning}>
          <span className="sr-only">Reset</span>
          <RotateCcw />
        </Button>
      </div>
    </div>
  );
};

export default ControlPanel;
