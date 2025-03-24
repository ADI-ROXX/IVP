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

interface DegreeProps {
  defaultValue: SliderProps["defaultValue"];
  setDegree: (value: number) => void;
}

export function Degree({ defaultValue, setDegree }: DegreeProps) {
  const [value, setValue] = React.useState(defaultValue);

  return (
    <div className="grid gap-2 pt-2">
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="maxlength">Degree of Polynomial</Label>
              <span className="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">
                {value}
              </span>
            </div>
            <Slider
              id="maxlength"
              max={3}
              defaultValue={value}
              step={1}
              onValueChange={(value) => {
                setValue(value);
                setDegree(value[0]);
              }}
              className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
              aria-label="Degree of Polynomial"
            />
          </div>
        </HoverCardTrigger>
        <HoverCardContent
          align="start"
          className="w-[260px] text-sm"
          side="left"
        >
          The degree of the polynomial regression model. A higher degree allows
          for more complex relationships between the features and the target
          variable.
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}
