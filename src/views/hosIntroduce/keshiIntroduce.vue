<template>
    <div>
        科室介绍界面
        <template v-for="(item,index) in keshiInform" :key="index">
            <div class="keshi">
                <span>科室：{{ item.keshi }}</span>
                <div>
                    <span>介绍：{{item.keshi_desc}}</span>
                </div>
            </div>
        </template>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
const keshiInform = ref([])
onMounted(()=>{
    axios.post("http://localhost:3000/keshiMsg").then(res=>{
        keshiInform.value = res.data.result 
        console.log(keshiInform.value)
    })
})
</script>
<style scoped>
.keshi{
    height:300px;
    width:80%;
    background-color: #fff;
    margin:20px 30px;
}
</style>