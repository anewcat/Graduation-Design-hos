<template>
  <div class="root">
    <template v-for="(item, index) in myData" :key="index">
      <div class="contain">
      <div>科室：{{ item.name }}</div>
      <div class="Docs">
        <template v-for="(item1, index) in item.value" :key="index">
          <div class="DocIdCard">
            <img :src="item1.docImg" style="width:150px;height:200px;">
            <div>医生姓名：{{ item1.docName }}</div>
            <div>详细介绍：{{ item1.docInform }}</div>
            <el-button @click="tableOpen(item1)">预 约</el-button>
          </div>
        </template>
      </div>
    </div>
    </template>
    <el-drawer
      v-model="table"
      title="新的预约"
      direction="rtl"
      size="40%"
      :before-close="handleClose"
    >
      <div>
        <div>
          <span>医生姓名：</span>
          {{ myDoc.docName }}
        </div>
        <div>
          <span>性别：</span>
          {{ myDoc.docSex }}
        </div>
        <div>
          <span>年龄：</span>
          {{ myDoc.docAge }}
        </div>
        <div>
          <span>联系电话：</span>
          {{ myDoc.docTel }}
        </div>
        <div>
          <span>详细介绍：</span>
          {{ myDoc.docInform }}
        </div>
        <div>
          <span>排班时间：</span><br />
          周一:{{ workTime.mondayStatus }}<br />
          周二:{{ workTime.tuesdayStatus }}<br />
          周三:{{ workTime.wednesdayStatus }}<br />
          周四:{{ workTime.thursdayStatus }}<br />
          周五:{{ workTime.fridayStatus }}<br />
          周六:{{ workTime.saturdayStatus }}<br />
          周日:{{ workTime.sundayStatus }}<br />
        </div>
        <div>
          <span>预约时间：</span>
          <el-date-picker
            v-model="value2"
            type="date"
            placeholder="请选择日期"
            :disabled-date="disabledDate"
            size="large"
            format="YYYY/MM/DD"
            value-format="YYYY-MM-DD-dddd"
            @change="selectTime"
          />
          <el-select v-model="value1" placeholder="Select" style="width: 240px">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.select == false"
            />
          </el-select>
        </div>
        <div v-if="myType == 0">
          <span>预约类型：</span>
          <el-radio-group v-model="radio1" class="ml-4">
      <el-radio label="面诊" size="large">面诊预约</el-radio>
      <el-radio label="手术" size="large">手术预约</el-radio>
    </el-radio-group>
        </div>
        <div v-if="myType == 1">
          <span>预约类型：</span>
          <el-radio-group v-model="radio1" class="ml-4">
      <el-radio label="洗澡" size="large">洗澡预约</el-radio>
      <el-radio label="剪发" size="large">剪发预约</el-radio>
      <el-radio label="护理" size="large">护理预约</el-radio>
    </el-radio-group>
        </div>
        <div>
          <span>我的宠物：</span>
          <el-select
            v-model="valuePets"
            placeholder="Select"
            style="width: 240px"
          >
            <el-option
              v-for="item in myPets"
              :key="item.petId"
              :label="item.petName"
              :value="item.petId"
            />
          </el-select>
        </div>
        <div>
          <el-button @click="submitOrder">提交预约</el-button>
        </div>
        <!-- <el-form-item label="图片">
      <el-input v-model="myDoc.keshi"></el-input>
    </el-form-item> -->
      </div>
    </el-drawer>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, reactive } from "vue";
