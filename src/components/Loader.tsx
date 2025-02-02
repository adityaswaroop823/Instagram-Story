const Loader: React.FC = () => (
  <div
    className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 backdrop-blur-sm z-50"
    aria-label="Loading..."
  >
    <div className="w-12 h-12 border-t-4 border-blue-500 border-solid border-opacity-50 rounded-full animate-spin"></div>
  </div>
);

export default Loader;
