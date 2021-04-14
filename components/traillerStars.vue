<template name="traillerStars">
	<view class="movie-score-wapper">
		 <image 
			v-for="(itemStar,index) in Star"
			:key="index"
			src="../static/super-hot/star.png" 
			class="movie-star-ico"></image>
		<image 
			v-for="(itemnoStar,index) in noStar"
			:key="index"
			src="../static/super-hot/nostar.png" 
			class="movie-star-ico"></image>
		<view class="movie-score" v-show="ShowNum == 1? true:false">
					 <image :src="SImg" class="movie-star-ico"></image>
					 <image src="../static/super-hot/moviescore/dian.png" class="movie-star-dian" v-show="Scoretype == 0?true:false"></image>
					 <image :src="GImg" class="movie-star-ico"></image>
		</view>
			
	</view>
</template>

<script>
	export default {
		name:"traillerStars",
		data() {
			return {
				Star:0,
				noStar:0, 
				Scoretype:0,//分数是否有小数点    0有，1没有
				GImg:"",    	//个位图片
				SImg:"" 		//十位图片
			};
		},
		props:{  //定义父页面传值
			innerScore:0,  	//分数
			ShowNum:0		//是否显示  1显示  0不显示
		},
		created() { //相当于Onload
			var tempScore = 0;
			var shiwei = "";
			var gewei = "";
			if(this.innerScore != null && this.innerScore !=undefined && this.innerScore != ''){
				tempScore = this.innerScore;
				// console.log(tempScore);
			}
			if(tempScore.toString().indexOf('.')>-1){
				this.Scoretype = 0
				shiwei  = "../static/super-hot/moviescore/"+tempScore.toString().substr(0,1)+".png";
				gewei 	= "../static/super-hot/moviescore/"+tempScore.toString().substr(2,2)+".png";
			}else{
				this.Scoretype = 1
				switch (tempScore){
					case "0":
						 shiwei = "";
						 gewei = "../static/super-hot/moviescore/0.png";
						break;
					case "10":
						 shiwei = "../static/super-hot/moviescore/1.png";
						 gewei = "../static/super-hot/moviescore/0.png";
						 
						break;
					default:
						shiwei="";
						gewei="../static/super-hot/moviescore/"+tempScore+".png";
						break;
				}
				
			}
			
			//星星
			var star = parseInt(tempScore/2);
			this.Star = star;
			this.noStar = 5-star;
			//评分
			this.GImg = gewei;
			this.SImg = shiwei;
		}
	}
</script>

<style>
.movie-score-wapper{
	display: flex;
	flex-direction: row;
}

.movie-star-ico{
	width: 20upx;
	height: 20upx;
	margin-top: 10upx;
}
.movie-star-dian{
	width: 10upx;
	height: 10upx;
}

.movie-score{
	margin-left: 15upx;
}
</style>
