<template>
  <div class="add-people">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <h6>人员基本信息</h6>
      <div class="content_box">
        <div class="left">
          <el-form-item label="姓名：" prop="workerName" style="width:456px;" label-width="120px">
            <el-input v-model="ruleForm.workerName" placeholder="请输入人员姓名" v-if="!isEdit" ></el-input>
            <el-input v-model="ruleForm.workerName" placeholder="请输入人员姓名" v-if="isEdit" disabled></el-input>
          </el-form-item>
          <el-form-item label="身份证号：" prop="idCardNumber" style="width:456px;" label-width="120px">
            <el-input v-model="ruleForm.idCardNumber" placeholder="请输入身份证号" v-if="!isEdit" @blur="CardHandel()"></el-input>
            <el-input v-model="ruleForm.idCardNumber" placeholder="请输入身份证号" v-if="isEdit" disabled></el-input>
          </el-form-item>
          <el-form-item label="注册手机号：" prop="cellPhone" style="width:456px;" label-width="120px">
            <el-input v-model="ruleForm.cellPhone" placeholder="请输入注册手机号" v-if="!isEdit" :disabled="this.is_worker_new === 1 ? true :false"></el-input>
            <el-input v-model="ruleForm.cellPhone" placeholder="请输入注册手机号" v-if="isEdit" disabled></el-input>
          </el-form-item>
          <el-form-item label="联系方式：" prop="link_mobile" style="width:456px;" label-width="120px">
            <el-input v-model="ruleForm.link_mobile" placeholder="请输入联系方式" v-if="!isEdit" ></el-input>
            <el-input v-model="ruleForm.link_mobile" placeholder="请输入联系方式" v-if="isEdit" disabled></el-input>
          </el-form-item>
          <el-form-item label="户口性质：" prop="family_type" label-width="120px">
            <el-select v-model="ruleForm.family_type" placeholder="请选择户口性质" style="width:340px;" v-if="!isEdit">
              <el-option
                :label="nature.label"
                :value="nature.value"
                v-for="(nature, index) in family_type"
                :key="index"
              ></el-option>
            </el-select>
            <el-select v-model="ruleForm.family_type" placeholder="请选择户口性质" style="width:340px;" v-if="isEdit" disabled>
              <el-option
                :label="nature.label"
                :value="nature.value"
                v-for="(nature, index) in family_type"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="现居住地址：" prop="address" style="width:456px;" label-width="120px">
            <el-input v-model="ruleForm.address" placeholder="请输入家庭现居住地址" v-if="!isEdit" ></el-input>
            <el-input v-model="ruleForm.address" placeholder="请输入家庭现居住地址" v-if="isEdit" disabled></el-input>
          </el-form-item>
          <el-form-item label="政治面貌：" prop="politicsType" label-width="120px">
            <el-select v-model="ruleForm.politicsType" placeholder="请选择政治面貌" style="width:340px;" v-if="!isEdit">
              <el-option
                :label="politics.label"
                :value="politics.value"
                v-for="(politics, index) in politics_list"
                :key="index"
              ></el-option>
            </el-select>
            <el-select v-model="ruleForm.politicsType" placeholder="请选择政治面貌" style="width:340px;" v-if="isEdit" disabled>
              <el-option
                :label="politics.label"
                :value="politics.value"
                v-for="(politics, index) in politics_list"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="文化程度：" prop="cultureLevelType" label-width="120px" >
            <el-select
              v-model="ruleForm.cultureLevelType"
              placeholder="请选择文化程度"
              style="width:340px;"
              v-if="!isEdit" 
              
            >
              <el-option
                :label="culture.label"
                :value="culture.value"
                v-for="(culture, index) in culture_list"
                :key="index"
              ></el-option>
            </el-select>
            <el-select
              v-model="ruleForm.cultureLevelType"
              placeholder="请选择文化程度"
              style="width:340px;"
              v-if="isEdit" 
              disabled
            >
              <el-option
                :label="culture.label"
                :value="culture.value"
                v-for="(culture, index) in culture_list"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <h6>项目相关信息</h6>
          <el-form-item label="所属参建单位：" prop="corpID" label-width="128px">
            <el-select v-model="ruleForm.corpID" placeholder="请选择所属参建单位" style="width:340px;" @blur="ProjectHandle()">
              <el-option
                :label="item.corpName"
                :value="item.corpID"
                v-for="(item, index) in bank_list"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属班组：" prop="teamID" label-width="128px">
            <el-select v-model="ruleForm.teamID" placeholder="请选择所属班组" style="width:340px;">
              <el-option
                :label="banks_item.teamName"
                :value="banks_item.id"
                v-for="(banks_item, index) in teamID"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="人员类型：" prop="workRole" label-width="128px">
            <el-select v-model="ruleForm.workRole" placeholder="请选择人员类型" style="width:340px;">
              <el-option
                :label="item.label"
                :value="item.value"
                v-for="(item, index) in workRole"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="开户行：" prop="openBank" style="width:465px;" label-width="128px">
            <el-input v-model="ruleForm.openBank" placeholder="请输入开户行"></el-input>
          </el-form-item> 
          <el-form-item label="银行卡号：" prop="bankID" style="width:465px;" label-width="128px">
            <el-input v-model="ruleForm.bankID" placeholder="请输入银行卡号"></el-input>
          </el-form-item>
          <el-form-item label="工种：" prop="workType" label-width="128px">
            <el-select v-model="ruleForm.workType" placeholder="请选择工种" style="width:340px;">
              <el-option
                :label="craft.label"
                :value="craft.value"
                v-for="(craft, index) in worker_list"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="mains"></div>
        <div class="right">
          <el-button type="primary" @click="readIDCard">读取身份证信息</el-button>
          
          <el-form-item label="身份证正面照片：" class="idcard" >
          </el-form-item>
          <img-upload1
            :url="frontUrl"
            :img="img2"
            :detail="img2"
            @change="changeImg"
            remark="只支持.jpg格式，不超过500k"
          ></img-upload1>
          <el-form-item label="身份证反面照片：" class="idcard">
          </el-form-item>
          <img-upload2
            :url="backUrl"
            :img="img4"
            :detail="img4"
            @change="changeImg1"
            remark="只支持.jpg格式，不超过500k"
          ></img-upload2>
          <el-form-item label="现场照片" prop="detail_" style="width:456px;margin-top:126px" >
          <el-button type="primary" size='small' style="margin-bottom: -175px; cursor: pointer;margin-left:40px" @click="toCamera">拍照</el-button>
          </el-form-item>
          <img-upload
            :url="spotUrl"
            :img="detail_"
            :detail="detail_"
            @change="changeImgs"
            remark="只支持.jpg格式，不超过500k"
            style="width:100px"
          ></img-upload>
          <el-form-item class="save">
            <el-button type="primary" @click="submitForm('ruleForm')" :disabled="this.is_project === 1 ? true : false">保存并返回</el-button>
            <el-button v-if="!isEdit" @click="resetForm('ruleForm')" :disabled="this.is_project === 1 ? true : false">保存并继续新增</el-button>
          </el-form-item>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import ImgUpload from "../../components/ImgUpload";
