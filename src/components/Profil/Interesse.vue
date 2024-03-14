<template>
    <a  class="interesse"><p>{{text}}</p></a>
</template>

<script >
export default {
    props : {
        bild: String,
        text: String,
    },
}
</script>

<style scoped>
.interesse {
  padding: 0.3rem;
  text-align: center;
  /*height: 25%;*/
  /*font-size: small;*/
  font-weight: bolder;
  background: #f4f4f4;
  border-radius: 55px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  /*color: #141313;*/
  text-decoration: none;
  color: inherit; 
  padding-left: 0.8rem; 
}
</style>
