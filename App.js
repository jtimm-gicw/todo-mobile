// STEP 1: Import React hooks, mobile elements, and our reusable components.
import { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, Pressable, StyleSheet, StatusBar, KeyboardAvoidingView, Platform } from 'react-native';
import * as Haptics from 'expo-haptics';
import TaskInput from './components/TaskInput';
import TaskItem from './components/TaskItem';
import ShakeTip from './components/ShakeTip';
import AboutScreen from './components/AboutScreen';
import BottomTabs from './components/BottomTabs';
import useShakePicker from './hooks/useShakePicker';
import { themes } from './theme';

// STEP 2: App is the parent, so both screens can share the same state.
export default function App() {
  // STEP 3: The existing task features still use familiar React useState.
  const [tasks, setTasks] = useState([
    { id: '1', text: 'Install Expo Go', complete: false },
    { id: '2', text: 'Build a React Native component', complete: false },
    { id: '3', text: 'Try the phone features', complete: false },
  ]);
  const [text, setText] = useState('');
  const [pickedId, setPickedId] = useState(null);

  // STEP 4: New Class 42 state handles the two screens and theme selection.
  const [screen, setScreen] = useState('tasks');
  const [isDark, setIsDark] = useState(false);
  const theme = isDark ? themes.dark : themes.light;

  // STEP 5: Add, toggle, and delete still use immutable state updates.
  function addTask() {
    const cleaned = text.trim();
    if (!cleaned) return;
    setTasks(current => [...current, {
      id: String(Date.now()) + String(Math.random()), text: cleaned, complete: false,
    }]);
    setText('');
  }
  function toggleTask(id) {
    setTasks(current => current.map(task =>
      task.id === id ? { ...task, complete: !task.complete } : task
    ));
    // Native feature #1: the phone gives feedback when the task changes.
    Haptics.selectionAsync().catch(() => {});
  }
  function deleteTask(id) {
    setTasks(current => current.filter(task => task.id !== id));
    if (pickedId === id) setPickedId(null);
  }

  // STEP 6: Native feature #2: shake to pick one unfinished task.
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
  const progress = tasks.length ? completeCount / tasks.length : 0;

  // STEP 7: Styles change when the theme changes, like CSS variables on the web.
  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={theme.status} backgroundColor={theme.background} />
      <KeyboardAvoidingView style={styles.fill} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={[styles.header, { backgroundColor: theme.background }]}>
          <View style={styles.headerText}>
            <Text style={[styles.eyebrow, { color: theme.accent }]}>CODE 401 · CLASS 42</Text>
            <Text style={[styles.heading, { color: theme.text }]}>Mobile To-Do</Text>
          </View>
          {/* STEP 8: A single large toggle changes the theme on BOTH screens. */}
          <Pressable onPress={() => setIsDark(current => !current)} accessibilityRole="button"
            accessibilityLabel={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            style={[styles.themeButton, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <Text style={[styles.themeButtonText, { color: theme.text }]}>{isDark ? '☀ Light' : '☾ Dark'}</Text>
          </Pressable>
        </View>

        {/* STEP 9: Show one of two screens; App keeps state during screen switches. */}
        <ScrollView style={styles.fill} contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled">
          {screen === 'tasks' ? (
            <View>
              <View style={[styles.progressCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
                <Text style={[styles.progressTitle, { color: theme.text }]}>Today's progress</Text>
                <Text style={[styles.progressCount, { color: theme.muted }]}>{completeCount} of {tasks.length} complete</Text>
                <View style={[styles.track, { backgroundColor: theme.border }]}>
                  <View style={[styles.fillBar, { backgroundColor: theme.accent, width: `${progress * 100}%` }]} />
                </View>
              </View>
              <TaskInput text={text} onChangeText={setText} onAdd={addTask} theme={theme} />
              <Text style={[styles.sectionHeading, { color: theme.text }]}>Your tasks</Text>
              {tasks.length === 0 ? (
                <Text style={[styles.empty, { color: theme.muted }]}>No tasks yet. Add one above to get started.</Text>
              ) : tasks.map(task => (
                <TaskItem key={task.id} task={task} selected={pickedId === task.id}
                  onToggle={toggleTask} onDelete={deleteTask} theme={theme} />
              ))}
              <ShakeTip supported={motionSupported} suggestion={suggestion} theme={theme} />
              <Text style={[styles.note, { color: theme.muted }]}>Tip: Tapping a task also uses phone haptics.</Text>
            </View>
          ) : (
            <AboutScreen completed={completeCount} total={tasks.length} isDark={isDark} theme={theme} />
          )}
        </ScrollView>

        {/* STEP 10: Bottom navigation works with either left or right thumb. */}
        <BottomTabs screen={screen} onChange={setScreen} theme={theme} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// STEP 11: Styles live in JS objects, which React Native calls StyleSheet.
const styles = StyleSheet.create({
  screen: { flex: 1, paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) : 0 },
  fill: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 18, paddingBottom: 12, gap: 10 },
  headerText: { flex: 1 },
  eyebrow: { fontSize: 12, fontWeight: '900', letterSpacing: 1.3 },
  heading: { fontSize: 30, fontWeight: '900', marginTop: 4 },
  themeButton: { minHeight: 52, minWidth: 94, borderWidth: 1, borderRadius: 16, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10 },
  themeButtonText: { fontSize: 16, fontWeight: '800' },
  content: { paddingHorizontal: 20, paddingBottom: 32 },
  progressCard: { borderWidth: 1, borderRadius: 20, padding: 18, marginTop: 14 },
  progressTitle: { fontSize: 22, fontWeight: '800' },
  progressCount: { fontSize: 17, marginTop: 6 },
  track: { height: 12, borderRadius: 8, marginTop: 15, overflow: 'hidden' },
  fillBar: { height: '100%', borderRadius: 8 },
  sectionHeading: { fontSize: 20, fontWeight: '800', marginBottom: 12 },
  empty: { fontSize: 17, textAlign: 'center', paddingVertical: 30 },
  note: { fontSize: 14, marginTop: 12, marginBottom: 4 },
});
