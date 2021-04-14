# uniappLearn 电影小程序

## 前言
+ 项目会跟着我自身学习进度不断完善，并且将其中用到的接口提供出来
+ 后端接口采用自己编写的webapi，数据较少，勉强够展示效果。地址：http://121.5.249.207/
+ 部分功能是跟随着视频来，部分功能为自己拓展，跟着猫眼小程序编写，不要一味跟着视频写，最好自己找个参照可以完成类似的功能
+ 注意，小程序发布必须为https域名，所以此接口仅供调试使用
### 主页
+ 中间的今日热映接口采用的猫眼api
  - 地址：https://m.maoyan.com/ajax/movieOnInfoList GET
+ 其余接口均为自编写Webapi，详情看http://121.5.249.207/  并进入swagger页签

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
