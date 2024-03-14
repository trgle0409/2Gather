<template>
    <nav class="nav">
        <RouterLink :to="{name: 'veranstaltungen'}" class="nav__link">
          <i class="material-icons nav__icon">anchor</i>
          <span class="nav__text">Events</span>
      </RouterLink>
        
        <RouterLink :to="{name: 'catchup'}" class="nav__link">
          <i class="material-icons nav__icon">swipe</i>
          <span class="nav__text">CatchUp</span>
      </RouterLink>

      <RouterLink :to="{name: 'chat'}" class="nav__link">
          <i class="material-icons nav__icon">chat</i>
          <span class="nav__text">Chats</span>
      </RouterLink>

      <RouterLink :to="{name: 'profil'}" class="nav__link">
          <i class="material-icons nav__icon">person</i>
          <span class="nav__text">Profile</span>
      </RouterLink>

      
    </nav>
</template>

<script>

</script>

<style scoped>
.nav {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 55px;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
    background-color: hsl(259, 100%, 60%);
    display: flex;
    overflow-x: auto;
    z-index: 1;
}
.nav__link {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
    min-width: 50px;
    overflow: hidden;
    white-space: nowrap;
    font-family: sans-serif;
    font-size: 13px;
    color: white;
    text-decoration: none;
    -webkit-tap-highlight-color: transparent;
    transition: background-color 0.1s ease-in-out;
}
.nav__link:hover{
    background-color: #885de7;
}
.nav__icon{
    font-size: 18px;
}
</style>
