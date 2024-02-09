import React, { useState } from 'react';
import { View } from 'react-native';
import IconDisplayButton from './components/IconDisplayButton';
import FeedbackModal from './components/FeedbackModal';
import DraggableComponent from './components/DraggableComponent';

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <DraggableComponent/>
      {/** This is a little feedback component for rating and writen feedback
      <IconDisplayButton onIconPress={() => setModalVisible(true)} />
      <FeedbackModal isVisible={modalVisible} onClose={() => setModalVisible(false)} />
       */}
    </View>
  );
};

export default App;
