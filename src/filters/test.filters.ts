/** External dependencies */
// @ts-ignore
import _ from 'lodash'

/** Constants */
import { TIME_TYPES } from "@/constants/test.constants";


export default {

  testTimeTypes(value: string) {
    const foundElement = _.find(TIME_TYPES, (status: any) => {
      return status.key === value
    })
    if (foundElement) {
      return foundElement.value
    } else {
      return '-'
    }
  },

};