import ImgUpload1 from "../../components/ImgUpload1";
import ImgUpload2 from "../../components/ImgUpload2";
import { projectList, initSelect, uploadedImg, contractor, getTeamID, submitForm, code } from '../../api/peopleManagement'
import axios from 'axios'
export default {
  name: "add-people",
  components: {
    ImgUpload,
    ImgUpload1,
    ImgUpload2
  },
  data() {
    return {
      spotUrl: "/labor/v1/headImg",                                      // 现场照片域名
      frontUrl: "/labor/v1/cardNumberFront",                             // 身份证正面照片域名
      backUrl: "/labor/v1/cardNumberBack",                               // 身份证反面照片域名
      // picUrl: "http://crmapi.dev.hzjyun.com/labor/v1/headImg",           
      isEdit: false,                                         // 是否是编辑
      ruleForm: {},                                          // 列表数据
      appid: this.$store.state.cs_admin_appId,               // 项目id
      secret: this.$store.state.cs_admin_secret,             // 项目密匙
      img_: "",                                              // 相对路径
      detail_: "",                                           // 绝对路径
      detail: "",
      img1: "",
      img2: "",
      img3: "",
      img4: "",
      positiveIDCardImage: "",                              // 现场照片
      rows: [],
      cardID: "",                                           // 身份证号
      headImage: "",                                        // 给后台所传的相对路径
      headImageAbsolute: '',                                // 给后台所传的绝对路径
      teamID: [],                                           // 班组id
      family_type: [                                        // 户口性质
        {
          value: 0,
          label: "农村",
        },
        {
          value: 1,
          label: "城镇",
        },
      ],
      workRole: [                                          // 人员类型
        {
          value: 10,
          label: "班组长",
        },
        {
          value: 20,
          label: "工人",
        },
      ],
      interval: {},               // 定时任务
      time: 5,                    // 轮询次数
      projectId: '',              // 项目id
      serial: '',                 // 接收轮询到的照片
      timer: '',                  // 时间
      baseImg: '',                // 轮询图片
      worker_list: [],            // 工种
      politics_list: [],          // 政治面貌
      culture_list: [],           // 文化程度
      bank_list: [],              // 参建单位
      rules: {
        workerName: [
          { required: true, message: "请输入姓名", trigger: "blur" },
        ],
        teamID: [{ required: true, message: "请选择班组", trigger: "change" }],
        corpID: [{
          required: true, message: '请选择参建单位', trigger: 'change'
        }],
        cellPhone: [{
          required: true, message: '请输入注册手机号', trigger: 'blur'
        }],
        idCardNumber: [
          { required: true, message: "请输入身份证号", trigger: "blur" },
        ],
        family_type: [
          { required: true, message: "请选择户口性质", trigger: "change" },
        ],
        link_mobile: [
          { required: true, message: "请输入联系方式", trigger: "blur" },
        ],
        openBank: [
          { required: true, message: "请输入开户行", trigger: "blur" },
        ],
        bankID: [
          { required: true, message: "请输入银行卡号", trigger: "blur" },
        ],
        address: [{ required: true, message: "请输入地址", trigger: "blur" }],
        workType: [
          { required: true, message: "请选择工种", trigger: "change" },
        ],
        workRole: [
          { required: true, message: "请选择人员类型", trigger: "change" },
        ],
        politicsType: [
          { required: true, message: "请选择政治面貌", trigger: "change" },
        ],
        cultureLevelType: [
          { required: true, message: "请选择文化程度", trigger: "change" },
        ],
        // detail_: [
        //   { required: true, message: '请上传照片', }
        // ]
      },
      bcorpID: '',                   // 班组id
      idCardNumber: '',              // 身份证号
      is_project: '',                // 是否存在项目
      is_worker_new: ''              // 是否存在工人
    };
  },
  methods: {
    changeImg(img1, img2) {
      this.img1 = img1;
      this.img2 = img2
    },
    changeImg1(img3, img4) {
      this.img3 = img3;
      this.img4 = img4;
    },
    changeImgs(img, detail) {
      this.img_ = img;
      this.detail_ = detail;
    },
    // 抓拍现场照片
    async toCamera(){
      await axios.get('http://equipment.lvjiaiot.com:6001/v1/facemachine/snap-pic', {
        params: {
          time: this.time,
          projectId: this.projectId
        }
      }).then(res => {
        if (res.data.success = true) {
            this.serial= res.data.data
            let timer = 0
           let baseImg = this.baseImg
             this.interval = setInterval(() => {
              this.poll()
              timer++
               if (timer > 5  || baseImg) {
                clearInterval(this.interval)
              }
            },3000) 
        }
      })
},
 // 抓拍到的照片提交给后台
    async poll () {
      await axios.get('http://equipment.lvjiaiot.com:6001/v1/facemachine/snap-res', {
        params: {
          serial: this.serial
        }
      })
      .then(res => {
        if (res.data.success = true) {
          this.baseImg = res.data.data
          this.uplodeImg()
        }
      })
      .catch(res =>{
        console.log(res)
      } )
    },
    // 上传抓拍头像照片
    async uplodeImg () {
      await this.$http(uploadedImg, {
        projectId: this.projectId,
        prjAppid: this.appid,
        headImg:  this.baseImg
      }).then(res => {
        if(res.data.code == 200) {
            let headImage = res.data.data.key
            let headheadImagesAbsolute = res.data.data.path
            this.ruleForm.headImage = headImage
            this.ruleForm.headImageAbsolute = headheadImagesAbsolute
            this.detail_ = headheadImagesAbsolute
            this.img_ = headImage
            console.log(headImage)
            console.log(this.detail_)
            console.log(headheadImagesAbsolute)
        }
      })
    },
    // 获取项目列表
    project () {
      this.$http(projectList).then(res => {
        if(res.data.code ==200) {
          this.projectId = res.data.data
        }
      })
    },
    // 下拉框请求
    initSelect() {
      this.$http(initSelect).then((res) => {
        if (res.data.code === 200) {
          let politics = res.data.data.politicsType; //政治面貌
          let culture = res.data.data.cultureLevelType; //文化程度
          let worker = res.data.data.workerType; //文化程度
          this.politics_list = [];
          this.culture_list = [];
          this.worker_list = [];
          //政治面貌下拉框
          if (politics) {
            let keys = Object.keys(politics);
            keys.map((key) => {
              this.politics_list.push({
                value: key,
                label: politics[key],
              });
            });
          }
          //文化程度下拉框
          if (culture) {
            let keys = Object.keys(culture);
            keys.map((key) => {
              this.culture_list.push({
                value: key,
                label: culture[key],
              });
            });
          }
          //工种下拉框
          if (worker) {
            let keys = Object.keys(worker);
            keys.map((key) => {
              this.worker_list.push({
                value: key,
                label: worker[key],
              });
            });
          }
        }
      });
    },
    //参建单位
    getCompany () {
      this.$http(contractor)
      .then(res => {
        this.bank_list = res.data.data.rows.map(item => {
          this.bcorpID = item.id
          return item
        })
        
      })
    },
    //班组列表
    getTeamID () {
      this.$http(getTeamID, {
          bcorpID: this.bcorpID
      })
      .then(res => {
        if(res.data.code == 200) {
          this.teamID = res.data.data.map(item => {
            return item
          })
        }
      })
    },
    ProjectHandle (e) {
      console.log(e)
      this.getTeamID()
    },
    fileUploadSucess(response, file, fileList) {
      this.$message("上传成功");
    },
    // 保存并返回
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.isEdit) {
            this.ruleForm.aud = "update";
            this.img_ = this.ruleForm.headImage;
            this.img1 = this.ruleForm.positiveIDCardImage;
            this.img3 = this.ruleForm.negativeIDCardImage;

          } else {
            this.ruleForm.aud = "insert";
          }
          let cardID = (this.ruleForm.cardID = this.ruleForm.idCardNumber);
          let allCardNumber = (this.ruleForm.cardID = this.ruleForm.idCardNumber);
          let headImage = this.img_;
          let headImageAbsolute = this.detail_;
          let positiveIDCardImage = this.img1;
          let positiveIDCardImageAbsolute = this.img2
          let negativeIDCardImage = this.img3;
          let negativeIDCardImageAbsolute = this.img4;
          let model = {
            appid: this.appid,
            secret: this.secret,
            rows: [this.ruleForm]
          };
          model.rows[0].allCardNumber = allCardNumber;
          model.rows[0].cardID = cardID;
          model.rows[0].headImage = headImage;
          model.rows[0].headImageAbsolute = headImageAbsolute;
          model.rows[0].positiveIDCardImage = positiveIDCardImage;
          model.rows[0].positiveIDCardImageAbsolute = positiveIDCardImageAbsolute;
          model.rows[0].negativeIDCardImage = negativeIDCardImage;
          model.rows[0].negativeIDCardImageAbsolute = negativeIDCardImageAbsolute;
          if (this.ruleForm.workRole == 10) {
              model.rows[0].is_leader = 1
          }
          if (this.ruleForm.workRole == 20) {
              model.rows[0].is_leader = 0
          }
          this.$http(submitForm, model).then((res) => {
            if (res.data.code === 200) {
              this.$router.push({
                path: "/peopleManagement/peopleManagement",
              });
            } else {
              this.$message("当前设备未绑定项目！");
            }
          });
        }
      });
    },
    // 保存并继续新增
    async resetForm(ruleForm) {
      if (this.isEdit) {
        this.ruleForm.aud = "update";
      } else {
        this.ruleForm.aud = "insert";
      }
      let cardID = (this.ruleForm.cardID = this.ruleForm.idCardNumber);
      let allCardNumber = (this.ruleForm.cardID = this.ruleForm.idCardNumber);
      let headImage = this.img_;
      let headImageAbsolute = this.detail_;
      let positiveIDCardImage = this.img1;
      let positiveIDCardImageAbsolute = this.img2
      let negativeIDCardImage = this.img3;
      let negativeIDCardImageAbsolute = this.img4;
      let model = {
        appid: this.appid,
        secret: this.secret,
        rows: [this.ruleForm]
      };
      model.rows[0].allCardNumber = allCardNumber;
      model.rows[0].cardID = cardID;
      model.rows[0].headImage = headImage;
      model.rows[0].headImageAbsolute = headImageAbsolute;
      model.rows[0].positiveIDCardImage = positiveIDCardImage;
      model.rows[0].positiveIDCardImageAbsolute = positiveIDCardImageAbsolute
      model.rows[0].negativeIDCardImage = negativeIDCardImage;
      model.rows[0].negativeIDCardImageAbsolute = negativeIDCardImageAbsolute;
      if (this.ruleForm.workRole == 10) {
              model.rows[0].is_leader = 1
          }
          if (this.ruleForm.workRole == 20) {
              model.rows[0].is_leader = 0
          }
      await this.$http(submitForm, model).then((res) => {
        if (res.data.code === 200) {
          this.ruleForm = this.rows[0];
        } else {
          this.$message("当前设备未绑定项目！");
        }
      });
        // this.$refs[ruleForm].resetFields();
        window.history.go(0)
    },
    // 读取身份证
    readIDCard() {
      axios.get('http://127.0.0.1:8989/api/ReadMsg')
      .then(res => {
        if(!res.data.cardno) {
          this.$msg.Error('读取失败！')
        } else {
          this.$set(this.ruleForm, 'workerName', res.data.name)
          this.$set(this.ruleForm, 'idCardNumber', res.data.cardno)
        }
      })
      .catch(err => {
        console.log(err)
      })
    },
    //身份证失去焦点进行验证
    CardHandel() {
      this.$http(code, {
          idCardNumber: this.ruleForm.idCardNumber
      })
      .then(res => {
        if(res.data.code == 200) {
          this.is_project = res.data.data.is_project
          this.is_worker_new = res.data.data.is_worker_new
          if(this.is_project === 1) {
            this.$message('该工人已存在该项目！')
            return 
          } else if(this.is_worker_new === 1) {
            this.$message('工人库中已存在该工人！')
             this.$set(this.ruleForm, 'workerName', res.data.data.worker_info.name)
             this.$set(this.ruleForm, 'idCardNumber', res.data.data.worker_info.card_number)
             this.$set(this.ruleForm, 'cellPhone', res.data.data.worker_info.mobile)
             this.$set(this.ruleForm, 'link_mobile', res.data.data.worker_info.link_mobile)
          } else {
            this.$set(this.ruleForm, 'cellPhone', '')
            this.$set(this.ruleForm, 'link_mobile', '')
          }
        }
      })
    }
  },
  created() {
    this.initSelect();
    this.ruleForm = Object.assign({}, this.rows[0]);
    this.project ()
    this.getCompany()
    
  },
  mounted() {
    let editRow = this.$route.params.editRow;
    let isAdd = this.$route.params.isAdd;
    
    if (isAdd) {
      this.isEdit = false;
    }else{
      console.log(editRow.workRole)
      this.isEdit = true;
      editRow['workRole'] = parseInt(editRow['workRole']); 
      editRow['teamID'] = editRow['teamName']
      this.ruleForm = editRow;
      this.detail_ = this.ruleForm.headImageAbsolute
      this.img2 = this.ruleForm.positiveIDCardImageAbsolute
      this.img4 = this.ruleForm.negativeIDCardImageAbsolute
    }
  }
};
</script>

