<template>
    <div class="main">
        <navnav></navnav>
        <div class="main-title"><h4>增加类型</h4></div>
        <div class="main-input">
            <label for="title">类型标题：</label>
            <input type="text" id="title" v-model="typename">
        </div>
        <div class="main-input">
            <label for="select">哪个大类：</label>
            <select id="select" v-model="typeclass">
                <option value="学习笔记">学习笔记</option>
                <option value="生活趣事">生活趣事</option>
            </select>
        </div>
        <div class="main-input">
            <label for="introduce">类型介绍：</label>
            <textarea id="introduce" v-model="typeintr"></textarea>
        </div>
        <div class="main-input">
            <label></label>
            <button @click="modify">修改</button>
        </div>
    </div>
</template>

<script>
import navnav from '@/components/navnav.vue'
import axios from 'axios'
export default {
    inject:['reload'],
    data(){
        return{
            typename:'',
            typeclass:'',
            typeintr:''
        }
    },
    components:{
        navnav
    },
    mounted(){
        axios.get('http://39.108.13.166:3000/typeOne',{
            params:{
                _id:this.$route.params.id
            }
        }).then((data)=>{
            this.typename=data.data.typename;
            this.typeclass=data.data.typeclass;
            this.typeintr=data.data.typeintr;
        }).catch(()=>{
            this.reload()
        })

        if(!sessionStorage.adminid){
            this.$router.push('/');
        }
    },
    methods:{
        modify(){
            axios.get('http://39.108.13.166:3000/typeup',{
                params:{
                    _id:this.$route.params.id,
                    typename:this.typename,
                    typeclass:this.typeclass,
                    typeintr:this.typeintr
                }
            }).then((data)=>{
                if(data.data){
                    this.$router.push('/type_query');
                }
            }).catch(()=>{
                this.reload()
            })
        }
    }
}
</script>

<style>

</style>
