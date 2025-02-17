import { type SchemaTypeDefinition } from 'sanity';
import { teacherTableTypes } from './teacher';
import { StudentTableTypes } from './student';
import { parentTableTypes } from './parent';
import { classTableTypes } from './class';
import { lessonsTableTypes } from './lesson';
import { ExamsTableTypes } from './exam';
import { SubjectsTableTypes } from './subject';
import { assignmentTableTypes } from './assignment';
import { eventsTableListTypes } from './event';
import { ResultsTableTypes } from './result';
import { AnnoncementTableTypes } from './announcement';
import { AttendanceChartTypes } from './attendance';
import { FinanceChartTypes } from './finance';

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [
        teacherTableTypes,
        StudentTableTypes,
        parentTableTypes,
        classTableTypes,
        lessonsTableTypes,
        ExamsTableTypes,
        SubjectsTableTypes,
        assignmentTableTypes,
        eventsTableListTypes,
        ResultsTableTypes,
        AnnoncementTableTypes,
        AttendanceChartTypes,
        FinanceChartTypes,
    ],
};
