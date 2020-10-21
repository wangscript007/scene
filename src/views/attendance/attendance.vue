<template>
    <div class="attendance">
        <div class="screen">
            <p>筛选:</p>
            <div class="block">
                <span class="demonstration">日期：</span>
                <el-date-picker
                    v-model="start_time"
                    type="date"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    >
                </el-date-picker>
                至
                <el-date-picker
                    v-model="end_time"
                    type="date"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                   >
                </el-date-picker>
            </div>
        </div>
        <div class="search">
        <p>搜索:</p>
        <el-autocomplete
        style="width:500px;"
        v-model="ContName"
        :fetch-suggestions="querySearchAsync"
        placeholder="请输入内容"
        @select="handleSelect"
        ></el-autocomplete>
         <el-button type="primary"
                   style="margin-left: 10px"
                   @click="handleSearch">搜索</el-button>
        <el-button @click="handleReset">重置</el-button>
    </div>
        <div class="conten">
            <div class="left">
                <img :src="workerInfo.headImage" alt="" style="width: 100px;height: 100px"/>
                <div class="left_box">
                    <h4>{{workerInfo.workerName}}</h4>
                    <p>身份证号：{{workerInfo.idCardNumber}}</p>
                    <p>联系方式：{{workerInfo.cellPhone}}</p>
                </div>
            </div>
            <div class="bar"></div>
            <div class="right">
                <div class="right_time">
                    <p>{{workerInfo.count}}</p>
                    <span>打卡次数（次）</span>
                </div>
                <div class="right_mount">
                    <p>{{workerInfo.hourCount}}</p>
                    <span>累积工时（小时）</span>
                </div>
            </div>
        </div>
        <div class="export-btn right" >
                <el-button type="primary" @click="toExcel">导出excel</el-button>
            </div>
        <el-table :data="tableData"
                        style="width: 100%;">
				<el-table-column prop="door_name"
								label="打卡设备名称"/>
				<el-table-column prop="device_name"
								label="设备号"/>
				<el-table-column prop="create_time"
								label="打卡时间"
                                width="250"/>
				<el-table-column prop="state_index"
								label="进出方向"
                                width="250">
                    <template slot-scope="scope">
                        <span v-if="scope.row.state_index == 1">进</span>
                        <span v-if="scope.row.state_index == 2">出</span>
                    </template>
				</el-table-column>
			</el-table>
            <pages
                :page.sync="page" 
                :total="total"
            >
		<template v-solt="body"></template>
	</pages>
    </div>
