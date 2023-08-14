/** External dependencies */
import _ from 'lodash'

/** Constants */
import { STAGE_TYPES } from "@/constants/stage.constants";

export default {
  flowStageType(value: string) {
    const foundElement = _.find(STAGE_TYPES, (status: any) => {
      return status.key === value
    })
    if (foundElement) {
      return foundElement.value
    } else {
      return '-'
    }
  },

};
