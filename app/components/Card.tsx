
export default function Card() {
return (
  <div className="bg-gray-300 min-h-screen flex items-center justify-center p-5">
    <div className="bg-white w-full shadow-lg rounded-2xl p-5">

      <div className="flex justify-between items-center">
        <div className="flex flex-col ">

        <span className="text-gray-600 font-semibold -mb-1">
          In transit
          </span>
          <span className="text-4xl font-semibold">Coolblue</span>
        </div>

          <div className="size-12 bg-orange-400 rounded-full"/>
      </div>
      <div className="my-2 flex items-center gap-2">
       < span className="bg-green-400 text-white uppercase px-2 py-1 text-xs font-medium rounded-full ">Today</span>
       <span>9:30-10:30</span>
      </div>
       <div className="relative my-2">
        <div className="bg-gray-200 rounded-full w-full h-2 absolute"/>
        <div className="bg-green-400 rounded-full w-3/4 h-2 absolute"/>
       </div>
      <div className="flex justify-between items-center mt-5 text-gray-600">
        <span>Expected</span>
        <span>Sorting center</span>
        <span>In transit</span>
        <span className="text-gray-400">Delivered</span>
      </div>


    </div>
  </div>
)
}
