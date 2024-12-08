import React, { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Text, Button } from '@rneui/themed';

export default function VideoCallScreen() {
  const [notes, setNotes] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.videoContainer}>
        <Text style={styles.placeholderText}>Video call interface would be integrated here</Text>
      </View>
      <View style={styles.controlsContainer}>
        <Button
          title="Mute"
          type="outline"
          buttonStyle={styles.controlButton}
          titleStyle={styles.controlButtonText}
        />
        <Button
          title="Turn off camera"
          type="outline"
          buttonStyle={styles.controlButton}
          titleStyle={styles.controlButtonText}
        />
        <Button
          title="End call"
          buttonStyle={[styles.controlButton, styles.endCallButton]}
          titleStyle={styles.controlButtonText}
        />
      </View>
      <View style={styles.notesContainer}>
        <Text style={styles.notesTitle}>Session Notes</Text>
        <TextInput
          style={styles.notesInput}
          multiline
          numberOfLines={5}
          placeholder="Take notes during your session..."
          value={notes}
          onChangeText={setNotes}
        />
        <Button
          title="Save Notes"
          buttonStyle={styles.saveButton}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  videoContainer: {
    aspectRatio: 16 / 9,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  placeholderText: {
    color: '#ffffff',
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  controlButton: {
    paddingHorizontal: 10,
  },
  controlButtonText: {
    fontSize: 12,
  },
  endCallButton: {
    backgroundColor: '#ff0000',
  },
  notesContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
  },
  notesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  notesInput: {
    borderColor: '#e0e0e0',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    height: 100,
  },
  saveButton: {
    backgroundColor: '#6200ee',
  },
});

