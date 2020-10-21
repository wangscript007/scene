<template>
	<el-row class="container">
		<el-col :span="24" class="header">
			<div class="logo">{{sysName}}</div>
			<!-- <el-col :span="10">
				<p class="wuye-name">物业名称</p>
			</el-col> -->
		</el-col>
		<el-col :span="24" class="main">
			<aside class="menu-expanded">
				<!--导航菜单-->
				<el-menu :default-active="defaultActive" 
					     class="el-menu-vertical-demo" 
					 	 unique-opened 
						 router 
						 background-color="#0B1549"
						text-color="#fff"
						active-text-color="#3F65FF">
					<template v-for="(item,index) in routers" v-if="!item.hidden">
						<el-submenu :index="index+''" v-if="!item.leaf">
							<template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>
							<el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.meta.hidden">{{child.name}}</el-menu-item>
						</el-submenu>
						<el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item>
					</template>
					<el-menu-item @click="dialogVisible = true">
						<i class="iconfont icontuichu3"/>
						<span slot="title">退出登录</span>
					</el-menu-item>
				</el-menu>
			</aside>
			<section class="content-container">
				<div class="grid-content bg-purple-light">
					<el-col :span="24" class="breadcrumb-container">
						<el-breadcrumb separator="/" class="breadcrumb-inner">
							<el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
								{{ item.name }}
							</el-breadcrumb-item>
						</el-breadcrumb>
					</el-col>
					<el-col :span="24" class="content-wrapper">
						<transition name="fade" mode="out-in">
							<router-view></router-view>
						</transition>
					</el-col>
				</div>
			</section>
		</el-col>
		<!-- 退出弹窗 -->
		<el-dialog
			title="温馨提示"
			:visible.sync="dialogVisible"
			width="410px"
			:center="true">
			<span>确认退出摩云劳务现场端？</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="out()">确 认</el-button>
			</span>
	
	</el-dialog>
	</el-row>
</template>

<script>
	export default {
		data() {
			return {
				sysName:'摩云劳务现场端',
				sysUserName: 'lawrence',
				sysUserAvatar: require('@/assets/images/default-header.png'),
				routers: [],
				dialogVisible: false
			}
		},
		methods: {
			// 真退出登录
			out() {
				this.dialogVisible = false
				this.$msg.Success('退出成功')
				this.$store.commit('changeToken', '')
				this.$router.push({
					name: 'login'
				})
			},
		},
		computed: {
			defaultActive() {
				if(this.$route.meta.hidden) {
					return this.$route.meta.defaultActive
				} else {
					return this.$route.path
				}
			}
		},
		created() {
			this.$router.options.routes.map(item => {
				if(!item.hidden) {
					this.routers.push(item)
				}
			})
		}
	}

</script>

<style scoped lang="scss">
	.container {
		position: absolute;
		top: 0px;
		bottom: 0px;
		width: 100%;
		.header {
			height: 80px;
			line-height: 80px;
			background: #fff;
			color:#fff;
			.logo {
				width: 240px;
				box-sizing: border-box;
				background-color: #0B1549;
				height:80px;
				font-size: 22px;
				font-weight: bold;
				letter-spacing: 3px;
				text-align: center;
				.txt {
					color:#fff;
				}
			}
			.logo-collapse-width{
				width:60px
			}
		}
		.main {
			display: flex;
			position: absolute;
			top: 80px;
			bottom: 0px;
			overflow: hidden;
			aside {
				flex:0 0 240px;
				width: 240px;
				.el-menu{
					height: 100%;
					border-right: none;
					ul li{
						margin-left: 22px !important;
					}
					/deep/ .el-submenu__icon-arrow {
						font-size: 20px;
						margin-top: -10px;
						color: #fff;
					}
					/deep/ .el-submenu__title {
						font-size: 16px;
						font-weight: bold;
						i:first-child {
							font-size: 20px;
							color: #fff;
							margin-top: -3px;
							margin-right: 5px;
							font-weight: normal;
							margin-left: 10px;
						}
						
					}
					/deep/ .el-menu-item {
						font-size: 16px;
						font-weight: bold;
						padding-left: 30px !important;
						i:first-child {
							font-size: 20px;
							color: #fff;
							margin-top: -3px;
							font-weight: normal;
							margin-right: 5px;
						}
					}
					/deep/ .el-menu-item.is-active {
						i:first-child {
							color: $color_blue;
						}
					}
					/deep/ .el-submenu .el-menu-item {
						font-size: 15px;
						font-weight: bold;
					}
				}
				.collapsed{
					width:60px;
					.item{
						position: relative;
					}
					.submenu{
						position:absolute;
						top:0px;
						left:60px;
						z-index:99999;
						height:auto;
						display:none;
					}

				}
			}
			.menu-collapsed{
				flex:0 0 60px;
				width: 60px;
			}
			.menu-expanded{
				flex:0 0 240px;
				width: 240px;
			}
			.content-container {
				background: #F0F0F0;
				flex:1;
				overflow-y: scroll;
				padding: 20px;
				.breadcrumb-container {
					.title {
						width: 200px;
						float: left;
						color: #475669;
					}
					.breadcrumb-inner {
						display: flex;
					}
				}
				.content-wrapper {
					background-color: #fff;
					box-sizing: border-box;
					border-radius: 5px;
					padding: 15px 10px;
					margin-top: 20px;
				}
			}
		}
	}
	/deep/ .el-dialog__header{
		background:$color_blue !important;
		padding: 10px;
	}
	/deep/ .el-dialog__title{
		color:#fff;
	}
	/deep/ .el-dropdown-menu__item {
		padding: 0 20px !important;
	}
	/deep/ .el-dialog__body {
		text-align: center !important;
	}
	.wuye-name {
		font-size: 20px;
		font-weight: bold;
		padding-left: 20px;
	}
</style>