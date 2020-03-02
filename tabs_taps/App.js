import React, {useState, useRef, useEffect} from 'react';
import {ScrollView, TouchableOpacity, Text, StyleSheet} from 'react-native';

const tabs = ['TAB 1', 'TAB 2', 'TAB 3', 'TAB 4', 'TAB 5'];

const TabComponent = () => {
  const [buttonTabs, updateTabs] = useState(tabs);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);

  return (
    <ScrollView
      ref={scrollRef}
      horizontal={true}
      scroll
      contentContainerStyle={[styles.wrapper]}>
      {buttonTabs.map((tab, index) => (
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            const currentIndex = activeIndex;

            // // move scrollview
            scrollRef.current.scrollTo({
              x: index * 120,
              duration: 100,
              animated: true,
            });

            setActiveIndex(index);

            // // update sequence of tabs
            // const tabs = [...buttonTabs];
            // const removeTabs = tabs.splice(0, index);
            // tabs.push(removeTabs);
            // updateTabs(tabs);

            setTimeout(() => setActiveIndex(0), 50000);
          }}
          style={[
            styles.tabButton,
            activeIndex === index && styles.tabButtonActive,
          ]}
          key={index}>
          <Text style={styles.tabButtonText}>{tab}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    maxHeight: 100,
    marginTop: 150,
  },
  tabButton: {
    width: 100,
    backgroundColor: '#00BFFF',
    borderRadius: 30,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  tabButtonActive: {
    backgroundColor: 'green',
  },
  tabButtonText: {
    color: '#ffffff',
  },
});

export default TabComponent;
