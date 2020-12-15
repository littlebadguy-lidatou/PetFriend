/**
 * 请求网络
 */
function request(url, page, successFunc, failFunc) {
    if (typeof successFunc != 'function' || typeof failFunc != 'function') {
        return
    }
    var app = getApp()
    wx.request({
        url: url,
        data: {
            //注意这里提示showapi_appid类型不是数字
            showapi_appid: '' + app.globalData.showapi_appid,
            showapi_sign: app.globalData.showapi_sign,
            page: page,
            maxResult: app.globalData.maxResult
        },
        success: function (res) {
            // console.log( res.data )
            if (res.data.showapi_res_code == 0) {
                successFunc(res.data.showapi_res_body)
            } else {
                failFunc(res.data.showapi_res_error)
            }
        },
        fail: function () {
            fail('网络错误')
        }
    })
}

module.exports = {
    request: request
}
