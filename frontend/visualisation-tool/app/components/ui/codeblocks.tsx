import React from "react";
import { TypeAnimation } from "react-type-animation";
import Tilt from "react-parallax-tilt";
import CNTButton from "./cntbutton";
interface CNTButtonProps {
  active: boolean;
  linkto: string;
  content: string;  
}

interface CodeBlocksProps {
  position: string;
  heading: React.ReactNode;
  subheading: React.ReactNode;
  ctnbtn1: CNTButtonProps;
  ctnbtn2: CNTButtonProps;
  codeblock: string;
  backgroundGradient: string;
  codeColor: string;
}

const CodeBlocks: React.FC<CodeBlocksProps> = ({
  position,
  heading,
  subheading,
  ctnbtn1,
  ctnbtn2,
  codeblock,
  backgroundGradient,
  codeColor,
}) => {
  return (
    <Tilt
      glareEnable={true}
      glareMaxOpacity={0.8}
      glareColor="lightblue"
      glarePosition="all"
      glareBorderRadius="20px"
      className={`${position} w-3/4 mx-auto my-[4rem] gap-12 rounded-xl py-16 px-8 overflow-x-hidden border`}
    >
      <div className="w-[55%] text-white font-inter flex flex-col gap-8 text-xl">
        {heading}
        {subheading}
        <div className="flex gap-8 mx-4">
          <CNTButton
            active={ctnbtn1.active}
            linkto={ctnbtn1.linkto}
            content={ctnbtn1.content}
          />
          <CNTButton
            active={ctnbtn2.active}
            linkto={ctnbtn2.linkto}
            content={ctnbtn2.content}
          />
        </div>
      </div>
      <div className="w-[45%] flex bg-richblack-800 px-1 py-2 relative z-10 rounded-xl ">
        <div className="flex flex-col text-center w-[10%] text-white font-inter font-bold">
          {[...Array(11)].map((_, i) => (
            <p key={i}>{i + 1}</p>
          ))}
        </div>
        <div
          className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-2`}
        >
          <TypeAnimation
            sequence={[codeblock]}
            repeat={3}
            cursor={true}
            omitDeletionAnimation={true}
            style={{
              whiteSpace: "pre-line",
              display: "block",
            }}
          />
          <div
            className={`absolute top-0 left-0 -z-10 w-[350px] h-[320px] opacity-20 ${backgroundGradient} rounded-full blur-lg`}
          ></div>
        </div>
      </div>
    </Tilt>
  );
};

export default CodeBlocks;
