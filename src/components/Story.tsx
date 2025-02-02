import { StoryInterface } from "../types/StoryInterface";
import React from "react";

interface StoryProps {
  item: StoryInterface;
  onClickHandler: () => void;
}

const Story: React.FC<StoryProps> = ({ item, onClickHandler }) => {
  return (
    <button
      onClick={onClickHandler}
      data-testid="story"
      aria-label={`View story of ${item.userName}`}
    >
      <div className="bg-gradient-to-tr from-yellow-500 to-red-600 p-[1.5px]  rounded-full">
        <div className="bg-white rounded-full p-1">
          <img
            src={item.profileImage}
            alt={item.userName}
            className="w-14 h-14 rounded-full object-cover"
          />
        </div>
      </div>
      <p className="text-xs w-16 truncate text-center">{item.userName}</p>
    </button>
  );
};

export default Story;
