.
<template>
  <div class="root">
    <el-button @click="openTable" style="width:200px;height:60px">添加请假</el-button>
    <el-card class="myCard">
      <el-table :data="qingjiaForm" border>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="keshi" label="科室"></el-table-column>
        <el-table-column prop="time" label="请假时间"></el-table-column>
        <el-table-column prop="detail" label="详细理由"></el-table-column>
        <el-table-column prop="type" label="请假类型"></el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
        <el-table-column label="操作" width="180">
          <template #default="scope">
            <el-button type="danger" @click="delete_user(scope.row.id)">
              <el-icon><Delete /></el-icon>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.page_num"
        :page-sizes="[5, 8, 10, 15]"
        :page-size="queryInfo.page_size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <el-drawer
      v-model="table"
      title="新的请假"
      direction="rtl"
      size="40%"
      :before-close="handleClose"
    >
      <div class="block">
        <span class="demonstration">请假时间</span>
        <el-date-picker
          v-model="value1"
          type="datetimerange"
          range-separator="To"
          start-placeholder="Start date"
          end-placeholder="End date"
          @change="selectQJTime"
          value-format="YYYY-MM-DD hh:mm:ss"
          :disabledDate="disabledDateFn"
        />
      </div>
      <div>
        <el-radio-group v-model="submitValue.type" class="ml-4">
          <el-radio label="病假" size="large">病假</el-radio>
          <el-radio label="事假" size="large">事假</el-radio>
        </el-radio-group>
      </div>
      <div>
        <span>具体时间</span>
        <el-input
          v-model="submitValue.detail"
          :rows="2"
          type="textarea"
          placeholder="Please input"
        />
      </div>

      <el-button @click="submitQJ">提交</el-button>
    </el-drawer>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, reactive, toRefs } from "vue";
import axios from "axios";
import mySession from "@/utils/cache";
import { ElMessage, ElMessageBox } from "element-plus";
const table = ref(false);
const radio1 = ref("bing");
const submitValue = ref({
  time: "2023-04-20 00:00:00~2023-04-21 00:00:00",
  keshi: "",
  name: "",
  docId: mySession.getCache("docId"),
  detail: "",
  type: "",
  status:"待批准"
});
const data = reactive({
  // 分页的请求参数
  queryInfo: {
    page_num: 1, //当前的页码
    page_size: 5, //每页显示的条数
    docId: mySession.getCache("docId"),
  },
  total: 0,
  qingjiaForm: [
    {
      name: "",
      keshi: "",
      type: "",
      time: "",
      datail: "",
      sataus: "",
      id:0
    },
  ],
});
const { queryInfo, total, qingjiaForm } = toRefs(data);
const openTable = () => {
  // 抽屉打开
  table.value = true;
};
const submitQJ = () => {
  // 提交
  // console.log(submitValue.value)
  ElMessageBox.alert("确定要提交吗", "警告", {
    confirmButtonText: "确定",
    type: "warning",
  }).then(() => {
    axios
      .post("http://localhost:3000/dkAndqj/insertQJ", submitValue.value)
      .then((res) => {
        ElMessage({
          type: "success",
          message: "添加成功",
        });
        getlist()
      });
    submitValue.value.detail = "",
    submitValue.value.type = "",
    value1.value = null;
    table.value = false;
  });
};
const value1 = ref(["2023-4-20 00:00:00", "2023-4-21 00:00:00"]);
const selectQJTime = () => {
  // 请假时间
  // console.log(value1.value, "value1value1");
  if (value1.value !== null) {
    let myTime = value1.value[0] + "~" + value1.value[1];
    submitValue.value.time = myTime;
    // console.log(myTime,"qqqq")
  }
};
const disabledDateFn = (time: any) => {
  return time.getTime() < Date.now();
};
const handleClose = () => {
  submitValue.value.detail = "",
  submitValue.value.type = "",
  value1.value = null;
  table.value = false;
};
// 取消请假
const delete_user = async (id) => {
  ElMessageBox.confirm("确认要撤销请假申请吗?", "提示", {
    distinguishCancelAndClose: true,
    confirmButtonText: "确 认",
    cancelButtonText: "取 消",
  }).then(() => {
    // 删除内容
    axios
      .post("http://localhost:3000/dkAndqj/deleteQJ", {
        id,
      })
      .then(() => {
        ElMessage({
          type: "info",
          message: "撤销成功",
        });
        getlist();
      });
  });
};
const getlist = async () => {
  axios
    .post("http://localhost:3000/dkAndqj/selectQJ", queryInfo.value)
    .then((res) => {
      console.log(res,"llll");
      qingjiaForm.value = res.data.data;
      total.value = res.data.paging.total;
    });
  // console.log("this is myOrder")
  // let { data: res } = await axios.post(
  //   "http://localhost:3000/center/getDocOrder",
  //   queryInfo.value
  // );
  // orderForm.value = res.data;

};
// 监听pagesize  每页显示的条数的改变
const handleSizeChange = (newSizes: any) => {
  //给原来变量重新赋值
  queryInfo.value.page_size = newSizes;
  //每改变一次重新请求获取新的数据渲染
  getlist();
};
// 监听当前页码值的改变
const handleCurrentChange = (newPages: any) => {
  queryInfo.value.page_num = newPages;
  getlist();
};
onMounted(() => {
  axios
    .post("http://localhost:3000/dkAndqj/selectDoc", {
      docId: mySession.getCache("docId"),
    })
    .then((res) => {
      console.log(res);
      submitValue.value.keshi = res.data.res[0].keshi;
      submitValue.value.name = res.data.res[0].docName;
    });
  getlist();
});
</script>
<style scoped>
.is-selected {
  color: #1989fa;
}
.block {
  display: flex;
  padding: 30px 20px;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  flex: 1;
  width: 90%;
  justify-content: space-around;
}
.block:last-child {
  border-right: none;
}
.block .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
  margin-right: 30px;
}
.myCard{
  width:85%;
}
.root{
  width:90vw;
  display: flex;
  flex-direction: column;
}
</style>
