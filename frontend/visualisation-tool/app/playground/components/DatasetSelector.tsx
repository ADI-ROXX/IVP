"use client";

import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const DatasetSelector = ({ isRunning, handleDatasetChange }: any) => {
  return (
    <div className="grid gap-2">
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Dataset
          </span>
        </HoverCardTrigger>
        <HoverCardContent className="w-[320px] text-sm" side="left">
          We provide you with 3 different datasets to play and learn how the
          algorithms perform on different data distributions.
        </HoverCardContent>
      </HoverCard>
      <TabsList className="grid grid-cols-3">
        <TabsTrigger
          disabled={isRunning}
          onClick={() => handleDatasetChange("1")}
          value="d1"
        >
          <span className="sr-only">Dataset - 1</span>1
        </TabsTrigger>
        <TabsTrigger
          disabled={isRunning}
          onClick={() => handleDatasetChange("2")}
          value="d2"
        >
          <span className="sr-only">Dataset - 2</span>2
        </TabsTrigger>
        <TabsTrigger
          disabled={isRunning}
          onClick={() => handleDatasetChange("3")}
          value="d3"
        >
          <span className="sr-only">Dataset - 3</span>3
        </TabsTrigger>
      </TabsList>
    </div>
  );
};

export default DatasetSelector;
