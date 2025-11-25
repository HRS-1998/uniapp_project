<template>
	<view>
		<u-sticky>
			<NavigationBar title="商城" :back="false" color="black" background="#FFF" />
		</u-sticky>
		<view class="shop">
			<view class="shop__top-con">
				<u-sticky offset-top="30">
					<view>
						<LocationPicker @tap="bindMapTap" :show-icon="true" />
						<view class="shop__top-search"><u-search @search="onSearch" placeholder="请输入购买的商品"
								v-model="searchData" :show-action="false" shape="square"  searchIconColor="#909399"></u-search>
						</view>
					</view>
				</u-sticky>
				<view class="shop__banner">
					<!-- <u-image width="100%" height="100" src="//innerstatic.tcy365.com/static/108sq-aihuasuanbeta/assets/img/banner-community.2a2a31b8.png" /> -->
					<u-image width="100%" height="100" radius="8px"
						src="https://innerstatic.tcy365.com/static/108sq-aihuasuanbeta/assets/img/banner-community.2a2a31b8.png" />
				</view>
				<u-sticky offset-top="180">
					<view class="shop__tabs">
						<u-subsection :current="curTab" :list="tabs" mode="button" @change="onTabsChange"
							bgColor="#f3f3f3" activeColor="#ff6759" :bold="true">
						</u-subsection>
						<image class="more" @tap="showPopup" src="/static/img/more.png" mode="aspectFill"></image>
					</view>
				</u-sticky>
			</view>

			<u-popup v-model:show="show" position="top" @close="onClosePopup">
				<view class="popup">
					<view class="popup__head">商城</view>
					<view class="popup__main">
						<text class="title">商品类型</text>
						<view class="tag">
							<view :data-type="'non-right'" @tap="onTag" :class="[
                  'tag__item',
                  { 'tag__item--checked': currTag === 'non-right' },
                ]">
								非权益商品
							</view>
							<view :data-type="'right'" @tap="onTag" :class="[
                  'tag__item',
                  { 'tag__item--checked': currTag === 'right' },
                ]">
								权益商品
							</view>
						</view>
						<view class="mt-20">
							<text class="title">人均价筛选</text>
						</view>
						<view class="mt-20">
							<u-slider v-model="price" v-if="show" active-color="#ee0a24" :min="0" :max="100" />
						</view>
						<view class="mt-20 goods-choose__btn">
							<view class="btn btn-reset" @tap="onResetPopup">重置</view>
							<view class="btn btn-comfirm" @tap="onSubmitPopup">完成</view>
						</view>
					</view>
				</view>
			</u-popup>

			<view class="shop__goodslist">
				<view v-for="(item, index) in list" :key="item.id" :data="56" class="goodslist__box"
					:data-index="index">
					<view class="goodsimg">
						<image mode="aspectFill"
							src="https://fdsimgtest.tcy365.com/ctrpashop/ct023116958-852f-4699-93af-b1626f8effbd.png"
							alt=""></image>
					</view>
					<view class="goodsname">
						<view @tap="bindDetailTap">
							<view class="goodsname__text">
								<image mode="aspectFill" class="icon-special" src="/static/img/vip.png"></image>
								<text class="name">{{ item.name }}</text>
							</view>
							<view class="goods-promotion">
								<view class="promotion">
									<text>直降</text>
									<image mode="aspectFill" class="icon-promotion" src="/static/img/down.png"></image>
									<text>49.99元</text>
								</view>
							</view>
						</view>
						<view class="goodsprice goodsprice--rushorder-box">
							<image mode="aspectFill" class="goodsprice--rushorder" src="/static/img/sprice-bg.png">
							</image>
							<view class="goodsprice__text">
								<view class="pricedata">
									<view class="saleprice">
										<text class="unit">¥</text>
										<text class="text">
											<text>0</text>
											<text class="decimal">.01 起</text>
										</text>
									</view>
									<text class="price">
										<text class="unit">¥</text>
										<text>50</text>
									</text>
								</view>
								<view class="success-rate">抢单成功率97.62%</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { ref, onMounted } from 'vue';
	import NavigationBar from '../../components/navigation-bar.vue';
	import LocationPicker from '../../components/location-picker.vue';


	const show = ref(false);
	const current = ref('home');
	const currTag = ref('non-right');
	const price = ref(50);
	const address = ref('');
	const searchData = ref('');
	const list = ref([
		{
			id: 56,
			name: '商品名称1商品名称1商品名称1商品名称1商品名称1',
		},
		{
			id: 57,
			name: '商品名称2商品名称2商品名称2商品名称2商品名称2',
		},
	]);

	const curTab = ref('霸王茶姫')

	const tabs = ref([
		'霸王茶姬',
		'汉堡王',
		'星巴克',
		'肯德基',
		'肯德基2',
		'肯德基3',

	]);

	// 方法定义
	const showPopup = () => {
		show.value = true;
	};

	const bindMapTap = (title : string) => {
		console.log(title, '地址');
	};

	const bindDetailTap = () => {
		uni.showLoading({
			title: '加载中...',
		});
		uni.navigateTo({
			url: '/indexpackage/pages/goodsdetail/goodsdetail',
			success: () => {
				uni.hideLoading();
			},
			fail: (err) => {
				uni.hideLoading();
				console.error('页面跳转失败', err);
				uni.showToast({
					title: '跳转失败',
					icon: 'none',
				});
			},
		});
	};

	// const priceChange = (event : any) => {
	// 	price.value = event.detail.value;
	// };

	const onResetPopup = () => {
		price.value = 50;
		currTag.value = 'non-right';
	};

	const getList = () => {
		list.value.push({
			id: new Date().getTime(),
			name: '商品名称33333',
		});
	};

	const onSearch = (event : any) => {
		console.log(event.detail);
		getList();
	};

	const onTabsChange = (event : any) => {
		getList();
	};

	const onSubmitPopup = () => {
		getList();
		onClosePopup();
	};

	const onTag = (e : any) => {
		const type = e.currentTarget.dataset.type;
		currTag.value = type;
	};

	const handleChange = (event : any) => {
		current.value = event.detail;
		uni.navigateTo({
			url: `../${event.detail}/${event.detail}`,
		});
	};

	const onClosePopup = () => {
		show.value = false;
	};

	// 生命周期
	onMounted(() => {
		// 页面挂载时执行的逻辑
	});
