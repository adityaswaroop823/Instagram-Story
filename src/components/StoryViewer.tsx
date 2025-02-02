import { useEffect, useState, useCallback } from "react";
import { FaCamera } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import { StoryInterface } from "../types/StoryInterface";

interface StoryExpandedProps {
  data: StoryInterface[];
  currStoryIndex: number;
  setSelectedStoryIndex: (index: number) => void;
}

const StoryExpanded: React.FC<StoryExpandedProps> = ({
  data,
  currStoryIndex,
  setSelectedStoryIndex,
}) => {
  const [currentIndex, setCurrentIndex] = useState(currStoryIndex);
  const [progress, setProgress] = useState(0);

  const goToNextStory = useCallback(() => {
    setProgress(0);
    setCurrentIndex((prev) => (prev < data.length - 1 ? prev + 1 : -1));
  }, [data.length]);

  const goToPreviousStory = useCallback(() => {
    setProgress(0);
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  useEffect(() => {
    if (currentIndex === -1) {
      setSelectedStoryIndex(-1);
      return;
    }

    setProgress(0);
    const progressInterval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 1 : 100));
    }, 50);

    const timer = setTimeout(goToNextStory, 5000);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [currentIndex, goToNextStory]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - left;

    clickX < width * 0.3 ? goToPreviousStory() : goToNextStory();
  };

  return (
    <div
      className="bg-black fixed inset-0 flex justify-center items-center overflow-hidden"
      onClick={handleClick}
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gray-700">
        <div
          className="h-full bg-white transition-all duration-50 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="relative flex justify-center flex-col items-center w-full h-full">
        <img
          src={data[currentIndex]?.storyImage}
          alt={data[currentIndex]?.userName}
          width={140}
          height={140}
          className="w-full max-h-full object-cover"
        />

        <div className="absolute top-0 w-full flex justify-between items-center p-3 text-white">
          <div className="flex items-center gap-3">
            <img
              src={data[currentIndex]?.profileImage}
              alt="User"
              className="w-10 h-10 rounded-full border border-white p-[1px]"
              width={15}
              height={15}
            />
            <div>
              <p>
                {data[currentIndex]?.userName}{" "}
                <span className="text-gray-400 text-sm">5h</span>
              </p>
              <div className="flex items-center gap-1">
                <FaCamera />
                <p className="text-gray-300 text-sm">One Take</p>
              </div>
            </div>
          </div>
          <IoIosClose
            size={56}
            onClick={() => setSelectedStoryIndex(-1)}
            className="cursor-pointer"
            aria-label="Close Story"
          />
        </div>
      </div>
    </div>
  );
};

export default StoryExpanded;
