import { makeAutoObservable } from "mobx";


class user {
    token=''
    yishengdata=[
        {
          id: 456545345232,
          hospital: "纽约市第一人民医院", //所属医院
          doctors: "约翰", //医生名字
          detail: "神经内科，专治一切疑难杂症2",
          bookriqi: [
            {
              date: 1, //日期 精确到日
              time: [
                {
                  day: 1,
                  book: [
                    {
                      shangwu: "上午",
                      haoma: [
                        {
                          paixu: 1, //排序
                          status: 1, //预约的状态1可以 0不可以，2已经预定
                        },
                        {
                          paixu: 2, //排序
                          status: 0, //预约的状态1可以 0不可以，2已经预定
                        },
                        {
                          paixu: 3, //排序
                          status: 3, //预约的状态1可以 0不可以，2已经预定
                        },
                        {
                          paixu: 4, //排序
                          status: 3, //预约的状态1可以 0不可以，2已经预定
                        }, {
                          paixu: 5, //排序
                          status: 3, //预约的状态1可以 0不可以，2已经预定
                        }, {
                          paixu: 6, //排序
                          status: 3, //预约的状态1可以 0不可以，2已经预定
                        }, {
                          paixu: 7, //排序
                          status: 3, //预约的状态1可以 0不可以，2已经预定
                        }, {
                          paixu: 8, //排序
                          status: 3, //预约的状态1可以 0不可以，2已经预定
                        }, {
                          paixu: 9, //排序
                          status: 3, //预约的状态1可以 0不可以，2已经预定
                        }, {
                          paixu: 10, //排序
                          status: 3, //预约的状态1可以 0不可以，2已经预定
                        }, {
                          paixu: 11, //排序
                          status: 3, //预约的状态1可以 0不可以，2已经预定
                        }, {
                          paixu: 12, //排序
                          status: 3, //预约的状态1可以 0不可以，2已经预定
                        }, {
                          paixu: 13, //排序
                          status: 3, //预约的状态1可以 0不可以，2已经预定
                        }, {
                          paixu: 14, //排序
                          status: 3, //预约的状态1可以 0不可以，2已经预定
                        },
                        {
                          paixu: 15, //排序
                          status: 0, //预约的状态1可以 0不可以，2已经预定
                        },
                        {
                          paixu: 16, //排序
                          status: 0, //预约的状态1可以 0不可以，2已经预定
                        },
                        {
                          paixu: 17, //排序
                          status: 1, //预约的状态1可以 0不可以，2已经预定
                        },
                      ],
                    },
                    {
                      shangwu: "下午",
                      haoma: [
                        {
                          paixu: 1, //排序
                          status: 1, //预约的状态1可以 0不可以，2已经预定
                        },
                      ],
                    },
                  ],
                },
    
                {
                  day: 2,
                  book: [
                    {
                      shangwu: "上午",
                      haoma: [
                        {
                          paixu: 1, //排序
                          status: 1, //预约的状态1可以 0不可以，2已经预定
                        },
                      ],
                    },
                  ],
                },
              ],
            },
    
            {
              date: 2, //日期 精确到日
              time: [
                {
                  day: "上午",
                  book: [
                    {
                      weizhi: 1,
                      status: 1, //预约的状态1可以 0不可以，2已经预定
                    },
                    {
                      weizhi: 2,
                      status: 1, //预约的状态1可以 0不可以，2已经预定
                    },
                  ],
                },
                {
                  day: "下午",
                  book: [
                    {
                      weizhi: 1,
                      status: 1, //预约的状态1可以 0不可以，2已经预定
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 3346542313,
          hospital: "纽约市第一人民医院", //所属医院
          doctors: "汤姆", //医生名字
          bookriqi: [
            {
              date: 1, //日期 精确到日
              time: [
                {
                  day: "上午",
                  book: [
                    {
                      status: 1, //预约的状态1可以 0不可以，2已经预定
                    },
                  ],
                },
    
                {
                  day: "下午",
                  book: [
                    {
                      status: 1, //预约的状态1可以 0不可以，2已经预定
                    },
                  ],
                },
              ],
            },
    
            {
              date: 2, //日期 精确到日
              time: [
                {
                  day: "上午",
                  book: [
                    {
                      weizhi: 1,
                      status: 1, //预约的状态1可以 0不可以，2已经预定
                    },
                    {
                      weizhi: 2,
                      status: 1, //预约的状态1可以 0不可以，2已经预定
                    },
                  ],
                },
                {
                  day: "下午",
                  book: [
                    {
                      weizhi: 1,
                      status: 1, //预约的状态1可以 0不可以，2已经预定
                    },
                  ],
                },
              ],
            },
          ],
        },
    
        {
          hospital: "华盛顿三甲医院", //所属医院
          doctors: "约翰", //医生名字
          heard: "https://t10.baidu.com/it/u=988188945,954460719&fm=58",
          id: 2323232,
          bookriqi: [
            {
              date: 1, //日期 精确到日
              time: [
                {
                  day: "上午",
                  book: [
                    {
                      status: 1, //预约的状态1可以 0不可以，2已经预定
                    },
                  ],
                },
    
                {
                  day: "下午",
                  book: [
                    {
                      status: 1, //预约的状态1可以 0不可以，2已经预定
                    },
                  ],
                },
              ],
            },
    
            {
              date: 2, //日期 精确到月
              time: [
                {
                  day: 1,
                  book: [
                    {
                      weizhi: 1,
                      status: 1, //预约的状态1可以 0不可以，2已经预定
                    },
                    {
                      weizhi: 2,
                      status: 1, //预约的状态1可以 0不可以，2已经预定
                    },
                  ],
                },
                {
                  day: "下午",
                  book: [
                    {
                      weizhi: 1,
                      status: 1, //预约的状态1可以 0不可以，2已经预定
                    },
                  ],
                },
              ],
            },
          ],
        },
      ]

    userInfo = {}
    
    isLogin = false

    

    constructor(){
        makeAutoObservable(this)
    }

    onxx=()=>{
        this.token='ww'
    }

    updateUserInfo(target) {
      this.userInfo = target;
      if(target.account){
        this.isLogin = true;
      }
    }

    updateIsLogin(target) {
      this.isLogin = target;
    }
}

const userdata = new user();

export { userdata }