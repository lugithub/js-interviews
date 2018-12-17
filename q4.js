// GET LIST OF ALL THE STUDENTS
GET /api/students
Response:
[{
    "id": 1,
    "name": "John",
    "classroomId": 75
}]
// GET COURSES FOR GIVEN A STUDENT
GET /api/courses?filter=studentId eq 1
Response:
[{
   "id": "history",
   "studentId": 1
}, {
   "id": "algebra",
   "studentId": 1
},]
// GET EVALUATION FOR EACH COURSE
GET /api/evaluation/history?filter=studentId eq 1
Response:
{
    "id": 200,
    "score": 50,
    "totalScore": 100
}

api.get('/api/students').then(students => students.filter(student => student.classroomId === 75))
  .then(students => students.map(s => s.id))
  .then(studentIds => {
    return Promise.all(stuentIds.map(studentId => api.get(`/api/courses?filter=studentId eq ${studentId}`)))
  })
  .then(allStudentCourses => {
    let flatten = [];
    allStudentCourses.reduce((acc, studentCourses) => {
      return [...acc, ...studentCourses];
    }, flatten);
    return flatten;
  })
  .then(allStudentCoursesFlattened => allStudentCoursesFlattened.map(item => ({
    course: item.id,
    studentId: item.studentId,
  })))
  .then(courseStudentIds => {
    return Promise.all(courseStudentIds.map(pair => api.get(`/api/evaluation/${pair.course}?filter=studentId eq ${pair.studentId}`)));
  })
  .then(scores => {
    let total = 0;
    return scores.reduce((acc, score) => {
      return acc + score.score;
    }, total) / scores.length;
  });