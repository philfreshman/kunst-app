<script setup lang="ts">
import type {FormInstance, FormRules} from "element-plus"

definePageMeta({layout: 'blank'})

const client = useSupabaseClient()
const user = useSupabaseUser()
const router = useRouter()


interface RuleForm {
  email: string
  password: string
}

const loginFormRef = ref<FormInstance>()
const loginForm = reactive<RuleForm>({
  email: import.meta.env.VITE_API_LOGIN || "",
  password: import.meta.env.VITE_PASS || "",
})


const rules = reactive<FormRules<RuleForm>>({
  email: [
    {required: true, message: 'Email erforderlich!', trigger: 'blur', type: 'email'},
  ],
  password: [
    {required: true, message: 'Passwort erforderlich!', trigger: 'blur'},
  ]
})


async function login(){
  const {error} = await client.auth.signInWithPassword({email: loginForm.email, password: loginForm.password})
  console.log(error)
  if(error === null){
    router.push('/')
  }
}


const submitForm = async (formEl: FormInstance | undefined) => {
  console.log("login", process.env.LOGIN)
  console.log('submit')
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('valid')
      login()
    } else {
      console.log('error')
      ElMessage.error({message:'Incorrect email or password', offset: 410})
      return false
    }
  })
}

</script>

<template>
  <div class="h-3/4 flex items-center justify-center">
    <div class="flex items-center w-80 flex-col bg-white rounded-2xl shadow-2xl">

      <div class="bg-[#1C3452] flex items-center justify-center m-6 ">
        <div class="">
<!--          <Logo/>-->
        </div>
      </div>

      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="rules"
        label-width="80px"
        class="max-w-md mx-auto w-80 p-6 "
        status-icon
      >
        <el-form-item label="Email" prop="email">
          <el-input type="text" v-model="loginForm.email" placeholder="Email"></el-input>
        </el-form-item>
        <el-form-item label="Passwort" prop="password">
          <el-input type="password" v-model="loginForm.password" placeholder="Passwort"></el-input>
        </el-form-item>
        <div class="w-full flex justify-center">
          <el-button type="primary" @click="submitForm(loginFormRef)">Login</el-button>
        </div>
      </el-form>

    </div>
  </div>
</template>



