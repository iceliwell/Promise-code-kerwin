function KerwinPromise(executor) {
  this.status = 'pending'
  var _this = this
  this.result = undefined
  this.cb = []
  function resolve(res) {
    if (_this.status !== 'pending') return
    _this.status = 'fulfilled'
    _this.result = res
    _this.cb.forEach(item => {
      item.successCB && item.successCB(_this.result)
    })
  }

  function reject(res) {
    if (_this.status !== 'pending') return
    _this.status = 'rejected'
    _this.result = res
    _this.cb.forEach(item => {
      item.failCB && item.failCB(_this.result)
    })
  }

  executor(resolve, reject)
}

KerwinPromise.prototype.then = function (successCB, failCB) {
  if (this.status === 'fulfilled') {
    successCB && successCB(this.result)
  }
  if (this.status === 'rejected') {
    failCB && failCB(this.result)
  }
  // 收集回调
  if (this.status === 'pending') {
    this.cb.push({
      successCB,
      failCB
    })
  }
}