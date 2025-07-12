import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen p-6">
      <div className=" my-auto flex flex-col items-center gap-2 *:font-medium">
        <span className="text-9xl"> 🥕</span>
        <h2 className="text-2xl font-bold">Welcome to the Carrot Market!</h2>
      </div>

      <div className="flex flex-col items-center gap-3 w-full">
        <Link
          href="/create-account"
          className="w-full bg-orange-500 text-white text-lg py-2.5 rounded-md text-center hover:bg-orange-400 transition-colors"
        >
          Sign up
        </Link>
        <div className="flex gap-2 text-sm">
          <span>Already have an account?</span>
          <Link href="/login" className="underline">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