</template>
<script>
import Pages from '../../components/Pages'
import { getAttendList, search } from '../../api/addendance'
export default {
    name: 'attendance',
    components: {
        Pages
    },
    data () {
        return {
            EnList: [],                 // 考勤信息
            date:'',
            workerName: '',            // 姓名
            idCardNumber: '',          // 身份证号
            ContName: '',              // 搜索
            tableData: [],             // 列表数据
            workerInfo:{
                headImage: '',         // 头像
                idCardNumber: '',      // 身份证号
                cellPhone: '',         // 联系方式
                count: '',             // 打卡次数
                hourCount: ''          // 累积工时
            },
            page: 1,                  // 当前页数
            total:0,                  // 总条数
            content: '',
            start_time: '',          // 开始时间
            end_time: '',            // 结束时间
            appid: this.$store.state.cs_admin_appId,        // 项目id
            secret: this.$store.state.cs_admin_secret,      // 项目密匙
        }
    },
    watch: {
        'page'(val) {
            this.getAttenList()
        }
    },
    methods: {
        getdatatime(someday){//默认显示前一天
            someday = someday || new Date;
            // this.start_time= new Date(someday.getTime() - 3600 *24 *1000);
            var now = new Date();
            var year = now.getFullYear(); //得到年份
            var month = now.getMonth(); //得到月份
            var date = now.getDate(someday.getTime() - 3600 *24 *1000) ; //得到日期
            month = month + 1;
            month = month.toString().padStart(2, "0");
            date = date.toString().padStart(2, "0") - 1;
            var defaultDate1 = `${year}-${month}-${date}`;
            this.start_time = defaultDate1
        },
        getdatatime1(){//默认显示今天
            // this.end_time = new Date();
            var now = new Date();
            var year = now.getFullYear(); //得到年份
            var month = now.getMonth(); //得到月份
            var date = now.getDate(); //得到日期
            month = month + 1;
            month = month.toString().padStart(2, "0");
            date = date.toString().padStart(2, "0");
            var defaultDate = `${year}-${month}-${date}`;
            this.end_time = defaultDate
        },
        // 监听搜索
        querySearchAsync(queryString, cb) {
            //cb(this.EnList)
             this.$http(search, {
                     content: queryString
             }).then(res=> {
                let searchList = [];
                 this.EnList = res.data.data
                 if(this.EnList && this.EnList.length > 0){
                     this.EnList.map((item)=>{
                         searchList.push({ address:item.twID,value:item.workerName+' '+item.idCardNumber });
                     })
                 }
                 cb(searchList);
             })
        },  
        handleSelect(row){
            //
        },
        getAttenList () {
            this.$http(getAttendList, {
                    page: this.page,
                    content: this.content,
                    start_time: this.start_time,
                    end_time: this.end_time
            })
            .then(res => {
                if (res.data.code === 200) {
                    this.tableData = res.data.data.list.data
                    this.total = res.data.data.list.total;
                    this.workerInfo = res.data.data.workerInfo
                } 
            })
        },
        change () {
            this.$http(search, {
                    content: this.content
            })
        },
        dateChange() {
                this.page = 1
                this.start_time = ''
                this.end_time = ''
				this.getAttenList()
			},
        // 搜索
			handleSearch() {
                let index = this.ContName.indexOf(' ')
                this.content = this.ContName.substr(0,index)
				this.page = 1
				this.getAttenList()
			},
			// 重置
			handleReset() {
                this.content = ''
                this.ContName = ''
				this.page = 1
				this.getAttenList()
			},
        // 导出
        toExcel () {
            window.open(`${this.domain}/labor/v1/downLoadExcel?content=${this.content}&start_time=${this.start_time}&end_time=${this.end_time}&appid=${this.appid}&secret=${this.secret}`, '_blank')
        } 
    },
    mounted() {
        this.getdatatime()
        this.getdatatime1()
    },
    created () {
        this.getAttenList()
        this.change()
    }
}
</script>
<style lang="scss">
    .attendance{
        .screen{
            display: flex;
            align-items:center;
            p {
            font-size: 18px;
            padding-right: 26px;
            color: #666;
            }
            .block{
                font-size: 16px;
                color:#666;
                margin-left: 30px;
                .demonstration{
                    margin-right: 18px;
                }
            }
            .title{
               font-weight: 100;
               font-size: 16px;
               color:#666;
               padding: 0 60px;
            }
        }
        .search{
            display: flex;
            margin: 20px 0;
            p {
                font-size: 18px;
                padding-right: 26px;
                color: #666;
                width:80px;
            }
        }
        .conten{
            height:124px;
            display: flex;
            background-color: rgba(24, 144, 255, 0.16);
            margin-bottom: 10px;
            padding: 12px 0;
            .left{
                box-sizing: border-box;
                margin-left: 24px;
                width: 50%;
                display: flex;
                .left_box{
                    margin-left: 31px;
                    h4{
                        font-size: 20px;
                        margin-bottom: 15px;
                    }
                    p{
                        font-size: 16px;
                        margin-bottom: 8px;
                    }
                }
            }
            .bar{
                height: 100px;
                border: 1px solid rgba(168, 168, 168, 1);
                margin: 12px 0;
            }
            .right{
                width: 50%;
                display: flex;
                margin-left: 123px;
                font-size: 28px;
                text-align: center;
                margin-top: 11px;
                .right_time{
                    span{
                        font-size: 14px;
                    }
                }
                .right_mount{
                    margin-left: 113px;
                    span{
                        font-size: 14px;
                    }
                }
            }
        }
    }
</style>