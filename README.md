# uniapp 仿猫眼电影小程序

### 项目体验二维码
+ 需要申请，名额不多，看到会通过，请用微信扫码,如果超过24小时未同意，可直接添加我联系方式催促我！
+ 此项目是自学uniapp一周后的产物，我本人也不是专业前端，所以项目仅供参考，经不起推敲hhh
+ ![](https://github.com/ZhangWY0724/uni-Movie/blob/main/%E6%BC%94%E7%A4%BA%E5%9B%BE%E7%89%87/erweima.jpg)
### 项目日志
#### 2021-12-20
+ 最近有小伙伴问我接口的问题，目前所有接口都以下面猫眼接口为准，我个人编写的接口长期没有维护所以不知道还能不能用，另外我的项目不是完全按照视频编写，其中大部分还是我自己重构的，所以和视频有些出入
#### 2021-4-16
+ 由于登录接口缺失，并且第三方登录需要开通认证微信开放平台，所以登录功能暂时没办法实现
+ 为了发布需要，现已经全部接口替换为猫眼api，原功能代码均保存并注释，并不影响
+ 如果接口返回网络不给力，或者返回了html代码，则说明验证信息已经过期，需要去手机端重新抓取uuid
#### 2021-4-13
+ 项目会跟着我自身学习进度不断完善，并且将其中用到的接口提供出来
+ 后端接口采用自己编写的webapi，数据较少，勉强够展示效果。地址：http://121.5.249.207/
+ 部分功能是跟随着视频来，部分功能为自己拓展，跟着猫眼小程序编写，不要一味跟着视频写，最好自己找个参照可以完成类似的功能
+ 注意，小程序发布必须为https域名，所以此接口仅供调试使用
+ 如果需要别的接口或者项目中有什么问题，可以联系我qq1024516151或微信zwy6214留言

### 主页
+ 今日热映
  - 地址：https://m.maoyan.com/ajax/movieOnInfoList GET
+ 正在热映
  - 地址：https://m.maoyan.com/ajax/moreComingList?token=&optimus_code=10&movieIds=&optimus_risk_level=71
  - 需要携带认证参数，movieIds为今日热映接口数据中的movieIds，通过拼接不同的movieId完成伪分页效果
  - 例如：https://m.maoyan.com/ajax/moreComingList?token=&optimus_code=10&movieIds=12222,13564,97461,61654&optimus_risk_level=71
  

### 搜索页
搜索页面因需要较大的数据量支持，所以采用了猫眼电影api
+ 模糊查询（无分页）
  - 地址：https://m.maoyan.com/ajax/search?kw=&cityId=59&stype=-1 GET
  - 其中kw为关键字，cityid为城市id，type未知
+ 模糊分页查询
  - 地址：https://m.maoyan.com/searchlist/movies?keyword=&ci=59&offset=&limit= GET
  - 其中keyword为关键字，ci为城市id，offset为起始值，limit为增量
  - 如offset=1，limit=10，则数据返回是1-10数据
  - offset=7，limit=15，则返回数据是7-22数据
  - 所以此时分页逻辑应该是offset累加每页数量实现分页
### 详情页
这个页面的接口，都需要携带验证信息，不然会被美团验证中心拦截
+ 查询电影详情
  - 地址：https://m.maoyan.com/ajax/detailmovie?movieId=
  - 主要参数是movieId，需携带uuid，至于如何取uuid，自行想办法
+ 查询电影评论
  - 地址：https://m.maoyan.com/review/v2/comments.json?movieId=&userId=-1&offset=15&limit=15&ts=
  - 主要参数为movieId，此接口会返回默认的热门20条数据，数据分页条件应该是以ts时间戳为准，自行测试
### 演示图片
![](https://github.com/ZhangWY0724/uniappLearn/blob/main/%E6%BC%94%E7%A4%BA%E5%9B%BE%E7%89%87/index.png)
![](https://github.com/ZhangWY0724/uniappLearn/blob/main/%E6%BC%94%E7%A4%BA%E5%9B%BE%E7%89%87/search.png)
![](https://github.com/ZhangWY0724/uniappLearn/blob/main/%E6%BC%94%E7%A4%BA%E5%9B%BE%E7%89%87/search2.png)
![](https://github.com/ZhangWY0724/uniappLearn/blob/main/%E6%BC%94%E7%A4%BA%E5%9B%BE%E7%89%87/detail.png)
