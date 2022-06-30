<template>
  <div class="login-box">
    <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="80px" class="demo-ruleForm">

      <h2>后台管理系统</h2>
      <el-form-item label="帐号: " prop="username">
        <el-input v-model="ruleForm.username" type="text" autocomplete="off" />
      </el-form-item>

      <el-form-item label="密码: " prop="password">
        <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { reactive, ref, toRefs } from 'vue'
import { LoginData } from "/@/type/login"
import type { FormInstance } from "element-plus"
import { login } from "../request/api"
import { useRouter } from 'vue-router'

export default {
  name: "LoginView",
  setup() {
    const data = reactive(new LoginData())

    const router = useRouter()

    const rules =
    {
      username: [
        { required: true, message: '请输入帐号', trigger: 'blur' },
        { min: 3, max: 10, message: '帐号长度必须在3到10之间', trigger: 'blur' },
      ],
      password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 3, max: 10, message: '密码长度必须在3到10之间', trigger: 'blur' },
      ],
    }

    const ruleFormRef = ref<FormInstance>()
    const submitForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return
      formEl.validate((valid) => {
        if (valid) {
          login(data.ruleForm).then(
            res => {
              // console.log(res)
              localStorage.setItem("token", res.data.token)
              router.push("/")
            }
          )
        } else {
          console.log('error submit!')
          return false
        }
      })
    }

    return {
      ...toRefs(data), rules, ruleFormRef, submitForm
    }
  }
}
</script>

<style lang="scss" scoped>
.login-box {
  width: 100%;
  height: 100%;
  background: url("/@/assets/bg.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 1px;
  text-align: center;
}

.demo-ruleForm {
  width: 500px;
  margin: 200px auto;
  background-color: #fff;
  padding: 40px;
  border-radius: 20px;
}

h2 {
  margin-bottom: 5px;
}
</style>
