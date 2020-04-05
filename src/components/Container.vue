<template>
 <div>
     <div class="body">
        <div class="dot-list">
            <div class="red dot"></div>
            <div class="yellow dot"></div>
            <div class="green dot"></div>
        </div>
        <slot></slot>
     </div>
 </div> 
</template>

<script>
export default {

}
</script>

<style scoped>
    .body{
        border-radius: 5px;
        background: rgb(40, 50, 56);
        color:white;
        padding: 20px 20px 20px 20px;
    }
    .dot{
        width: 18px;
        height: 18px;
        border-radius: 50%;
    }
    .dot-list{
        display: flex;
        width: 100px; 
        justify-content: space-around;
        padding-bottom: 20px;
    }
    .green{
        background: rgb(98, 197, 84);
    }
    .yellow{
        background: rgb(246, 191, 80);
    }
    .red{
        background: rgb(237, 106, 94);
    }
</style>
