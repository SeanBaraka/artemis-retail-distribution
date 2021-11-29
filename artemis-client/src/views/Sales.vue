<template>
  <section class="container__section container">
      <div class="payment__table">
      <div class="table__header">
        <div class="row table--heading">
          <div class="col-md-1">#</div>
          <div class="col-md-1">Receipt</div>
          <div class="col-md-1">Payment</div>
          <div class="col-md-1">Amount</div>
          <div class="col-md-1">Bal</div>
        </div>
      </div>
      <div class="table__body">
        <div class="row table--content" v-for="(sale, index) of sales" :key="sale.receiptNumber">
          <div class="col-md-1">{{index +1}}</div>
          <div class="col-md-1">{{sale.receiptNumber}}</div>
          <div class="col-md-1">{{sale.paymentMethod}}</div>
          <div class="col-md-1">Kes. {{sale.saleAmount}}</div>
          <div class="col-md-2">{{sale.receivedAmount}}</div>
        </div>
      </div>
      <div class="table__footer"></div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { getPayments, getTotalSales, socket } from "@/services/dataservice";

export default defineComponent({
  data() {
    return {
        sales: [] as any[]
    };
  },
  mounted() {
    socket.on("update-sale", (response) => {
      console.log("%cnew sale recorded", "background: #0367fc;color: #fff");
      console.log(response);
      response.saleAmount = response.amountReceived
      this.sales.push(response)
      
      this.sales.reverse();
    });
    getTotalSales(2)
      .then((response: any[]) => {
        console.log("%csales response", "background: red; color: #fff");
        response.length = 15;
        this.sales = response;
      })
      .catch((error) => {
        console.log(error.message);
      });
  },
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