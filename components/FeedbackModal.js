/**
 * FeedbackModal Component
 * 
 * This React/React Native component renders a feedback modal that allows users to submit feedback
 * about a service or application. The modal includes a star rating system, implemented using the
 * react-native-ratings library, and a text input field for detailed feedback. The modal's visibility
 * is controlled via the `isVisible` prop, allowing for conditional rendering based on the application's
 * state. The `onClose` prop is a callback function that handles the modal's closure process, ensuring
 * a seamless user experience by integrating with the application's state management.
 * 
 * Features:
 * - Star rating system for quantifiable feedback.
 * - Text input for qualitative feedback.
 * - Customizable visibility and close handler for integration into various user flows.
 * 
 * Props:
 *  - isVisible (Boolean): Controls the visibility of the feedback modal.
 *  - onClose (Function): Callback function executed when the modal is closed.
 * 
 * State Variables:
 *  - rating (Number): Stores the user's selected star rating. Initialized to 5 as a default value.
 *  - feedback (String): Stores the user's textual feedback. Initialized to an empty string.
 * 
 * Functions:
 *  - handleRatingCompleted(rating): Updates the component's state with the new rating value.
 *  - handleSubmitFeedback(): Handles the submission of the feedback, including logging and state resetting.
 *  - dismissKeyboard(): Utility function to dismiss the keyboard, improving the modal's UX on mobile devices.
 * 
 * Usage:
 *  <FeedbackModal isVisible={this.state.isModalVisible} onClose={this.handleCloseModal} />
 * 
 * This component is designed to be reusable and easy to integrate within various parts of a React or
 * React Native application, providing a consistent and user-friendly mechanism for collecting feedback.
 */



import React, { useState } from 'react';
import {
    Modal,
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Text, Keyboard,
    Platform,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
} from 'react-native';
import { Rating } from 'react-native-ratings';

const FeedbackModal = ({ isVisible, onClose }) => {
    const [rating, setRating] = useState(5);
    const [feedback, setFeedback] = useState('');

    const handleRatingCompleted = (rating) => {
        setRating(rating);
        // Uncomment below lines when you're ready to implement the redirection logic
        /*
        if (rating === 5) {
          const url = Platform.OS === 'ios' ?
            'itms-apps://itunes.apple.com/app/idYOUR_APP_ID' :
            'market://details?id=YOUR_PACKAGE_NAME';
          Linking.openURL(url).catch(err => console.error('An error occurred', err));
        }
        */
    };

    const handleSubmitFeedback = () => {
        console.log(`Rating: ${rating}, Feedback: ${feedback}`);
        setFeedback(''); // Clear feedback upon submission
        onClose(); // Close modal
        setRating(5);//reset rating
    };

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    return (
        <Modal visible={isVisible} animationType="slide" transparent onRequestClose={onClose}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.centeredView}>
                    <TouchableWithoutFeedback onPress={dismissKeyboard}>
                        <View style={styles.modalView}>
                            <Rating
                                type="star"
                                ratingCount={5}
                                imageSize={40}
                                showRating
                                startingValue={5}
                                onFinishRating={handleRatingCompleted}
                            />
                            <TextInput
                                style={styles.input}
                                onChangeText={setFeedback}
                                value={feedback}
                                placeholder="Type your feedback here..."
                                multiline
                            />
                            <TouchableOpacity style={styles.submitArea} onPress={handleSubmitFeedback}>
                                <Text style={styles.submitText}>Submit Feedback</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '90%',
    },
    input: {
        width: '100%',
        minHeight: 100,
        marginVertical: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        textAlignVertical: 'top',
        backgroundColor: '#f8f8f8',
    },
    submitArea: {
        backgroundColor: '#007bff',
        padding: 10,
        width: '100%',
        borderRadius: 5,
    },
    submitText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default FeedbackModal;
