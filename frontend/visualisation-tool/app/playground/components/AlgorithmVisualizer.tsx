"use client";

const AlgorithmVisualizer = ({ plotImage }: { plotImage: any }) => {
  return (
    <div className="w-[55%]">
      {plotImage ? (
        <img
          src={plotImage}
          alt="Algorithm Plot"
          className="w-full rounded-lg shadow-md"
        />
      ) : (
        <div className="p-12 border rounded-lg text-center bg-slate-50 h-full flex items-center justify-center">
          <p>
            Press <b>"Start Algorithm"</b> to see the plot
          </p>
        </div>
      )}
    </div>
  );
};

export default AlgorithmVisualizer;
