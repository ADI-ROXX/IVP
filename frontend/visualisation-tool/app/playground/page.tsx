"use client";

import { useState, useEffect, useRef } from "react";
import { Separator } from "@/components/ui/separator";
import { Tabs } from "@/components/ui/tabs";
import { CodeViewer } from "./components/code-viewer";
import { models, types } from "./data/models";
import Navbar from "../components/pages/Navbar";
import ControlPanel from "./components/ControlPanel";
import VisualizationTab from "./components/VisualizationTab";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DL from "./components/DL";
export default function PlaygroundPage() {
  const [selectedDataset, setSelectedDataset] = useState("1");
  const [selectedAlgorithm, setSelectedAlgorithm] =
    useState("Linear Regression");
  const [plotImage, setPlotImage] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [epochs, setEpochs] = useState(50);
  const [metrics, setMetrics] = useState(null);
  const [k, setK] = useState(3);
  const [degree, setDegree] = useState(1); // New state for polynomial degree
  const [socketConnected, setSocketConnected] = useState(false);
  const [activeTab, setActiveTab] = useState("machine-learning");
  const wsRef = useRef(null);

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

  // Initialize WebSocket connection
  useEffect(() => {
    // Close previous connection if exists
    if (wsRef.current) {
      wsRef.current.close();
    }

    // Only establish connection when ready to run
    if (!isRunning) return;

    const serverUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "localhost:8000";
    const ws = new WebSocket(
      `ws://${serverUrl}/ws/${selectedAlgorithm}/${selectedDataset}/${epochs}/${k}/${degree}`
    );
    wsRef.current = ws;

    // ws.onopen = () => {
    //   console.log("WebSocket connected");
    //   setSocketConnected(true);
    //   toast.success("🔌 Connected to the ML server!", {
    //     position: "top-right",
    //     autoClose: 3000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     theme: "dark",
    //   });
    // };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === "start") {
        setPlotImage(null); // Clear previous plot
        setMetrics(null); // Clear previous metrics
        toast.info("🚀 Algorithm started running...", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
      } else if (message.type === "update") {
        setPlotImage(`data:image/png;base64,${message.data.image}`);
        setMetrics(message.data.metrics); // Set the new metrics
      } else if (message.type === "end") {
        setIsRunning(false);
        ws.close();
        toast.success("✅ Algorithm completed successfully!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      setIsRunning(false);
      setSocketConnected(false);
      toast.error("❌ Connection error with ML server", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    };

    // ws.onclose = () => {
    //   console.log("WebSocket closed");
    //   setIsRunning(false);
    //   setSocketConnected(false);
    //   toast.info("🔌 Disconnected from ML server", {
    //     position: "top-right",
    //     autoClose: 3000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     theme: "dark",
    //   });
    // };

    return () => {
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, [isRunning, selectedAlgorithm, selectedDataset, epochs, k, degree]);

  const startAlgorithm = () => {
    if (!isRunning) {
      setIsRunning(true);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-gray-900 overflow-hidden">
        <Navbar fixed={false} />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 mt-10 max-w-2xl mx-auto text-center"
        >
          <h1 className="text-5xl md:text-6xl text-white font-bold mb-6 drop-shadow-[0_0_10px_rgba(147,51,234,0.5)] ">
            Explore and Visualize
          </h1>
          <p className="text-xl text-gray-200 leading-relaxed">
            Dive into an interactive playground where you can experiment with
            machine learning and deep learning models. Visualize how models
            learn, make predictions, and adapt in real time — all in an
            intuitive, hands-on environment.
          </p>
        </motion.div>
        <ToastContainer position="top-right" />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="hidden bg-white px-3 flex-col mb-10 md:flex max-w-[1200px] mx-auto mt-8 rounded-lg shadow-lg">
            <div className="container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
              <div className="flex space-x-6 items-center">
                <h2 className="text-lg font-semibold">Playground</h2>
                <div className="flex space-x-4 text-nowrap">
                  <button
                    className={`px-3 py-2 text-sm font-medium w-full rounded transition-colors ${
                      activeTab === "machine-learning"
                        ? "bg-purple-100 text-purple-800"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() => setActiveTab("machine-learning")}
                  >
                    Machine Learning
                  </button>
                  <button
                    className={`px-3 py-2 text-sm text-nowrap font-medium rounded transition-colors ${
                      activeTab === "deep-learning"
                        ? "bg-purple-100 text-purple-800"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() => setActiveTab("deep-learning")}
                  >
                    Deep Learning
                  </button>
                </div>
              </div>
              <div className="ml-auto flex w-full space-x-2 sm:justify-end">
                {activeTab === "machine-learning" && (
                  <div className="hidden space-x-2 md:flex">
                    <CodeViewer selectedAlgorithm={selectedAlgorithm} />
                  </div>
                )}
              </div>
            </div>
            <Separator />

            {activeTab === "machine-learning" ? (
              <div className="px-4">
                <Tabs defaultValue="d1" className="flex-1">
                  <div className="container h-full py-6 rounded-md">
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
                        socketConnected={socketConnected}
                        degree={degree}
                        setDegree={setDegree}
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
            ) : (
              <div className=" text-center text-gray-500 rounded-md">
                <DL />
              </div>
            )}
          </div>
        </motion.div>
      </div>
      <footer className="w-full py-2 bg-black border-t border-purple-950/50 text-gray-400 text-md text-center">
        Made with <span className="text-red-500">❤️</span> by Team 1 ISTP
      </footer>
    </>
  );
}
