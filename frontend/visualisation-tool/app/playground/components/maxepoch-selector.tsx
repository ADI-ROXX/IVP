"use client";

import * as React from "react";
import { SliderProps } from "@radix-ui/react-slider";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface MaxEpochSelectorProps {
  defaultValue: SliderProps["defaultValue"];
  setEpochs: (value: number) => void;
  isRunning: boolean;
}

export function MaxEpochSelector({
  defaultValue,
  setEpochs,
  isRunning,
}: MaxEpochSelectorProps) {
  const [value, setValue] = React.useState(defaultValue);

  return (
    <div className="grid gap-2 pt-2">
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="maxlength">Epochs</Label>
              <span className="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">
                {value}
              </span>
            </div>
            <Slider
              disabled={isRunning}
              id="maxlength"
              max={200}
              defaultValue={value}
              step={10}
              onValueChange={(value) => {
                setValue(value);
                setEpochs(value[0]);
              }}
              className="[&_[role=slider]]:h-4 cursor-pointer [&_[role=slider]]:w-4"
              aria-label="Maximum Length"
            />
          </div>
        </HoverCardTrigger>
        <HoverCardContent
          align="start"
          className="w-[260px] text-sm"
          side="left"
        >
          The maximum number of epochs for which the model is trained.
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}
