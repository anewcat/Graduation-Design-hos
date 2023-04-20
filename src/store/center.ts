import { defineStore } from 'pinia'
const usePets = defineStore('pets',{
    state:()=>({
        myPets:[]
    })
})
export default usePets