import React from 'react'

const page = () => {
    const [courseLoading, setCourseLoading] = useState(false);
     const fetchStudentCourses = async (filters: any, sort: any) => {
        setCourseLoading(true);
        const query = new URLSearchParams({
          ...filters,
          sortBy: sort,
        });
        try {
          const res = await axios.get(
            `http://localhost:4000/api/v1/student/get?${query}`
          );
          console.log(res.data);
          if (res.data.success) {
            setStudentCourseList(res.data.data);
            setCourseLoading(false);
          }
        } catch (error) {
          setStudentCourseList([]);
          console.log(studentCourseList);
          setCourseLoading(false);
          console.error(error);
        }
      };
  return (
    <div>page</div>
  )
}

export default page