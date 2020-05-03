import React, { useState, useEffect } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Ionicons} from '@expo/vector-icons';

import ContactList from '../screens/ContactsList';
import ContactDetails from '../screens/ContactDetails';
import ActionDetails from '../screens/ActionDetails';
import ActionsList from '../screens/ActionsList';
import Settings from '../screens/Settings';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import Loading from '../screens/Loading';
import Modal from '../screens/Modal';



const AuthStack = createStackNavigator();
const AuthStackScreen = () => (
    <AuthStack.Navigator>
        <AuthStack.Screen name={'Sign In'} component={SignIn} />
        <AuthStack.Screen name={'Sign Up'} component={SignUp} />
    </AuthStack.Navigator>
)


const ContactStack = createStackNavigator();

const ContactStackScreen =  () => (
    <ContactStack.Navigator screenOptions={{
        headerStyle:{height:100},
    }}>
        <ContactStack.Screen name="ContactsList" component={ContactList} options={{
            headerTitle : 'Contacts'
        }}  />
        <ContactStack.Screen name="ContactDetails" component={ContactDetails} options={({route}) => {
            const {user} = route.params;
            return {
                headerTitle : `${user.name.first} ${user.name.last}`,
                
            }
        }} mode="modal"/>
    </ContactStack.Navigator>
)

const ActionsStack = createStackNavigator();

const ActionStackScreen = () => (
    <ActionsStack.Navigator>
        <ActionsStack.Screen name="Actions List" component={ActionsList} />
        <ActionsStack.Screen name="Actions Detail" component={ActionDetails} />
    </ActionsStack.Navigator>
);

const AppTabs = createBottomTabNavigator();

const AppTabsScreen  = () => (
    <AppTabs.Navigator tabBarOptions={{
        activeBackgroundColor:'#dcdcdc',
        activeTintColor: '#222',
        labelStyle:{fontWeight:'bold'}     
    }}
    >
        <AppTabs.Screen name="Contacts" component={ContactStackScreen} options={{
            tabBarIcon : props => (
                <Ionicons name="ios-contacts" size={props.size} color={props.color}/>
            )
        }} />
        <AppTabs.Screen name="Actions" component={ActionStackScreen} options={(props) => {

     return {
                tabBarIcon : props => <Ionicons name="ios-checkmark-circle-outline" size={props.size} color={props.color}/>
            }
        }}/>
    </AppTabs.Navigator>
);

const AppDrawer = createDrawerNavigator();
const AppDrawerScreen = () => (
    <AppDrawer.Navigator drawerType={'back'}>
        <AppDrawer.Screen name="Tabs" component={AppTabsScreen} options={{
            drawerLabel:'Home'
        }}/>
        <AppDrawer.Screen name="Settings" component={Settings} />
    </AppDrawer.Navigator>
)


const RootStack  = createStackNavigator();
const RootStackScreen = () => {
    const [isLoading,setLoading] = useState(true);
    const [user,setUser] = useState(null);

    useEffect(() => {
      setTimeout(()=> {
        setLoading(false);
        setUser({})
      },500);
    },[]);
    
    return (
        <RootStack.Navigator headerMode="none" screenOptions={{animationEnabled:false}} mode="modal">
            {isLoading ? <RootStack.Screen name="Loading" component={Loading} />  : user ? <RootStack.Screen  name="AppDrawerScreen" component={AppDrawerScreen}/> : <RootStack.Screen name="AuthStackScreen" component={AuthStackScreen}/>}
            <RootStack.Screen name="Modal" component={Modal} options={{animationEnabled:true}}/>
            <RootStack.Screen name="Alert" component={Modal} options={{
                animationEnabled:true,
                cardStyle:{
                    backgroundColor : 'rgba(0,0,0,0.2)'
                },
                cardOverlayEnabled:true,
                cardStyleInterpolator : ({current:{progress}}) => {
                    return {
                        cardStyle : {
                            opacity : progress.interpolate({
                                inputRange : [0,0.5,0.9,1],
                                outputRange : [0,0.25,0.7,1]
                            })
                        },
                        overlayStyle : {
                            opacity :progress.interpolate({
                                inputRange : [0,1],
                                outputRange : [0,0.5],
                                extrapolate:"identity"
                            })
                        }
                    }
                }
            }}/>
        </RootStack.Navigator>
    )
}

export default () => {

    return (
        <NavigationContainer>
           <RootStackScreen/>
        </NavigationContainer>
    )
};