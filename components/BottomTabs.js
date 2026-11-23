// STEP 1: Two tabs act like two screens without adding a navigation library.
import { View, Text, Pressable, StyleSheet } from 'react-native';

// STEP 2: App stores the selected tab; this child only displays it.
export default function BottomTabs({ screen, onChange, theme }) {
  return (
    <View style={[styles.bar, { backgroundColor: theme.nav, borderColor: theme.border }]}>
      {/* STEP 3: Both buttons have 56px minimum height for left/right thumb use. */}
      {[
        { key: 'tasks', icon: '☑', label: 'Tasks' },
        { key: 'about', icon: 'ⓘ', label: 'About & Demo' },
      ].map(item => (
        <Pressable key={item.key} onPress={() => onChange(item.key)}
          accessibilityRole="tab" accessibilityState={{ selected: screen === item.key }}
          accessibilityLabel={`Show ${item.label} screen`}
          style={[styles.tab, screen === item.key && { backgroundColor: theme.soft }]}>
          <Text style={[styles.icon, { color: screen === item.key ? theme.accent : theme.muted }]}>{item.icon}</Text>
          <Text style={[styles.label, { color: screen === item.key ? theme.accent : theme.muted }]}>{item.label}</Text>
        </Pressable>
      ))}
    </View>
  );
}

// STEP 4: Bottom tabs sit near the thumbs and are equally wide.
const styles = StyleSheet.create({
  bar: { flexDirection: 'row', gap: 10, padding: 9, borderTopWidth: 1 },
  tab: { flex: 1, minHeight: 60, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  icon: { fontSize: 23, fontWeight: '800' },
  label: { fontSize: 14, fontWeight: '800', marginTop: 2 },
});
