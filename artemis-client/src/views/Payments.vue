<template>
  <div class="container__section container">
    <div class="section__header h5">Payments</div>
    <div class="info__tab">
      <div class="info row">
        <div class="mpesa--logo col-md-1">
          <img src="@/assets/img/mpesa-logo.png" alt="Mpesa" />
        </div>
        <div class="paybill--info col-md-2">
          <span class="success">Paybill: </span>
          <span>4067985</span>
        </div>
        <div class="balance--info col-md-2">
          <span class="success">Current Bal: </span>
          <span>KES. 128,015</span>
        </div>
        <div class="search-bar col-md-5">
          <div class="row">
            <artemis-input
              type="text"
              class="col"
              placeholder="Search Payment Details"
              :value="searchParam"
            />
            <artemis-button class="col">Search</artemis-button>
          </div>
        </div>
      </div>
    </div>
    <div class="payment__table">
      <div class="table__header">
        <div class="row table--heading">
          <div class="col-md-1">#</div>
          <div class="col-md-1">Trans.ID</div>
          <div class="col-md-1">Time</div>
          <div class="col-md-2">Customer Name</div>
          <div class="col-md-1">Tel. Number</div>
          <div class="col-md-1">Amount</div>
        </div>
      </div>
      <div class="table__body">
        <div class="row table--content" v-for="payment of payments" :key="payment.TransID">
          <div class="col-md-1">1</div>
          <div class="col-md-1">PJK3SW26K</div>
          <div class="col-md-1">07.51 p.m</div>
          <div class="col-md-2">Lazarus M. Mutinda</div>
          <div class="col-md-1">254723456785</div>
          <div class="col-md-1">KES. 1750.00</div>
        </div>
      </div>
      <div class="table__footer"></div>
    </div>
  </div>
</template>

<script lang="ts">
import ArtemisButton from "@/components/artemis-button/ArtemisButton.vue";
import ArtemisInput from "@/components/artemis-input/ArtemisInput.vue";
import { defineComponent } from "@vue/runtime-core";
import {getPayments} from "@/services/dataservice";

export default defineComponent({
  components: { ArtemisInput, ArtemisButton },
  data() {
    return {
      searchParam: "",
      payments: Array
    };
  },
  mounted() {
      getPayments().then((resp) => {
          this.payments = resp;
      }).catch(erro => {
          console.log(erro)
      })
  }
});
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.info__tab {
  .info {
    align-items: center;
    font-weight: $fw-heavy;
  }
}
.payment__table {
  margin: 1em 0;
  .table__header {
    font-weight: 600;
  }
}
.table--heading,
.table--content {
  .col-md-1,
  .col-md-2 {
    font-size: 85%;
  }
}
.table__body {
    .row {
        margin-top: 1em;
        // background: $light-500;
    }
}
</style>
