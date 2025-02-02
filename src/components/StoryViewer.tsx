import { useEffect, useState, useCallback, useRef } from "react";
import { FaCamera } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import { StoryInterface } from "../types/StoryInterface";

interface StoryViewerProps {
  data: StoryInterface[];
  currStoryIndex: number;
  setSelectedStoryIndex: (index: number) => void;
}

const StoryViewer: React.FC<StoryViewerProps> = ({
  data,
  currStoryIndex,
  setSelectedStoryIndex,
}) => {
  const [currentIndex, setCurrentIndex] = useState(currStoryIndex);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(progress);
  const intervalRef = useRef<number | null>(null);

  const goToNextStory = useCallback(() => {
    setProgress(0);
    setCurrentIndex((prev) => {
      if (prev < data.length - 1) {
        return prev + 1;
      }
      return -1;
    });
  }, [data.length]);

  const goToPreviousStory = useCallback(() => {
    setProgress(0);
    setCurrentIndex((prev) => {
      if (prev > 0) {
        return prev - 1;
      }
      return prev;
    });
  }, []);

  useEffect(() => {
    if (currentIndex === -1) {
      setSelectedStoryIndex(-1);
      return;
    }

    setProgress(0);
    progressRef.current = 0;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = window.setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev < 100 ? prev + 1 : 100;
        progressRef.current = newProgress;
        if (newProgress === 100) {
          goToNextStory();
        }
        return newProgress;
      });
    }, 50);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [currentIndex, goToNextStory]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const { left, width } = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - left;

      clickX < width * 0.3 ? goToPreviousStory() : goToNextStory();
    },
    [goToNextStory, goToPreviousStory]
  );

  return (
    <div
      className="bg-black fixed inset-0 flex justify-center items-center overflow-hidden"
      data-testid="storyContainer"
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
          data-testid="storyimage"
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
          <button
            data-testid="closeBtn"
            onClick={() => setSelectedStoryIndex(-1)}
          >
            <IoIosClose
              size={56}
              className="cursor-pointer"
              aria-label="Close Story"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoryViewer;
