// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// export default function JobsScreen() {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>Discover job opportunities!</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   text: {
//     fontSize: 18,
//   },
// });
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const JobsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Jobs Screen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default JobsScreen
