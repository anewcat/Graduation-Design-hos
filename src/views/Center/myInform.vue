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
          <el-row>
            <el-col :span="11">
              <el-form-item label="姓名" prop="username">
                <el-input
                  v-model="userForm.username"
                  clearable
                  disabled
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="邮箱" prop="email">
                <el-input
                  v-model="userForm.email"
                  clearable
                  :disabled="isTj"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item label="联系电话" prop="tel">
                <el-input
                  v-model="userForm.tel"
                  clearable
                  :disabled="isTj"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="通信地址" prop="address">
                <el-input
                  v-model="userForm.address"
                  clearable
                  :disabled="isTj"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item label="修改密码" prop="password">
                <el-input
                  v-model="userForm.password"
                  show-password
                  clearable
                  :disabled="isTj"
                  placeholder="请输入新密码"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 修改 -->
          <el-row type="flex" justify="end">
            <el-button type="warning" @click="editUserinfo">修改信息</el-button>
            <el-button type="success" :disabled="isTj" @click="submit"
              >提交</el-button
            >
            <el-button type="primary" :disabled="isTj" @click="cancel"
              >取消</el-button
            >
          </el-row>
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
const userForm = ref({});
const isTj = ref(true);
// 修改按钮点击事件
const editUserinfo = () => {
  isTj.value = false;
};
// 提交按钮事件
const submit = () => {
  // 发起数据请求
  axios
    .post("http://localhost:3000/users/update", userForm.value)
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
  if (mySession.getCache("userId")) {
    let userId = mySession.getCache("userId");
    axios.post("http://localhost:3000/users", { userId }).then((res) => {
      console.log(res, "resresres");
      userForm.value = res.data.result[0];
    });
  }
});
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
</style>
