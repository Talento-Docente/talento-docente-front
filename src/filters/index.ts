import EmploymentFilters from "@/filters/employment.filters";
import TestFilters from "@/filters/test.filters";
import QuestionFilters from "@/filters/question.filters";
import StageFilters from "@/filters/stage.filters";

export default {
  ...EmploymentFilters,
  ...TestFilters,
  ...QuestionFilters,
  ...StageFilters,
}
