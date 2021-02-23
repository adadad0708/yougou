// pages/goods_list/index.js
import {request} from"../../request/index.js";
import regeneratorRuntime from "../../lib/runtime/runtime"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:'综合',
        isActive:'true'
      },
      {
        id:1,
        value:'销量',
        isActive:'false'
      },
      {
        id:2,
        value:'价格',
        isActive:'false'
      }
    ],
    goodsList:[]

  },
  QueryParams:{
    query:"",
    cid:"",
    pagenum:1,
    pagesize:10

  },
  totalPages:1,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
//console.log(options)
this.QueryParams.cid=options.cid;
this.getGoodsList();
wx.showLoading({
   title:'加载中',
})
setTimeout(function() {
  wx.hideLoading()
 
  
},5000)


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  async getGoodsList(){
    const res=await request({url:'/goods/search',data:this.QueryParams});
    const total=res.taotal;
    //计算总ye数
    this.totalPages=Math.ceil(total/this.QueryParams.pageSize)
    this.setData({
      goodsList:[...this.data.goodsList,...res.goods]
    })
    wx.stopPullDownRefresh();
  },
  //标题打击事件 从子组件传递过来
  handleItemChange(e) {
    const { index } = e.detail;
    let { tabs } = this.data;
    tabs.forEach((item, i) => item.isActive = index === i ? true : false);
    this.setData({
      tabs
    })
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

    this.setData({
      goodsList:[]
    })
    //重置页码、
    this.QueryParams.pagenum=1;
    this.getGoodsList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  if(this.QueryParams.pagenum>=this.totalPages){
   wx.showToast({
     title: '没有下一页了' 
   })
  }else{
    //console.log('还有下一页数据')
    this.QueryParams.pagenum++;
    this.getGoodsList()
  }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {


  }
})