export default function Input() {
  return (
    <div className="bg-gray-100 sm:bg-red-100 md:bg-green-100 lg:bg-cyan-100 min-h-screen flex items-center justify-center p-5">
      <div className="bg-white w-full shadow-lg rounded-2xl p-5 max-w-screen-sm flex flex-col gap-2  md:flex-row">
        <div className="flex flex-col gap-2 w-full">
          <input
            className="x rounded-full h-10 bg-gray-200 pl-5 outline-none ring ring-transparent focus:ring-green-500 focus:ring-offset-2 transition-shadow placeholder:drop-shadow invalid:focus:ring-red-500 peer"
            type="email"
            required
            placeholder="Email address"
          />
          <span className="text-red-500 font-mediums hidden peer-invalid:block ">
            Email is required.
          </span>
        </div>
        <button className="text-white py-2 rounded-full active:scale-90  transition-transform font-medium outline-none md:px-10 h-12 bg-black ">
          Add
        </button>
      </div>
    </div>
  );
}
