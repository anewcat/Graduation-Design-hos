<template>
  <div class="root">
    <el-aside>
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
        @open="handleOpen"
        @close="handleClose"
      >
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <template v-for="(item, index) in routerList" :key="index">
          <el-menu-item :index="item.id">
            <el-icon><location /></el-icon>
            <template #title>
              <router-link :to="item.path">
                {{ item.authName }}
              </router-link>
            </template>
          </el-menu-item>
        </template>
        <!-- <el-menu-item index="4">
          <el-icon><setting /></el-icon>
          <template #title>Navigator Four</template>
        </el-menu-item> -->
      </el-menu>
    </el-aside>
    <router-view></router-view>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, ref } from "vue";
import LocalCache from "@/utils/cache";
import axios from "axios";

import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from "@element-plus/icons-vue";

interface myRule1 {
  userId: number | null;
  docId: number | null;
  orderTime: string | null;
  detailTime: string | null;
  docAnswer: string | null;
  petId: number | null;
  petName: string | null;
  docName: string | null;
}

interface myRule2 {
  id: string | null;
  authName: string | null;
  path: string;
}
// const myPets = ref<Array<myRule>>([]);
const myOrder = ref<Array<myRule1>>([]);
const routerList = ref<Array<myRule2>>([]);

onMounted(() => {
  // console.log(LocalCache.getCache("userId"));
  axios
      .post("http://localhost:3000/center", {
        userId: LocalCache.getCache("userId"),
      })
      .then(function (res) {
        console.log(res);
        myOrder.value = res.data.result;
        routerList.value = res.data.routerList;
      });
});

const isCollapse = ref(true);
const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value;
};
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>

<style scoped>
.pteImg {
  width: 150px;
  height: 200px;
}
.toggle-button {
  background: white;
  color: black;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
  font-size: 10px;
  line-height: 24px;
}
.content {
  height: 500px;
  width: 500px;
}
.menu {
  height: calc(100vh - 60px);
}
.root {
  display: flex;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
a {
  text-decoration: none;
  color: black;
}
</style>
