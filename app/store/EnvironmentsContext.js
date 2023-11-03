import React, { createContext, useContext } from 'react'
import { createEnvironmentStore } from './environmentStore'
import { useLocalObservable } from 'mobx-react'

const EnvironmentsContext = createContext(null)

export const EnvironmentsProvider = ({ children }) => {
  const environmentsStore = useLocalObservable(createEnvironmentStore)

  return (
    <EnvironmentsContext.Provider value={environmentsStore}>
      {children}
    </EnvironmentsContext.Provider>
  )
}

export const useEnvironmentsStore = () => useContext(EnvironmentsContext)