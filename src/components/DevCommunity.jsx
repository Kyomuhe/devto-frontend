const DevCommunity = () => {
    return (
    <div className="flex items-start w-80 p-3">
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          DEV Community is a community of 3,462,852 amazing developers
        </h2>
        <p className="text-gray-600 mb-6 leading-relaxed">
          We're a place where coders share, stay up-to-date and grow their careers.
        </p>
        
        <div className="space-y-3">
          <button className="w-full border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white py-2 px-4 rounded-md font-medium transition-colors duration-200">
            Create account
          </button>
          <button className="w-full text-gray-600 hover:bg-blue-50 hover:text-blue-600 py-2 px-4 rounded-md font-medium transition-colors duration-200">
            Log in
          </button>
        </div>
      </div>
      </div>

    );
};
export default DevCommunity;