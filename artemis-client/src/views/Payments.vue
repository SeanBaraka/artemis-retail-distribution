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
          <span>KES. {{orgBalance}}</span>
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
          <div class="col-md-1">Date</div>
          <div class="col-md-1">Trans.ID</div>
          <div class="col-md-1">Time</div>
          <div class="col-md-2">Customer Name</div>
          <div class="col-md-1">Tel. Number</div>
          <div class="col-md-1">Amount</div>
        </div>
      </div>
      <div class="table__body">
        <div class="row table--content" v-for="(payment, index) of payments" :key="payment.TransID">
          <div class="col-md-1">{{index +1}}</div>
          <div class="col-md-1">{{payment.Date}}</div>
          <div class="col-md-1">{{payment.TransID}}</div>
          <div class="col-md-1">{{payment.TransTime}}</div>
          <div class="col-md-2">{{payment.Name}}</div>
          <div class="col-md-1">{{payment.MSISDN}}</div>
          <div class="col-md-1">KES. {{payment.TransAmount}}</div>
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
import {getPayments, getTotalSales} from "@/services/dataservice";

export default defineComponent({
  components: { ArtemisInput, ArtemisButton },
  data() {
    return {
      searchParam: "",
      payments: '',
      orgBalance: Number
    };
  },
  mounted() {
    getTotalSales(2).then((response: any) => {
        console.log('%csales response', "background: red; color: #fff")
        console.log(response)
      }).catch(error => {
        console.log(error.message)
      })
      getPayments().then((resp) => {
          for(var i = 0; i < resp.payments.length; i ++) {
            const weirdTime = resp.payments[i].TransTime
            const year = weirdTime.toString().slice(0,4);
            const month = weirdTime.toString().slice(4,6);
            const day = weirdTime.toString().slice(6,8)
            var hour = weirdTime.toString().slice(8,10);
            var minutes = weirdTime.toString().slice(10,12);
            var ext = hour >= 12 ? 'p.m' : 'a.m'
            let formatedHour = hour - 12
            formatedHour == 0 ? formatedHour = 12 : formatedHour < 0 ? formatedHour = hour : formatedHour
            resp.payments[i].TransTime = formatedHour+':' + minutes + ' ' + ext;
            resp.payments[i].Name = `${resp.payments[i].FirstName} ${resp.payments[i].MiddleName} ${resp.payments[i].LastName}`;
            resp.payments[i].TransAmount = Number(resp.payments[i].TransAmount).toFixed(2);
            resp.payments[i].Date = `${day}/${month}/${year}`
          }
          this.payments = resp.payments;
          this.orgBalance = resp.payments[0].OrgAccountBalance
      }).catch(error => {
        console.log('an error occured getting payments')
          console.log(error)
      })
  },
  methods: {
    
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
