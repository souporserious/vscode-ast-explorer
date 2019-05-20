import '@babel/polyfill'
import * as React from 'react'
import { ObjectInspector } from 'react-inspector'
import { parse } from '@babel/parser'

import './styles.css'

function getAst(code: string) {
  return parse(code, {
    sourceType: 'module',
    plugins: ['jsx'],
  })
}

function App() {
  const [ast, setAst] = React.useState({})
  React.useEffect(() => {
    function handleMessage(event: any) {
      if (event.data.fileText) {
        setAst(getAst(event.data.fileText))
      }
    }
    window.addEventListener('message', handleMessage)
    return () => {
      window.removeEventListener('message', handleMessage)
    }
  })
  return (
    <div style={{ overflow: 'auto' }}>
      <ObjectInspector data={ast} theme="chromeDark" />
    </div>
  )
}

export default App
