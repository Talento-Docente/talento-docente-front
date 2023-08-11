/** External dependencies */
// @ts-ignore
import _ from 'lodash'

/** Constants */
import { EMPLOYMENT_TYPES, STATUSES, SCHEDULE_TYPES, QUALIFICATIONS } from "@/constants/employment.constants";


export default {

  employmentStatuses(value: string) {
    const foundElement = _.find(STATUSES, (status: any) => {
      return status.key === value
    })
    if (foundElement) {
      return foundElement.value
    } else {
      return '-'
    }
  },

  employmentType(value: string) {
    const foundElement = _.find(EMPLOYMENT_TYPES, (status: any) => {
      return status.key === value
    })
    if (foundElement) {
      return foundElement.value
    } else {
      return '-'
    }
  },

  employmentQualifications(value: string) {
    const foundElement = _.find(QUALIFICATIONS, (status: any) => {
      return status.key === value
    })
    if (foundElement) {
      return foundElement.value
    } else {
      return '-'
    }
  },

  employmentScheduleType(value: string) {
    const foundElement = _.find(SCHEDULE_TYPES, (status: any) => {
      return status.key === value
    })
    if (foundElement) {
      return foundElement.value
    } else {
      return '-'
    }
  }

};
