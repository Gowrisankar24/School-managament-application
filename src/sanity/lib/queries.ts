import { defineQuery } from 'next-sanity';

export const TEACHERS_LIST_QUERY = defineQuery(`
*[_type == 'teacher'] | order(_createdAt desc){
 _id,
 _createdAt,
teacherId,
name,
email,
photo,
phone,
subjects[] -> {
subjectId,
subjectName
},
classes[] -> {
classId,
name,
capacity,
grade,
},
address
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
    supervisor
}`);

export const LESSONS_LIST_QUERY = defineQuery(`
*[_type == 'lesson'] | order(_createdAt desc){
_id,
_createdAt,
lessonId,
subject,
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
