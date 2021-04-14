<template>
	<view class="page">



		<!-- 头部图片和信息 -->
		<view class="movie-bgimg " :style="{backgroundImage:'url('+Imagesrc+')'}"></view>

		<view class="movie-detail">
			<view class="detail-img">
				<image :src="Moviedetail.img" class="detail-img-ico"></image>
			</view>
			<view class="detail-info">
				<view class="detail-info-nm">
					{{Moviedetail.nm}}
				</view>
				<view class="detail-info-enm">
					{{Moviedetail.enm}}
				</view>
				<traillerStars innerScore="8.9"></traillerStars>
				<view class="detail-info-snum">
					({{Moviedetail.snum}}人评分)
				</view>
				<view class="detail-info-cat">
					{{Moviedetail.cat}}
				</view>
				<view class="detail-info-dur">
					{{Moviedetail.src}}/{{Moviedetail.dur}}分钟
				</view>
				<view class="detail-info-pubDesc">
					{{Moviedetail.pubDesc}}
				</view>
			</view>
		</view>

		<!-- 中部 影片介绍 -->
		<view :class="fold == true?'movie-info-texthide page-block':'movie-info-textauto page-block'">
			{{Moviedetail.dra}}
		</view>
		<view class="movie-info-text-btn page-block" @click="changeText">
			<image :src="fold==true?'../../static/detail/down.png':'../../static/detail/top.png'"
				class="movie-info-text-btn-img"></image>
		</view>

		<view class="movie-detail-vedio">
			<video id="movievedio" :src="Moviedetail.videourl" :poster="Moviedetail.videoImg" class="movie-vedio"></video>
		</view>

		<!-- 电影图片展示 -->
		<view class="movie-detail-photos page-block">
			<view class="movie-detail-photos-text">影视剧照</view>
			<scroll-view scroll-x="true" class="movie-photos-scroll page-block">
				<view class="movie-photos-block" v-for="(item,index) in Moviedetail.photos" :key="index">
					<view class="movie-photos-item" @click="previewImg(index)">
						<image mode="aspectFill" class="movie-photos-png" :src="item" ></image>
					</view>

				</view>
			</scroll-view>
		</view>

		<!-- 电影评论展示 -->
		<view class="movie-comment page-block">
			<view class="movie-detail-photos-text">热门评论</view>
			<view class="movie-comment-item" v-for="(item,index) in commentslist" :key="index">
				<view class="movie-comment-user">
					<view>
						<image :src="item.avatarUrl" class="movie-comment-user-img"></image>
					</view>
					<view class="movie-comment-user-info">
						{{item.nick}}
						<traillerStars :innerScore="item.score"></traillerStars>
					</view>
				</view>
				<view class="movie-comment-text">
					<view>{{item.content}}</view>
				</view>
				<view class="movie-comment-info" @click="dianzan()">
					<view>{{item.startTime | formatDate}}</view>
					<view>
						<view>{{item.replyCount}}
							<image src="../../static/detail/zan.png" class="movie-comment-info-ico"></image>
						</view>
					</view>
				</view>
				<view class="line-wapper">
					<view class="line"></view>
				</view>
			</view>
			<view class="search-all" v-show="allcomments>0?true:false">
				查看全部{{allcomments}}条评论
			</view>
		</view>
	</view>
</template>

<script>
	import traillerStars from '../../components/traillerStars.vue';
	export default {
		data() {
			return {
				Movieid: "", //电影id
				Moviedetail: [], //电影详情
				Imagesrc: "", //背景图
				fold: true, //隐藏文本
				allcomments: "", //数量
				commentslist: [] //评论	
			}
		},
		onLoad(res) {
			var movieid = res.movieid;
			this.Movieid = movieid;
			this.searchDetail();
			this.searchComment();
		},
		onReady() {
			this.videocontext = uni.createVideoContext('movievedio');
		},
		onHide() {
			this.videocontext.pause();
		},
		onShow() {
			if(this.videocontext){
				this.videocontext.play();
			}
			
		},
		onShareAppMessage(res) {
			return {
				title:this.Moviedetail.nm,
				path:'/pages/detail/detail?movieid='+this.Movieid
			}
		},
		onNavigationBarButtonTap(e){
			console.log(e);
		},
		filters:{
			formatDate: function(value) {
			                var date = new Date();
			                date.setTime(value);
			                var month = date.getMonth() + 1;
			                var hours = date.getHours();
			                if (hours < 10)
			                    hours = "0" + hours;
			                var minutes = date.getMinutes();
			                if (minutes < 10)
			                    minutes = "0" + minutes;
			                var time = date.getFullYear() + "-" + month + "-" + date.getDate() +
			                    " " + hours + ":" + minutes;
			                return time;
			            }
			
		},
		methods: {
			//加载数据
			searchDetail() {
				uni.showLoading({
					mask: true,
					title: "加载中..."
				})
				uni.request({
					url: "https://m.maoyan.com/ajax/detailmovie?movieId="+this.Movieid,
					method: "GET",
					header: { //uni.request不支持小程序cookie，此处iuuid为自己获取的id，并手动设置cookie传入
						'cookie': 'iuuid=01E2CDE09CCA11EBBA0D13E3C3194737A56B4CED40274A299CC63CA5D6B488F1'
					},
					success: (res) => {
						// console.log(res);
						if (res.statusCode != 200) {
							uni.hideLoading();
							return;
						}
						this.Moviedetail = res.data.detailMovie;
						uni.setNavigationBarTitle({
							title: this.Moviedetail.nm
						})

						this.Moviedetail.img = this.Moviedetail.img.replace('w.h/', '');
						for (let i = 0; i < this.Moviedetail.photos.length; i++) {
							this.Moviedetail.photos[i] = this.Moviedetail.photos[i].replace('w.h/', '')
						};
						this.Imagesrc = this.Moviedetail.photos[2];

					},
					complete() {
						uni.hideLoading();
					}
				})
			},
			//上拉下拉展示文本
			changeText() {
				this.fold = !this.fold;
			},

			//预览图片
			previewImg(index) {
				uni.previewImage({
					current: index,
					urls: this.Moviedetail.photos,
				});
			},
			//查询热门评论
			searchComment(pageoffset) {
				uni.request({
					url: "https://m.maoyan.com/review/v2/comments.json?movieId="+this.Movieid+"&userId=-1&offset=15&limit=15&ts=",
					method: "GET",
					header: { //uni.request不支持小程序cookie，此处iuuid为自己获取的id，并手动设置cookie传入
						'cookie': 'iuuid=01E2CDE09CCA11EBBA0D13E3C3194737A56B4CED40274A299CC63CA5D6B488F1'
					},
					success: (res) => {
						console.log(res);
						if (res.statusCode != 200) {
							uni.hideLoading();
							return;
						}
						this.commentslist = res.data.data.hotComments;
						this.allcomments = res.data.data.total;
						console.log(this.commentslist);
					}
				})
			}
			
		},
		components: {
			traillerStars,
		}
	}
</script>

<style>
	@import url("detail.css");
</style>
