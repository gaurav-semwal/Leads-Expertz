import React, { useState, useEffect } from 'react';
import { Pressable, StyleSheet, Text, View, Alert } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

const Recordscreen = () => {
  const [audioRecorderPlayer, setAudioRecorderPlayer] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordTime, setRecordTime] = useState('00:00');
  const [timerRef, setTimerRef] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUri, setAudioUri] = useState(null); // State to hold audio URI

  useEffect(() => {
    initializeAudioRecorder();
  }, []);

  const initializeAudioRecorder = async () => {
    const player = new AudioRecorderPlayer();
    setAudioRecorderPlayer(player);
  };

  const handleRecordNotes = async () => {
    if (!audioRecorderPlayer) {
      console.error('AudioRecorderPlayer is not initialized');
      return;
    }

    try {
      if (!isRecording) {
        const result = await audioRecorderPlayer.startRecorder();
        console.log('Recording started:', result);
        setIsRecording(true);
        setAudioUri(result); // Store the audio URI
        startRecordingTimer();
      } else {
        const stoppedRecording = await audioRecorderPlayer.stopRecorder();
        console.log('Recording stopped:', stoppedRecording);
        setIsRecording(false);
        stopRecordingTimer();
        // Enable playback when recording stops
        await audioRecorderPlayer.startPlayer(audioUri);
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Failed to start/stop recording:', error);
      Alert.alert('Error', `Failed to start/stop recording: ${error.message}`);
    }
  };

  const startRecordingTimer = () => {
    let seconds = 0;
    const timer = setInterval(() => {
      seconds++;
      const formattedTime = new Date(seconds * 1000).toISOString().substr(14, 5);
      setRecordTime(formattedTime);
    }, 1000);
    setTimerRef(timer);
  };

  const stopRecordingTimer = () => {
    clearInterval(timerRef);
    setRecordTime('00:00');
  };

  const handlePlayAudio = async () => {
    try {
      if (!isPlaying) {
        await audioRecorderPlayer.startPlayer(audioUri);
        setIsPlaying(true);
      } else {
        await audioRecorderPlayer.stopPlayer();
        setIsPlaying(false);
      }
    } catch (error) {
      console.error('Failed to start/stop playback:', error);
      Alert.alert('Error', `Failed to start/stop playback: ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.mike}>
          <Text style={styles.text}>{recordTime}</Text>
          <Pressable onPress={handleRecordNotes}>
            <MaterialIcons
              name={isRecording ? 'pause-circle-filled' : 'keyboard-voice'}
              size={75}
              color="#625bc5"
            />
          </Pressable>
        </View>
      
    
      </View>

      <View style={styles.controls}>
          {audioUri && (
            <View style={styles.playButtonContainer}>
              <Pressable onPress={handlePlayAudio} style={styles.playButton}>
                <Feather name={isPlaying ? 'pause' : 'play'} size={30} color="#625bc5" />
                <View style={styles.horizontalLine} />
              </Pressable>
            </View>
          )}
        </View>
    </View>
  );
};

export default Recordscreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    top:10
  },
  mike: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  text: {
    fontSize: 40,
    fontWeight: '600',
  },
  horizontalLine: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  controls: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  playButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButton: {
    marginTop: 20,
    flexDirection:'row',
    alignItems:'center'
  },
});
