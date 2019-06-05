
var common = require('../../utils/util.js'); 
var bsurl = require('../../utils/bsurl.js');
var async = require("../../utils/async.js");
var nt = require("../../utils/nt.js")
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabidx: 0,
    rec: {
      idx: 0, loading: false,
    },
    playlist: {
      idx: 1, loading: false,
      list: {},
      offset: 0,
      limit: 20
    },
    djlist: {
      idx: 2, loading: false,
      list: {},
      offset: 0,
      limit: 20
    },
    sort: {
      idx: 3, loading: false,
      list: {},
      offset: 0,
      limit: 20
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      if(options.share == 1) {

      }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    !this.data.rec.loading && this.init();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  switchtab: function(e) {
     var that = this
     var t = e.currentTarget.dataset.t;
     this.setData({tabidx: t});
    if (t == 1 && !this.data.playlist.loading) {
      this.gplaylist()
    }
  },

  gplaylist: function (isadd) {
    console.log("isadd打印",isadd);
    //分类歌单列表
    var that = this;
    wx.request({
      url: bsurl + 'top/playlist',
      data: {
        limit: that.data.playlist.limit,
        offset: that.data.playlist.offset,
        type: that.data.catelist.checked.name
      },
      complete: function (res) {
        that.data.playlist.loading = true;
        if (!isadd) { //首次加载
          that.data.playlist.list = res.data
        } else { //上拉加载
          res.data.playlists = that.data.playlist.list.playlists.concat(res.data.playlists);
          that.data.playlist.list = res.data
        }
        that.data.playlist.offset += res.data.playlists.length;
        that.setData({
          playlist: that.data.playlist
        })
      }
    })
  },

  init: function () {
    var that = this
    var rec = this.data.rec
    //banner，
    wx.request({
      url: bsurl + 'banner',
      data: { cookie: app.globalData.cookie },
      success: function (res) {
        that.setData({
          banner: res.data.banners
        })
      }
    });
    wx.request({
      url: bsurl + 'playlist/catlist',
      complete: function (res) {
        that.setData({
          catelist: {
            isShow: false,
            res: res.data,
            checked: res.data.all
          }
        })
      }
    })
    //个性推荐内容,歌单，新歌，mv，电台
    // async.map(['personalized', 'personalized/newsong', 'personalized/mv', 'personalized/djprogram'], function (item, callback) {
    //   wx.request({
    //     url: bsurl + item,
    //     data: { cookie: app.globalData.cookie },
    //     success: function (res) {
    //       callback(null, res.data.result)
    //     }
    //   })
    // }, function (err, results) {
    //   console.log(err)
    //   rec.loading = true;
    //   rec.re = results
    //   that.setData({
    //     rec: rec
    //   })
    // });
  }
})