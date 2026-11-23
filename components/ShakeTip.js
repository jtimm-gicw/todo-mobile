// STEP 1: A display-only component needs props, not another useState.
import { View, Text, StyleSheet } from 'react-native';

// STEP 2: App sends the sensor status, selected task, and theme.
export default function ShakeTip({ supported, suggestion, theme }) {
  return (
    <View style={[styles.card, { backgroundColor: theme.soft }]}>
      {/* STEP 3: Tell the user what the phone feature does. */}
      <Text style={[styles.title, { color: theme.softText }]}>📱 Shake to choose</Text>
      <Text style={[styles.description, { color: theme.softText }]}>
        {supported ? 'Gently shake your phone to highlight an unfinished task.' :
          'This phone does not offer the motion sensor. The task list still works.'}
      </Text>
      {suggestion ? <Text style={[styles.choice, { color: theme.softText }]}>Try next: {suggestion}</Text> : null}
    </View>
  );
}

// STEP 4: A high-contrast panel makes the feature easy to notice in both themes.
const styles = StyleSheet.create({
  card: { borderRadius: 18, padding: 18, marginTop: 12 },
  title: { fontSize: 19, fontWeight: '800', marginBottom: 8 },
  description: { fontSize: 16, lineHeight: 24 },
  choice: { fontSize: 17, lineHeight: 25, fontWeight: '800', marginTop: 12 },
});
