// STEP 1: React Native uses TextInput and Pressable instead of HTML input/button.
import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native';

// STEP 2: text, callbacks, and theme arrive from the parent App via props.
export default function TaskInput({ text, onChangeText, onAdd, theme }) {
  return (
    <View style={styles.wrap}>
      {/* STEP 3: App's useState controls what appears in this input. */}
      <TextInput
        style={[styles.input, { backgroundColor: theme.card, color: theme.text, borderColor: theme.border }]}
        placeholder="Add something to do…"
        placeholderTextColor={theme.placeholder}
        value={text}
        onChangeText={onChangeText}
        onSubmitEditing={onAdd}
        returnKeyType="done"
        accessibilityLabel="New task name"
      />
      {/* STEP 4: Big tap targets are easier for thumbs to reach. */}
      <Pressable onPress={onAdd} accessibilityRole="button" accessibilityLabel="Add task"
        style={({ pressed }) => [styles.button, { backgroundColor: theme.accent, opacity: pressed ? 0.75 : 1 }]}>
        <Text style={[styles.buttonText, { color: theme.accentText }]}>+ Add</Text>
      </Pressable>
    </View>
  );
}

// STEP 5: StyleSheet is CSS-in-JS; values are JavaScript objects, not CSS classes.
const styles = StyleSheet.create({
  wrap: { gap: 10, marginTop: 18, marginBottom: 20 },
  input: { minHeight: 56, borderWidth: 1.5, borderRadius: 16, paddingHorizontal: 16, fontSize: 18 },
  button: { minHeight: 52, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  buttonText: { fontSize: 18, fontWeight: '800' },
});
