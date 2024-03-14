<template>
  <div class="ProfileView"> 
      <NameBox />
      <BioTeil :bioInfo="showBio()"/>
      <InteressenBox/>
  </div>
  <div>
    <button @click="logout()">Logout</button>
  </div>
</template>

<script>
import NameBox from '../components/Profil/NameBox.vue'
import InteressenBox from '../components/Profil/InteressenBox.vue'
// import NavigationBar from '../components/NavigationBar.vue'
import BioTeil from '../components/Profil/BioTeil.vue'

export default {
  name: 'profil',
  components: {
    NameBox,
    BioTeil,
    InteressenBox,
    // NavigationBar,
  },
  methods: {
    logout() {
      localStorage.removeItem('username');
      localStorage.removeItem('pw');
      localStorage.removeItem('name');
      localStorage.removeItem('email');
      localStorage.removeItem('bio');
      localStorage.removeItem('geburtstag');
      localStorage.removeItem('telefonnr');
      localStorage.removeItem('interessen');
      window.location = "/";
    },
    showBio(){
      return localStorage.getItem('bio')
    }
  },
  created() {
        if(localStorage.getItem("username") == null) {
            window.location = "/";
        }
    }
}
</script>

<style scoped>
.ProfileView {
  display: block;
  background: #ffffff;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  
}
a:link { text-decoration: none;}
a:visited { text-decoration: none; }
a:hover { text-decoration: none; }
a:active { text-decoration: none; }

button {
    background-color: red;
    color: black;
    border-radius: 15px;
    border-color: black;
    margin-left: 40%;
    height: 30px;
    width: 25%;
}
</style>