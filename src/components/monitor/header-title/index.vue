<template>
    <div class="header-title">
        <div class="header-box">
            <h2>自助充电平台</h2>
            <div class="sub-title">zizhuchogndianpingtai</div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
    .header-title {
        margin-top: 2vh;
        display: flex;
        justify-content: center;
        .header-box {
            text-align: center;
            font-family: MyFontName;
            // background: linear-gradient(to right,#bedee7 #00b4ff);
            // -webkit-background-clip: text;
            // -webkit-text-fill-color: transparent;
            // color: transparent;
             background: linear-gradient(to right, #bedee7, #00b4ff);
            -webkit-background-clip: text;
             color: transparent;
        }
        h2 {
            font-size: 28px;
        }
        .sub-title {
            margin-top: 5px;
            font-size: 18px;
            font-weight: bold;
        }
    }
    @media screen and (max-width: 1400px){
        .header-title {
            h2 {
                font-size: 26px;
            }
            .sub-title {
                margin-top: 4px;
                font-size: 16px;
            }
        }
    }
</style>