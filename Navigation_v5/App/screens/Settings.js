import React from 'react';
import {SafeAreaView,Button,Text} from 'react-native';

export default ({navigation}) =>{

   

    return  (
        <SafeAreaView>
            <Button title="Take me to Action Detail" onPress={() => navigation.navigate('Tabs',{
                screen : 'Actions',
                params : {userId:123}
            })} style={{alignSelf:'center'}}>Toggle Drawer</Button>
        </SafeAreaView>
    )
};
