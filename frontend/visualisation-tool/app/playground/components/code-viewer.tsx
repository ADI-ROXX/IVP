import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { models } from "../data/models";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { okaidia } from "react-syntax-highlighter/dist/esm/styles/prism";
import { code } from "../data/code";

export function CodeViewer({
  selectedAlgorithm,
}: {
  selectedAlgorithm: string;
}) {
  const [selectedModel, setSelectedModel] = useState(selectedAlgorithm);

  const modelCodes: { [key: string]: string } = code;

  useEffect(() => {
    setSelectedModel(selectedAlgorithm);
  }, [selectedAlgorithm]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">View code</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[750px]">
        <DialogHeader>
          <DialogTitle>View code</DialogTitle>
          <DialogDescription>
            You can use the following code to start integrating your current
            prompt and settings into your application.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="rounded-md bg-black p-6 overflow-auto max-h-[350px]">
            <SyntaxHighlighter
              language="python"
              style={okaidia}
              customStyle={{
                fontSize: "14px",
                lineHeight: "1.5",
                fontFamily: "monospace",
              }}
            >
              {modelCodes[selectedModel] || modelCodes["Linear Regression"]}
            </SyntaxHighlighter>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">
              {
                models.find((model) => model.name === selectedModel)
                  ?.description
              }
            </p>
            {models.find((model) => model.name === selectedModel)
              ?.strengths && (
              <p className="text-sm text-muted-foreground mt-2">
                <strong>Strengths:</strong>{" "}
                {
                  models.find((model) => model.name === selectedModel)
                    ?.strengths
                }
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
