<template>
  <div class="label">
    <div class="Name">
      <h4>Name:</h4>
      <h4 class="UserName" id="user"></h4>
    </div>
    <div class="Geburtstag">
      <h4>Geburtstag:</h4>
      <h4 class="Gbrts_Datum" id="geboren"></h4>
    </div>
  </div>
</template>

<script>

export default {
  mounted() {
    document.getElementById('user').innerHTML = localStorage.getItem("username");
    document.getElementById('geboren').innerHTML = localStorage.getItem("geburtstag");
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Anybody:ital@0;1&display=swap");
.label {
  /*text-align: left;*/
  /*justify-content: center;*/
  /*width: auto;*/
  /*height: auto;*/
  margin: 2% 5%;
  padding: 3%;
  padding-bottom: 6%;
  /*background: #ffffff;*/
  box-shadow: 38px 42px 100px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
}
.Name {
  text-align: left;
  margin: 0rem;
  padding-left: 2.5%;
  height: 3rem;
  width: 10rem;
  font-weight: bolder;
  font-size: 1.5rem;
  
  /*font-style: italic;*/
  /*font-family: "Anybody";*/
  color: #7d3fff;
}
.UserName {
  font-family: "Anybody";
  font-style: italic;
  font-weight: bolder;
  font-size: 1.8rem;
  color: black;
}
.Geburtstag {
  text-align: left;
  padding-left: 2.5%;
  padding-top: 3%;
  height: 3rem;
  width: 10rem;
  font-weight: bolder;
  font-size: 1.5rem;
  /*font-style: italic;*/
  /*font-family: "Anybody";*/
  color: #7d3fff;
}
.Gbrts_Datum {
  padding-bottom: 10%;
  font-size: 1.8rem;
  font-family: "Anybody";
  font-style: italic;
  color:black;
}
</style>
