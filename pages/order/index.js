// pages/order/index.js
Page({

  
  /**
   * 页面的初始数据
   */
  data: {
    orders:[],

    tabs:[
      {
        id:0,
        value:"全部",
        isActive:true
  
      },
      {
        id:1,
        value:"待付款",
        isActive:true
  
      },
      {
        id:2,
        value:"待发货",
        isActive:false
  
      },
      {
        id:3,
        value:"退款/售后",
        isActive:false
  
      },
    ],

  },
  onShow(options){
    const token=wx.getStorageSync('token');
    if(!token){
      wx.navigateTo({
        url: '/pages/auth/index',
         
      })
    }
    //console.log(options);
    let pages=getCurrentPages();
    let currentPage=pages[pages.length-1]
    //console.log(pages)
    const {type} = (currentPage.options);
    this.changeTitleByIndex(type-1)
    this.getgetOrders(type);

  },
  async getOrders(type){
    const res= await request({url:"/my/orders/all",data:{type}})
this.setData({
  orders: res.orders.map(v=>({...v,create_time_cn:(new Date(v.create_time*1000).toLocaleString())}))
})

  },
  //根据标题索引来激活选中标题数组
  changeTitleByIndex(index){
    const {tabs} = this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false)
    this.setData({
      tabs
    })

  },
  handleTabsItemChange(e){
    const {index} = e.detail;
    let {tabs} = this.data;
  //   tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false)
  // this.setData({
  //   tabs
  // })
  this.changeTitleByIndex(index);
   // 2 重新发送请求 type=1 index=0
   this.getOrders(index+1);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)

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