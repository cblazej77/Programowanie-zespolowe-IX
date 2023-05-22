import * as React from 'react';
import { useState } from 'react';
import { Avatar } from './styles';

const Awatar = (props) => {
    const { avatar, style } = props;
    const [uri, setUri] = useState(avatar);
  
    return (
      <Avatar
        style={[style]}
        onError={() => {setUri('../assets/img/avatar1.png')}}
        source={{ uri: uri}}
      />
    )
    };
  
  export default Awatar;