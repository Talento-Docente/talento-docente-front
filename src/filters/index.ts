import EmploymentFilters from "@/filters/employment.filters";
import TestFilters from "@/filters/test.filters";
import QuestionFilters from "@/filters/question.filters";

export default {
  ...EmploymentFilters,
  ...TestFilters,
  ...QuestionFilters
}
