import { defineQuery } from 'next-sanity';

export const TEACHERS_LIST_QUERY = (page: number, pageSize: number) =>
    defineQuery(`
*[_type == 'teacher'] | order(_createdAt desc)[${(page - 1) * pageSize}..${page * pageSize - 1}]{
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
address,
"totalCount":count(*[_type == 'teacher']),
"page": ${page}
}`);

export const STUDENTS_LIST_QUERY = defineQuery(`
    *[_type == 'student'] | order(_createdAt desc){
    _id,
    _createdAt,
    studentId,
    name,
    email,
    photo,
    phone,
    grade,
    class ->{
    classId,
    name,
    capacity,
    grade,
    supervisor->{
      teacherId,
      name
    }
    },
    address,
}`);

export const PARENTS_LIST_QUERY = defineQuery(`
 *[_type == 'parent']| order(_createdAt desc){
   _id,
    _createdAt,
    parentId,
    name,
    students[] ->{
     studentId,
     name,
     email,
     phone,
     grade,
    },
    email,
    phone,
    address
 }`);

export const CLASS_LIST_QUERY = defineQuery(`
*[_type == 'class'] | order(_createdAt desc){
_id,
    _createdAt,
    classId,
    name,
    capacity,
    grade,
    supervisor->{
      teacherId,
      name
    }
}`);

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
},
date
 }`);

export const SUBJECTS_LIST_QUERY = defineQuery(`
  *[_type == 'subject'] | order(_createdAt desc){
    _id,
    _createdAt,
    subjectId,
    subjectName,
    teacher[]->{
    teacherId,
    name,
    email,
    subjects
    }
  }`);

export const ASSIGNMENTS_LIST_QUERY = defineQuery(`
*[_type == 'assignment']| order(_createdAt desc){
_id,
_createdAt,
assignmentId,
subject ->{
subjectId,
subjectName
},
class ->{
classId,
name,
},
teacher -> {
teacherId,
name,
email,
subjects
},
dueDate
}`);

export const EVENTS_LIST_QUERY = defineQuery(`
*[_type == 'event'] | order(_createdAt desc){
_id,
_createdAt,
eventId,
title,
class -> {
classId,
name,
},
date,
startTime,
endTime
}`);

export const RESULTS_LIST_QUERY = defineQuery(`
*[_type == 'result'] | order(_createdAt desc){
_id,
_createdAt,
resultId,
subject ->{
subjectId,
subjectName
},
class -> {
classId,
name,
},
teacher ->{
teacherId,
name,
email,
subjects
},
student ->{
studentId,
name,
email,
phone,
grade,
},
date,
score
}`);

export const ANNOUNCEMENTS_LIST_QUERY = defineQuery(`
  *[_type == 'announcement']| order(_createdAt desc){
    _id,
    _createdAt,  
     announcementId,
     title,
     class->{
     classId,
     name,
     },
     date
}`);

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
      "relatedAnnouncementTop3": *[_type == 'announcement' && teacher._ref == ^._id]|order(date desc) [0..3]{_id,title,description,date},
      "relatedAnnouncements": *[_type == 'announcement' && teacher._ref == ^._id] | order(date desc){_id,title,description,date}
   }
`);

export const STUDENTS_INFO_BY_ID = defineQuery(`
  *[_type == 'student' && studentId == $id][0]{
      _id,
      _createdAt,
      studentId,
      name,
      description,
      email,
      photo,
      phone,
      grade,
      class -> {
          _id,
          classId,
          name,
          capacity,
          grade,
          supervisor->{
            teacherId,
            name,
          },
          "studentInfoAnnouncementTop3" : *[_type == 'announcement' && class._ref == ^._id]| order(date desc){
               _id,title,description,date
            },
          "studentInfoAnnouncement" : *[_type == 'announcement' && class._ref == ^._id]| order(date desc){
              _id,title,description,date
            },
      },
      address,
      dob,
      bloodType,
      attendance,
      "studentLessonCount": count(lessons),
      Performance,
    }
`);