import axios from "axios";
import LocalCache from "@/utils/cache";
import myZhiBan from "@/utils/zhiban";
import { ElMessage, ElMessageBox } from "element-plus";
const myData = ref([]);
const table = ref(false);
const myType = ref(0)
const myDoc = ref({
  docAge: "",
  docInform: "",
  docSex: "",
  docTel: "",
  docImg: "",
  docName: "",
  keshi: "",
});
const workTime = ref({
  mondayStatus: "上班",
  tuesdayStatus: "上班",
  wednesdayStatus: "上班",
  thursdayStatus: "上班",
  fridayStatus: "上班",
  saturdayStatus: "上班",
  sundayStatus: "上班",
});
const value1 = ref("");
const value2 = ref("");
const valuePets = ref("");
const radio1 = ref("")
const options = ref([
  {
    value: 0,
    label: "08:00-09:00",
    select: true,
  },
  {
    value: 1,
    label: "09:00-10:00",
    select: true,
  },
  {
    value: 2,
    label: "10:00-11:00",
    select: true,
  },
  {
    value: 3,
    label: "11:00-12:00",
    select: true,
  },
  {
    value: 4,
    label: "14:00-15:00",
    select: true,
  },
  {
    value: 5,
    label: "15:00-16:00",
    select: true,
  },
  {
    value: 6,
    label: "18:00-19:00",
    select: true,
  },
  {
    value: 7,
    label: "19:00-20:00",
    select: true,
  },
]);
interface petsRules {
  petName: string;
  petId: number;
}
const myPets = ref<Array<petsRules>>([]);
function getDocOrder() {
  axios.post("http://localhost:3000/TodayDoc/keshi").then((res) => {
    // console.log(res,"resresresres")
    res.data.result.forEach((item) => {
      // console.log(item,"itemitemitem")
      axios
        .post("http://localhost:3000/TodayDoc/keshiDoc", item)
        .then((res) => {
          console.log(res,"resresres")
          var data = {
            name: item.keshi,
            value: res.data.result,
          };
          console.log(data, "datadata");
          myData.value.push(data);
        });
    });
  });
}
const myRotate = ref(null);
const mousemoveFn = () => {
  myRotate.value = true;
};
const mouseleaveFn = () => {
  myRotate.value = false;
};
const selectTime = () => {
  // console.log("selectselect~")
  options.value = [
  {
    value: 0,
    label: "08:00-09:00",
    select: true,
  },
  {
    value: 1,
    label: "09:00-10:00",
    select: true,
  },
  {
    value: 2,
    label: "10:00-11:00",
    select: true,
  },
  {
    value: 3,
    label: "11:00-12:00",
    select: true,
  },
  {
    value: 4,
    label: "14:00-15:00",
    select: true,
  },
  {
    value: 5,
    label: "15:00-16:00",
    select: true,
  },
  {
    value: 6,
    label: "18:00-19:00",
    select: true,
  },
  {
    value: 7,
    label: "19:00-20:00",
    select: true,
  },
]
  console.log(options.value, "optionsoptions");
  axios
    .post("http://localhost:3000/TodayDoc/selectTime", {
      orderTime: value2.value,
      docId:myDoc.value.docId
    })
    .then((res) => {
      res.data.result.forEach((item: object) => {
        let m = item.detailTime;
        options.value[m].select = false;
      });
    });
  console.log(options.value, "optionsoptions2222");
};
const myLocal = reactive({
  // userName: LocalCache.getCache("userName")||"",
  // password:LocalCache.getCache("password")||""
  userId: LocalCache.getCache("userId") || "",
});
const disabledDate = (time: Date) => {
  // console.log(Date.now())
  return time.getTime()  < Date.now();
};
const submitOrder = () => {
  // console.log(myDoc.value)
  let Arr = value2.value.split("-");
  let day = Arr[Arr.length - 1];
  day = day.replace(day[0], day[0].toLowerCase()) + "Status";
  // console.log(day,"111111111111")
  // console.log(workTime.value[day])
  if (workTime.value[day] == "上班") {
    axios
      .post("http://localhost:3000/TodayDoc/addOrder", {
        docId: myDoc.value.docId,
        userId: LocalCache.getCache("userId"),
        orderTime: value2.value,
        detailTime: value1.value,
        petId: Number(valuePets.value),
        docName: myDoc.value.docName,
        orderType:radio1.value
      })
      .then((res) => {
        table.value = false;
        value1.value = "";
        value2.value = "";
        valuePets.value = "";
        ElMessage({
          type: "success",
          message: "预约成功，请到个人中心查看记录",
        });
      });
    //  console.log(value1.value,value2.value,"valuevaluevalue")
  } else {
    ElMessageBox.confirm("选择时间为医生休息时间", "警告", {
      confirmButtonText: "确 认",
      cancelButtonText: "取 消",
      type: "warning",
    });
  }
};
const handleClose = () => {
  value1.value = "";
  value2.value = "";
  valuePets.value = "";
  table.value = false
};
// const newOrder = (date: string, id: number, index1: number, index: number) => {
//   // newOrder(item.date,index1+1,index2)
//   // date是具体的日期；id是指哪位医生(几号医生，从1开始)；index1是指医生的具体时间序号；index是指具体是哪天的序号
//   let data = {
//     date,
//     id,
//     index1,
//   };
//   axios
//     .post("http://localhost:3000/TodayDoc/newOrder", data)
//     .then(function (res) {
//       // console.log(res)
//       //   getNewData();
//       getDocOrder();
//       let data1 = {
//         userId: myLocal.userId,
//         docId: id,
//         orderTime: date,
//         detailTime: index1,
//       };
//       axios
//         .post("http://localhost:3000/TodayDoc/orderRecord", data1)
//         .then(function (res) {
//           console.log(res);
//         });
//     });
// };
const tableOpen = (item1: any) => {
  console.log(item1, "item1item1item1");
  if(item1.keshi == "宠物美容"){
    myType.value = 1 
  }else{
    myType.value = 0
  }
  axios
    .post("http://localhost:3000/TodayDoc/DocDetail", { userId: item1.docId })
    .then(function (res) {
      // console.log(res,"resresres");
      // myDoc.value = res.data.result[0];
      myDoc.value = {
        docName:res.data.result[0].docName,
        docSex:res.data.result[0].docSex,
        docAge:res.data.result[0].docAge,
        docTel:res.data.result[0].docTel,
        docInform:res.data.result[0].docInform,
        docId:res.data.result[0].docId
      }
      workTime.value = res.data.result1[0]
      console.log(res.data,"resresresres")
    });
  
  axios
    .post("http://localhost:3000/TodayDoc/myPets", {
      userId: LocalCache.getCache("userId"),
    })
    .then((res) => {
      // console.log(res,"myPets")
      myPets.value = res.data.result;
      // console.log(myPets.value, "myPets");
    });
  // console.log(myDoc, "myDocmyDoc");
  table.value = true;
};
onMounted(() => {
  getDocOrder();
  myZhiBan.getToday();
});
</script>
<style scoped>
.eveDay {
  height: 300px;
  width: 1400px;
  /* border: 1px black solid; */
  background-color: #fef9ed;
  box-shadow: 0 0.125rem 0.25rem rgba(var(--bs-body-color-rgb), 0.075) !important;
  border: 1px solid rgba(0, 0, 0, 0.175);
  border-radius: 0.375rem;
  display: flex;
  align-items: center;
  margin-top: 20px;
}
.eveDoc {
  height: 220px;
  width: 200px;
  border-radius: 10px;
  background-color: #fff;
  margin: 20px;
  position: relative;
}
.classGreen {
  width: 20px;
  height: 20px;
  background: #bfa;
  /* margin: 10px; */
  border-radius: 50%;
}
.classGrey {
  width: 20px;
  height: 20px;
  background: grey;
  /* margin: 10px; */
  border-radius: 50%;
}
.myIcon {
  width: 60px;
  height: 60px;
}
.myText {
  background-image: linear-gradient(200deg, #72afd3, #96fbc4);
  background-clip: text;
  color: transparent;
  font-size: 30px;
}
.myOrder {
  display: flex;
  position: absolute;
  bottom: 20px;
  width: 160px;
  justify-content: space-between;
  left: 50%;
  transform: translateX(-50%);
}
.intr {
  width: 100px;
  height: 100px;
  position: fixed;
  bottom: 10px;
  right: 10px;
  animation: myRotate1 1s;
}
.intrHover {
  width: 100px;
  height: 100px;
  position: fixed;
  bottom: 10px;
  right: 10px;
  animation: myRotate 1s;
}
.introduct {
  width: 100px;
  height: 100px;
  position: fixed;
  bottom: 10px;
  right: 10px;
}
@keyframes myRotate {
  from {
    transform: rotateZ(0deg);
  }
  to {
    transform: rotateZ(360deg);
  }
}
@keyframes myRotate1 {
  from {
    transform: rotateZ(360deg);
  }
  to {
    transform: rotateZ(0deg);
  }
}
.DocIdCard {
  width:300px;
  height:400px;
  background-color:grey;
  margin-left:20px;
}
.contain{
  width:80%;
  height:500px;
  background: white;
  margin:20px 20px;
}
.Docs{
  display:flex;
}
.root{
  font-family:"仓耳渔阳体 W04";
  background-color: #fef9ed;
}
</style>
