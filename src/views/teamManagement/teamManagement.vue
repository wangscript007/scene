<template>
  <div class="team-management">
    <search 
    @search="handleSearch" 
    @reset="handleReset"
    placeholder='请输入班组名称搜索'
    >
      <template v-solt="body"></template>
    </search>
    <div class="btn"><el-button type="primary" @click="handelAdd">新增班组</el-button></div>
    <el-table :data="tableData" border style="width: 100%;margin-top:20px;">
      <el-table-column fixed prop="teamName" label="班组名称" width="410"></el-table-column>
      <el-table-column prop="teamNo" label="班组ID" width="300"></el-table-column>
      <el-table-column prop="corp_name" label="所属参建单位" width="410"></el-table-column>
      <el-table-column fixed="right" label="操作" width="300">
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
          <el-button type="text" size="small" @click="del(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pages :page.sync="page" :total="total">
      <template v-solt="body"></template>
    </pages>
    <!-- 新增编辑弹出层 -->

    <handle-dialog v-if="dialog.show" :dialog="dialog" :formData="formData" @update="clickAdd">
    </handle-dialog>
    <!-- 删除弹出层 -->
    <el-dialog title="温馨提示" :visible.sync="dialogVisible" width="410px" :center="true">
      <span>删除后将不能恢复，确认删除？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handelDetail">确 认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Search from '../../components/Search'
import Pages from '../../components/Pages'
import HandleDialog from '../../components/HandleDialog'
import { teamList, teamDelete } from '../../api/teamManagement'
export default {
  name: 'team-management',
  components: {
    Search,
    Pages,
    HandleDialog,
  },
  data() {
    return {
      delObj: {},                            // 删除所传参数
      show: false,                           // 编辑弹窗
      dialogVisible: false,
      tableData: [],
      content: '',                           // 搜索
      page: 1,                               // 当前页数
      total: 0,                              // 总条数
      appid: this.$store.state.cs_admin_appId,      // 项目id
      secret: this.$store.state.cs_admin_secret,    // 项目密匙
      id: '',                               // 当前id
      rows: [],                             // 所有列表数据
      dialog: {                             // 弹窗
        show: false,
        title: '',
        option: ''
      },
      formData: {                           // 表单数据
        lineID: '',                      // id
        bcorpID: '',                     // 班组id
        teamName: '',                    // 班组名称
        teamNo: ''                       // 列表展示需要的班组id
      }
    }
  },
  watch: {
    'page'(val) {
      this.getList()
    }
  },
  methods: {
    // 删除
    del(row) {
      let lineID = row.id
      this.delObj = {
        appid: this.appid,
        secret: this.secret,
        rows: [row]
      }
      this.delObj.rows[0].lineID = lineID
      this.delObj.rows[0].aud = 'delete'
      this.dialogVisible = true;
    },
    getList() {
      console.log(teamList)
      this.$http(teamList, {
        params: {
          content: this.content,
          page: this.page
        }
      })
        .then(res => {
          if (res.data.code === 200) {
            console.log(res.data.data);
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
    clickAdd() {
      this.dialog.show = false;
      this.getList();
    },
    //新增
    handelAdd() {
      this.dialog = {
        show: true,
        title: '提示',
        option: 'insert'
      }
      this.formData = {
        aud: 'insert',
        lineID: ' ',
        bcorpID: '',
        teamName: '',
        teamNo: ''
      }
    },
    //编辑
    handleEdit(row) {
      this.formData = {
        aud: 'update',
        lineID: row.id,
        bcorpID: row.bcorpID,
        teamName: row.teamName,
        teamNo: row.teamNo,
        corp_name: row.corp_name
      }
      this.dialog = {
        show: true,
        title: '提示',
        option: 'update',
        id: row._id
      }
    },
    //确认删除
    handelDetail(index, row) {
      this.$http(teamDelete, this.delObj)
        .then(res => {
          this.$message('删除成功')
          this.tableData.splice(index, 1);
          this.dialogVisible = false
          this.getList();
        })
    }
  },
  created() {
    this.getList()
  }
}
</script>

<style lang="scss" >
.team-management {
  .btn {
    float: right;
    margin-bottom: 20px;
  }
  .el-dialog__header {
    background-color: $color_blue !important;
    .el-dialog__title {
      color: #fff !important;
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
}
/deep/ .cell {
  text-align: center !important;
}
</style>