<template>
	<view class="page">
		
		<!-- 首页轮播图  Begin-->
		<swiper :indicator-dots="true" :autoplay="true"  duration="1000" class="carousel">
			<swiper-item v-for=" (carouselItem,index) in CarouselList" :key="index">
				<image :src="serverContent+carouselItem.Img" class="carousel"></image>
			</swiper-item>
		</swiper>
		<!--首页轮播图 End -->
		<!-- 热门视频 Begin -->
		<view class="page-block super-hot">
			<view class="hot-title-wapper">
				<image src="../../static/super-hot/hot.png" class="hot-ico"></image>
				<view class="hot-title">
					今日热映
				</view>
			</view>
		</view>
		<scroll-view scroll-x="true" class="hot page-block">
			 <view class="signle-poster" v-for=" (item,index) in SuperHotList" :key="index" @click="goDetail(item.id)"> 
				 <view class="poster-wapper">
					 <image :src="item.img" class="hot-movie-jpg"></image>
					 <view class="movie-name">
						 {{item.nm}}
					 </view>
					 <traillerStars :innerScore="item.sc" ShowNum=1></traillerStars>
				 </view>
			 </view>
		</scroll-view>
		<!--热门视频 End -->
		
		<!-- 热门预告 Begin -->
		<view class="page-block super-hot">
			<view class="hot-title-wapper">
				<image src="../../static/super-movieyg/hotmovie.png" class="hot-ico"></image>
				<view class="hot-title">
					热门预告
				</view>
			</view>
		</view>
		<scroll-view scroll-x="true" class="hot page-block">
			<video v-for="(Item,index) in SuperMovieList" :key="index" :src="serverContent+Item.PlayerUrl" :poster="serverContent+Item.Pictures[0]" class="hot-movie" ></video>
		</scroll-view>
		
		<!-- 热门预告 End -->
		
		<!-- 猜你喜欢 Begin-->
		<view class="page-block super-hot">
			<view class="hot-title-wapper">
				<image src="../../static/ulike/ulikeico.png" class="hot-ico"></image>
				<view class="hot-title">
					猜你喜欢
				</view>
				<view @click="ulikeReload">
					<image src="../../static/ulike/reload.png" class="hot-ico ulike-reload"></image>
				</view>
			</view>
		</view>
		<view class="page-block guess-u-like">
			<view class="signle-like-movie" v-for="(Item,index) in UlikeMovieList" :key="index">
				<image :src="serverContent+Item.Bannerpic" class="like-movie-png"></image>
				<view class="movie-desc">
					<view class="movie-title">
						{{Item.Name}}
					</view>
					<traillerStars innerScore="9.1" ShowNum=0></traillerStars>
					<view class="movie-info">
						{{Item.Mtype}}
					</view>
					<view class="movie-info">
						演员：{{Item.Performers}}
					</view>
					<view class="movie-info">
						{{Item.UplayTime}}
					</view>
				</view>
				<view class="movie-oper" :data-index="index" @click="giveup">
					 <image src="../../static/ulike/giveup.png"  class="giveup-ico"></image>
					 <view class="giveup-me">
						 点赞
					 </view>
					 <view :animation="animationDataArr[index]" class="giveup-me animation-opacity">
						 +1
					 </view>
				</view>
			</view>
		</view>
		<!-- 猜你喜欢 End -->
	</view>
</template>

<script>
	// 引用自定义组件
	import traillerStars from "../../components/traillerStars.vue";
	
	export default {
		data() {
			return {
				CarouselList:[],   	//首页轮播组
				SuperHotList:[],	//热门影视组
				SuperMovieList:[],	//热门预告组
				UlikeMovieList:[],	//猜你喜欢组
				serverContent:"",	//静态资源加载地址
				
				animationData:{},	//动画	
				animationDataArr:[]	//动画组
			}
		},
		onUnload() {
			this.animationData = {}; //页面关闭 清除动画
			this.animationDataArr = [];
		},
		onPullDownRefresh() { //监听下拉操作，下拉刷新数据
			uni.showLoading({
				mask:true
			})
			this.refresh();
		},
		onLoad() {
			// #ifdef APP-PLUS || MP-WEIXIN
			this.animation = uni.createAnimation(); //创建动画
			// #endif
			
			//通过import文件实现全局变量
			// var serverUrl = common.ServerUrl;
			var serverUrl = this.ServerUrl;			//全局API地址
			this.serverContent = this.ServerContent; //静态资源加载地址
			
			// 获取首页轮播
			uni.request({
				url: serverUrl + '/Movies/GetCarousel',
				method:"POST",
				header: {
						'content-type': 'application/json'
					},
				success	: (res) => {
					this.CarouselList = res.data.Data;
				}
			})
			// 获取中间热映
			uni.request({
				url: "https://m.maoyan.com/ajax/movieOnInfoList",
				method:"GET",
				header: {
						'content-type': 'application/json',
						'cookie': 'iuuid=01E2CDE09CCA11EBBA0D13E3C3194737A56B4CED40274A299CC63CA5D6B488F1'
					},
				success	: (res) => {
					if(res.statusCode != 200){
						return;
					}
					this.SuperHotList = res.data.movieList;
					for (let i = 0; i < this.SuperHotList.length; i++) {
						this.SuperHotList[i].img = this.SuperHotList[i].img.replace('w.h/','')
					}
					
					
				}
			})
			
			//获取热门预告
			uni.request({
				url: serverUrl + '/Movies/HotMovies?type=supermovie',
				method:"POST",
				header: {
						'content-type': 'application/json'
					},
				success	: (res) => {
					this.SuperMovieList = res.data.Data;
				}
			})
			
			//获取猜你喜欢
			this.refresh();
		},
		methods: {
			refresh(){
				var serverUrl = this.ServerUrl;	
				uni.request({
					url: serverUrl + '/Movies/GetRandomMovies',
					method:"GET",
					header: {
							'content-type': 'application/json'
						},
					success	: (res) => {
						this.UlikeMovieList = res.data.Data;
					},
					complete: () => {
						uni.stopPullDownRefresh();
						uni.hideLoading();
					}
				})
			},
			
			//点赞动画效果
			giveup(e){
				// #ifdef APP-PLUS||MP-WEIXIN
				
				
				var index = e.currentTarget.dataset.index
				
				this.animation.translateY(-60).opacity(1).step({
					duration:400
				});
				
				this.animationData = this.animation;
				this.animationDataArr[index] = this.animationData.export();
				setTimeout(function () {
					this.animation.translateY(0).opacity(0).step({
						duration:0
					});
					this.animationData = this.animation;
					this.animationDataArr[index] = this.animationData.export();
				}.bind(this),600);
				// #endif
			},
			//重加载猜你喜欢数据
			ulikeReload(){
				uni.showLoading({
					mask:true
				})
				this.refresh();
			},
			goDetail(movieid){
				uni.navigateTo({
					url:'../detail/detail?movieid='+movieid
				})
			}
		}
		,
		components:{
			// 组件引用必须在这里注册
			traillerStars,
		}
	}
</script>

<style>
	@import url("index.css");
	
</style>
