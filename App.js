// STEP 1: Import familiar React hooks and mobile screen elements.
import { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet, StatusBar } from 'react-native';
import * as Haptics from 'expo-haptics';
import TaskInput from './components/TaskInput';
import TaskItem from './components/TaskItem';
import ShakeTip from './components/ShakeTip';
import useShakePicker from './hooks/useShakePicker';

// STEP 2: App is the parent component, just like in web-based React.
export default function App() {
  // STEP 3: useState stores our list and the text typed into the input.
  // This MVP intentionally stores tasks only in memory (no backend or login).
  const [tasks, setTasks] = useState([
    { id: '1', text: 'Install Expo Go', complete: false },
    { id: '2', text: 'Build a React Native component', complete: false },
    { id: '3', text: 'Try the phone features', complete: false },
  ]);
  const [text, setText] = useState('');
  const [pickedId, setPickedId] = useState(null);

  // STEP 4: Add a new task with a unique ID. Avoid changing old state directly.
  function addTask() {
    const cleaned = text.trim();
    if (!cleaned) return;
    setTasks(current => [
      ...current,
      { id: String(Date.now()) + String(Math.random()), text: cleaned, complete: false },
    ]);
    setText('');
  }

  // STEP 5: Mark a task completed. Native phone feature #1: haptic vibration.
  function toggleTask(id) {
    setTasks(current => current.map(task =>
      task.id === id ? { ...task, complete: !task.complete } : task
    ));
    // Haptics provides a quick physical response when the checkbox is tapped.
    Haptics.selectionAsync().catch(() => {});
  }

  // STEP 6: Delete a task (same filter() idea as React web).
  function deleteTask(id) {
    setTasks(current => current.filter(task => task.id !== id));
    if (pickedId === id) setPickedId(null);
  }

  // STEP 7: Native phone feature #2: shake the device to choose a task.
  function pickTask() {
    const unfinished = tasks.filter(task => !task.complete);
    if (unfinished.length === 0) { setPickedId(null); return; }
    const choice = unfinished[Math.floor(Math.random() * unfinished.length)];
    setPickedId(choice.id);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
  }
  const motionSupported = useShakePicker(pickTask);
  const completeCount = tasks.filter(task => task.complete).length;
  const suggestion = tasks.find(task => task.id === pickedId && !task.complete)?.text;

  // STEP 8: Build the screen with mobile elements, not HTML tags.
  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.smallTitle}>CODE 401 · CLASS 41</Text>
        <Text style={styles.heading}>✅ Mobile To-Do</Text>
        <Text style={styles.subtitle}>Your first React Native app!</Text>
        <Text style={styles.progress}>{completeCount} of {tasks.length} tasks completed</Text>

        {/* STEP 9: Pass data and callback functions down as props. */}
        <TaskInput text={text} onChangeText={setText} onAdd={addTask} />
        <View>
          {tasks.length === 0 ? (
            <Text style={styles.empty}>No tasks yet. Add your first task above.</Text>
          ) : tasks.map(task => (
            <TaskItem
              key={task.id} task={task} selected={pickedId === task.id}
              onToggle={toggleTask} onDelete={deleteTask}
            />
          ))}
        </View>
        <View style={styles.tip}>
          <Text style={styles.tipTitle}>📳 Phone feature #1: Haptics</Text>
          <Text style={styles.tipText}>Tap a task to complete it and feel a small vibration.</Text>
        </View>
        <ShakeTip supported={motionSupported} suggestion={suggestion} />
        <Text style={styles.footer}>Milestone 1 MVP · No server required · Restarting resets tasks</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

// STEP 10: React Native StyleSheet replaces CSS class names.
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#f1f5f9' },
  content: { padding: 20, paddingTop: 34, paddingBottom: 48 },
  smallTitle: { fontSize: 14, color: '#1d4ed8', fontWeight: 'bold', letterSpacing: 2 },
  heading: { fontSize: 32, fontWeight: 'bold', color: '#0f172a', marginTop: 9 },
  subtitle: { fontSize: 18, color: '#475569', marginTop: 5 },
  progress: { fontSize: 17, color: '#1e40af', fontWeight: 'bold', marginTop: 20 },
  empty: { fontSize: 17, color: '#475569', padding: 20, textAlign: 'center' },
  tip: { backgroundColor: '#ede9fe', borderRadius: 14, marginTop: 14, padding: 15 },
  tipTitle: { fontSize: 17, fontWeight: 'bold', color: '#6d28d9' },
  tipText: { fontSize: 15, marginTop: 6, color: '#4c1d95' },
  footer: { marginTop: 25, textAlign: 'center', color: '#64748b', fontSize: 13 },
});
