<template>
    <div>
        <!-- 三级联动，不用再引入 -->
         <TypeNav/>
         <ListContainer/>
         <Recommend/>
         <Rank/>
         <Like/>
         <Floor v-for="(floor,index) in floorList" :key="floor.id" :list="floor"/>
         <!-- floor组件要用 -->
         <Brand/>
    </div>
</template>

<script>
import ListContainer from '@/pages/Home/ListContainer'
import Recommend from '@/pages/Home/Recommend'
import Rank from '@/pages/Home/Rank'
import Like from '@/pages/Home/Like'
import Floor from '@/pages/Home/Floor'
import Brand from '@/pages/Home/Brand'
import { mapState } from 'vuex'
    export default {
        name:'',
        components:{ListContainer,Recommend,Rank,Like,Floor,Brand },
        mounted(){
            //派发action，获得floor的数据
            this.$store.dispatch('getFloorList')
            this.$store.dispatch('getUserInfo')
        },
        computed:{
            ...mapState({
                floorList:(state)=>state.home.floorList
            })
        }
    }
</script>

<style scoped>

</style>