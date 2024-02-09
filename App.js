import React, { useState } from 'react';
import { View } from 'react-native';
import IconDisplayButton from './components/display_icon';
import FeedbackModal from './components/feedback_modal';

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <IconDisplayButton onIconPress={() => setModalVisible(true)} />
      <FeedbackModal isVisible={modalVisible} onClose={() => setModalVisible(false)} />
    </View>
  );
};

export default App;
