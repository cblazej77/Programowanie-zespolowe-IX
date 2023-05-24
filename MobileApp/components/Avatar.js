import * as React from 'react';
import { useState } from 'react';
import { Avatar } from './styles';

const Awatar = (props) => {
    const { avatar, style } = props;
    const [uri, setUri] = useState(avatar);
  
    return (
      <Avatar
        style={[style]}
        onError={(e) => { e.target.onError=null; e.target.src="../assets/img/avatar1.png";}}
        source={{ uri: avatar}}
      />
    )
    };
  
  export default Awatar;