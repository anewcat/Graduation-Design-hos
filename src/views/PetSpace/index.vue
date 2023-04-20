<template>
    <div>
      宠物常见病介绍：
      <template v-for="(item, index) in petInform" :key="index">
        <div class="doctor">
          <!-- <div><img class="docImg" :src="item.docImg" /></div> -->
          <div>
            <div>常见病名称：{{ item.title_ming }}</div>
            <div>病因：{{ item.reason }}</div>
            <div>病症：{{ item.sysbol }}</div>
            <div>治疗方法：{{ item.fangfa }}</div>
          </div>
        </div>
      </template>
    </div>
  </template>
  <script setup lang="ts">
  import { ref, onMounted } from "vue";
  import axios from "axios";
  const petInform = ref([]);
  onMounted(() => {
    axios.post("http://localhost:3000/petSpace").then((res) => {
      petInform.value = res.data.result;
      console.log(petInform.value);
    });
  });
  </script>
  <style scoped>
  .keshi {
    height: 300px;
    width: 80%;
    background-color: #fff;
    margin: 20px 30px;
  }
  .doctor {
    width: 80%;
    height: 300px;
    background-color: #fff;
    margin: 20px 30px;
    display: flex;
  }
  .docImg {
    height: 200px;
    width: 150px;
  }
  </style>
  