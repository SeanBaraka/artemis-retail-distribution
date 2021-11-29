<template>
  <div class="app__container">
    <div class="top__navigation container d-flex">
      <div class="logo">
        <img src="@/assets/img/artemis-logo.svg" alt="Artemis" width="100" />
      </div>
      <div class="nav__menu">
        <div class="d-flex menu-items">
          <router-link to="/sales" active-class="active">Sales</router-link>
          <router-link to="/analytics" active-class="active">Analytics</router-link>
          <router-link to="/suppliers" active-class="active">Suppliers</router-link>
          <router-link to="/product-evaluation" active-class="active">Product Evaluation</router-link>
          <router-link to="/payments" active-class="active">Finance</router-link>
          <router-link to="/customers" active-class="active">Customers</router-link>
          <router-link to="/accounting" active-class="active">Accounting</router-link>
        </div>
      </div>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
@import "@/assets/styles/_variables.scss";

.app__container {
  .top__navigation {
    padding: 1em 0;
    align-items: flex-end;
    gap: 5em;
  }
}
.logo {
  pointer-events: none;
  user-select: none;
  img {
    width: 120px;
  }
}
.nav__menu {
  .menu-items {
    gap: 1em;
    font-size: 90%;
    a {
      text-decoration: none;
      display: inline-block;
      padding: .5em 1.2em;
      font-size: inherit;
      color: inherit;
      font-weight: $fw-bold;
      border-radius: .25em;
      &:hover {
        background: #ececec;
      }
      &.active {
        background: $primary;
      }
    }

  }
}
</style>
