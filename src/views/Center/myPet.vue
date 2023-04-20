<template>
  <div class="root">
    <div class="main">
      <el-tabs
      v-model="activeName"
      type="card"
      class="demo-tabs"
      @edit="handleTabsEdit"
      editable
      v-show="myPets.length != 0"
    >
      <template v-for="(item, index) in myPets" :key="index">
        <el-tab-pane
          :label="item.newPet ? item.tabName : item.petName"
          :name="index"
          >
          <div v-show="!item.newPet">
            <img :src="item.petImg || undefined" class="pteImg" />
            <div>姓名：{{ item.petName }}</div>
            <div>性别：{{ item.petSex == "0" ? "男" : "女" }}</div>
            <div>品种：{{ item.petType }}</div>
            <div>年龄：{{ item.petAge }} 岁</div>
            <div>描述：{{ item.petInform }}</div>
            <div>病例：{{ item.petCase }}</div>
          </div>
          <div v-show="item.newPet">
            <el-form :model="form" label-width="120px">
              <el-form-item label="姓名">
                <el-input v-model="form.petName"></el-input>
              </el-form-item>
              <el-form-item label="性别">
                <el-input v-model="form.petSex"></el-input>
              </el-form-item>
              <el-form-item label="品种">
                <el-input v-model="form.petType"></el-input>
              </el-form-item>
              <el-form-item label="年龄">
                <el-input v-model="form.petAge"></el-input>
              </el-form-item>
              <el-form-item label="描述">
                <el-input v-model="form.petInform"></el-input>
              </el-form-item>
              <el-form-item label="病例">
                <el-input v-model="form.petCase"></el-input>
              </el-form-item>
              <el-form-item label="上传图片">
                <!-- <uploadImg/> -->
                <el-upload
                  class="avatar-uploader"
                  action="https://www.hualigs.cn/api/upload"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                  :data="myApiType"
                >
                  <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                  <el-icon v-else class="avatar-uploader-icon"
                    ><Plus
                  /></el-icon>
                </el-upload>
              </el-form-item>
              <el-button @click="addInmysql">保存</el-button>
            </el-form>
          </div>
        </el-tab-pane>
      </template>
    </el-tabs>
    </div>
    <button @click="hhhh" v-show="myPets.length == 0">添加我的宠物</button>
  </div>
</template>
<script lang="ts" setup>
import axios from "axios";
import LocalCache from "@/utils/cache";
import { ElMessage, ElMessageBox } from "element-plus";
import { computed, onMounted, reactive, ref } from "vue";
import uploadImg from "@/components/upLoadImg";
import { Plus } from "@element-plus/icons-vue";
import type { UploadProps } from "element-plus";
const imageUrl = ref("");
let activeName = 0;
const handleClick = () => {
  console.log(123);
};
interface myRule {
  masterId: number | null;
  petAge: string | null;
  petCase: string | null;
  petId: number | null;
  petImg: string | null;
  petInform: string | null;
  petName: string | null;
  petSex: string | null;
  petType: string | null;
  newPet?: boolean | null;
  tabName?: string | null;
}
const form: myRule = reactive({
  masterId: LocalCache.getCache("userId"),
  petAge: null,
  petCase: null,
  petId: null,
  petImg: null,
  petInform: null,
  petName: null,
  petSex: null,
  petType: null,
  newPet: true,
  tabName: "新的宠物",
});
const myApiType = ref({ 
  apiType: "chaoneng",
  privateStorage:"chaoneng",
  token: "da46f0c79b9f21210481f6c453a50942",
  image:{}
});
// onMounted(() => {
axios
  .post("http://localhost:3000/center/getMyPets", {
    userId: LocalCache.getCache("userId"),
  })
  .then((res) => {
    myPets.value = res.data.result1;
  });
// });
import usePet from "@/store/center";
const hhh = usePet();
const myPets = ref<Array<myRule>>([]);
const addInmysql = () => {
  // 保存回调函数
  axios.post("http://localhost:3000/center/addNewPet", form).then(() => {
    axios
      .post("http://localhost:3000/center/getMyPets", {
        userId: LocalCache.getCache("userId"),
      })
      .then((res) => {
        myPets.value = res.data.result1;
        form.masterId = LocalCache.getCache("userId");
        form.petAge = null;
        form.petCase = null;
        form.petId = null;
        form.petImg = null;
        form.petInform = null;
        form.petName = null;
        form.petSex = null;
        form.petType = null;
        form.newPet = true;
        form.tabName = "新的宠物";
      });
    // activeName = form.tabName
  });
};
const handleTabsEdit = (targetName: string, action: "remove" | "add") => {
  if (action === "add") {
    let index = myPets.value.length;
    console.log(index, "indexindexindex");
    if (
      myPets.value[index - 1].newPet !== undefined &&
      myPets.value[index - 1].newPet == true
    ) {
      ElMessageBox.confirm("请先保存", "警告", {
        confirmButtonText: "确 认",
        // cancelButtonText: "取 消",
        type: "warning",
      });
    } else {
      myPets.value.push(form);
      let tabIndex = myPets.value.length;
      activeName = tabIndex;
    }
  } else if (action === "remove") {
    // console.log(targetName,"targetNametargetName")
    let index = Number(targetName);
    if (myPets.value[index].newPet == true) {
      // 为true代表这个数据还未加入数据库
      ElMessageBox.confirm("确认要删除这个宠物吗", "警告", {
        confirmButtonText: "确 认",
        cancelButtonText: "取 消",
        type: "warning",
      })
        .then(() => {
          myPets.value.splice(index, 1);
          form.masterId = LocalCache.getCache("userId");
          form.petAge = null;
          form.petCase = null;
          form.petId = null;
          form.petImg = null;
          form.petInform = null;
          form.petName = null;
          form.petSex = null;
          form.petType = null;
          form.newPet = true;
          form.tabName = "新的宠物";
          ElMessage({
            type: "success",
            message: "删除成功",
          });
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "取消删除",
          });
        });
    } else {
      ElMessageBox.confirm("确认要删除这个宠物吗", "警告", {
        confirmButtonText: "确 认",
        cancelButtonText: "取 消",
        type: "warning",
      })
        .then(() => {
          // console.log(myPets.value[index].petId, "lllllllllllll");
          axios
            .post("http://localhost:3000/center/deleteNewPet", {
              petId: myPets.value[index].petId,
            })
            .then((res) => {
              axios;
              axios
                .post("http://localhost:3000/center/getMyPets", {
                  userId: LocalCache.getCache("userId"),
                })
                .then((res) => {
                  myPets.value = res.data.result1;
                });
              ElMessage({
                type: "success",
                message: "删除成功",
              });
            });
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "取消删除",
          });
        });
    }
  }
};
const hhhh = () => {
  myPets.value.push(form);
};
const handleAvatarSuccess: UploadProps["onSuccess"] = (
  response,
  uploadFile
) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!);
  // console.log(imageUrl.value,"11111111111111")
  // console.log(response,"response")
  form.petImg = response.data.url.chaoneng
};

const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
  if (rawFile.type !== "image/jpeg" && rawFile.type !== "image/png") {
    ElMessage.error("Avatar picture must be JPG format!");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("Avatar picture size can not exceed 2MB!");
    return false;
  }
  // console.log(rawFile,"rawFile~~~~")
  myApiType.value.image = rawFile
  return true;
};
</script>
<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
.main{
  margin:30px 0 0 30px;
  width:80%;
  height:80%;
}
.root{
  width:100%;
  height:100%;
}
</style>