</script>

<style lang="scss" scoped>
	.shop {
		// margin-top:90rpx;
		background: #f5f5f5;
		height: 100vh;

		.popup {
			background: #fff;

			&__head {
				font-size: 17px;
				font-weight: bold;
				height: 44px;
				line-height: 44px;
				text-align: center;
			}

			&__main {
				padding: 0 22rpx;

				.title {
					font-size: 26rpx;
					color: #000;
					font-weight: 500;
				}

				.tag {
					margin-top: 4rpx;
					overflow: hidden;
				}

				.mt-20 {
					margin-top: 22rpx;
				}

				.tag__item {
					border-radius: 4rpx;
					display: inline-flex;
					align-items: center;
					padding: 18rpx 32rpx;
					box-sizing: border-box;
					font-size: 24rpx;
					color: #67686f;
					border: 1px solid #f8f8f9;
					background-color: #f8f8f9;
					margin-right: 16rpx;
					margin-top: 16rpx;
				}

				.tag__item--checked {
					border: 1px solid #e94359;
					background-color: #fef9f7;
				}

				.goods-choose__btn {
					padding: 20rpx 0;
					box-sizing: border-box;
					display: flex;
					justify-content: space-between;

					.btn {
						display: flex;
						justify-content: center;
						align-items: center;
						height: 80rpx;
						border-radius: 16rpx;
						font-size: 30rpx;
						flex: 1;
						text-align: center;
						margin-right: 16rpx;
					}

					.btn-reset {
						background: #f8f8f9;
						color: #8b8c90;
					}

					.btn-comfirm {
						background: #ff6759;
						color: #fff;
					}
				}
			}
		}

		&__top-con {
			overflow: hidden;
			overflow: auto;
			background: #fff;
		}

		&__top-search {
			margin-top: 2px;
			padding: 0 20rpx;
			box-sizing: border-box;

		}

		.u-cell:after {
			border: 0;
		}

		&__banner {
			padding: 70rpx 22rpx 0;
		}

		&__tabs {
			position: relative;
			padding: 20rpx 92rpx 0 22rpx;
			box-sizing: border-box;
			overflow: hidden;
			background-color: #f3f3f3;
			display: flex;
			align-items: center;
			transition-duration: 0;

			::v-deep .u-subsection {
				width: 683rpx;
				overflow-x: auto;

				.u-subsection__item {
					min-width: 160rpx;
					transition-duration: 0;

					&:active {
						// background-color: #f22;
					}
				}

			}


			.more {
				position: absolute;
				width: 40rpx;
				height: 40rpx;
				top: 40rpx;
				right: 22rpx;
				transform: translateY(-50%);
			}
		}

		&__goodslist {
			padding: 16rpx 22rpx 180rpx;
			box-sizing: border-box;

			.goodslist__box {
				border-radius: 20rpx;
				position: relative;
				box-sizing: border-box;
				overflow: hidden;
				text-align: left;
				width: 100%;
				margin-bottom: 16rpx;
				background-color: #fff;
				padding: 18rpx;
				display: flex;

				wx-image,
				.goodsimg {
					width: 240rpx;
					height: 240rpx;
					flex-shrink: 0;
					border-radius: 8rpx;
					overflow: hidden;
				}

				.goodsname {
					padding: 0 0 0 24rpx;
					box-sizing: border-box;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
				}

				.goodsname__text {
					font-size: 0;
					font-size: 28rpx;
					color: #141414;
					display: -webkit-box;
					overflow: hidden;
					text-overflow: ellipsis;
					word-break: break-all;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;

					span {
						display: inline-block;
						vertical-align: middle;
					}

					wx-image,
					.icon-special {
						margin-right: 5px;
						display: inline-block;
						flex: 1;
						width: 92rpx;
						height: 28rpx;
					}
				}

				.promotion {
					padding: 0 4rpx;
					box-sizing: border-box;
					height: 30rpx;
					display: inline-flex;
					align-items: center;
					background: linear-gradient(0deg, #ff4c3b, #ff6759);
					border-radius: 2rpx;
					font-size: 22rpx;
					color: #fff;

					.icon-promotion {
						margin-right: 2rpx;
						display: inline-block;
						width: 30rpx;
						height: 30rpx;
						background-image: url('/static/img/down.png');
						background-repeat: no-repeat;
						background-size: 100% 100%;
					}
				}

				.goodsname .goodsprice {
					margin-top: 5px;
					padding-bottom: 0;

					.unit {
						margin-right: 2px;
					}
				}

				.goodsprice--rushorder-box {
					width: 390rpx;
					height: 82rpx;
					position: relative;
				}

				.goodsprice--rushorder {
					width: 390rpx;
					height: 82rpx;
					position: absolute;
					left: 0;
					right: 0;
				}

				.pricedata {
					display: flex;
					align-items: flex-end;
				}

				.goodsprice__text {
					position: absolute;
					left: 0;
					right: 0;

					.saleprice {
						margin-right: 6rpx;
						font-size: 36rpx;
						color: #f22;

						.unit {
							font-size: 26rpx;
							margin-bottom: -40rpx;
							font-weight: 700;
						}

						.text {
							font-weight: 700;
						}

						.decimal {
							font-size: 26rpx;
						}
					}

					.price {
						margin-right: 4rpx;
						text-decoration: line-through;
						font-size: 24rpx;
						color: #858585;
					}

					.success-rate {
						font-size: 22rpx;
						color: #f22;
					}
				}
			}
		}
	}
</style>