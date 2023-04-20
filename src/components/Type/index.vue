<template>
  <div>
    <h1>
      <span v-for="(letter, index) in words" :key="index">{{ letter }}</span>
      <span :class="{ typercursor: showcur === true }">|</span>
    </h1>
  </div>
</template>

<script lang="ts" setup>
import {ref,getCurrentInstance,ComponentInternalInstance,onMounted,defineProps,toRefs} from 'vue'
const words = ref([]as string[])
const letters = ref([] as string[])
const showcur = ref(false)
const typerStr = ref('')
const order = ref(0)
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
onMounted(()=>{
  begin();
})
const props = defineProps<{str:string}>();
const {str} = toRefs(props);
const begin = ()=>{
        typerStr.value=str.value[order.value]
        letters.value=typerStr.value.split('');
        for(var i=0;i<letters.value.length;i++){
          setTimeout(write(i),i*200)
        }
    }
    const back = ()=>{
      let L=letters.value.length;
      for(let i=0;i<L;i++){
        setTimeout(wipe(i),i*100)
      }
    }
    const write = (i:number)=>{
      return ()=>{
        let L=letters.value.length;
        words.value.push(letters.value[i]);
        let that=proxy;
        // if(i==L-1){
        //   showcur.value=true;
        //   setTimeout(function(){
        //     showcur.value=false;
        //     back();
        //   },1000)
        // }
      }
    }
     const wipe = (i:number)=>{
      return ()=>{
          words.value.pop()
          /*如果删除完毕，在300ms后开始输入*/
          if(words.value.length==0){
            if(order.value<str.value.length-1){
              order.value++;
              console.log(order.value,"cccc")
            }else{
              order.value=0;
              console.log(order.value,"ffff")
            }
             setTimeout(function(){
               begin();
             },500);
          }
      }
    }

</script>

<style scoped>
h1 {
  color: whitesmoke;
  font-size: 50px;
  margin-top: 200px;
}
.typercursor {
  opacity: 0;
  animation: show 1s linear;
  animation-iteration-count: 1;
}
@keyframes show {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
