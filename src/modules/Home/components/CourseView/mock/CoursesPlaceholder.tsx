import { Course } from '../CourseView';

export const CoursesPlaceholder: Course[] = '1'
  .repeat(6)
  .split('')
  .map((title) => {
    return { title: title };
  });
