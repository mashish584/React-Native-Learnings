import React from 'react';
import {Text} from 'react-native';


export default ({route}) => {
   const user = route.params.user;
    return <Text>{JSON.stringify(user,null,2)}</Text>
};
