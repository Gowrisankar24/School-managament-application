import type { StructureResolver } from 'sanity/structure';

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = S =>
    S.list()
        .title('Content')
        .items([
            S.documentTypeListItem('teacher').title('Teacher'),
            S.documentTypeListItem('student').title('Student'),
            S.documentTypeListItem('parent').title('Parent'),
            S.documentTypeListItem('class').title('Class'),
            S.documentTypeListItem('lesson').title('Lesson'),
            S.documentTypeListItem('exam').title('Exam'),
            S.documentTypeListItem('subject').title('Subject'),
            S.documentTypeListItem('assignment').title('Assignment'),
            S.documentTypeListItem('event').title('Event'),
            S.documentTypeListItem('result').title('Result'),
            S.documentTypeListItem('announcement').title('Announcement'),
        ]);
