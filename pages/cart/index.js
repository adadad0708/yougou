// pages/cart/index.js
import {getSetting,chooseAddress, openSetting,showModal,showToast} from "../../utils/asyncWx.js";
import regeneratorRuntime from "../../lib/runtime/runtime.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    allChecked: false,
    totalPrice: 0,
    totalNum: 0

  },
  onShow(){
    //1.获取缓存中的收货信息
    const address = wx.getStorageSync("address");
    const cart = wx.getStorageSync("cart")||[];
    this.setData({ address });

    this.setCart(cart);

    //1.计算全选
    //every 数组方法 会遍历 会接收一个回调函数 那么 每一个回调函数都返回true 那么every方法返回的是true
//空数组调用 every 就是 true
    //const allChecked=cart.every(v=>v.checked):false;
    // let allChecked=true;
    // //const allChecked=cart.length?cart.every(v=>v.checked):false;
    // //
    // let totalPrice=0;
    // let totalNum=0;
    // cart.forEach(v=>{
    //   if(v.checked){
    //     totalPrice+=v.num*v.goods_price;
    //     totalNum+=v.num;
    //   }else{
    //     allChecked=false;
    //   }
    // })
    // allChecked=cart.length!=0?allChecked:false;

    // //给data赋值
    // this.setData({
    //   address,
    //   cart,
    //   allChecked,
    //   totalPrice,
    //   totalNum

    // })
  },
  async handleChooseAddress() {
    try {
      // 1 获取 权限状态
      const res1 = await getSetting();
      const scopeAddress = res1.authSetting["scope.address"];
      // 2 判断 权限状态
      if (scopeAddress === false) {
        await openSetting();
      }
      // 4 调用获取收货地址的 api
      let address = await chooseAddress();
      address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo;

      // 5 存入到缓存中
      wx.setStorageSync("address", address);

    } catch (error) {
      console.log(error);
    }
  },
  handleItemChange(e){
    //获取修改的商品的id
    const goods_id = e.currentTarget.dataset.id;
    //获取购物车数组
    let {cart} = this.data;
    //找到被修改的商品对象
    let index = cart.findIndex(v => v.goods_id === goods_id)
    //
    cart[index].checked=!cart[index].checked;
    //  this.setData({
    //    cart
    //  });
    //  wx.setStorageSync('cart', cart)
    //  let allChecked=true;
    //  //const allChecked=cart.length?cart.every(v=>v.checked):false;
    //  //
    //  let totalPrice=0;
    //  let totalNum=0;
    //  cart.forEach(v=>{
    //    if(v.checked){
    //      totalPrice+=v.num*v.goods_price;
    //      totalNum+=v.num;
    //    }else{
    //      allChecked=false;
    //    }
    //  })
    //  allChecked=cart.length!=0?allChecked:false;
    //  this.setData({
    //   cart,
    //   totalPrice,totalNum,allChecked
    // });
    this.setCart(cart);
   },
   //设置购物车状态
   setCart(cart){
    let allChecked=true;
    //const allChecked=cart.length?cart.every(v=>v.checked):false;
    //
    let totalPrice=0;
    let totalNum=0;
    cart.forEach(v=>{
      if(v.checked){
        totalPrice += v.num * v.goods_price;
        totalNum += v.num;
      }else{
        allChecked = false;
      }
    })
    allChecked=cart.length != 0 ? allChecked : false;
    this.setData({
     cart,
     totalPrice,totalNum,allChecked
   });
   wx.setStorageSync('cart', cart);

   },
   handleItemAllCheck() {
    // 1 获取data中的数据
    let { cart, allChecked } = this.data;
    // 2 修改值
    allChecked = !allChecked;
    // 3 循环修改cart数组 中的商品选中状态
    cart.forEach(v => v.checked = allChecked);
    // 4 把修改后的值 填充回data或者缓存中
    this.setCart(cart);
  },
  async handleItemNumEdit(e){
    //获取传递过来的参数
  
    const {operation,id}=e.currentTarget.dataset;
    let {cart} =this.data;
    const index=cart.findIndex(v=>v.goods_id===id);
    if(cart[index].num===1&&operation===-1){
      // wx.showModel({
      //   title:'提示',
      //   content:"您是否要删除",
      //   success: (res)=> {
      //     if(res.confirm){
      //       cart.splice(index,1);
      //         this.setCart(cart);
      //       }else if(res.cancel){
      //         console.log("用户点击取消")
      //       }
                 //     }    
       
      // })
      const res=await showModal({
       
        content: '您是否要删除',
      });
      if(res.confirm){
        cart.splice(index,1);
          this.setCart(cart);
        }
    }else{
      cart[index].num+=operation;
      this.setCart(cart)
    }
  
  },
  async handelPay(){
    //1判断收货地址
    const {address,totalNum} = this.data;
    if(!address.userName){
      await showToast({title:"您还没有选择收货地址"});
      return;
    }
    if(totalNum===0){
      await showToast({title:"您还没有选购商品"});
      return;
    }
    wx.navigateTo({
      url: '/pages/pay/index'
    });
    //判断
  }
})