// STEP 1: This reusable child shows ONE task; App owns the actual task list.
import { View, Text, Pressable, StyleSheet } from 'react-native';

// STEP 2: Callbacks travel down as props and send taps back to App.
export default function TaskItem({ task, onToggle, onDelete, selected, theme }) {
  return (
    <View style={[styles.card, { backgroundColor: selected ? theme.selected : theme.card,
      borderColor: selected ? theme.selectedBorder : theme.border }]}>
      {/* STEP 3: The whole left side is a large 52px tap target. */}
      <Pressable onPress={() => onToggle(task.id)} accessibilityRole="checkbox"
        accessibilityState={{ checked: task.complete }}
        accessibilityLabel={`${task.text}, ${task.complete ? 'completed' : 'incomplete'}`}
        style={styles.taskTouch}>
        <Text style={[styles.checkbox, { color: theme.accent }]}>{task.complete ? '☑' : '☐'}</Text>
        <Text style={[styles.taskText, { color: task.complete ? theme.muted : theme.text },
          task.complete && styles.done]}>{task.text}</Text>
      </Pressable>
      {/* STEP 4: A separate, labeled Delete target helps avoid accidental taps. */}
      <Pressable onPress={() => onDelete(task.id)} accessibilityRole="button"
        accessibilityLabel={`Delete task ${task.text}`} style={styles.deleteButton}>
        <Text style={[styles.deleteText, { color: theme.danger }]}>Delete</Text>
      </Pressable>
    </View>
  );
}

// STEP 5: Flex lets long task names wrap instead of pushing buttons off-screen.
const styles = StyleSheet.create({
  card: { flexDirection: 'row', alignItems: 'center', borderWidth: 1.5,
    borderRadius: 16, marginBottom: 10, paddingHorizontal: 8 },
  taskTouch: { flex: 1, flexDirection: 'row', alignItems: 'center', minHeight: 62, paddingVertical: 8 },
  checkbox: { fontSize: 28, paddingHorizontal: 8 },
  taskText: { flex: 1, flexShrink: 1, fontSize: 17, lineHeight: 24, fontWeight: '500' },
  done: { textDecorationLine: 'line-through' },
  deleteButton: { minWidth: 64, minHeight: 52, justifyContent: 'center', alignItems: 'center', marginLeft: 4 },
  deleteText: { fontSize: 15, fontWeight: '800' },
});
