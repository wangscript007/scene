<template>
  <div class="device">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
         <el-menu-item index="1">已关联的设备</el-menu-item>
         <el-menu-item index="0">新设备</el-menu-item>
      </el-menu>
    <el-table :data="tableData" border style="width: 100%;margin-top:20px;" > 
      <el-table-column fixed prop="remark" label="设备名称" width="300"></el-table-column>
      <el-table-column  prop="in_or_out" label="设备类型" width="300">
        <template slot-scope="scope">
          <span v-if="scope.row.in_or_out == 0 ">录入设备</span>
          <span v-else-if="scope.row.in_or_out == 1  ">进口设备</span>
          <span v-else-if="scope.row.in_or_out == 2  ">出口设备</span>
          <span v-else>暂无</span>
        </template>
      </el-table-column>
      <el-table-column prop="serial" label="设备号" width="280"></el-table-column>
      <el-table-column prop="machine_status" label="设备状态" width="410">
        <template slot-scope="scope">
          <span v-if="scope.row.machine_status == 2  ">在线</span>
          <span v-if="scope.row.machine_status == 3  ">离线</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="300">
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.row)" type="text" size="small" v-if="activeIndex === '1'">编辑设备</el-button>
          <el-button @click="handleDelete(scope.row)" type="text" size="small" v-if="activeIndex === '1'">移除设备</el-button>
          <el-button @click="relevance(scope.row)" type="text" size="small" v-if="activeIndex === '0'">关联设备</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pages :page.sync="page" :total="total">
    </pages>
    <handle-dialog1 v-if="dialog.show" :dialog="dialog" :formData="formData" @update='edit' :pTitle="pTitle" :btn2Text="btn2Text">
    </handle-dialog1>
    <!-- 删除弹出层 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" class="el-dialog--center">
      <span>移除后设备中存储的人员数据将不能恢复，确认移除？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handelDetail">确 认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Pages from '../../components/Pages'
import HandleDialog1 from '../../components/HandleDialog1'
import {device, deviceDelete} from '../../api/device'
export default {
  name: 'device',
  components: {
    Pages,
    HandleDialog1
  },
  data() {
    return {
      show: false,                   // 编辑弹窗
      dialogVisible: false,
      tableData: [],                 // 列表数据
      newTableData: [],              // 新设备数据
      page: 1,                       // 当前页数
      total: 0,                      // 总条数
      id: '',                        // id
      dialog: {                      // 弹窗
        show: false,
        title: ''
      },
      pTitle: '',                   // 编辑弹窗信息
      btn2Text: '',                 // 编辑弹窗信息
      formData: {                   
        remark: '',                 // 设备名称
        serial: '',                 // 设备号
        in_or_out: '',              // 设备状态
        id: ''                      // 设备id
      },
      activeIndex: '1',              // 选项卡下标
      type: ''
    }
  },
  watch: {
    'page'(val) {
      this.getList()
    }
  },
  methods: {
    getList() {
      this.$http(device, {
          page: this.page,
          type: this.activeIndex
      })
        .then(res => {
          if (res.data.code === 200) {
            console.log(res.data.data);
            this.tableData = res.data.data.data;
            this.total = res.data.data.total;
          }
        })
    },
    //编辑
    handleEdit(row) {
      this.formData = {
        remark: row.remark,
        serial: row.serial,
        in_or_out: row.in_or_out,
        id: row.id
      }
      this.dialog = {
        show: true,
        title: '提示',
        id: row.id
      }
      this.pTitle  = '编辑设备信息'
      this.btn2Text = '保存'
    },
    handleDelete(row) {
      this.id = row.id
      this.dialogVisible = true
    },
    //删除
    handelDetail(index, row) {
      this.$http(deviceDelete, {id: this.id})
        .then(res => {
          this.$message('设备移除成功')
          this.tableData.splice(index, 1);
          this.dialogVisible = false
          this.getList();
        })
    },
    // 编辑
    edit() {
      this.dialog.show = false;
      this.getList();
    },
    handleSelect(activeIndex) {
      this.activeIndex = activeIndex
      this.getList()
    },
    relevance(row) {
      this.formData = {
        remark: '',
        serial: row.serial,
        in_or_out: '',
        id: row.id
      }
      this.dialog = {
        show: true,
        title: '提示',
        id: row.id
      }
      this.pTitle  = '请完善门禁设备信息'
      this.btn2Text = '关联到项目'
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
.device {
  .btn {
    float: right;
    margin-bottom: 20px;
  }
  .el-dialog__header {
    background-color: $color_blue !important;
    text-align: center;
    .el-dialog__title {
      color: #fff !important;
      text-align: center;
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
</style>