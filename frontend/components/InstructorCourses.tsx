"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";
import { DeleteIcon, Edit } from "lucide-react";
import Link from "next/link";
import axios from "axios";

const InstructorCourses = () => {
  const [courseList, setCourseList] = useState([]);

  const fetchCourses = async () => {
    const res = await axios.get("http://localhost:4000/api/v1/course/get");
    if (res.data.success) {
      console.log(res.data.data);
      setCourseList(res.data.data);
    }
  };
  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <Card className="">
      <CardHeader className="flex justify-between flex-row items-center">
        <CardTitle className="text-3xl font-extrabold ">All Courses</CardTitle>
        <Link href={"/instructor/add-new-course"}>
          {" "}
          <Button className="p-6">Create new course</Button>
        </Link>
      </CardHeader>

      <CardContent className="">
        {" "}
        <Table>
          <TableCaption>A list of your courses</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Course</TableHead>
              <TableHead>Students</TableHead>
              <TableHead>Revenue</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">
                React Js full course 2025
              </TableCell>
              <TableCell>100</TableCell>
              <TableCell> $5000</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm">
                  <Edit />
                </Button>{" "}
                <Button variant="destructive" size="sm">
                  <DeleteIcon />
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">$2,500.00</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
      {/* <CardFooter>
        <Button></Button>
      </CardFooter> */}
    </Card>
  );
};

export default InstructorCourses;
