<template>
  <div>
<el-tree
      ref="treeRef"
    :data="list"
    show-checkbox
    node-key="roleId"
    :check-strictly="true"
    :default-checked-keys="authority"
    :props="defaultProps"
  />
      <el-button @click="changeAuth">确认修改</el-button>
  </div>
</template>

<script lang="ts">
import { onBeforeMount, reactive, toRefs } from "vue"
import { useRoute } from "vue-router"
import { InitData } from "../type/authority"
import { authList } from "../request/api"

export default {
  name: "AuthorityView",
  setup() {
    const route = useRoute()
    const { params }: any = route
    const data = reactive(new InitData(params.id, params.authority))
    const defaultProps = {
      children: "roleList",
      label: "name"
    }

    const getAuthList = () => {
      authList().then(res => {
        data.list = res.data
        console.log(data)
      })
    }

    const changeAuth = () => {
      console.log(data.treeRef.getCheckedKeys().sort())
          
    }

    onBeforeMount(() => {
      getAuthList()
    })

    return {
      ...toRefs(data), defaultProps, changeAuth
    }

  }


}
</script>

<style lang="scss" scoped>
</style>
