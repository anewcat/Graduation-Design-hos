.
<template>
  <div>
    <el-calendar>
      <template #date-cell="{ data }">
        <p :class="data.isSelected ? 'is-selected' : ''">
          {{ data.day.split("-").slice(1).join("-") }}
        </p>
        <div
          v-for="(item, index) in textContent(data.day)"
          :key="index"
          style="width: 200px; display: flex; justify-content: space-between"
        >
          <!-- {{ data.day }}<br/> -->

          <div>{{ item }}</div>
          <el-button
            v-if="
              data.day == getToday() && item !== '休' && !todayDaka(data.day)
            "
            @click="clockIn"
            >打卡</el-button
          >
          <el-tag class="ml-2" type="success" v-if="todayDaka(data.day)"
            >已打卡</el-tag
          >
        </div>

        <!-- <el-button v-if="data.day == getToday() && !todayDaka(data.day)" @click="clockIn">打卡</el-button> -->

        <!-- <span v-if="data.day == getToday()" @click="clockIn">休息日</span> -->
      </template>
    </el-calendar>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import mySession from "@/utils/cache";
import zhiban from "@/utils/zhiban";
import { ElMessage, ElMessageBox } from "element-plus";
import KeshiIntroduce from "../hosIntroduce/keshiIntroduce.vue";
import { getPlacementList } from "@floating-ui/core/src/middleware/autoPlacement";
const MyWorkTime = ref({
  Mon: "",
  Tue: "",
  Wed: "",
  Thu: "",
  Fri: "",
  Sat: "",
  Sun: "",
});
const docName = ref("");
const keshi = ref("");
const daka = ref(false);
const dakaArr = ref([]);
const table = ref(false)
const textContent = (date) => {
  // console.log()
  // console.log(zhiban.getToday(),"ttttttttt")
  let myDate = String(new Date(date)).split(" ")[0];
  // console.log(date)
  // console.log(MyWorkTime.value[myDate],"myDate")
  let result = MyWorkTime.value[myDate] == "上班" ? "班" : "休";
  return result;
};
onMounted(() => {
  axios
    .post("http://localhost:3000/docCenter/myWorkTime", {
      userId: mySession.getCache("docId"),
    })
    .then((res) => {
      let Time: object = res.data.result[0];
      console.log(Time, "timetime");
      MyWorkTime.value.Mon = Time.mondayStatus;
      MyWorkTime.value.Tue = Time.tuesdayStatus;
      MyWorkTime.value.Wed = Time.wednesdayStatus;
      MyWorkTime.value.Thu = Time.thursdayStatus;
      MyWorkTime.value.Fri = Time.fridayStatus;
      MyWorkTime.value.Sat = Time.saturdayStatus;
      MyWorkTime.value.Sun = Time.sundayStatus;
      docName.value = Time.username;
      keshi.value = Time.keshi;
      // console.log(docName.value,"123123")
    });
  // console.log(MyWorkTime.value)
  // let str = String(new Date("2023-04-18"))
  // console.log(str.split(" ")[0])
  //   getToday()
  getList();
});
const getList = () => {
  axios
    .post("http://localhost:3000/dkAndqj/selectDK", {
      docId: mySession.getCache("docId"),
    })
    .then((res) => {
      // console.log(res.data.result)
      dakaArr.value = res.data.result;
    });
};
const getToday = () => {
  // 获取今天日期 YYYY-MM-DD
  let myDate = new Date(new Date().getTime() + 8 * 60 * 60 * 1000);

  let myTime = myDate.toJSON().split("T").join(" ").slice(0, 10);
  return myTime;
};
const clockIn = () => {
  // 今日打卡函数
  axios
    .post("http://localhost:3000/dkAndqj/insertDK", {
      docId: mySession.getCache("docId"),
      name: docName.value,
      keshi: keshi.value,
      status: "已打卡",
    })
    .then((res) => {
      if (res.data.code == 200) {
        ElMessage({
          type: "success",
          message: "打卡成功",
        });
        daka.value = true;
        getList();
      }
    });
};

const todayDaka = (date: string) => {
  // 判断今天是否打卡
  // console.log(date);
  if (dakaArr.value.indexOf(date) != -1) {
    return true;
  } else {
    return false;
  }
  // return true
};


</script>
<style scoped>
.is-selected {
  color: #1989fa;
}
</style>
