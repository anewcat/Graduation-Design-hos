<template>
  <div class="root">
    <el-card class="myCard">
      <el-table :data="orderForm" border>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="docName" label="医生姓名"></el-table-column>
        <el-table-column prop="petName" label="宠物"></el-table-column>
        <el-table-column prop="orderType" label="预约类型"></el-table-column>
        <el-table-column prop="orderTime" label="日期"></el-table-column>
        <el-table-column prop="detailTime" label="具体时间"></el-table-column>
        <el-table-column prop="docAnswer" label="诊断结果"></el-table-column>
        <el-table-column label="操作" width="180">
          <template #default="scope">
            <el-button type="danger" @click="delete_user(scope.row.orderId)">
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

  </div>
</template>

<script lang="ts" setup>
import {
  reactive,
  toRefs,
  onMounted,
} from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import type { Action } from "element-plus";
import axios from "axios";
import LocalCache from "@/utils/cache";
// const usersList = ref([]);
const data = reactive({
  // 分页的请求参数
  queryInfo: {
    page_num: 1, //当前的页码
    page_size: 5, //每页显示的条数
    userId:LocalCache.getCache("userId")
  },
  total: 0,
  orderForm:[{
    docName:"",
    petName:"",
    orderTime:"",
    detailTime:"",
    docAnswer:"",
    orderType:""
  }]
});
const {
  queryInfo,
  total,
  orderForm
} = toRefs(data);
// const { proxy } = getCurrentInstance();
const getlist = async () => {
  // console.log("this is myOrder")
  let { data: res } = await axios.post(
    "http://localhost:3000/center/getMyOrder",
    queryInfo.value
  );
  orderForm.value = res.data
  total.value = res.paging.total;
};
// 取消预约
const delete_user = async (orderId) => {
  ElMessageBox.confirm("确认要取消该预约吗?", "提示", {
    distinguishCancelAndClose: true,
    confirmButtonText: "确 认",
    cancelButtonText: "取 消",
  })
    .then(() => {
      // 删除内容
      axios
        .post("http://localhost:3000/center/deleteorder", {
          orderId
        })
        .then(() => {
          ElMessage({
            type: "info",
            message: "取消成功",
          });
          getlist();
        });
    })
    .catch((action: Action) => {
      // 取消删除
    });
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
  getlist();
});
</script>

<style scoped>
.root{
  width:100%;
  height:100%;
}
.myCard{
  width:95%;
  height:95%;
  margin-top:30px;
}
</style>
