function setStorage({ key, value }) {
  wx.setStorage({
    key: key,
    data: JSON.stringify(value)
  })
}

function getStorage(key) {
  return wx.getStorage({
    key: 'key',
    success (res) {
      if (res.errMsg === "getStorage:ok") {
          return JSON.parse(res.data)
      }
    }
  })
  // return wx.getStorage({ key })
  //   .then(res => {
  //     if (res.errMsg === "getStorage:ok") {
  //       return JSON.parse(res.data)
  //     }
  //   })
}

function getStorageSync(key) {
  let value = wx.getStorageSync(key)
  if (value) {
    return JSON.parse(value)
  }
}

function removeStorage(key) {
  return wx.removeStorage({ key })
}

function clearStorage() {
  wx.clearStorage()
}

module.exports = {
  setStorage,
  getStorage,
  getStorageSync,
  removeStorage,
  clearStorage
}


