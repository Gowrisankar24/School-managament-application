import { defineQuery } from 'next-sanity';

export const TEACHERS_LIST_QUERY = defineQuery(`
*[_type == 'teacher'] | order(_createdAt desc)[$start .. $start + $limit]{
    _id,
    _createdAt,
    teacherId,
    name,
    email,
    photo,
    phone,
    subjects[] -> {
      _id,
      subjectId,
      subjectName
    },
    classes[] -> {
      _id,
      classId,
      name,
      capacity,
      grade,
    },
    address
}`);
export const TEACHERS_LIST_ALL_COUNT = defineQuery(`
  count(*[_type == 'teacher'])  
 `);

export const STUDENTS_LIST_QUERY = defineQuery(`
    *[_type == 'student'] | order(_createdAt desc)[$start .. $start + $limit]{
      _id,
      _createdAt,
      studentId,
      name,
      email,
      photo,
      phone,
      grade,
      nationality,
      class ->{
        _id,
        classId,
        name,
        capacity,
        grade,
        supervisor -> {
          teacherId,
          name
        }
      },
      subjects[] -> {
        _id,
        subjectId,
        subjectName
      },
      address
}`);

export const STUDENTS_LIST_ALL_COUNT = defineQuery(`
 count(*[_type == 'student'])  
`);

export const PARENTS_LIST_QUERY = defineQuery(`
 *[_type == 'parent']| order(_createdAt desc) [$start .. $start + $limit]{
   _id,
    _createdAt,
    parentId,
    name,
    username,
    email,
    password,
    photo,
    phone,
    address,
    sex,
    students[] ->{
        _id,
        studentId,
        name,
        email,
        phone,
        grade,
    },
 }`);

export const PARENT_LIST_BY_ALL_COUNT = defineQuery(`
   count(*[_type == 'parent'])
`);

export const CLASS_LIST_QUERY = defineQuery(`
*[_type == 'class'] | order(_createdAt desc)[$start .. $start + $limit]{
    _id,
    _createdAt,
    classId,
    name,
    capacity,
    grade,
    supervisor->{
      _id,
      teacherId,
      name
    }
}`);

export const CLASS_LIST_QUERY_ALL_COUNT = defineQuery(`
  count(*[_type == 'class'])
`);
export const LESSONS_LIST_QUERY = defineQuery(`
*[_type == 'lesson'] | order(_createdAt desc){
_id,
_createdAt,
lessonId,
subject -> {
   subjectId,
   subjectName
},
class->{
classId,
name,
capacity,
grade,
},
teacher ->{
teacherId,
name,
email,
subjects
}
}`);

export const EXAMS_LIST_QUERY = defineQuery(`
 *[_type == 'exam'] | order(_createdAt desc){
    _id,
    _createdAt,
    examId,
    subject->{
      _id,
      subjectId,
      subjectName
    },
    class->{
      _id,
      classId,
      name,
      capacity,
      grade,
    },
    teacher ->{
      _id,
      teacherId,
      name,
      email,
      subjects
    },
    date
 }`);
export const EXAMS_LIST_QUERY_ALL_COUNT = defineQuery(`
   count(*[_type == 'exam'])
`);

export const SUBJECTS_LIST_QUERY = defineQuery(`
  *[_type == 'subject'] | order(_createdAt desc) [$start .. $start + $limit]{
    _id,
    _createdAt,
    subjectId,
    subjectName,
    teacher[]->{
      _id,
      teacherId,
      name,
      email,
      subjects
    }
}`);

export const SUBJECTS_LIST_ALL_COUNT = defineQuery(`
 count(*[_type == 'subject'])
`);
export const ASSIGNMENTS_LIST_QUERY = defineQuery(`
 *[_type == 'assignment']| order(_createdAt desc) [$start .. $start + $limit]{
    _id,
    _createdAt,
    assignmentId,
    subject ->{
      _id,
      subjectId,
      subjectName
    },
    class ->{
      _id,
      classId,
      name,
    },
    teacher -> {
      _id,
      teacherId,
      name,
      email,
      subjects
    },
    dueDate
}`);

export const ASSIGMENTS_LIST_ALL_QUERY = defineQuery(`
 count(*[_type == 'assignment'])
  `);

