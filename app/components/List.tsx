export default function List() {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-5">
      <div className="bg-white w-full shadow-lg rounded-2xl p-5 max-w-screen-sm flex flex-col gap-2 ">
        {['Nico', 'Me', 'You', 'YourSelf', ''].map((person, index) => (
          <div
            key={index}
            className="flex items-center gap-5 odd:bg-gray-100 p-2.5 rounded-xl group"
          >
            <div className="size-7 bg-blue-400 rounded-full" />
            <div className="empty:w-24 empty:h-7 empty:bg-gray-300 empty:rounded-full empty:animate-pulse group-hover:text-red-500">
              {person}
            </div>
            <div className="size-5 animate-bounce bg-red-500 text-white flex items-center justify-center rounded-full">
              <span>{index}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
