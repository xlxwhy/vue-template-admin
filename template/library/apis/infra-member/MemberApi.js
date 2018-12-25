import fetch from '../../utils/http/fetch.js'
import consts from '../../utils/http/consts.js'

const ROOT = '/platform/member';

export default {
  page(data, suc, err) {
    return fetch(data, suc, err, consts.HttpMethod.POST, `${ROOT}/page`);
  },
}
