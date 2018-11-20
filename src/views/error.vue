<template>
    <div class="error">
        <h1>404</h1>
        <h1>页面不存在!</h1>
        <h3><router-link to="/Article_query">返回首页</router-link></h3>
    </div>
</template>
<style>
.error{
    width: 300px;
    height: 200px;
    color: #555;
    text-align: center;
    position: fixed;
    top: 50%;
    left: 50%;
    margin-left: -150px;
    margin-top: -100px;
}
</style>