<style lang="scss" >
/deep/ .img-upload{
  position: relative;
}
 .el-form-item__error{
  margin-left: 30px;
}
.content_box {
  display: flex;
  justify-content: space-around;
  .left {
    width: 40%;
    span{
      margin-left: 30px;
    }
  }
  .right {
    width: 40%;
  }
  .mains {
    flex: 1;
    width: 20%;
  }
}
.add-people {
  h6 {
    line-height: 40px;
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
    text-indent: 10px;
  }
  .el-form-item__label {
    text-align: left;
    text-indent: 7px;
  }
  .el-switch {
    margin-left: 30px;
  }
  .el-input {
    margin-left: 30px;
  }
  .chec {
    width: 120px !important;
    .el-form-item__label {
      width: 128px !important;
    }
    .el-switch {
      margin-top: -81px;
    }
  }
  .el-form-item__label::before {
    content: "*";
    color: #f56c6c;
    margin-right: 4px;
  }
  .right {
    // margin-right: 220px;
    .el-form-item__label {
      text-indent: 0;
    }
    .idcard {
      .el-form-item__label {
        width: 200px !important;
        margin-top: 20px;
        margin-bottom: -25px !important;
      }
      .el-form-item__label::before{
        content: '';
      }
    }
    .upload-wrap p {
      margin-top: 138px !important;
      margin-left: -101px !important;
    }
    .upload-wrap {
      margin-top: -22px !important;
    }
    .save {
      margin-top: 180px;
      .el-button--primary {
        margin-right: 50px !important;
      }
    }
  }
}
</style>