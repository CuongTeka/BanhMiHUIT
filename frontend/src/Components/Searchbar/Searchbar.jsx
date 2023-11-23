import React from "react";
import { SearchOutlined } from '@ant-design/icons';
import InputComponent from '../InputComponent/InputComponent';
import ButtonComponent from '../Buttoncomponent/Buttoncomponent'

const Searchbar = (props) => {
    const {
        size, placeholder, textbutton, border, 
        backgroundColorButton = 'rgb(13, 92, 182)',
        colorButton = '#fff'
      } = props
  return (
    <div style={{ display: 'flex', }}>
      <InputComponent
        size={size}
        placeholder={placeholder}
        bordered={border}
        style={{ width: 400, }}
        {...props}
      />
      <ButtonComponent
        size={size}
        styleButton={{ background: backgroundColorButton, border: border }}
        icon={<SearchOutlined color={colorButton} style={{ color: '#fff' } } />}
        textbutton={textbutton}
        styleTextButton={{ color: colorButton }}
      />
    </div>
  );
};

export default Searchbar;