export const EVENTS_LIST_QUERY = defineQuery(`
 *[_type == 'event'] | order(_createdAt desc)[$start .. $start + $limit]{
    _id,
    _createdAt,
    eventId,
    title,
    class -> {
      _id,
      classId,
      name,
    },
    date,
    startTime,
    endTime,
    description
}`);
export const EVENTS_LIST_QUERY_ALL_COUNT = defineQuery(`
  count(*[_type == 'event'])  
`);

export const RESULTS_LIST_QUERY = defineQuery(`
 *[_type == 'result'] | order(_createdAt desc)[$start .. $start+$limit]{
    _id,
    _createdAt,
    resultId,
    subject ->{
        _id,
        subjectId,
        subjectName
    },
    class -> {
        _id,
        classId,
        name,
    },
    teacher ->{
        _id,
        teacherId,
        name,
        email,
        subjects
    },
    student ->{
        _id,
        studentId,
        name,
        email,
        phone,
        grade,
    },
    date,
    score
}`);

export const RESULTS_LIST_QUERY_ALL_COUNT = defineQuery(`
  count(*[_type == 'result'])
  `);

export const ANNOUNCEMENTS_LIST_QUERY = defineQuery(`
  *[_type == 'announcement']| order(_createdAt desc)[$start .. $start + $limit]{
    _id,
    _createdAt,  
     announcementId,
     title,
     class->{
      _id,
      classId,
      name,
     },
     teacher ->{
      _id,
      teacherId,
      name,
     },
     description,
     date
}`);
export const ANNOUNCEMENTS_LIST_COUNT_ALL = defineQuery(`
  count(*[_type == 'announcement'])
`);

//each Teacher`s info
export const TEACHERS_INFO_BY_ID = defineQuery(`
  *[_type == 'teacher' && teacherId == $id][0]{
      _id,
      _createdAt,
      teacherId,
      name,
      description,
      email,
      photo,
      phone,
      username,
      password,
      subjects[] -> {
          _id,
          subjectId,
          subjectName
      },
      classes[] -> {
          _id,
          classId,
          name,
          supervisor ->{
            teacherId,
            name,
          },
          "relatedAnnouncements": *[_type == 'announcement' && class._ref == ^._id] | order(date desc){_id,title,description,date}
      },
      address,
      dob,
      bloodType,
      attendance,
      branches,
     "teacherlessonCount": count(lessons),
      Performance,
      ScheduleTime[]| order(start asc){
        start,
        end,
        class ->{
           name,
        },
        title -> {
          subjectName
        },
      },
      
   }
`);

export const STUDENTS_INFO_BY_ID = defineQuery(`
  *[_type == 'student' && studentId == $id][0]{
      _id,
      _createdAt,
      studentId,
      username,
      password,
      name,
      description,
      email,
      photo,
      phone,
      grade,
      nationality,
      class -> {
          _id,
          classId,
          name,
          capacity,
          grade,
          supervisor->{
            teacherId,
            name
          },
          "studentInfoAnnouncement" : *[_type == 'announcement' && class._ref == ^._id]| order(date desc){
              _id,title,description,date
            },
      },
      subjects[] ->{
        _id,
        subjectId,
        subjectName
      },
      address,
      dob,
      bloodType,
      attendance,
      "studentSubjectCount": count(subjects),
      Performance,
    }
`);

export const STUDENTS_SCHEDULE_TIMINGS = defineQuery(`
  *[_type == 'teacher' && defined(ScheduleTime)]{
      ScheduleTime[class._ref == $id]{
        start,
        end,
        class ->{
          _id,
          name
        },
        title -> {
          subjectName
        }  
      } 
  }[length(ScheduleTime)>0]
`);

export const STUDENTS_COUNT_CHART = defineQuery(`
   [
    {
      "name": "Total",
      "count": count(*[_type == "student"])
    },
    {
      "name": "Boys",
      "count": count(*[_type == "student" && sex == "Male"])
    },
    {
      "name": "Girls",
      "count": count(*[_type == "student" && sex == "Female"])
    },
  ]
`);

export const STUDENTS_ATTENDANCE_COUNT = defineQuery(`
  *[_type == "attendance"] {
    Weekdays
  }
`);
export const FINANCE_CHART_QUERY = defineQuery(`
    *[_type == 'finance']{
      monthData[] {
        month,
        Income,
        Expense
      }
     }
`);
