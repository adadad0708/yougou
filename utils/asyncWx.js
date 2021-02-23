export const getSetting = () => {
    return new Promise((resolve, reject) => {
      wx.getSetting({
        success: (result) => {
          resolve(result);
        },
        fail: (error) => {
          reject(error)
        }
      });
    })
  }
  
  export const openSetting = () => {
    return new Promise((resolve, reject) => {
      wx.openSetting({
        success: (result) => {
          resolve(result);
        },
        fail: (error) => {
          reject(error)
        }
      });
    })
  }
  
  export const chooseAddress = () => {
    return new Promise((resolve, reject) => {
      wx.chooseAddress({
        success: (result) => {
          resolve(result);
        },
        fail: (error) => {
          reject(error)
        }
      });
    })
  }
  
  /**
   * @param {object} content 参数
   */
//   export const showModal = ({content}) => {
//     return new Promise((resolve, reject) => {
//       wx.showModal({
//         title: '提示',
//         content: content,
//         success: (result) => {
//           resolve(result);
//         },
//         fail: (error) => {
//           reject(error);
//         }
//       });
//     })
//   }
  
  export const login = () => {
    return new Promise((resolve, reject) => {
      wx.login({
        timeout:10000,
        success: (result) => {
          resolve(result);
        },
        fail: (error) => {
          reject(error);
        }
      });
    })
  }
  
  export const requestPayment = (pay) => {
    return new Promise((resolve, reject) => {
      wx.requestPayment({
        ...pay,
        success: (result) => {
          resolve(result);
        },
        fail: (error) => {
          reject(error);
        }
      });
        
    })
  }

  export const showModal=({content})=>{
    return new Promise((resolve,reject)=>{
          wx.showModal({
              title:"提示",
              content:content,
              success: (res)=> {
                  resolve(res);
              },
              fail:(err)=>{
                  reject(err)
              }
                //   if(res.confirm){
                //       cart.splice(index,1);
                //       this.setCart(cart);
                //   }else if(res.cancel){
                //       comsole.log("用户点击取消")
                //   }
                  
              
          })

      })
  }

  export const showToast=({title})=>{
      return new Promise((resolve,reject)=>{
          wx.showToast({
              title:title,
              icon:'none',
              success: (res)=> {
                  resolve(res)
                  
              },
              fail:(res)=>{
                  reject(err)
              }
          })
      })

  }