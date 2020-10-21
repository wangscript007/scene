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
        :label-position="labelPosition"
      >
        <p style="font-size:18px !important;" class="p-title">{{pTitle}}</p>
        <el-form-item label="设备号：" prop="serial" >
          <el-input v-model="formData.serial"  style="width:240px;" disabled></el-input>
        </el-form-item>
        <el-form-item label="设备名称：" prop="remark">
          <el-input v-model="formData.remark" placeholder="请输入设备名称" style="width:240px;"></el-input>
        </el-form-item>
         <el-form-item label="设备类型：" label-width="formLabelWidth" prop="in_or_out" class="in_out">
          <el-select v-model="formData.in_or_out" placeholder="请选择设备类型" style="width:240px;margin-left:27px;" >
            <el-option
              v-for="(item, index) in in_or_out"
              :key="index"
              :label="item.label"
              :value="item.value"
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
import {deviceEdit} from '../api/device'
export default {
  data() {
    return {
      formLabelWidth: '200',
      labelPosition: 'left',
      in_or_out: [
        {
          value: 0,
          label: '录入设备'
        },
        {
          value: 1,
          label: '进口设备'
        },
        {
          value: 2,
          label: '出口设备'
        }
      ],
      form_rules: {
        remark: [
          { required: true, message: '请输入设备名称', tigger: 'blur' }
        ],
        in_or_out: [
          { required: true, message: '请选择设备类型',trigger: "change" }
        ]
      },
      dialog: false
    }
  },
  props: {
    dialog: Object,
    formData: Object,
    show: {
      type: Boolean,
      default: false
    },
    pTitle: {
      type: String,
      default: '编辑设备信息'
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
  created() {},
  methods: {
    onSave(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          let id = this.formData.id; 
          let remark = this.formData.remark; 
          let in_or_out = this.formData.in_or_out
          let model = {
            id: id,
            remark: remark,
            in_or_out: in_or_out
          }
          this.$http(deviceEdit, model)
            .then(res => {
              this.$message({
                message: '编辑成功',
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
/deep/ .el-dialog__title {
  font-size: 18px;
  font-weight: 600;
  line-height: 50px;
  color: #fff;
}
/deep/ .el-form-item__error{
  margin-left: 46px;
}

.content {
  .in_out{
    /deep/ .el-form-item__error{
      margin-left: 165px;
    }
  }
  .content-text {
    font-size: 18px;
    color: #666;
    text-align: center;
    font-weight: 600;
  }
  .p-title{
    margin-bottom: 20px !important;
  }
  /deep/ .el-form-item__label {
    text-align: left !important;
  }
}
// /deep/ .el-form-item::before{
//   content: '*';
//     color: #F56C6C;
//     margin-right: 4px;
// }
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
/deep/ .el-dialog__body {
  padding:42px 10px ;
}
/deep/ .el-dialog__body{
  padding: 20px 10px;
}
</style>