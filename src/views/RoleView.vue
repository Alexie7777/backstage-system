<template>
  <div>
    角色列表
  </div>
</template>

<script lang="ts">
import { onBeforeMount, reactive, toRefs } from "vue"
import { roleList } from "../request/api"
import { InitData } from "../type/role"
export default {
  name: "RoleView",
  setup() {

    const data = reactive(new InitData())

    onBeforeMount(() => {
      roleList().then(res => {
        console.log(res)
        data.list = res.data
      })
    })

    return {
      ...toRefs(data)
    }

  }
}
</script>

<style lang="scss" scoped>
</style>
