export default {
  local: localStorage,
  session: sessionStorage,
  host: location.href,
  get(...arg) {
    let type = ''
    let name = ''
    if (arg.length == 1) {
      type = 'local'
      name = arg[0]
    } else if (arg.length == 2) {
      type = arg[0]
      name = arg[1]
    } else {
      return null
    }
    const item = this[type].getItem(this.host + '_' + name)
    return !item ? null : JSON.parse(item)
  },
  set(...arg) {
    let type = ''
    let name = ''
    let val = ''
    if (arg.length == 2) {
      type = 'local'
      name = arg[0]
      val = arg[1]
    } else if (arg.length == 3) {
      type = arg[0]
      name = arg[1]
      val = arg[2]
    } else {
      return null
    }
    return this[type].setItem(this.host + '_' + name, JSON.stringify(val))
  },
  remove(...arg) {
    let type = ''
    let name = ''
    if (arg.length == 1) {
      type = 'local'
      name = arg[0]
    } else if (arg.length == 2) {
      type = arg[0]
      name = arg[1]
    } else {
      return null
    }
    return this[type].removeItem(this.host + '_' + name)
  },
  clear(...arg) {
    let type = ''
    if (arg.length == 1) {
      type = arg[0]
    } else if (arg.length == 0) {
      type == 'local'
    } else {
      return null
    }
    return this[type].clear()
  }
}
