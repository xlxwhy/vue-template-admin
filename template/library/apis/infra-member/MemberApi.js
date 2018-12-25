import fetch from '../../utils/http/fetch.js'
import consts from '../../utils/http/consts.js'

const ROOT = '/member';

export default {
  list(data, suc, err) {
    return fetch(data, suc, err, consts.HttpMethod.POST, `${ROOT}/list`);
  },
}
