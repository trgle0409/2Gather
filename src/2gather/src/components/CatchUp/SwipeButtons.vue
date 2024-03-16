<template>
    <div class="Buttons">
        <div class="SkipButton">
            <input type="image" name="SkipButton" src="../../public/Icons/SkipButton.png" alt="Skip">
        </div>
        <div class="LikeButton">
            <input type="image" name="LikeButton" src="../../public/Icons/LikeButton.png" alt="Like">
        </div>
    </div>

</template>

<script>
    export default{

    }
</script>

<style>

.Buttons {
    margin-left: auto;
    width: 85%;
    height: auto;
}

.SkipButton {

        position: absolute;
        
    }

.LikeButton {
        margin-left: 150px;
        position: absolute;
        
    }

input[type=image] {

    height: 80px;
    margin-left: 40px;
    margin-right: 40px;
    left: 0;
    bottom: 0;
    position: relative;

}

</style>