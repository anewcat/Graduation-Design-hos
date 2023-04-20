<template>
  <div class="root">
    <br />
    <div class="box">
      <h1 style="">医院环境设备</h1>
    </div>
    <div class="cont">
      <br />
      <div style="color: #404040; text-align: center">
        <h3>hospital environment</h3>
        <h4>医院环境</h4>
      </div>
      <div class="env">
        <p>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;这里的医院依照国际动物医院标准和理念全部新的装修，以高端优雅的治疗环境，高效严谨的服务体系和高标准的医疗技术服务于每一位宠物和宠主
        </p>
        <el-carousel height="500px" style="width:80%;">
          <el-carousel-item v-for="image in images" :key="image.id">
            <div class="swiper">
              <span>{{ image.text }}</span>
              <img :src="image.url" />
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <br />
    <div class="cont">
      <br />
      <div style="color: #404040; text-align: center">
        <h3>equipment introduction</h3>
        <h4>设备环境</h4>
      </div>
      <div class="env">
        <p>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;宠物医院引进国际先进的医疗设备，如RMI核磁共振、CT脑电图断层扫描、德国Moller显微镜、呼吸麻醉机等，还配备多个诊疗室
        </p>
        <el-carousel height="500px" style="width:80%;">
          <el-carousel-item v-for="image in equipment" :key="image">
            <img :src="image"/>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <div class="bottom">
      <div>
        <img src="@/assets/7.jpg" class="botImg"><br/>
        <span>手术室环境</span>
      </div>
      <div>
        <img src="@/assets/4.jpg" class="botImg"><br/>
        <span>显微镜</span>
      </div>
      <div>
        <img src="@/assets/9.jpg" class="botImg"><br/>
        <span>B超</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs } from "vue";
const data = reactive({
  images: [
    {
      id: 1,
      url: "https://www.hualigs.cn/image/643bbd0cc8530.jpg",
      text: "安静整洁的诊疗室",
    },
    {
      id: 2,
      url: "https://www.hualigs.cn/image/643bbd22c7b72.jpg",
      text: "舒适的诊疗环境",
    },
    {
      id: 3,
      url: "https://www.hualigs.cn/image/643bbd3604771.jpg",
      text: "先进的设备",
    },
  ],
  equipment: [
    "https://www.hualigs.cn/image/643be2b1ade90.jpg",
    "https://www.hualigs.cn/image/643be2c971272.jpg",
    "https://www.hualigs.cn/image/643be2e09ce8d.jpg",
    "https://www.hualigs.cn/image/643be2f61f7d5.jpg",
    "https://www.hualigs.cn/image/643be30dbf3f4.jpg",
    "https://www.hualigs.cn/image/643be32055f3a.jpg",
    "https://www.hualigs.cn/image/643be32055f3a.jpg",
  ],

  list: [
    {
      id: 1,
      photo: "../assets/1.jpg",
      text: "挂钩法怒放",
    },
    {
      id: 2,
      photo: "photo-o",
      text: "螯合钙就覅发",
    },
    {
      id: 3,
      photo: "photo-o",
      text: "爱发飙安监部覅阿奶",
    },
  ],
});
const { images, equipment, list } = toRefs(data);
</script>

<style scoped>
.box {
  height: 200px;
  width: 100%;
  /* background: url(../assets/2.png) no-repeat; */
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

h1 {
  margin: auto;
  color: #ffffff;
}
.swiper{
    display: flex;
    flex-direction: column;
}
.root{
    display: flex;
    flex-direction:column;
    align-items: center;
}
.env{
    padding: 10px; 
    margin-top: -20px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.bottom{
  display: flex;
  height:400px;
  padding:50px 0;
  width:70%;
  justify-content: space-between;
}
.botImg{
  width:200px;
  height:200px;
  margin:0 30px;
}
</style>
