<template>
  <el-dialog
    :visible.sync="dialog.show"
    :width="width"
    :center="true"
    :title="dialog.title"
  >
    <div class="content">
      <el-form
        ref="form"
        :model="formData"
        :rules="form_rules"
        label-width="120px"
        style="margin:10px;width:auto;"
      >
        <p style="font-size:18px !important;" class="p-title">请完善班组信息</p>
        <el-form-item label="班组id" prop="teamNo">
          <el-input v-model="formData.teamNo" placeholder="请输入项目内唯一的班组id" style="width:240px;"></el-input>
        </el-form-item>
        <el-form-item label="班组名称" prop="teamName">
          <el-input v-model="formData.teamName" placeholder="请输入班组名称" style="width:240px;"></el-input>
        </el-form-item>
        <el-form-item label="所属参建单位" :label-width="formLabelWidth" prop="bcorpID" class="bcorp">
          <el-select v-model="formData.bcorpID" placeholder="请选择参建单位" style="width:240px;margin-left:13px;" >
            <el-option
              v-for="(item, index) in bcorpID"
              :key="index"
              :label="item.corpName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialog.show = false">{{btn1Text}}</el-button>
      <el-button type="primary" @click="onSave('form')">{{btn2Text}}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { teamAddEdit, contractor } from '../api/teamManagement'
export default {
  name: 'dialog',
  data() {
    return {
      bcorpID: [],
      formLabelWidth: '200',
      appid: this.$store.state.cs_admin_appId,
      secret: this.$store.state.cs_admin_secret,
      rows: [],
      form_rules: {
        teamNo: [
          { required: true, message: '请输入班组id', tigger: 'blur' }
        ],
        teamName: [
          { required: true, message: '请输入班组名称', tigger: 'blur' }
        ],
        // bcorpID: [
        //   { required: true, message: '请选择参建单位', tigger: 'change' }
        // ]
      }
    }
  },
  props: {
    dialog: Object,
    formData: Object,
    show: {
      type: Boolean,
      default: false
    },
    showBtn2: {
      type: Boolean,
      default: true
    },
    btn1Text: {
      type: String,
      default: '取消'
    },
    btn2Text: {
      type: String,
      default: '保存'
    },
    content: {
      type: String
    },
    width: {
      type: String,
      default: '500px'
    },
    index: {
      type: Number,
      default: 0
    },
    title: {
      type: String,
      default: ''
    },
    option: {
      type: String,
      default: ''
    }
  },
  created() {
    this.$http(contractor)
      .then(res => {
        this.bcorpID = res.data.data.rows.map(item => {
          return item
        })
      })
  },
  methods: {
    onSave(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          let obj = this.formData; obj.aud = this.dialog.option;
          let model = {
            appid: this.appid,
            secret: this.secret,
            rows: [obj]
          }
          this.$http(teamAddEdit, model)
            .then(res => {
              //添加成功/labor/v1/team
              this.$message({
                message: this.dialog.option === 'update' ? '编辑成功' : '添加成功',
                type: 'success'
              })
              //隐藏dialog
              this.$emit('update');

            })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-form-item__error{
  margin-left: 30px;
}
/deep/ .el-dialog__title {
  font-size: 18px;
  font-weight: 600;
  line-height: 50px;
  color: #fff;
}
.content {
  .bcorp{
    /deep/ .el-form-item__error{
      margin-left: 155px;
    }
  }
  .content-text {
    font-size: 18px;
    color: #666;
    text-align: center;
    font-weight: 600;
  }
  /deep/ .el-form-item__label {
    text-align: left !important;
  }
}
/deep/ .el-dialog__body {
  padding: 42px 100px;
}
/deep/ .el-button {
  width: 125px;
  height: 40px;
  padding: 0;
}
/deep/ .el-button + .el-button {
  margin-left: 60px;
}
/deep/ .el-dialog__header {
  height: 50px;
  background-color: $color_blue;
  padding: 0;
}
/deep/ .el-dialog__footer {
  padding: 0 72px 30px;
}
</style>