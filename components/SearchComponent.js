import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import searchData from '../data/DummySearchData.json'; // Adjust the path as necessary

const SearchComponent = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    // Generate a list of unique tags for auto-suggestion
    const allTags = [];
    searchData.events.forEach(event => {
      event.tags.forEach(tag => {
        if (!allTags.includes(tag)) {
          allTags.push(tag);
        }
      });
    });
    setTags(allTags);
  }, []);

  const searchFilter = (text) => {
    let filteredEvents = searchData.events;

    // Filter by selected tags if any
    if (selectedTags.length > 0) {
      filteredEvents = filteredEvents.filter(event =>
        selectedTags.some(tag => event.tags.includes(tag))
      );
    }

    // Further filter by text query
    if (text) {
      filteredEvents = filteredEvents.filter(event => {
        const itemData = event.name ? event.name.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
    }

    setResults(filteredEvents);
  };

  useEffect(() => {
    searchFilter(query);
  }, [query, selectedTags]);

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search for events..."
        value={query}
        onChangeText={setQuery}
      />
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
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  itemText: {
    padding: 10,
    fontSize: 18,
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
});

export default SearchComponent;
