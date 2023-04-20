<template>
  <div>
    医生介绍界面
    <template v-for="(item, index) in docInform" :key="index">
      <div class="doctor">
        <div><img class="docImg" :src="item.docImg" /></div>
        <div>
          <div>医生姓名：{{ item.docName }}</div>
          <div>性别：{{ item.docSex }}</div>
          <div>医生年龄：{{ item.docAge }}</div>
          <div>科室：{{ item.keshi }}</div>
          <div>详细信息：{{ item.docInform }}</div>
          <div>邮箱：{{ item.docEmail }}</div>
          <div>电话：{{ item.docTel }}</div>
        </div>
      </div>
    </template>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
const docInform = ref([]);
onMounted(() => {
  axios.post("http://localhost:3000/docMsg").then((res) => {
    docInform.value = res.data.result;
    console.log(docInform.value);
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
