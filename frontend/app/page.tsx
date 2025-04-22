"use client";
import { Button } from "@/components/ui/button";
import { courseCategories } from "@/config/utils";
import { CourseList, useStudentContext } from "@/context/studentContext";
import { useCarousel } from "@/hooks/useCarousel";
import axios from "axios";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const {
    setStudentCourseList,
    studentCourseList,
    filteredCourses,
    setFilteredCourses,
  } = useStudentContext();

  const [shuffledCourses, setShuffledCourses] = useState<CourseList[]>([]);

  useEffect(() => {
    setShuffledCourses(
      [...filteredCourses].sort(() => Math.random() - 0.5).slice(0, 4)
    );
  }, [filteredCourses]);
  const currentImage = useCarousel({ totalImages: 3 });

  const fetchStudentCourses = async () => {
    try {
      const res = await axios.get("https://techtrail-x074.onrender.com/api/v1/student/get");
      console.log(res.data.data);
      if (res.data.success) {
        setStudentCourseList(res.data.data);
        setFilteredCourses(res.data.data);
      }
    } catch (error) {
      console.log(error)
    }
  };
  useEffect(() => {
    fetchStudentCourses();
  }, []);

  return (
    <div className="min-h-screen   max-w-screen-xl mx-auto px-4  py-5 sm:px-6 lg:px-8 ">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="landing my-20"
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="landing__hero text-gray-300"
        >
          <div className="landing__hero-content">
            <h1 className="landing__title">Courses</h1>
            <p className="landing__description">
              This is the list of the courses you can enroll in.
              <br />
              Courses when you need them and want them.
            </p>
            <div className="landing__cta">
              <Link href="/search" scroll={false}>
                <div className="landing__cta-button">Search for Courses</div>
              </Link>
            </div>
          </div>
          <div className="landing__hero-images">
            {["/hero1.jpg", "/hero2.jpg", "/hero3.jpg"].map((src, index) => (
              <Image
                key={src}
                src={src}
                alt={`Hero Banner ${index + 1}`}
                fill
                priority={index === currentImage}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className={`landing__hero-image ${
                  index === currentImage ? "landing__hero-image--active" : ""
                }`}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
      <Link href="#feat-courses">
        <section className="py-8 px-4 lg:px-0 ">
          <h2 className="text-2xl font-bold mb-6 text-gray-300">
            Course Categories
          </h2>
          <p className="text-gray-300 text-lg my-10">
            Explore a wide range of courses tailored to boost your skills and
            knowledge. Whether you are diving into tech, find the perfect course
            to level up your expertise. Start learning today!
          </p>
          <div className="grid grid-grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {courseCategories.map((category) => (
              <Button
                className=""
                key={category.id}
                onClick={() =>
                  setFilteredCourses(
                    studentCourseList.filter(
                      (course: CourseList) => course.category === category.id
                    )
                  )
                }
              >
                {category.label}
              </Button>
            ))}
          </div>
        </section>
      </Link>

      <section className="py-20 text-gray-300 " id="feat-courses">
        <h2 className="text-2xl font-bold mb-6">Featured Courses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  gap-6">
          {shuffledCourses && shuffledCourses.length > 0
            ? shuffledCourses.map((course: CourseList, i: number) => (
                <Link href={`/courses/${course._id}`} key={i}>
                  <div
                    className="border rounded-lg overflow-hidden shadow cursor-pointer"
                    key={i}
                  >
                    <img
                      src={course.image}
                      alt="image"
                      height={150}
                      width={300}
                      className="w-full h-40 object-cover"
                    />{" "}
                    <div className="p-4 ">
                      <h3 className="mb-2 font-bold">{course?.title}</h3>
                      <h3>{course?.description}</h3>
                      <p className="text-sm text-gray-700 mb-2">
                        {course?.instructorName}
                      </p>
                      <p className="font-extrabold text-[16px]">
                        ${course?.price}
                      </p>
                    </div>
                  </div>
                </Link>
              ))
            : "No courses found"}
        </div>
      </section>
    </div>
  );
}
