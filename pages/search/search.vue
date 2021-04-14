<template>
	<view class="page">
		<view class="search-block">
			<view class="search-block-ico">
				<image src="../../static/search/search.png" class="search-ico"></image>
			</view>
			<input type="text" :value="searchValue"  placeholder="搜索电影" maxlength="10" class="search-text"  @input="searchMovie"/>
		</view>
		<view class="search-list page-block">
			<view class="search-list-item" v-for="(item,index) in searchList" :key="index" @click="goDetail(item.id)">
				<view class="list-item-img">
					<image :src="item.img" class="item-img"></image>
				</view>
				<view class="list-item-info">
					<view class="item-info-title">
						{{item.nm}}
					</view>
					<view class="item-info-detail">
						<view class="item-info-title-english" v-show="item.enm==undefined || item.enm == ''?false:true">
							{{item.enm}}
						</view>
						<view class="item-info-type">
							{{item.cat}}
						</view>
						<view class="item-info-time">
							{{item.pubDesc}}
						</view>
					</view>
				</view>
				<view class="item-info-score" v-if="item.sc>0?true:false">
					<view>{{item.sc}}分</view>
				</view>
				<view v-else>
					<view>暂无评分</view>
				</view>
			</view>
			<view class="search-all" v-show="allmovies>0?true:false" @click="searchAll()">
				查看全部{{allmovies}}部影视剧
			</view>
		</view>
		
	</view>
</template>

<script>
	//防抖函数，防止短时间提交多次
	function debounce(func, wait=500){ //可以放入项目中的公共方法中进行调用
	 let timeout;
	 return function(event){
	  clearTimeout(timeout)
	  timeout = setTimeout(()=>{
	   func.call(this, event)
	  },wait)
	 }}
	
	export default {
		data() {
			return {
				searchValue:"",			//查询关键字
				searchList:[],			//查询结果
				page:1,					//当前页数
				allmovies:0				,//总数量	
				allmovieslist:""
			}
		},
		onReachBottom() { //页面触底事件
			var me = this;
			var page = me.page+10;
			var sValue = me.searchValue;
			var allmovieslist = me.allmovieslist;
			uni.showLoading({
				mask:true,
				title:"加载中..."
			})
			if(page <= allmovieslist){
				me.searchByFY(sValue,page,10);	
			}else{
				uni.hideLoading();
			}
		},
		methods: {
			//模糊查询
			searchMovie:debounce(function (e) {
				uni.showLoading({
					mask:true,
					title:"加载中..."
				})
				var txtsearchValue = e.detail.value;
				this.searchList = [];
				if(txtsearchValue == ""){
					this.searchList = [];
					this.allmovies = 0;
					uni.hideLoading()
					return;
				}
				this.searchValue = txtsearchValue;
				this.searchWhere();
			}),
			
			searchWhere(){
				
				uni.request({
					url:"https://m.maoyan.com/ajax/search?kw="+this.searchValue+"&cityId=59&stype=-1",
					method:"GET",
					success: (res) => {
						//判断是否有 有效数据
						if(res.statusCode != 200 || res.data.movies == undefined || res.data.movies.length <0){
							this.searchList = [];
							this.allmovies=0;
							uni.hideLoading()
							this.inputdis = false;
							return;
						}
						this.searchList = res.data.movies.list;
						// console.log(this.searchList);
						for (let i = 0; i < this.searchList.length; i++) {
							this.searchList[i].img = this.searchList[i].img.replace('w.h/','')
						}
						 this.allmovies = res.data.movies.total;
						 this.allmovieslist = res.data.movies.total;
					},complete: () => {
						this.inputdis = false;
						uni.hideLoading()
					}
				})
			},
			
			//分页模糊查询
			searchByFY(value,page,limit){
				var me = this;
				uni.request({
					url:"https://m.maoyan.com/searchlist/movies?keyword="+value+"&ci=59&offset="+page+"&limit="+limit,
					method:"GET",
					success: (res) => {
						//判断是否有 有效数据
						if(res.statusCode != 200 || res.data.movies == undefined || res.data.movies.length <0){
							me.searchList = [];
							uni.hideLoading()
							this.inputdis = false;
							return;
						}
						var templist = res.data.movies;
						for (let i = 0; i < templist.length; i++) {
							templist[i].img = templist[i].img.replace('w.h/','')
						}
						
						me.searchList = me.searchList.concat(templist);
						me.page = page;
						
					},complete: () => {
						this.inputdis = false;
						uni.hideLoading()
					}
				})
			},
			//查询全部
			searchAll(){
				this.searchList = [];
				this.allmovies = 0;
				uni.showLoading({
					mask:true,
					title:"加载中..."
				});
				 //去掉总数
				this.searchByFY(this.searchValue,1,10);
			},
			
			//跳转详情页
			goDetail(movieid){
				uni.navigateTo({
					url:"../detail/detail?movieid="+movieid
				})
			}
			
		}
	}
</script>

<style>
	@import url("search.css");
</style>
