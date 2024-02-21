import React, { useState } from 'react';
import { View } from 'react-native';

//custom
import IconDisplayButton from './components/IconDisplayButton';
import FeedbackModal from './components/FeedbackModal';
import DraggableComponent from './components/DraggableComponent';
import SearchComponent from './components/SearchComponent';
import PermissionComponent from './components/PermissionRequest';
import { ThemeProvider, ThemedComponent } from './components/ThemeManager';


const App = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <ThemeProvider>
        <ThemedComponent />
      </ThemeProvider>
      {/** <PermissionComponent/>*/}
      {/** <SearchComponent/> */}
      {/** <DraggableComponent/> */}

      {/** This is a little feedback component for rating and writen feedback
      <IconDisplayButton onIconPress={() => setModalVisible(true)} />
      <FeedbackModal isVisible={modalVisible} onClose={() => setModalVisible(false)} />
       */}
    </View>
  );
};

export default App;
