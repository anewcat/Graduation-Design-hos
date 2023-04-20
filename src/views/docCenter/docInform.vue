<template>
  <div class="bg">
    <!-- 面包屑导航区 -->
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>个人中心</el-breadcrumb-item>
      <el-breadcrumb-item>个人信息</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区 -->
    <div class="main">
      <el-card>
        <el-form :model="userForm" ref="userFormRef" label-width="80px">
          <div style="display: flex">
            <div>
                <img :src="userForm.docImg" class="docImg" />
                <el-upload
                  class="avatar-uploader"
                  action="https://www.hualigs.cn/api/upload"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                  :data="myApiType"
                >
                  <el-button class="avatar-uploader-icon" v-if="userForm.docImg == ''&&!isTj"
                    >上传头像</el-button>
                  <el-button v-if="userForm.docImg !== ''&&!isTj">更换头像</el-button>
                </el-upload>
            </div>
            <div>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="姓名" prop="docName">
                    <el-input
                      v-model="userForm.docName"
                      clearable
                      disabled
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="性别" prop="docSex">
                    <el-input
                      v-model="userForm.docSex"
                      clearable
                      :disabled="isTj"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="科室" prop="keshi">
                    <el-input
                      v-model="userForm.keshi"
                      clearable
                      :disabled="isTj"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="邮箱" prop="docEmail">
                    <el-input
                      v-model="userForm.docEmail"
                      clearable
                      :disabled="isTj"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="年龄" prop="docAge">
                    <el-input
                      v-model="userForm.docAge"
                      clearable
                      :disabled="isTj"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="联系电话" prop="docTel">
                    <el-input
                      v-model="userForm.docTel"
                      clearable
                      :disabled="isTj"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="具体信息" prop="docInform">
                    <el-input
                      v-model="userForm.docInform"
                      clearable
                      :disabled="isTj"
                      type="textarea"
                      :rows="4"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="18">
                  <el-form-item label="修改密码" prop="docPass">
                    <el-input
                      v-model="userForm.docPass"
                      show-password
                      clearable
                      :disabled="isTj"
                      placeholder="请输入新密码"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>
          <div>
            <!-- 修改 -->
            <el-row type="flex" justify="end">
              <el-button type="warning" @click="editUserinfo"
                >修改信息</el-button
              >
              <el-button type="success" :disabled="isTj" @click="submit"
                >提交</el-button
              >
              <el-button type="primary" :disabled="isTj" @click="cancel"
                >取消</el-button
              >
            </el-row>
          </div>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import mySession from "@/utils/cache";
import { ElMessage, ElMessageBox } from "element-plus";
import { ArrowRight } from "@element-plus/icons-vue";
import type { UploadProps } from "element-plus";
const userForm = ref({});
const isTj = ref(true);
const imageUrl = ref("");
const myApiType = ref({ 
  apiType: "chaoneng",
  privateStorage:"chaoneng",
  token: "da46f0c79b9f21210481f6c453a50942",
  image:{}
});
// 修改按钮点击事件
const editUserinfo = () => {
  isTj.value = false;
};
// 提交按钮事件
const submit = () => {
  // 发起数据请求
  axios
    .post("http://localhost:3000/docMsg/update", userForm.value)
    .then(function (response) {
      // console.log(response.data);
      if (response.data.code == "200") {
        // 如果更新成功,弹出更新成功提示信息
        ElMessage({
          type: "success",
          message: "数据修改成功",
        });
        isTj.value = true;
      } else {
        // 如果更新失败,弹出更新失败提示信息
        ElMessage({
          type: "error",
          message: "数据修改失败",
        });
        isTj.value = true;
      }
    });
  // alert("提交成功");
};
// 取消按钮事件
const cancel = () => {
  // userForm.value = JSON.parse();
  isTj.value = true;
};
onMounted(() => {
  if (mySession.getCache("docId")) {
    let docId = mySession.getCache("docId");
    axios.post("http://localhost:3000/docMsg/doctor", { docId }).then((res) => {
      console.log(res, "resresres");
      userForm.value = res.data.result[0];
    });
  }
});
const handleAvatarSuccess: UploadProps["onSuccess"] = (
  response,
  uploadFile
) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!);
  // console.log(imageUrl.value,"11111111111111")
  // console.log(response,"response")
  userForm.value.docImg = response.data.url.chaoneng
};

const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
  if (rawFile.type !== "image/jpeg" && rawFile.type !== "image/png") {
    ElMessage.error("Avatar picture must be JPG format!");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("Avatar picture size can not exceed 2MB!");
    return false;
  }
  // console.log(rawFile,"rawFile~~~~")
  myApiType.value.image = rawFile
  return true;
};
</script>

<style scoped>
.bg {
  width: 100%;
  height: 500px;
}
.main {
  width: 70%;
  height: 500px;
}
.docImg {
  width: 150px;
  height: 180px;
  /* display: inline-block; */
}
</style>
