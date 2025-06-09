import { useState, useEffect,useContext} from "react";
import {
  Typography,
  Button,
  IconButton,
  Grid,
  Autocomplete,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import AlertDialog from "../components/Dialog";
import CustomizedTables from "../components/Table";
import { snankBarContext } from "../context/snackBarContext";

import { getCourses, deleteCourse, addCourse } from "../services/courseApi";
import { StyledTableRow , StyledTableCell} from "../components/Table";
import CourseDialog from "../components/CourseDialog";

const columnHeading = [
    "Sr No", "Department Code", "Course Number", "Title", "Actions"
]

function ManageCoursePage() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [deleteCourseId, setDeleteCourseId] = useState(null);



  const [showCourseDialog, setShowCourseDialog] = useState(false);

  const { displaySnackBar } = useContext(snankBarContext);

  useEffect(() => {
    console.log("called")
    getCourses()
      .then((response) => setData(response.data))
      .catch((error) => setError(error.data));
  }, []);

  const handleDeleteResourceBtnClick = (course) => {
    setShowAlertDialog(true);
    setDeleteCourseId(`${course.dept_code},${course.courseID}`);
  };

  const handleAlertDialogClose = (value) => {
    if (value === "YES") {
        const [dept_code, course_code] = deleteCourseId.split(",");
        deleteCourse(dept_code, course_code)
        .then((response) => {
          let res = [...data];
          const index =  data.findIndex((item) => (item.dept_code === response.data.dept_code && item.courseID === response.data.courseID));
          console.log("index" , index)
          res.splice(
             index,
              1
            );
          setData(res);
          displaySnackBar(true, response.message, { backgroundColor: "green", color: "white" });
        })
        .catch((error) => {
            console.log(error);
            displaySnackBar(true, error.response.data.message, { backgroundColor: "red", color: "white" });
        });
    }
    setShowAlertDialog(false);
  };

  const handleCourseAdd = (course) => {
      setData((prev_data) => { 
        return [course, ...prev_data];
      })
  }

  const renderedCourseData = data.map((item,index) => {
    return (
      <StyledTableRow key={item.id}>
        <StyledTableCell>{index + 1}</StyledTableCell>
        <StyledTableCell>{item.dept_code}</StyledTableCell>
        <StyledTableCell>{item.courseID}</StyledTableCell>
        <StyledTableCell>{item.title}</StyledTableCell>
        <StyledTableCell>{<>
          <IconButton
            color="error"
            onClick={() => {
              handleDeleteResourceBtnClick(item);
            }}
            edge="end"
          >
            <DeleteIcon />
          </IconButton>
        </>}</StyledTableCell>
      </StyledTableRow>
    )
  });

  return (
    <>
      <Grid container>
        <Grid container sx={{ marginY: "10px"}}>
          <Grid item xs={12} md="auto">
          <Typography variant="h6" sx={{ fontWeight: "bold" , marginRight : 2, my : 2 , width: 200 , borderRadius : "30px", mt : 1}}>Total Courses: { data.length}</Typography>
            </Grid>
          <Grid item sx={{ marginLeft: "auto" }}>
            <Button
              variant="contained"
              onClick={() => setShowCourseDialog(true)}
              sx={{ mt: 1 }}
            >
              + Add Course
            </Button>
          </Grid>
        </Grid>
        <AlertDialog
          open={showAlertDialog}
          handleCancel={handleAlertDialogClose}
          message="Do you really want to delete these Course? This process cannot be undone."
        />
        
        <CourseDialog 
          open={showCourseDialog}
          handleClose={() => setShowCourseDialog(false)}
          handleAddCourse={handleCourseAdd}
        />
      </Grid>
      <CustomizedTables columns={columnHeading} Data={renderedCourseData} />
    </>
  );
}

export default ManageCoursePage;
