/**
 * Draggable.js
 * 
 * This file implements a DraggableComponent using React Native. 
 * It makes use of the Animated and PanResponder APIs to enable dragging 
 * functionality within a React Native application. The component allows 
 * for an object to be moved around the screen with touch gestures. 
 * The animation is reset to its original position once the touch is released.
 * 
 * Usage:
 * Simply import and use <DraggableComponent /> within your React Native app to have a draggable view.
 * 
 * Dependencies:
 * React, React Native's Animated, StyleSheet, View, PanResponder, and Dimensions modules.
 */


import React, { useRef } from 'react';
import { StyleSheet, View, Animated, PanResponder} from 'react-native';

const DraggableComponent = () => {
  // Reference for the animated value
  const pan = useRef(new Animated.ValueXY()).current;

  // Setup PanResponder to handle touch gestures
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event(
        [null, { dx: pan.x, dy: pan.y }], // Maps the gesture state to the animated value
        { useNativeDriver: false }
      ),
      onPanResponderRelease: () => {
        // When the touch is released, spring back to the original position
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 }, // Reset position
          friction: 5, // Controls "bounciness"
          useNativeDriver: false,
        }).start();
      },
    })
  ).current;

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          transform: [{ translateX: pan.x }, { translateY: pan.y }], // Bind animated value to style
          ...styles.box,
        }}
        {...panResponder.panHandlers} // Attach PanResponder to the component
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    height: 100,
    width: 100,
    backgroundColor: 'skyblue',
    borderRadius: 8,
  },
});

export default DraggableComponent;
