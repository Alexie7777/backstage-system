<template>
  <div>
    权限列表
  </div>
</template>

<script lang="ts">
import { reactive, toRefs } from "vue"
import { useRoute } from "vue-router"
import {InitData} from "../type/authority"

export default {
  name: "AuthorityView",
  setup() {
    const route = useRoute()
    const {params}:any = route
    // console.log(params)
    const data = reactive(new InitData(params.id, params.authority))

    return {
      ...toRefs(data)
    }

  }


}
</script>

<style lang="scss" scoped>
</style>
