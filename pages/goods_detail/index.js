// pages/goods_detail/index.js
import {request} from"../../request/index.js";
import regeneratorRuntime from "../../lib/runtime/runtime"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj: {},
    // 商品是否被收藏
    isCollect:false
  },
  // 商品对象
  GoodsInfo: {},
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
    let pages = getCurrentPages();
    let currentPage = pages[pages.length - 1];
    let options = currentPage.options;
    const { goods_id } = options;
    this.getGoodsDetail(goods_id);


  },
  // onShow: function (options) {
  //   let pages = getCurrentPages();
  //   let currentPage=pages[pages.length-1];
  //   let options=currentPage.options;
  //   this.getGoodsDetail(goods_id);

  //   const {goods_id} = options;
  //    this.getGoodsDetail(goods_id)

  // },
  async getGoodsDetail(goods_id) {
    const goodsObj = await request({ url: "/goods/detail", data: { goods_id } });
    this.GoodsInfo = goodsObj;
    // 1 获取缓存中的商品收藏的数组
    let collect = wx.getStorageSync("collect") || [];
    // 2 判断当前商品是否被收藏
    let isCollect = collect.some(v => v.goods_id === this.GoodsInfo.goods_id);
    this.setData({
      goodsObj: {
        goods_name: goodsObj.goods_name,
        goods_price: goodsObj.goods_price,
        // iphone部分手机 不识别 webp图片格式 
        // 最好找到后台 让他进行修改 
        // 临时自己改 确保后台存在 1.webp => 1.jpg 
        goods_introduce: goodsObj.goods_introduce.replace(/\.webp/g, '.jpg'),
        pics: goodsObj.pics
      },
      isCollect
    })
  },
// 点击轮播图 放大预览
handlePrevewImage(e) {
  // 1 先构造要预览的图片数组 
  const urls = this.GoodsInfo.pics.map(v => v.pics_mid);
  // 2 接收传递过来的图片url
  const current = e.currentTarget.dataset.url;
  wx.previewImage({
    current,
    urls
  });

},
  // // 点击加入购物车
  // handleCartAdd() {
  //   let cart = wx.getStorageSync('cart') || [];
  //   // 判断商品对象是否存入在购物车数组中
  //   let index = cart.findIndex(v => v.goods_id === this.GoodsDetail.goods_id);
  //   if(index === -1) {
  //     // 不存在 第一次加入
  //     this.GoodsDetail.num = 1;
  //     this.GoodsDetail.checked = true;
  //     cart.push(this.GoodsDetail);
  //   } else {
  //     // 已存在 数量++
  //     cart[index].num ++;
  //   }
  //   wx.setStorageSync('cart', cart);
  //   wx.showToast({
  //     title: '添加成功',
  //     icon: 'success',
  //     mask: true  // 防止用户手抖
  //   })
  // },
 // 点击 加入购物车
 handleCartAdd() {
  // 1 获取缓存中的购物车 数组
  let cart = wx.getStorageSync("cart") || [];
  // 2 判断 商品对象是否存在于购物车数组中
  let index = cart.findIndex(v => v.goods_id === this.GoodsInfo.goods_id);
  if (index === -1) {
    //3  不存在 第一次添加
    this.GoodsInfo.num = 1;
    this.GoodsInfo.checked = true;
    cart.push(this.GoodsInfo);
  } else {
    // 4 已经存在购物车数据 执行 num++
    cart[index].num++;
  }
  // 5 把购物车重新添加回缓存中
  wx.setStorageSync("cart", cart);
  // 6 弹窗提示
  wx.showToast({
    title: '加入成功',
    icon: 'success',
    // true 防止用户 手抖 疯狂点击按钮 
    mask: true
  });

},
handleCollect(){
  let isCollect=false;
  let collect=wx.getStorageSync('collect')||[];
  //2.判断商品是否被收藏过
  let index = collect.findIndex(v=>v.goods_id===this.GoodsInfo.goods_id);
  //3.当index=-1 表示已经收藏过
  if(index!==-1){
    collect.splice(index,1);
    isCollect=false;
    wx.showToast({
      title:"取消成功",
      icon:"success",
      mask:true
    });
  }else{
    collect.push(this.GoodsInfo);
    isCollect=true;
    wx.showToast({
      title:"收藏成功",
      icon:"success",
      mask:true
    });
  }
  wx.setStorageSync('collect',collect);
  this.setData({
    isCollect
  })
}

   
})