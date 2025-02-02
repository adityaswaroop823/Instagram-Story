import { useState } from "react";
import Header from "./components/Header";
import Story from "./components/Story";
import useFetch from "./hooks/useFetch";
import { StoryInterface } from "./types/StoryInterface";
import StoryExpanded from "./components/StoryViewer";

const App: React.FC = () => {
  const {
    data: stories,
    loading,
    error,
  } = useFetch<StoryInterface[]>("/stories.json");
  const [selectedStoryIndex, setSelectedStoryIndex] = useState<number>(-1);

  return (
    <>
      <div className="overflow-hidden flex flex-col gap-2 p-2">
        <Header />
        {loading && (
          <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {!loading && (error || !stories || stories.length === 0) && (
          <p className="text-red-500 text-center">No stories available</p>
        )}

        {!loading && !error && stories && stories.length > 0 && (
          <div className="flex gap-2 overflow-x-scroll border-gray-200 scroll-smooth scrollbar-hidden">
            {stories.map((item, index) => (
              <Story
                item={item}
                key={index}
                onClickHandler={() => {
                  setSelectedStoryIndex(index);
                }}
              />
            ))}
          </div>
        )}
      </div>
      {selectedStoryIndex !== -1 && (
        <StoryExpanded
          data={stories}
          currStoryIndex={selectedStoryIndex}
          setSelectedStoryIndex={setSelectedStoryIndex}
        />
      )}
    </>
  );
};

export default App;
