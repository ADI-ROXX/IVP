"use client";

import { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { Tabs } from "@/components/ui/tabs";
import { CodeViewer } from "./components/code-viewer";
import { models, types } from "./data/models";
import Navbar from "../components/pages/Navbar";
import ControlPanel from "./components/ControlPanel";
import VisualizationTab from "./components/VisualizationTab";

export default function PlaygroundPage() {
  const [selectedDataset, setSelectedDataset] = useState("1");
  const [selectedAlgorithm, setSelectedAlgorithm] =
    useState("Linear Regression");
  const [plotImage, setPlotImage] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [epochs, setEpochs] = useState(50);
  const [metrics, setMetrics] = useState(null);
  const [k, setK] = useState(3);

  // Reset state when algorithm or dataset changes
  const resetState = () => {
    setPlotImage(null);
    setMetrics(null);
  };

  // Update handlers for dataset and algorithm changes
  const handleDatasetChange = (datasetId: any) => {
    setSelectedDataset(datasetId);
    resetState();
  };

  const handleAlgorithmChange = (algorithm: any) => {
    setSelectedAlgorithm(algorithm);
    resetState();
  };

  useEffect(() => {
    if (!isRunning) return;

    const ws = new WebSocket(
      `ws://localhost:8000/ws/${selectedAlgorithm}/${selectedDataset}/${epochs}/${k}`
    );

    ws.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === "start") {
        setPlotImage(null); // Clear previous plot
        setMetrics(null); // Clear previous metrics
      } else if (message.type === "update") {
        setPlotImage(`data:image/png;base64,${message.data.image}`);
        setMetrics(message.data.metrics); // Set the new metrics
      } else if (message.type === "end") {
        setIsRunning(false);
        ws.close();
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      setIsRunning(false);
    };

    ws.onclose = () => {
      console.log("WebSocket closed");
      setIsRunning(false);
    };

    return () => {
      ws.close();
    };
  }, [isRunning, selectedAlgorithm, selectedDataset, epochs]);

  const startAlgorithm = () => {
    if (!isRunning) setIsRunning(true);
  };

  return (
    <>
      <div className="bg-black min-h-[100vh]">
        <Navbar fixed={false} />
        <div className="hidden bg-white px-3 flex-col mb-5 md:flex max-w-[1200px] mx-auto mt-8 rounded-lg shadow-lg">
          <div className="container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
            <h2 className="text-lg font-semibold">Playground</h2>
            <div className="ml-auto flex w-full space-x-2 sm:justify-end">
              <div className="hidden space-x-2 md:flex">
                <CodeViewer selectedAlgorithm={selectedAlgorithm} />
              </div>
            </div>
          </div>
          <Separator />
          <div className="px-4">
            <Tabs defaultValue="d1" className="flex-1">
              <div className="container h-full py-6">
                <div className="grid h-full items-stretch gap-6 md:grid-cols-[1fr_200px]">
                  <ControlPanel
                    isRunning={isRunning}
                    handleDatasetChange={handleDatasetChange}
                    handleAlgorithmChange={handleAlgorithmChange}
                    setEpochs={setEpochs}
                    startAlgorithm={startAlgorithm}
                    resetState={resetState}
                    types={types}
                    models={models}
                    setK={setK}
                    selectedAlgorithm={selectedAlgorithm}
                  />

                  <div className="md:order-1">
                    <VisualizationTab
                      value="d1"
                      plotImage={plotImage}
                      metrics={metrics}
                      isRunning={isRunning}
                      selectedAlgorithm={selectedAlgorithm}
                      epochs={epochs}
                    />
                    <VisualizationTab
                      value="d2"
                      plotImage={plotImage}
                      metrics={metrics}
                      isRunning={isRunning}
                      selectedAlgorithm={selectedAlgorithm}
                      epochs={epochs}
                    />
                    <VisualizationTab
                      value="d3"
                      plotImage={plotImage}
                      metrics={metrics}
                      isRunning={isRunning}
                      selectedAlgorithm={selectedAlgorithm}
                      epochs={epochs}
                    />
                  </div>
                </div>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
}
