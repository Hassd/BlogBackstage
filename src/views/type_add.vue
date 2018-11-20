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
            <button @click="increase">增加</button>
        </div>
    </div>
</template>

<script>
import navnav from '@/components/navnav.vue'
import axios from 'axios'
export default {
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
        if(!sessionStorage.adminid){
            this.$router.push('/');
        }
    },
    methods:{
        increase(){
            if(this.typename!=''&&this.typeclass!=''&&this.typeintr!=''){
                axios.get('http://39.108.13.166:3000/typeadd',{
                    params:{
                        typename:this.typename,
                        typeclass:this.typeclass,
                        typeintr:this.typeintr
                    }
                }).then((data)=>{
                    if(data.data){
                        this.$router.push('/type_query');
                    }
                }).catch(()=>{
                    console.log('获取失败');
                })
            }else{
                alert('请填上所有的信息，不能留空！')
            }
            
        }
    }
}
</script>
