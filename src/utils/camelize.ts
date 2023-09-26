import _ from 'lodash'

export const snakeToCamel = (obj: any): any => {
  if (_.isArray(obj)) {
    return obj.map(item => snakeToCamel(item))
  } else if (_.isObject(obj)) {
    return _.mapValues(_.mapKeys(obj, (_value, key) => _.camelCase(key)), value => snakeToCamel(value));
  } else {
    return obj
  }
} 