<script lang="ts" setup>
import {reactive, ref} from 'vue'
import type {FormInstance, FormRules} from 'element-plus'
import {mapToInvoice, mapToOffer} from "~/tools/mapper/mapper"
import Api from "~/tools/axios"
import useMessage from "../../../kunst-app/composables/message"


const formSize = ref('large')
const ruleFormRef = ref<FormInstance>()
const offerForm = reactive(<Offer>{})
const rules = reactive<FormRules>({
  SetName: [
    {required: true, message: 'Please input invoice number', trigger: 'blur'},
    {min: 3, message: 'Length should be min 3', trigger: 'blur'}
  ],
  Date: [
    {
      required: true,
      type: 'date',
      message: 'Please pick a date',
      trigger: 'change'
    }
  ],
  Text1: [
    {
      required: false
    }
  ],
  Text2: [
    {
      required: false
    }
  ],
  IsArchived: [
    {
      type: 'boolean',
      required: false
    }
  ],
  desc: [
    {required: true, message: 'Please input activity form', trigger: 'blur'}
  ]
})
const submitForm = async (formEl: FormInstance) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (!valid) return
    const offer = mapToOffer(offerForm)
    try {
      const response = await Api.PostOffer(offer)
      useMessage().success()
      setTimeout(formEl.resetFields, 3000)
    } catch {
      useMessage().error()
    }
  })
}
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}


</script>

<template>
  <span>Neues Angebot</span>
  <el-divider border-style="dotted"/>


  <el-form
    ref="ruleFormRef"
    :model="offerForm"
    :rules="rules"
    :size="formSize"
    class="demo-ruleForm"
    label-width="120px"
    status-icon
  >
    <el-form-item label="Date" prop="Date">
      <el-col :span="8">
        <el-date-picker
          v-model="offerForm.Date"
          label="Pick a date"
          placeholder="Pick a date"
          style="width: 100%"
          type="date"
        />
      </el-col>
    </el-form-item>

    <el-form-item label="SetName" prop="SetName">
      <el-col :span="10">
        <el-input
          v-model="offerForm.SetName"
          maxlength="10"
          placeholder="SetName"
          show-word-limit
        />
      </el-col>
    </el-form-item>

    <el-form-item label="Text1" prop="Text1">
      <el-col :span="10">
        <el-input
          v-model="offerForm.Text1"
          maxlength="30"
          placeholder="Please input"
          resize="none"
          rows="2"
          show-word-limit
          type="textarea"
        />
      </el-col>
    </el-form-item>

    <el-form-item label="Text2" prop="Text2">
      <el-col :span="10">
        <el-input
          v-model="offerForm.Text2"
          maxlength="30"
          placeholder="Please input"
          resize="none"
          rows="2"
          show-word-limit
          type="textarea"
        />
      </el-col>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)"
      >Create
      </el-button
      >
      <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
    </el-form-item>

  </el-form>
</template>


<script lang="ts">
export default {
  name: "InvoiceForm"
}
</script>
