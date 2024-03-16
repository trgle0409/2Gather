<template>
  <div class="box-container">
    <img
      :src="link"
      height="250" width=""
      :alt="pictureAlt"
      style="border-radius: 20px; margin-bottom: 20px;"
    />
    <div class="image-text">
      {{ description }}
      <h4>{{ name }}</h4>
      <div class="Button">
        <button id="btn" @click="redirect()" style="background-color: white; border-radius: 20px">Mehr Sehen</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    link: String,
    pictureAlt: String,
    name: String,
    description: String,
    reference: String,
  },
  methods: {
    redirect() {
      window.location = this.reference;
    }
  }
};
</script>

<style scoped>
.box-container:hover {
  transform: scale(1.2);
  overflow-x: hidden;
  overflow-y: hidden;
}

.btn:hover {
  transform: scale(1.2);
  overflow-x: hidden;
  overflow-y: hidden;
}

.box-container {
  position: relative;
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* filter: drop-shadow(38px 42px 100px rgba(0, 0, 0, 0.3)); */
  border-radius: 20px;
}

.image-text {
  position: absolute;
  left: 49%;
  top: 60%;
  transform: translate(-75%, 10%);
  color: white;
  justify-content: left;
  align-items: left;
  /* filter: drop-shadow(38px 42px 100px rgba(0, 0, 0, 0.25)); */
}
</style>
