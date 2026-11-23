// STEP 1: Import the React Native building blocks.
// View = web <div>; TextInput = web <input>; Pressable = clickable area.
import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native';

// STEP 2: Receive props from App. Props work just like regular React.
export default function TaskInput({ text, onChangeText, onAdd }) {
  return (
    <View style={styles.row}>
      {/* STEP 3: Controlled input: App owns the text in useState. */}
      <TextInput
        style={styles.input}
        placeholder="What do you need to do?"
        placeholderTextColor="#64748b"
        value={text}
        onChangeText={onChangeText}
        onSubmitEditing={onAdd}
        returnKeyType="done"
        accessibilityLabel="New task"
      />
      {/* STEP 4: onPress is React Native's version of onClick. */}
      <Pressable style={styles.button} onPress={onAdd} accessibilityRole="button">
        <Text style={styles.buttonText}>Add</Text>
      </Pressable>
    </View>
  );
}

// STEP 5: React Native styles are JavaScript objects, not CSS files.
const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 10, marginVertical: 15 },
  input: { flex: 1, minWidth: 0, backgroundColor: 'white', borderWidth: 1,
    borderColor: '#cbd5e1', borderRadius: 12, paddingHorizontal: 12, fontSize: 17 },
  button: { backgroundColor: '#2563eb', paddingHorizontal: 20,
    justifyContent: 'center', borderRadius: 12, minHeight: 52 },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 17 },
});
