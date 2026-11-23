// STEP 1: This is our second screen. No navigation package is necessary.
import { View, Text, StyleSheet } from 'react-native';

// STEP 2: Read shared state sent from App as props.
export default function AboutScreen({ completed, total, isDark, theme }) {
  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: theme.text }]}>About this app</Text>
      <Text style={[styles.body, { color: theme.muted }]}>
        Mobile To-Do is a simple React Native class demo inspired by our web to-do app.
      </Text>
      {/* STEP 3: Both screens show the SAME task progress from App. */}
      <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <Text style={[styles.cardTitle, { color: theme.text }]}>Your progress</Text>
        <Text style={[styles.stat, { color: theme.accent }]}>{completed} / {total} tasks complete</Text>
        <Text style={[styles.body, { color: theme.muted }]}>Theme: {isDark ? 'Dark' : 'Light'} mode</Text>
      </View>
      {/* STEP 4: End-user help is part of the Class 42 documentation requirement. */}
      <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <Text style={[styles.cardTitle, { color: theme.text }]}>How to use</Text>
        <Text style={[styles.body, { color: theme.muted }]}>1. Select Tasks and type a new task.</Text>
        <Text style={[styles.body, { color: theme.muted }]}>2. Tap a task to complete it and feel haptic feedback.</Text>
        <Text style={[styles.body, { color: theme.muted }]}>3. Gently shake the phone to highlight an unfinished task.</Text>
        <Text style={[styles.body, { color: theme.muted }]}>4. Use the theme button at the top to switch light/dark mode.</Text>
      </View>
      <Text style={[styles.note, { color: theme.muted }]}>Class 42 · Milestone 2 · Tasks reset when the app reloads.</Text>
    </View>
  );
}

// STEP 5: Make readable text and generous spacing a default.
const styles = StyleSheet.create({
  container: { paddingTop: 12, paddingBottom: 28 },
  title: { fontSize: 28, fontWeight: '800', marginBottom: 14 },
  body: { fontSize: 16, lineHeight: 25, marginBottom: 7 },
  card: { borderRadius: 18, padding: 18, marginTop: 14, borderWidth: 1 },
  cardTitle: { fontSize: 20, fontWeight: '800', marginBottom: 10 },
  stat: { fontSize: 24, fontWeight: '800', marginBottom: 12 },
  note: { marginTop: 26, textAlign: 'center', fontSize: 14 },
});
