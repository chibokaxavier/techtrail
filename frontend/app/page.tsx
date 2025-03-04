"use client";
import { Button } from "@/components/ui/button";
import { courseCategories } from "@/config/utils";
import { useStudentContext } from "@/context/studentContext";
import { useCarousel } from "@/hooks/useCarousel";
import axios from "axios";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const { setStudentCourseList, studentCourseList, globalParamId } =
    useStudentContext();
  const [filteredCourses, setFilteredCourses] =
    useState<any>(studentCourseList);
  const currentImage = useCarousel({ totalImages: 3 });
  const fetchStudentCourses = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/v1/student/get");
      console.log(res.data.data);
      if (res.data.success) {
        setStudentCourseList(res.data.data);
        setFilteredCourses(res.data.data);
      }
    } catch (error) {}
  };
  useEffect(() => {
    fetchStudentCourses();
  }, []);

  return (
    <div className="min-h-screen   max-w-screen-xl mx-auto px-4  py-5 sm:px-6 lg:px-8 ">
      {/* <section className="flex flex-col lg:flex-row items-center justify-between py-8  ">
        <div className="lg:w-1/2 lg:pr-12">
          <h1 className="text-2xl md:text-5xl font-bold mb-4 text-center lg:text-start">Unlock Your Potential</h1>
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
            alt="programmer"
          />
        </div>
      </section> */}

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
        {/* <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ amount: 0.3, once: true }}
        className="landing__featured"
      >
        <h2 className="landing__featured-title">Featured Courses</h2>
        <p className="landing__featured-description">
          From beginner to advanced, in all industries, we have the right
          courses just for you and preparing your entire journey for learning
          and making the most.
        </p>

        <div className="landing__tags">
          {[
            "web development",
            "enterprise IT",
            "react nextjs",
            "javascript",
            "backend development",
          ].map((tag, index) => (
            <span key={index} className="landing__tag">
              {tag}
            </span>
          ))}
        </div>

        <div className="landing__courses">
          {courses &&
            courses.slice(0, 4).map((course, index) => (
              <motion.div
                key={course.courseId}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ amount: 0.4 }}
              >
                <CourseCardSearch
                  course={course}
                  onClick={() => handleCourseClick(course.courseId)}
                />
              </motion.div>
            ))}
        </div>
      </motion.div> */}
      </motion.div>
      <Link href="#feat-courses">
        <section className="py-8 px-4 lg:px-0 ">
          <h2 className="text-2xl font-bold mb-6 text-gray-300">
            Course Categories
          </h2>
          <p className="text-gray-300 text-lg my-10">
            Explore a wide range of courses tailored to boost your skills and
            knowledge. Whether you're diving into tech, find the perfect course
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
                      (course: any) => course.category === category.id
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
          {filteredCourses && filteredCourses.length > 0
            ? filteredCourses.map((course: any, i: number) => (
                <Link href={`/courses/${course._id}`}>
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
                      <p className="text-sm text-gray-700 mb-2">
                        {course?.instructorName}
                      </p>
                      <p className="font-bold text-[16px]">${course?.price}</p>
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
