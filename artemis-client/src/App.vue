<template>
  <div class="app__container">
    <div class="top__navigation container">
      <div class="logo">
        <img src="@/assets/img/artemis-logo.svg" alt="Artemis" />
      </div>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
.app__container {
  .top__navigation {
    padding: 1em 0
  }
}
.logo {
  pointer-events: none;
  user-select: none;
  img {
    width: 150px;
  }
}
</style>
