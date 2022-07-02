<template>
  <div>
    <div class="select-box">

      <el-form>
        <el-form-item>
          <el-button type="primary" @click="addRole">添加角色</el-button>
          <!-- <el-button type="primary" @click="jump">jump route</el-button> -->
        </el-form-item>
      </el-form>
    </div>

    <el-table v-loading="isLoading" :data="list" stripe style="width: 100%">

      <el-table-column prop="roleID" label="ID" width="180" />

      <el-table-column prop="roleName" label="角色" />


      <el-table-column label="操作">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="editAuth(scope.row)">修改权限</el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script lang="ts">
import { onBeforeMount, reactive, toRefs } from "vue"
import { roleList } from "../request/api"
import { InitData, ListInt } from "../type/role"
import { ElMessage, ElMessageBox } from "element-plus"
import { useRouter } from 'vue-router'

export default {
  name: "RoleView",
  setup() {

    const router = useRouter()
    const data = reactive(new InitData())

    const addRole = () => {
      ElMessageBox.prompt('请输入角色名称', '添加', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      })
        .then(({ value }) => {
          if (value) {
            data.list.push({ roleName: value, roleID: data.list.length + 1, authority: [] })
          }
          ElMessage({
            type: 'success',
            message: `${value}角色添加成功`,
          })
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '取消添加操作',
          })
        })
    }

    const editAuth = (row: ListInt) => {
      router.push({
        name: "AuthorityView",
        params: {
          id: row.roleID,
          authority: row.authority
        }
      })
    }

    onBeforeMount(() => {
      roleList().then(res => {
        data.list = res.data
        data.isLoading = false
      })
    })

    return {
      ...toRefs(data), addRole, editAuth
    }

  }
}
</script>

<style lang="scss" scoped>
</style>
