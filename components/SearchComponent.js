/**
 * SearchComponent for React Native Application
 * 
 * This component provides a dynamic search functionality for events, including the ability to filter by tags.
 * It utilizes a TextInput for search queries, displays search results in a FlatList, and allows users to select
 * search tags to refine their search criteria. The search results are filtered based on the input text and selected tags.
 * 
 * Imports:
 * - React hooks (useState, useEffect) for component state management.
 * - React Native components for UI rendering.
 * - searchData from a local JSON file to simulate fetching data.
 * - Icon from 'react-native-vector-icons/MaterialIcons' for UI elements.
 * 
 */


import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import searchData from '../data/DummySearchData.json'; // Adjust the path as necessary
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import Icon


const SearchComponent = () => {

    // Initialize state for search query, results, available tags, and selected tags
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);


    // Generate a list of unique tags for auto-suggestion
    // from the searchData on component mount
    useEffect(() => {
        const allTags = [];
        searchData.events.forEach(event => {
            event.tags.forEach(tag => {
                if (!allTags.includes(tag)) allTags.push(tag);
            });
        });
        setTags(allTags);
    }, []);

    // Function to filter search results based on query and selected tags
    const searchFilter = (text) => {
        let filteredEvents = searchData.events.filter(event =>
            selectedTags.some(tag => event.tags.includes(tag)) || selectedTags.length === 0
        ).filter(event => {
            const itemData = event.name ? event.name.toUpperCase() : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        setResults(filteredEvents);
    };

    // Effect to re-filter results whenever query or selected tags change
    useEffect(() => {
        searchFilter(query);
    }, [query, selectedTags]);


    // Function to toggle tag selection
    const toggleTag = (tag) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter(t => t !== tag));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    };

    // Render component UI
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <View style={styles.searchBar}>
                    <TextInput
                        style={styles.input}
                        placeholder="Search for events..."
                        value={query}
                        onChangeText={setQuery}
                    />
                    
                    {query.length > 0 && (
                        // Clear search query button 
                        <TouchableOpacity onPress={() => setQuery('')} style={styles.clearButton}>
                            <Icon name="cancel" size={20} color="grey" />
                        </TouchableOpacity>
                    )}
                </View>
                <View style={styles.tagContainer}>
                    {tags.map((tag, index) => (
                        <TouchableOpacity key={index} onPress={() => toggleTag(tag)} style={[styles.tag, selectedTags.includes(tag) && styles.selectedTag]}>
                            <Text style={styles.tagText}>{tag}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <FlatList
                    data={results}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (
                        <Text style={styles.itemText}>{item.name}</Text>
                    )}
                />
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    input: {
        flex: 1,
    },
    clearButton: {
        marginLeft: 10,
    },
    clearIcon: {
        color: 'grey',
        fontSize: 20,
    },
    tagContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 10,
    },
    tag: {
        borderWidth: 1,
        borderColor: 'grey',
        padding: 8,
        borderRadius: 20,
        marginRight: 10,
        marginBottom: 10,
    },
    selectedTag: {
        backgroundColor: 'grey',
    },
    tagText: {
        color: 'black',
    },
    itemText: {
        padding: 10,
        fontSize: 18,
    },
});

export default SearchComponent;
