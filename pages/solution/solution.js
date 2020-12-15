var app = getApp()
var http = require('../../utils/util')
var url = 'https://route.showapi.com/341-2'

Page({
    data: {
        page: 1,
        loadingHide: false,
        hideFooter: true,
        picList: []
    },

    onLoad: function (options) {
        // 页面初始化 options为页面跳转所带来的参数
        var that = this
     
        http.request(url, this.data.page, function (dataJson) {
            // console.log( dataJson )
            that.setData({
                picList: that.data.picList.concat(dataJson.contentlist),
                loadingHide: true
            })
        },
            function (reason) {
                console.log(reason)
                that.setData({
                    loadingHide: true
                })
            })
    },

    /**
     * 分享
     */
    onShareAppMessage: function (res) {
        return {
            title: '分享给好友',
            path: '/pages/picture/picture',
            success: function (res) {
                // 转发成功
                wx.showToast({
                    title: '转发成功',
                    image: '/image/success.png'
                })
            },
            fail: function (res) {
                // 转发失败
                wx.showToast({
                    title: '取消转发',
                    image: '/image/failure.png'
                })
            }
        }
    },

    /**
     * 下拉刷新
     */
    refresh() {
        console.log('picture-refresh')
        wx.showToast({
            title: '已加载最新',
            icon: 'success'
        })

        // var that = this
        // this.setData({
        //     page: 1,
        //     jokeList: []
        // })
        // http.request(url, this.data.page, function (dataJson) {
        //     that.setData({
        //         jokeList: that.data.jokeList.concat(dataJson.contentlist)
        //     })
        //     wx.stopPullDownRefresh()
        // }, function (reason) {
        //     console.log(reason)
        //     wx.stopPullDownRefresh()
        // })
    },

    /**
     * 滑动到底部加载更多
     */
    loadMore() {
        console.log('picture-loadMore')
        wx.showToast({
            title: '加载更多',
            icon: 'loading'
        })

      
        var that = this
        //显示footer
        this.setData({
            hideFooter: !this.data.hideFooter
        })
        http.request(url, ++this.data.page,
            function (dataJson) {
                // console.log( dataJson )
                that.setData({
                    picList: that.data.picList.concat(dataJson.contentlist),
                    hideFooter: !that.data.hideFooter
                })
            },
            function (reason) {
                console.log(reason)
                that.setData({
                    hideFooter: !that.data.hideFooter
                })
            })
    },

    /**
     * 图片放大
     */
    preview(event) {
        console.log(event.target.dataset.url)

        var urls = []
        urls.push(event.target.dataset.url)
        wx.previewImage({
            urls: urls // 需要预览的图片http链接列表
        })

        // wx.showToast({
        //     title: '点击右上角即可保存或分享给朋友',
        //     mask: true
        // })
    },

    /**
     * 评论区
     */
    comment(event) {
        console.log(event.target.dataset.ct)
    }
})
