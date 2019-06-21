import * as React from 'react'

import { Provider as TabsProvider } from 'context/tab/tabs'
import { Provider as TabEditModalProvider } from 'context/tab/tabEditModal'
import { Provider as TabAddModalProvider } from 'context/tab/tabAddModal'

import { Provider as OperationsProvider } from 'context/operation/operations'
import { Provider as OperationsAddModalProvider } from 'context/operation/operationAddModal'

import TabsPanel from 'components/tabs/TabsPanel'

import MainPageComponent from 'components/pages/MainPage'
import TabAddDialog from 'components/tabs/TabAddDialog'
import TabEditDialog from 'components/tabs/TabEditDialog'
import OperationAddDialog from 'components/operations/OperationAddDialog'
import CombineProviders, { ContextStoreTuple } from 'utils/combineProviders';
import OperationsPanel from 'components/operations/OperationsPanel'

const MainPage: React.SFC = (props) => (
  <TabsProvider>
    <TabEditModalProvider>
      <TabAddModalProvider>
        <OperationsProvider>
          <OperationsAddModalProvider>
            <MainPageComponent
              tabColumn={
                <TabsPanel />
              }
              operationColumn={
                <OperationsPanel />
              }
              children={
                <>
                  <TabAddDialog />
                  <TabEditDialog />
                  <OperationAddDialog />
                </>
              }
            />
          </OperationsAddModalProvider>
        </OperationsProvider>
      </TabAddModalProvider>
    </TabEditModalProvider>
  </TabsProvider>
)

export default MainPage