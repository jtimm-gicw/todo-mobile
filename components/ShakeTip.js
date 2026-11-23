// STEP 1: Small display component: it explains the second phone feature.
import { View, Text, StyleSheet } from 'react-native';

// STEP 2: These props are supplied by App; no extra state is needed here.
export default function ShakeTip({ supported, suggestion }) {
  return (
    <View style={styles.box}>
      {/* STEP 3: Motion detection uses the phone's accelerometer. */}
      <Text style={styles.title}>📱 Phone feature #2: Motion</Text>
      <Text style={styles.text}>
        {supported ? 'Shake your phone to pick a task to work on!' :
          'Motion sensor unavailable. You can still add and complete tasks.'}
      </Text>
      {suggestion ? <Text style={styles.picked}>Try this: {suggestion}</Text> : null}
    </View>
  );
}

// STEP 4: A simple colored card makes the feature easy to spot.
const styles = StyleSheet.create({
  box: { backgroundColor: '#dbeafe', padding: 15, borderRadius: 14, marginTop: 12 },
  title: { color: '#1d4ed8', fontSize: 17, fontWeight: 'bold', marginBottom: 6 },
  text: { color: '#1e3a8a', fontSize: 15 },
  picked: { color: '#92400e', fontWeight: 'bold', fontSize: 17, marginTop: 8 },
});
