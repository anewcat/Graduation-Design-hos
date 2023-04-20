<template>
    <div>
      <main>
        <div class="text-center topImg">
          <!-- <img src="../assets/caicai1.png" class="zindex-dropdown"> -->
          <div class="text-white topText">
            欢迎光临宠物医院预约管理系统
            <!-- <Typer :str="str"/> -->
          </div>
        </div>

        <div class="py-5">
          <div class="container">
            <div class="row">
              <div class="col-3" :class="{myShow:getCache.getCache('docId')}">
                <router-link to="/DocOrder">
                  <div class="myCard">
                    <img src="@/assets/mianzhen.png" class="myImg" />
                    <span class="myText">在线预约</span>
                  </div>
                </router-link>
              </div>
              <div class="col-3" :class="{myShow:getCache.getCache('userId')}">
                <router-link to="/yishengOrder">
                  <div class="myCard">
                    <img src="@/assets/mianzhen.png" class="myImg" />
                    <span class="myText">我的预约</span>
                  </div>
                </router-link>
              </div>
              <div class="col-3">
                <router-link to="/hosIntroduce">
                <div class="myCard">
                  <img src="@/assets/chongwumeirong.png" class="myImg" />
                  <span class="myText">医院介绍</span>
                </div>
              </router-link>
              </div>
              <div class="col-3">
                <router-link to="/petSpace">
                <div class="myCard">
                  <img src="@/assets/shoushu.png" class="myImg" />
                  <span class="myText">爱宠天地</span>
                </div>
              </router-link>
              </div>
              <div class="col-3" :class="{myShow:getCache.getCache('docId')}">
                <router-link to="/Center">
                  <div class="myCard">
                    <img src="@/assets/gerenzhongxin.png" class="myImg" />
                    <span class="myText">个人中心</span>
                  </div>
                </router-link>
              </div>
              <div class="col-3" :class="{myShow:getCache.getCache('userId')}">
                <router-link to="/docCenter">
                  <div class="myCard">
                    <img src="@/assets/gerenzhongxin.png" class="myImg" />
                    <span class="myText">个人中心</span>
                  </div>
                </router-link>
              </div>
            </div>
          </div>
          
        </div>
      </main>
    </div>

</template>

<script lang="ts" setup>
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Typer from "@/components/Type/index.vue";
import getCache from "@/utils/cache"
import { ref } from "vue";
const str = ref("欢迎来到宠物医院管理系统");
</script>

<style scoped>
.topImg {
  background: url("../assets/dogs.png") no-repeat;
  background-size: cover;
  height: 800px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.topText {
  position: absolute;
  font-size: 55px;
}
.myCard {
  background: white;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0.125rem 0.25rem rgba(var(--bs-body-color-rgb), 0.075) !important;
  border: 1px solid rgba(0, 0, 0, 0.175);
  border-radius: 0.375rem;
}
.bd-placeholder-img {
  font-size: 1.125rem;
  text-anchor: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}

@media (min-width: 768px) {
  .bd-placeholder-img-lg {
    font-size: 3.5rem;
  }
}

.b-example-divider {
  height: 3rem;
  background-color: rgba(0, 0, 0, 0.1);
  border: solid rgba(0, 0, 0, 0.15);
  border-width: 1px 0;
  box-shadow: inset 0 0.5em 1.5em rgba(0, 0, 0, 0.1),
    inset 0 0.125em 0.5em rgba(0, 0, 0, 0.15);
}

.b-example-vr {
  flex-shrink: 0;
  width: 1.5rem;
  height: 100vh;
}

.bi {
  vertical-align: -0.125em;
  fill: currentColor;
}

.nav-scroller {
  position: relative;
  z-index: 2;
  height: 2.75rem;
  overflow-y: hidden;
}

.nav-scroller .nav {
  display: flex;
  flex-wrap: nowrap;
  padding-bottom: 1rem;
  margin-top: -1px;
  overflow-x: auto;
  text-align: center;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
}
/*设置点击前的样式 */
a {
  text-decoration: none;
  color: black;
}
.myImg {
  width: 65px;
  height: 60px;
}
.myText {
  font-size: 35px;
  margin-left: 30px;
}
.root{
  display:flex;
}
.myShow{
  display: none;
}
</style>
