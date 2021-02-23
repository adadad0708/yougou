// pages/auth/index.js
import regeneratorRuntime from '../../lib/runtime/runtime';
import { getSetting, chooseAddress, openSetting, showModal, showToast, requestPayment,login } from "../../utils/asyncWx.js";

import { request } from "../../request/index.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  async handleGetUserInfo(e){
    //console.log(e)
    const { encryptdData,rawData,iv,signature} = e.detail;
    const {code} = await login();
    const loginParams  = {encryptdData,rawData,iv,signature,code};
    const {token}=await request({url:"/users/wxlogin",data:loginParams,method:"post"});
//把token存入缓存中
wx.setStorageSync('token', token);
wx.navigateBack({
  delta: 1, // 回退前 delta(默认为1) 页面
  success: function(res){
    // success
  },
  fail: function() {
    console.log(error)
  },
  complete: function() {
    // complete
  }
})

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  }
})