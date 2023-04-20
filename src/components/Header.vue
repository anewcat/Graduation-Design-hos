<template>
  <div>
    <div
      :class="{
        show: hidden == false,
        unshow: hidden == true,
        main: hidden == false,
      }"
    >
      <div :class="{ unshow: hidden == true }">关于</div>
      <div :class="{ unshow: hidden == true }">
        <router-link to="/DocOrder">在线预约</router-link>
        <router-link to="/hosIntroduce">医院介绍</router-link>
        <router-link to="/petSpace">爱宠天地</router-link>
        <router-link to="/Center">个人中心</router-link>
        <span @click="signOut">退出登录</span>
      </div>
    </div>
    <div class="con">
      <router-link to="/home" class="font-text">宠物医院预约系统</router-link>
      <span class="homeButton"
        ><el-icon :size="20" @click="strong"><House /></el-icon
      ></span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import myCache from "@/utils/cache";
import { ElMessage, ElMessageBox } from "element-plus";
import { useRouter } from "vue-router";
const router = useRouter();
const hidden = ref(true);
const strong = () => {
  hidden.value = !hidden.value;
};
const signOut = () => {
  ElMessageBox.confirm("确认要退出吗?", "提示", {
    distinguishCancelAndClose: true,
    confirmButtonText: "确 认",
    cancelButtonText: "取 消",
  })
    .then(() => {
      if (myCache.getCache("userId")) {
        myCache.deleteCatch("userId");
      } else if (myCache.getCache("docId")) {
        myCache.deleteCatch("docId");
      }
      router.push("/");
    })
    .catch(() => {
      // 取消删除
    });
};
</script>
<style scoped>
.con {
  height: 60px;
  background-color: aliceblue;
  width: 100%;
  padding: 0 200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.font-text {
  font-size: 25px;
}
.homeButton {
  height: 40px;
  width: 55px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  border: #dddddd solid 2px;
}
.homeButton:hover {
  height: 40px;
  width: 55px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  border: #5f6368 solid 4px;
}
.show {
  height: 200px;
  width: 100%;
  background: #fff;
}
.unshow {
  display: none;
}
a {
  text-decoration: none;
  color: #5f6368;
  margin: 5px 0;
  display: block;
}
.main {
  display: flex;
  padding: 20px 250px;
  justify-content: space-between;
}
</style>
