<template>
	<div class="people-management">
		<search
      @search="handleSearch"
			@reset="handleReset"
      placeholder='请输入姓名、身份证号搜索'
    >
			<template v-solt="body"></template>
		</search>
		<div class="btn"><el-button type="primary" @click="handleClick(1,null)">新增人员</el-button></div>
  <el-table
    :data="tableData"
    border
    style="width: 100%;margin-top:20px;">
    <el-table-column
      fixed
      label="现场照片"
      width="230"
	  >
      <template slot-scope="scope">
        <img :src="scope.row.headImageAbsolute" alt="图片无法正常显示" style="width: 120px;height: 120px">
      </template>
    </el-table-column>
    <el-table-column
      prop="workerName"
      label="姓名"
      width="230">
    </el-table-column>
    <el-table-column
      prop="idCardNumber"
      label="身份证号"
      width="230">
    </el-table-column>
    <el-table-column
      prop="bankID"
      label="银行卡号"
      width="230">
    </el-table-column>
    <el-table-column
      prop="openBank"
      label="开户行"
      width="230">
    </el-table-column>
    <el-table-column
      prop="teamName"
      label="所属班组"
      width="230">
    </el-table-column>
    <el-table-column
    fixed="right"
      label="操作"
      width="232">
      <template slot-scope="scope">
        <el-button @click="handleClick(2, scope.row)" type="text" size="small">编辑</el-button>
        <el-button type="text" size="small" @click="handleDel(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <pages
    :page.sync="page" :total="total"
  >
	  <template v-solt="body"></template>
  </pages>
  	<!-- 删除弹出层 -->
	<el-dialog
	 	title="温馨提示"
		:visible.sync="dialogVisible"
		width="410px"
    :center="true">
		<span>删除后将不能恢复，确认删除？</span>
		<span slot="footer" class="dialog-footer">
			<el-button @click="dialogVisible = false">取 消</el-button>
			<el-button type="primary" @click="handelDetail(row)">确 认</el-button>
		</span>
	
	</el-dialog>
  </div>
</template>

<script>
import Search from '../../components/Search'
import Pages from '../../components/Pages'
import HandleDialog from '../../components/HandleDialog'
import { peopleList, peopleDelete } from '../../api/peopleManagement'
	export default {
		name: 'people-management',
		components: {
			Search,
			Pages,
			HandleDialog
		},
    data() {
			return {
        appid: this.$store.state.cs_admin_appId,              // 项目id
        secret: this.$store.state.cs_admin_secret,            // 项目密匙
        show: false,                            // 弹窗显示
        dialogVisible: false,
        pageIndex: '',                         // 自定义下标
        tableData: [],                         // 表格数据
        content: '',                           // 搜索
        page: 1,                               // 当前页数
        total: 0,                              // 总条数
        currentRow: {},                        // 删除所传参数集合
        rows:[],                               // 表格集合
        cardID: "",                            // 班组id
      }
    },
    watch: {
    'page'(val) {
      this.getList()
    }
  },
		methods: {
      getList() {
        this.$http(peopleList, {
            content: this.content,
            page: this.page
        }).then(res =>{
          if(res.data.code === 200) {
            this.tableData = res.data.data.data
            this.total = res.data.data.total;
          }
        })
      },
      // 搜索
				handleSearch(val) {
          this.content = val
          this.page = 1
          this.getList()
			},
			// 重置
			handleReset() {
          this.content = ''
          this.page = 1
          this.getList()
			},
      //跳转
      
       handleClick(pageIndex, row) {
        if (pageIndex === 1) {
          this.$router.push({
            name: '新增人员',
            params: { isAdd: true }
          })
        } else if (pageIndex === 2) {
          this.$router.push({ name: '编辑人员', params: { editRow: row, isAdd:false }})
          this.tableData = {
            name: this.tableData.name
          }
        } 
      },
        //删除
        handleDel(row){
           let cardID =  row.idCardNumber
           let allCardNumber = row.allCardNumber
          this.currentRow = {
            appid: this.appid,
            secret: this.secret,
            rows:[row]
          }
          this.currentRow.rows[0].cardID = allCardNumber
          this.currentRow.rows[0].idCardNumber = allCardNumber
          this.currentRow.rows[0].allCardNumber = allCardNumber
          this.currentRow.rows[0].aud = 'delete'
          this.dialogVisible = true
        },
			handelDetail(row) {
				this.$http(peopleDelete, this.currentRow).then((res)=>{
            if(res.data.code === 200){
              this.$message('删除成功')
              this.dialogVisible = false
              this.getList()
            }
        })
			}
    },
    created() {
      this.getList()
    }
	}
</script>

<style lang="scss" scoped>
	.people-management{
		.btn{
			float: right;
      margin-bottom: 20px;
		}
	}
</style>