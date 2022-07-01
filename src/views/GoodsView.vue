<template>
  <div>
    <div class="select-box">
      <el-form :inline="true" :model="selectData" class="demo-form-inline">
        <el-form-item label="标题">
          <el-input v-model="selectData.title" placeholder="请输入关键字" />
        </el-form-item>

        <el-form-item label="详情">
          <el-input v-model="selectData.introduce" placeholder="请输入关键字" />
        </el-form-item>


        <el-form-item>
          <el-button type="primary" @click="onSubmit">查找</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table :data="computedList" stripe style="width: 100%">
      <el-table-column prop="id" label="ID" width="180" />
      <el-table-column prop="title" label="标题" width="180" />
      <el-table-column prop="introduce" label="详情" />
    </el-table>

    <el-pagination @current-change="curChange" @size-change="sizeChange" layout="prev, pager, next"
      :total="selectData.count * 2" />

  </div>
</template>

<script lang="ts">
import { computed, onMounted, reactive, toRefs, watch } from "vue"
import { goods } from "../request/api"
import { InitData, ListInt } from "../type/goods"

export default {
  name: "GoodsView",
  setup() {
    const data = reactive(new InitData())

    // 获取分页数据
    const dataList = reactive({
      computedList: computed(() => {
        return data.list.slice((data.selectData.page - 1) * data.selectData.pageSize, data.selectData.page * data.selectData.pageSize)
      })
    })

    const sizeChange = function (pageSize: number) {
      data.selectData.pageSize = pageSize
    }

    const curChange = function (page: number) {
      data.selectData.page = page
    }

    const onSubmit = function () {
      let arr: ListInt[] = []
      if (data.selectData.title || data.selectData.introduce) {
        if (data.selectData.title) {
          arr = data.list.filter((value: any) => {
            return value.title.includes(data.selectData.title.trim())
          })
        }
        if (data.selectData.introduce) {
          arr = data.list.filter((value: any) => {
            return value.introduce.includes(data.selectData.introduce.trim())
          })
        }
      } else {
        arr = data.list
      }
      data.selectData.count = arr.length
      data.list = arr
    }

    const getGoods = () => {
      goods().then(
        res => {
          data.list = res.data
          data.selectData.count = res.data.length
        }
      )
    }

    watch([() => data.selectData.title, () => data.selectData.introduce], () => {
      if (data.selectData.title == "" && data.selectData.introduce == "") {
        getGoods()
      }
    })

    onMounted(() => {
      getGoods()
    })

    return {
      ...toRefs(data),
      ...toRefs(dataList), sizeChange, curChange, onSubmit

    }
  },

}
</script>

<style lang="scss" scoped>
</style>
