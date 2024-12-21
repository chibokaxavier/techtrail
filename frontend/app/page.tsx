import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-white ">
      <section className="flex flex-col lg:flex-row items-center justify-between py-8 px-4 lg:px-8 ">
        <div className="lg:w-1/2 lg:pr-12">
          <h1 className="text-5xl  font-bold mb-4 ">Learning that gets you</h1>
          <p>Skills for your present and future. Get started with </p>
        </div>
      </section>
    </div>
  );
}
