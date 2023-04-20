<template>
  <div class="all">
    <div class="white-box">
      <!-- <div class="login-box"> -->
      <div class="owl" id="owl" :class="{ password: myfocus == true }">
        <div class="hand"></div>
        <div class="hand hand-r"></div>
        <div class="arms">
          <div class="arm"></div>
          <div class="arm arm-r"></div>
        </div>
      </div>
      <div class="input-box">
        <input type="text" placeholder="账号" v-model="userInform.userName" />
        <input
          type="password"
          placeholder="密码"
          id="password"
          @focus="getFocus"
          @blur="loseFocus"
          v-model="userInform.password"
        />
        <div style="myId">
          <div class="myL">
            <el-radio-group v-model="radio1" class="ml-4" @change="radioChange">
              <el-radio label="1" size="large">我是用户</el-radio>
              <el-radio label="2" size="large">我是医生</el-radio>
            </el-radio-group>
          </div>

          <div :class="{ myShow: show == true }">注册</div>
        </div>
        <button @click="login">登录</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import LocalCache from "@/utils/cache";
const radio1 = ref("1");
const show = ref(false);
const router = useRouter();
const myfocus = ref(false);
const userInform = reactive({
  userName: "",
  password: "",
});
// const username = ref('');
// const password = ref('');
const getFocus = () => {
  myfocus.value = true;
};
const loseFocus = () => {
  myfocus.value = false;
};
const login = () => {
  // console.log(userInform);
  if (radio1.value == "1") {
    axios
      .post("http://localhost:3000/login/users", userInform)
      .then(function (res) {
        console.log(res.data);
        // 如果状态码为200，代表登录成功，0为失败
        if (res.data.code == "200") {
          // 如果存在该用户,弹出登录成功提示信息
          console.log("登录成功");
          // LocalCache.setCath("userName", userInform.userName);
          // LocalCache.setCath("password", userInform.password);
          LocalCache.setCache("userId", res.data.data[0].userId);
          // LocalCache.setCache("userName", res.data.data[0].userId);
          router.push("/home");
        } else {
          // 如果不存在该用户,弹出登录失败提示信息
          console.log("登录失败");
          userInform.userName = "";
          userInform.password = "";
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }else{
    axios
      .post("http://localhost:3000/login/doc", userInform)
      .then(function (res) {
        console.log(res.data);
        // 如果状态码为200，代表登录成功，0为失败
        if (res.data.code == "200") {
          // 如果存在该用户,弹出登录成功提示信息
          console.log("登录成功");
          // LocalCache.setCath("userName", userInform.userName);
          // LocalCache.setCath("password", userInform.password);
          LocalCache.setCache("docId", res.data.data[0].docId);
          // LocalCache.setCache("userName", res.data.data[0].userId);
          router.push("/home");
        } else {
          // 如果不存在该用户,弹出登录失败提示信息
          console.log("登录失败");
          userInform.userName = "";
          userInform.password = "";
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
};
const radioChange = () => {
  if (radio1.value == "1") {
    show.value = false;
  } else {
    show.value = true;
  }
};
</script>

<style scoped>
* {
  /* 初始化 */
  margin: 0;
  padding: 0;
}
.all {
  /* 100%窗口高度 */
  /* 弹性布局 居中 */
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  /* 渐变背景 */
  background-color: #fff;
}
.white-box {
  width: 500px;
  height: 350px;
  background: linear-gradient(200deg, #72afd3, #96fbc4);
  border-radius: 15px;
  position: relative;
}

.input-box {
  /* 弹性布局 垂直排列 */
  display: flex;
  flex-direction: column;
  width: 350px;
  height: 200px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
.input-box input {
  height: 50px;
  border-radius: 3px;
  /* 缩进15像素 */
  text-indent: 15px;
  outline: none;
  border: none;
  margin-bottom: 15px;
}
.input-box input:focus {
  outline: 1px solid lightseagreen;
}
.input-box button {
  border: none;
  height: 45px;
  background-color: lightseagreen;
  color: #fff;
  border-radius: 3px;
  cursor: pointer;
}
/* 接下来是猫头鹰的样式 */
.owl {
  width: 211px;
  height: 108px;
  /* 背景图片 */
  background: url("../../public/images/owl-login.png") no-repeat;
  /* 绝对定位 */
  position: absolute;
  top: -100px;
  /* 水平居中 */
  left: 50%;
  transform: translateX(-50%);
}
.owl .hand {
  width: 34px;
  height: 34px;
  border-radius: 40px;
  background-color: #472d20;
  /* 绝对定位 */
  position: absolute;
  left: 12px;
  bottom: -8px;
  /* 沿Y轴缩放0.6倍（压扁） */
  transform: scaleY(0.6);
  /* 动画过渡 */
  transition: 0.3s ease-out;
}
.owl .hand.hand-r {
  left: 170px;
}
.owl.password .hand {
  transform: translateX(42px) translateY(-15px) scale(0.7);
}
.owl.password .hand.hand-r {
  transform: translateX(-42px) translateY(-15px) scale(0.7);
}
.owl .arms {
  position: absolute;
  top: 58px;
  width: 100%;
  height: 41px;
  overflow: hidden;
}
.owl .arms .arm {
  width: 40px;
  height: 65px;
  position: absolute;
  left: 20px;
  top: 40px;
  background: url("../../public/images/owl-login-arm.png") no-repeat;
  transform: rotate(-20deg);
  transition: 0.3s ease-out;
}
.owl .arms .arm.arm-r {
  transform: rotate(20deg) scaleX(-1);
  left: 158px;
}
.owl.password .arms .arm {
  transform: translateY(-40px) translateX(40px);
}
.owl.password .arms .arm.arm-r {
  transform: translateY(-40px) translateX(-40px) scaleX(-1);
}
.myId {
  display: flex;
  /* position:relative; */
  /* align-items: center; */
  /* width: 320px; */
}
.myShow {
  display: none;
}
</style>
