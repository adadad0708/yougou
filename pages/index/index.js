// index.js
// 获取应用实例
import {request} from"../../request/index.js";
import regeneratorRuntime from "../../lib/runtime/runtime"

Page({
  data: {
    swiperList:[],
    catesList:[],
    floorList:[],
    Cates:[]
  },
  // 事件处理函数
  onLoad(options){
    this.getSwiperLIst(),
    this.getCateList(),

    this.getFloorList()
  },
   
    getSwiperLIst(){
      request({url:"/home/swiperdata"})
    .then(result =>{
      this.setData({
        swiperList:result
      })

    })
  },
getCateList(){
  request({url:"/home/catitems"})
  .then(result =>{
    this.setData({
      catesList:result
    })
  }) 
}, 
getFloorList(){
  request({url:"/home/floordata"})
  .then(result =>{
    this.setData({
      floorList:result
    })
  }) 
},  
getCates(){
  request({
    url:"/categories"
  })
  .then(result =>{
    this.setData({
      Cates:result
    })
  }) 
}, 
})

