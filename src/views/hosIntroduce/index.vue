<template>
  <div class="root">
    <el-carousel :interval="4000" type="card" height="400px" style="width:1500px;">
      <el-carousel-item v-for="item in hosImg" :key="item">
        <img :src="item.value" style="width:750px;height:400px;"/>
      </el-carousel-item>
    </el-carousel>
    <div class="main">
        <div>
                <span>功能介绍</span>
                <div class="function">
                        <router-link to="/keshiIntroduce" class="introduce">科室介绍</router-link>
                        <router-link to="/docIntroduce" class="introduce">医生介绍</router-link>
                        <router-link to="/envIntroduce" class="introduce">环境设备</router-link>
                </div>
        </div>
        <div>
                <span>医院简介</span>
                <div>{{ hosInform.introduce }}</div>
                <div>联系电话：{{ hosInform.tel }}</div>
                <div>地址：{{ hosInform.address }}</div>
        </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref,onMounted } from 'vue'
import axios from 'axios'
const hosInform = ref({
        introduce:"",
        tel:"",
        address:""
})
const hosImg = ref([
        {
                value:"https://www.hualigs.cn/image/643baab12f70d.jpg"
        },
        {
                value:"https://www.hualigs.cn/image/643bab0ed1725.jpg"
        },
        {
                value:"https://www.hualigs.cn/image/643bab38bedbc.jpg"
        },
        {
                value:"https://www.hualigs.cn/image/643bab5dc4e83.jpg"
        },
        {
                value:"https://www.hualigs.cn/image/643bab6640d35.jpg"
        }
])
onMounted(()=>{
        axios.post("http://localhost:3000/hosMsg").then((res)=>{
                hosInform.value = res.data.result[0]
                console.log(hosInform.value)
        })
})
</script>
<style scoped>
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.function{
        display: flex;
        width:80%;
        justify-content: space-between;
}
.introduce{
        height:200px;
        width:300px;
        background: white;
}
.root{
        height:calc(100vh - 60px);
        display: flex;
        flex-direction: column;
        align-items: center;
}
a{
        text-decoration: none;
        color:black
}
.main{
        width:1500px;
}
</style>
