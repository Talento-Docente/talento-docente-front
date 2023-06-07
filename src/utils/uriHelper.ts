/** External dependencies */
import _ from 'lodash'

function parseParams (params: any, parentKey=undefined, lvl=0) {
  if (!params) {
    return ''
  }
  let res = lvl === 0 ? '?' : ''
  const keys = Object.keys(params)
  const prevLvl = lvl - 1
  const container = prevLvl > 0 ? `[${parentKey}]` : prevLvl < 0 ? '' : parentKey

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    const separator = i > 0 && res.length > 1 ? '&' : ''

    if (_.isArray(params[key])) {
      res += _.map(params[key], (a: any) => {
        return `${separator}${container}[${key}][]=${a}`
      }).join('&')
    } else if (typeof(params[key]) === 'object') {
      // @ts-ignore
      const parsedObject = parseParams(params[key], key, lvl+1).split('&').join(`&${container}`)

      if (parsedObject) res += `${separator}${container}${parsedObject}`
    } else {
      const parsedValue = encodeURIComponent(params[key])

      if (parsedValue) res += `${separator}${container}${lvl > 0 ? `[${key}]` : key}=${encodeURIComponent(params[key])}`
    }
  }

  return res
}

const urlWithParams = function (url: any, params: any) {
  return `${url}${parseParams(params)}`
}

export default urlWithParams
