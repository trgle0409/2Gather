<template>
  <div class="Bio">
    
    <div class="BioText"> 
    <h5 class="bioheader" style="font-size: 1.5rem; text-align: left;">Bio</h5>
     <h3 class="bio-text" id="bio"></h3>
    </div>

  </div>
</template>

<script>
export default {
  props:{
    bioInfo : localStorage.getItem("bio")
  },
  mounted() {
    document.getElementById('bio').innerHTML = this.bioInfo;
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Anybody:ital@0;1&display=swap');

.bio-text {
  padding-bottom: 5%;
}

.Bio {
  padding: 2%;
  padding-left: 5%;
  width: auto;
  /*height: auto;*/
  margin: 0% 5%;
  background: #ffffff;
  box-shadow: 38px 42px 100px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  margin: 5%; 
}
.bioheader{
  /*padding-top: 5%;*/
  /* margin-bottom: 0;*/
  color: #7D3FFF;
}
.BioText {
  /*margin: 1.5rem;*/
  text-align: left;
  /*font-size: 15px;*/
  color: #000;
}

</style>
