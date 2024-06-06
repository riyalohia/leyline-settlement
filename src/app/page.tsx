import Heading from "@/components/Heading";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-app">
      <div className="relative w-full bg-cover bg-center bg-main  h-full">
        <div className="flex flex-col items-center justify-center h-full">
          <div className="mb-8">
            <Image alt="Leyline Logo" width="600" height="600" decoding="async" className="object-cover" src={'/logo.png'} />
            <Heading title="Welcome to Leyline Settlement" />
          </div>
          <p className="px-4 py-4 mt-8 w-1/2 text-center rounded-3xl text-white text-lg h-12">
            <Link href="/sender" className="p-4 mr-2 bg-logo rounded-md lg:ml-5">Login as Sender</Link>
            <Link href="/receiver" className="p-4 mr-2 bg-logo rounded-md lg:ml-5">Login as Receiver</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
