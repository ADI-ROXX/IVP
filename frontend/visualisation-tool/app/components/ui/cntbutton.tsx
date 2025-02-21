interface CNTButtonProps {
  active: boolean;
  linkto: string;
  content: string;
}

const CNTButton: React.FC<CNTButtonProps> = ({ active, linkto, content }) => {
  return (
    <div>
      <button
        className={`px-5 py-2 rounded-lg font-lg font-inter font-semibold ${
          active
            ? "bg-blue-600 hover:bg-blue-700 text-white"
            : "bg-richblack-800 shadow-sm shadow-richblack-100"
        }`}
      >
        {content}
      </button>
    </div>
  );
};

export default CNTButton;
