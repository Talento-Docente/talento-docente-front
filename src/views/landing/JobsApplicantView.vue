<script lang="ts">
/** External dependencies */
  import { defineComponent, ref } from 'vue'
  import { 
  SettingOutlined,
  EditOutlined, 
  EllipsisOutlined 
  } from '@ant-design/icons-vue'

  export default defineComponent({
    components: {
      SettingOutlined,
      EditOutlined, 
      EllipsisOutlined 
    },

  })
</script>
<template lang="pug">
.landing
  .filter
    a-row( type="flex" justify="space-around")
      a-col(:xl="{ span: 8 }")
        a-input-search(v-model:value="value"
            placeholder="Buscar Profesion ..."
            enter-button
            @search="onSearch")
            span sas
  .jobsApplicants.margin-top__30
    a-card(hoverable style="width: 300px")
      template(#cover)
        img(
          alt="example"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png")
      template(#actions)
        setting-outlined(key="setting")
        edit-outlined(key="edit")
        ellipsis-outlined(key="ellipsis")
      a-card-meta(title="Card title" description="This is the description")
        template(#avatar)
          a-avatar(src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png")
    
</template>