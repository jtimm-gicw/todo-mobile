// STEP 1: Import only the mobile components this file needs.
import { View, Text, Pressable, StyleSheet } from 'react-native';

// STEP 2: Each task comes from App using props.
export default function TaskItem({ task, onToggle, onDelete, selected }) {
  return (
    <View style={[styles.card, selected && styles.selected]}>
      {/* STEP 3: Tap the task to mark it complete (native haptic runs in App). */}
      <Pressable
        style={styles.taskButton}
        onPress={() => onToggle(task.id)}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: task.complete }}
        accessibilityLabel={`${task.text}, ${task.complete ? 'done' : 'not done'}`}
      >
        <Text style={styles.check}>{task.complete ? '☑' : '☐'}</Text>
        <Text style={[styles.text, task.complete && styles.done]}>{task.text}</Text>
      </Pressable>
      {/* STEP 4: A second button deletes this task, identified by id. */}
      <Pressable onPress={() => onDelete(task.id)} accessibilityRole="button"
        accessibilityLabel={`Delete ${task.text}`} style={styles.deleteButton}>
        <Text style={styles.deleteText}>Delete</Text>
      </Pressable>
    </View>
  );
}

// STEP 5: StyleSheet collects the colors, spacing, and text sizes.
const styles = StyleSheet.create({
  card: { backgroundColor: 'white', borderRadius: 14, padding: 12,
    marginBottom: 10, flexDirection: 'row', alignItems: 'center', borderWidth: 2,
    borderColor: 'transparent' },
  selected: { borderColor: '#f59e0b', backgroundColor: '#fffbeb' },
  taskButton: { flex: 1, flexDirection: 'row', alignItems: 'center', minHeight: 48 },
  check: { fontSize: 26, marginRight: 10, color: '#2563eb' },
  text: { fontSize: 18, color: '#0f172a', flexShrink: 1 },
  done: { textDecorationLine: 'line-through', color: '#64748b' },
  deleteButton: { padding: 8, marginLeft: 5 },
  deleteText: { color: '#b91c1c', fontSize: 15, fontWeight: 'bold' },
});
