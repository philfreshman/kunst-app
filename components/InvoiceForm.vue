<script lang="ts" setup>
import {reactive, ref} from 'vue'
import type {FormInstance, FormRules} from 'element-plus'
import {mapToInvoice} from "~/tools/mapper/mapper"
import Api from "~/tools/axios"
import useMessage from "../../../kunst-app/composables/message"


const formSize = ref('large')
const ruleFormRef = ref<FormInstance>()
const invoiceForm = reactive(<Invoice>{})
const rules = reactive<FormRules>({
  InvoiceDate: [
    {
      required: true,
      type: 'date',
      message: 'Please pick a date',
      trigger: 'change'
    }
  ],
  InvoiceNr: [
    {required: true, message: 'Please input invoice number', trigger: 'blur'},
    {min: 3, message: 'Length should be min 3', trigger: 'blur'}
  ],
  Description: [
    {required: true, message: 'Please input some description', trigger: 'blur'},
    {min: 3, message: 'Length should be min 3', trigger: 'blur'}
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
    const invoice = mapToInvoice(invoiceForm)
    try {
      const response = await Api.PostInvoice(invoice)
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
  <el-form
    ref="ruleFormRef"
    :model="invoiceForm"
    :rules="rules"
    :size="formSize"
    class="demo-ruleForm"
    label-width="120px"
    status-icon
  >
    <el-form-item label="Date" prop="InvoiceDate">
      <el-col :span="8">
        <el-date-picker
          v-model="invoiceForm.InvoiceDate"
          label="Pick a date"
          placeholder="Pick a date"
          style="width: 100%"
          type="date"
        />
      </el-col>
    </el-form-item>

    <el-form-item label="InvoiceNr" prop="InvoiceNr">
      <el-col :span="10">
        <el-input
          v-model="invoiceForm.InvoiceNr"
          maxlength="10"
          show-word-limit
        />
      </el-col>
    </el-form-item>

    <el-form-item label="Description" prop="Description">
      <el-col :span="10">
        <el-input
          v-model="invoiceForm.Description"
          maxlength="20"
          show-word-limit
        />
      </el-col>
    </el-form-item>

    <el-form-item label="Text1" prop="Text1">
      <el-col :span="10">
        <el-input
          v-model="invoiceForm.Text1"
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
          v-model="invoiceForm.Text2"
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
