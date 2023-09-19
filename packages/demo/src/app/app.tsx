import _ from 'lodash'
import React from 'react'
import { observer } from 'mobx-react-lite'
import { App as AntdApp } from 'antd'
import {
  ProLayout,
  GridContent,
  ProTable,
  ProForm,
} from '@ant-design/pro-components'

const App: React.FC = observer(() => {
  return (
    <AntdApp>
      <ProLayout
        {...{
          layout: 'top',
          contentWidth: 'Fluid',
          splitMenus: false,
          fixedHeader: true,
          fixSiderbar: true,
          menu: {
            locale: false,
          },
        }}
      >
        <GridContent>
          <ProTable></ProTable>
          <ProForm></ProForm>
        </GridContent>
      </ProLayout>
    </AntdApp>
  )
})

export default App
