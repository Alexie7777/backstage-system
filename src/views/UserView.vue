<template>
  <div>
    <div class="select-box">
      <el-form :inline="true" :model="selectedData" class="demo-form-inline">
        <el-form-item @keyup.enter="onSubmit" label="姓名">
          <el-input v-model="selectedData.userName" placeholder="请输入关键字" />
        </el-form-item>

        <el-form-item label="角色">
          <el-select v-model="selectedData.roleID" class="m-2" placeholder="请选择">
            <el-option label="全部" :value="0" />
            <el-option v-for="item in roleList" :key="item.roleID" :label="item.roleName" :value="item.roleID" />
          </el-select>
        </el-form-item>


        <el-form-item>
          <el-button type="primary" @click="onSubmit()">查找</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table :data="list" stripe style="width: 100%">
      <el-table-column prop="id" label="ID" width="180" />
      <el-table-column prop="userName" label="姓名" width="180" />
      <el-table-column prop="roleName" label="角色">
        <template #default="scope">
          <el-button v-for="( item, index ) in scope.row.roleName" :key="index" link size="small">{{ item }}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="roleName" label="操作">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="editUser(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="isShow" title="Shipping address">
      <el-form :model="activeObj">
        <el-form-item label="姓名" label-width="50px">
          <el-input v-model="activeObj.userName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="角色" label-width="50px">
          <el-select v-model="activeObj.roleID" multiple placeholder="请选择角色">
            <el-option v-for="item in roleList" :key="item.roleID" :label="item.roleName" :value="item.roleID" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="updateUser()">更改</el-button>
        </span>
      </template>
    </el-dialog>

  </div>
</template>

<script lang="ts">
import { onMounted, reactive, toRefs, watch } from "vue"
import { userList, roleList } from "../request/api"
import { InitData, ListInt } from "../type/user"

export default ({
  name: "UserView",
  setup() {
    const data = reactive(new InitData())


    const onSubmit = () => {
      let arr: ListInt[] = []
      const { selectedData, list } = data

      if (selectedData.roleID || selectedData.userName) {
        if (selectedData.userName) {
          arr = list.filter((item) => {
            return item.userName.includes(selectedData.userName)
          })
        }
        if (selectedData.roleID) {
          arr = (selectedData.userName ? arr : list).filter((item) => {
            return item.roleID.includes(selectedData.roleID)
          })
        }
      } else {
        arr = data.list
      }
      data.list = arr
    }

    const editUser = (row: ListInt) => {
      data.isShow = true
      data.activeObj = row
    }
    
    const updateUser = () => {
      console.log(data.activeObj)

    }

    const getUserList = () => {
      userList().then(
        res => {
          data.list = res.data
          for (let i in data.list) {
            data.list[i].roleName = data.list[i].roleID.sort().map((ele) => {
              if (ele == 1) {
                return "管理员"
              }
              if (ele == 2) {
                return "普通用户"
              }
            })
          }
        }
      )
    }

    const getRoleList = () => {
      roleList().then(
        res => {
          data.roleList = res.data
          // console.log(res.data)
        }
      )
    }
    onMounted(() => {
      getUserList()
      getRoleList()
    })

    watch([() => data.selectedData.userName, () => data.selectedData.roleID],

      () => {
        if (data.selectedData.userName == "" && data.selectedData.roleID == 0) {
          getUserList()
        }
      }
    )

    return {
      ...toRefs(data),  onSubmit, editUser, updateUser
    }


  }

})
</script>

<style scoped>
</style>
