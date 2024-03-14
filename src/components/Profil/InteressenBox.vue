<script>
import Intere from './Interesse.vue'

export default {
  data(){
    return {
      interessen: Array
    }
  },
  components :{
    Intere
  },
  mounted(){
    var interessen = localStorage.getItem("interessen")
    if(interessen == null) {
      this.interessen = ""
    } else {
      this.interessen = interessen.split(',')
    }
  }
}
</script>


<template>
  <div class="Board" style="">
    <h5 style="">Interessen</h5>
    <br>
    <div class="ButtonList" id="interessenList" style="" v-for="interesse in interessen">
      <Intere :text="interesse"></Intere>
    </div>
  </div>
</template>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Anybody:ital@0;1&display=swap');

.Board {
  text-align: center;
  /*justify-content: center;*/

  height: auto;
  margin: 0 5%;
  padding: 3% 0;
  background: #ffffff;
  box-shadow: 38px 42px 100px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  margin-bottom: 7%;
  display: flex;
  flex-wrap: wrap;
}

h5 {
  margin-right: 800rem;
  font-size: 1.5rem;
  color: #7d3fff;
  /*padding: 3%;*/
  padding-left: 5.6%;
  text-align: left;
  /*margin-bottom: 1rem;*/
}

.ButtonList{
  justify-content: center;
  /*height: 10rem;*/
  /*position: relative;*/
  display: flex;
  flex-wrap: wrap;
  margin: 3%;
}

</style>

