// STEP 1: Expo Sensors lets our app listen to phone movement.
// Accelerometer measures motion on the x, y and z axes.
import { useEffect, useRef, useState } from 'react';
import { Accelerometer } from 'expo-sensors';

// STEP 2: A custom hook keeps motion code separate from our task screen.
export default function useShakePicker(onShake) {
  const [available, setAvailable] = useState(false);
  const lastShake = useRef(0);
  const callback = useRef(onShake);

  // STEP 3: Keep the newest function without restarting the sensor listener.
  useEffect(() => { callback.current = onShake; }, [onShake]);

  // STEP 4: Subscribe when the screen opens and unsubscribe when it closes.
  useEffect(() => {
    let subscription;
    let mounted = true;
    async function start() {
      try {
        const supported = await Accelerometer.isAvailableAsync();
        if (!mounted) return;
        setAvailable(supported);
        if (!supported) return;
        Accelerometer.setUpdateInterval(180);
        subscription = Accelerometer.addListener(({ x, y, z }) => {
          // Motion values include gravity; detect an obvious change from ~1g.
          const movement = Math.abs(Math.sqrt(x*x + y*y + z*z) - 1);
          const now = Date.now();
          // STEP 5: The 1400ms cooldown prevents repeated shake selections.
          if (movement > 1.3 && now - lastShake.current > 1400) {
            lastShake.current = now;
            callback.current();
          }
        });
      } catch (error) {
        // Some emulators and devices do not have this sensor.
        if (mounted) setAvailable(false);
      }
    }
    start();
    return () => { mounted = false; subscription?.remove(); };
  }, []);

  // STEP 6: Give App a simple status it can display to the student.
  return available;
}
