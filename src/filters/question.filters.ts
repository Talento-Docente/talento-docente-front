/** External dependencies */
// @ts-ignore
import _ from 'lodash'

/** Constants */
import { QUESTION_TYPES } from "@/constants/question.constants";


export default {

  questionQuestionType(value: string) {
    const foundElement = _.find(QUESTION_TYPES, (status: any) => {
      return status.key === value
    })
    if (foundElement) {
      return foundElement.value
    } else {
      return '-'
    }
  },

};
