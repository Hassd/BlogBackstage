<template>
    <div class="paging" v-if="edata>1">
        <button :class="numtxt==0 ? 'paging-disable':'paging-giveup'" @click="pagingup">上一页</button>
        <ul v-for="(itme,index) in edata" :key="index">
            <li :class="numtxt==index ? 'paging-select':'' " @click="clickli(index)">{{index+1}}</li>
        </ul>
        <button :class="numtxt==edata-1 ? 'paging-disable':'paging-giveup'" @click="paginglower">下一页</button>
        <span>{{edata}}</span>
        <span>页</span>
        <div class="paging-inpu">
            <input type="text" v-model="texttxt" min="1" @keyup.enter="Jump" :max="edata">
            <label>页</label>
            <button @click="Jump">跳转</button>
        </div>
    </div>
</template>

<script>
export default {
    props:['edata'],
    data(){
        return{
            numtxt:'',
            texttxt:''
        }
    },
    methods:{
        pagingup(){
            if(this.numtxt<1){
                this.numtxt=0;
            }else{
                this.numtxt--;
            }
            this.$emit('change',this.numtxt);
        },
        paginglower(){
            if(this.numtxt>this.edata-2){
                this.numtxt=this.edata-1;
            }else{
                this.numtxt++;
            }
            this.$emit('change',this.numtxt);
        },
        clickli(data){
            this.numtxt=data;
            this.$emit('change',this.numtxt);
        },
        Jump(){
            if(this.texttxt==''){
                this.texttxt=1;
            }else if(this.texttxt>this.edata){
                this.texttxt=this.edata;
            }else if(this.texttxt<1){
                this.texttxt=1;
            }
            this.numtxt=this.texttxt-1;
            this.$emit('change',this.numtxt);
        }
    }
}
</script>

<style>
.paging{margin: 20px 0;width: 100%;}
.paging::after{content: '';height: 0; display: block;clear: both;}
.paging button{border: 0;outline: none; cursor: pointer;padding: 5px 10px;display: block;float: left;background-color: #409EFF;color: #fff;border-radius: 8px;}
.paging ul{float: left;}
.paging li{float: left;cursor: pointer;padding: 5px 5px;margin:0 2px;color: #555;list-style: none;}
.paging li:hover{background-color: #eee;}
.paging span{display: block;float: left;font-size: 14px;padding: 5px 0px;margin-left: 10px;}
.paging-inpu{float: left;margin-left: 10px;line-height: 25px;}
.paging-inpu input{width: 40px;height: 20px;text-indent: 5px;float: left;margin-top: 2px;}
.paging-inpu label{font-size: 14px;margin:0 10px;float: left;}
.paging-select{background-color: #eee !important;}
.paging-disable{background-color: #eee !important;cursor: not-allowed !important;color: #555 !important;} 
.paging-giveup{background-color: #409EFF !important;color: #fff !important;}
.paging-inpu button{transition: all 0.3s;float: left !important;}
.paging-inpu button:hover{background-color: #5454E5;}
</style>
