<template>
  <div class="bracelet">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
         <el-menu-item index="1">已绑定人员的手环</el-menu-item>
      </el-menu>
      <search 
      @search="handleSearch" 
      @reset="handleReset"
      placeholder='请输入设备号搜索'
      >
    </search>
    <el-table :data="tableData" border style="width: 100%;margin-top:20px;" v-if="activeIndex === '1'"> 
      <el-table-column fixed prop="hand_code" label="设备号" width="280"></el-table-column>
      <el-table-column prop="sim_number" label="SIM卡号" width="280"></el-table-column>
      <el-table-column prop="name" label="绑定人员姓名" width="250"></el-table-column>
      <el-table-column prop="card_number" label="身份证号" width="300"></el-table-column>
      <el-table-column prop="bracelet_status" label="设备状态" width="240">
        <template slot-scope="scope">
          <span v-if="scope.row.bracelet_status == 1">在线</span>
          <span v-if="scope.row.bracelet_status == 0">离线</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="250">
        <template >
          <el-button @click="dialogVisible = true" type="text" size="small">取消绑定</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pages :page.sync="page" :total="total">
    </pages>
    <!-- 取消绑定弹窗 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" class="el-dialog--center">
      <span>取消绑定后将清空手环所有数据，确认取消绑定？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handelDetail">确 认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Pages from '../../components/Pages'
import { bracelet, cancel } from '../../api/device'
export default {
  name: 'bracelet',
  components: {
    Pages
  },
  data() {
    return {
      tableData: [],              // 表格数据
      page: 1,                    // 当前页数
      total: 0,                   // 总条数
      id: '',                     // id
      activeIndex: '1',           // 选项卡下标
      dialogVisible: false,
      worker_id: '',             // 人员id
      content: ''                // 搜索
    }
  },
  watch: {
    'page'(val) {
      this.getList()
    }
  },
  methods: {
    getList() {
      this.$http(bracelet, {
          page: this.page,
          content: this.content
      })
        .then(res => {
          if (res.data.code === 200) {
            let arr = []
            arr = res.data.data.data
            arr.forEach((item)=>{
              let worker_id = item.worker_id
              this.worker_id = worker_id
            })
            this.tableData = res.data.data.data;
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
    handleSelect(activeIndex) {
      // console.log(activeIndex)
    },
    // 取消绑定
    handelDetail() {
      this.$http(cancel, {worker_id: this.worker_id})
      .then(res => {
        if(res.data.code == 200) {
          this.dialogVisible = false
          this.$msg.Success('取消成功！')
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
/deep/ .el-dialog__footer{
  text-align: center;
}
.bracelet {
  .btn {
    float: right;
    margin-bottom: 20px;
  }
  .el-dialog__header {
    background-color: #37c0b9 !important;
    text-align: center;
    .el-dialog__title {
      color: #fff !important;
    }
    .el-dialog__headerbtn {
      display: none;
    }
    .el-dialog__close el-icon el-icon-close::before,
    .el-dialog__close el-icon el-icon-close::after {
      content: "" !important;
    }
  }
  .el-form-item__label::before {
    content: "*";
    color: #f56c6c;
    margin-right: 4px;
  }
  .p-title {
    font-size: 16px !important;
    margin-top: -25px;
    line-height: 50px;
  }
  /deep/ .el-menu.el-menu--horizontal{
    border-bottom: 0;
  }
}
/deep/ .cell {
  text-align: center !important;
}
/deep/ .el-menu-item{
  font-size: 20px;
}
/deep/ .el-menu--horizontal > .el-menu-item.is-active{
  border: 0;
}
</style>