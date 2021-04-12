# uniappLearn 电影小程序

### 主页
后端接口采用自己编写的webapi，数据较少，勉强够展示效果
地址：http://121.5.249.207/
注意，小程序发布必须为https域名，所以此接口仅供调试使用

### 搜索页
搜索页面因需要较大的数据量支持，所以采用了猫眼电影api
+ 模糊查询（无分页）
  - 地址：https://m.maoyan.com/ajax/search?kw=&cityId=59&stype=-1
  - 其中kw为关键字，cityid为城市id，type未知
+ 模糊分页查询
  - 地址：https://m.maoyan.com/searchlist/movies?keyword=&ci=59&offset=&limit=
  - 其中keyword为关键字，ci为城市id，offset为起始值，limit为增量
  - 如offset=1，limit=10，则数据返回是1-10数据
  - offset=7，limit=15，则返回数据是7-22数据
  - 所以此时分页逻辑应该是offset累加每页数量实现分页
