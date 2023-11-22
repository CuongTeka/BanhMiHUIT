import React from 'react'
import { Input } from 'antd'

const InputComponent = ({size, placeholder, border, style, ...rests}) => {
  return (
    <Input
      size={size}
      placeholder={placeholder}
      bordered={border}
      style={style}
      {...rests}
    />

  )
}

export default InputComponent