"use client";
import React from "react";
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

const InstructorCourses = () => {
  return (
    <Card className="">
      <CardHeader className="flex justify-between flex-row items-center">
        <CardTitle className="text-3xl font-extrabold ">All Courses</CardTitle>
        <Button className="p-6">Create new course</Button>
      </CardHeader>

      <CardContent className="">
        {" "}
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
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
