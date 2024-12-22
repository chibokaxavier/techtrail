import { Button } from "@/components/ui/button";
import { courseCategories } from "@/config/utils";
import { useStudentContext } from "@/context/studentContext";
import Image from "next/image";

export default function Home() {
  const { setStudentCourseList, studentCourseList } = useStudentContext();
  
  return (
    <div className="min-h-screen bg-white ">
      <section className="flex flex-col lg:flex-row items-center justify-between py-8 px-4 lg:px-8 ">
        <div className="lg:w-1/2 lg:pr-12">
          <h1 className="text-5xl font-bold mb-4">Unlock Your Potential</h1>
          <p className="text-xl">
            Empower yourself with skills that matter. Begin your journey with us
            now.
          </p>
        </div>
        <div className="lg:w-1/2 mb-8 lg:mb-0">
          <img
            src="/programmer.svg"
            width={600}
            height={400}
            className="w-full  h-auto rounded-lg "
            alt=""
          />
        </div>
      </section>
      <section className="py-8 px-4 lg:px-8 bg-gray-100">
        <h2 className="text-2xl font-bold mb-6">Course Categories</h2>
        <div className="grid grid-grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {courseCategories.map((category) => (
            <Button className="" key={category.id}>
              {category.label}
            </Button>
          ))}
        </div>
      </section>
    </div>
  );
}
