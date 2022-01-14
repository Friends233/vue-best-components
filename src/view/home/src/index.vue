<!--
 * @Description: 
 * @Author: Friends233
-->
<template>
  <div class="hello">
    <dl>
      <dd>
        <!-- <el-button class="btn" v-clickSubmit="submitFrom">按钮1</el-button> -->
        <el-button class="btn" v-clickSubmit="submitFrom"></el-button>
        <!-- <button class="btn" v-clickSubmit="submitFrom">按钮2</button>
        <div class="btn divbtn" v-clickSubmit="submitFrom">按钮3</div> -->
      </dd>
    </dl>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import clickSubmit from '@/directives/clickSubmit'

export default Vue.extend({
  name: 'home',
  props: {
    msg: String,
  },
  directives:{
    clickSubmit
  },
  methods:{
    submitFrom(){
      console.log('1')
      return new Promise((resolve,reject) => {
        setTimeout(()=> {
          resolve('111')
        },3000)
      })
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.btn {
  color: red;
}
dd {
  border: 1px solid red;
  position: relative;
  height: 300px;
}
.btn {
  width: 100px;
  height: 40px;
  margin: 0 auto;
  cursor: pointer;
  border: 1px solid black;
  // position: fixed;
  position: absolute;
}
</style>
