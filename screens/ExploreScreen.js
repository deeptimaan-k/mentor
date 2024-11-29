// import React from 'react'
// import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native'
// import { Card, Button, Title, Paragraph, Avatar, IconButton } from 'react-native-paper'
// import { Ionicons } from 'react-native-vector-icons'

// import Layout from '../components/Layout'

// export default function Explore() {
//   return (
//     <Layout>
//       <ScrollView contentContainerStyle={styles.container}>
//         {/* Search Bar */}
//         <View style={styles.searchContainer}>
//           <IconButton
//             icon="search"
//             size={24}
//             color="gray"
//             style={styles.searchIcon}
//           />
//           <TextInput
//             placeholder="Search people, jobs, or courses..."
//             style={styles.searchInput}
//           />
//         </View>

//         {/* People You May Know Section */}
//         <Card style={styles.card}>
//           <Card.Title title="People you may know" titleStyle={styles.cardTitle} />
//           <Card.Content>
//             <View style={styles.peopleContainer}>
//               {[1, 2, 3, 4].map((person) => (
//                 <View key={person} style={styles.personContainer}>
//                   <Avatar.Image
//                     source={require(`../assets/placeholder-avatar-${person}.jpg`)}
//                     size={40}
//                   />
//                   <View style={styles.personInfo}>
//                     <Text style={styles.personName}>Jane Smith {person}</Text>
//                     <Text style={styles.personJob}>UX Designer at DesignCo</Text>
//                   </View>
//                   <Button mode="outlined" compact={true} style={styles.connectButton}>Connect</Button>
//                 </View>
//               ))}
//             </View>
//           </Card.Content>
//         </Card>

//         {/* Trending Topics Section */}
//         <Card style={styles.card}>
//           <Card.Title title="Trending Topics" titleStyle={styles.cardTitle} />
//           <Card.Content>
//             <View style={styles.topicsContainer}>
//               {['AI in Healthcare', 'Remote Work Trends', 'Sustainable Tech', 'Blockchain Applications'].map((topic) => (
//                 <View key={topic} style={styles.topicContainer}>
//                   <Text style={styles.topicTitle}>{topic}</Text>
//                   <Button mode="text" compact={true} style={styles.followButton}>Follow</Button>
//                 </View>
//               ))}
//             </View>
//           </Card.Content>
//         </Card>
//       </ScrollView>
//     </Layout>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//   },
//   searchContainer: {
//     position: 'relative',
//     marginBottom: 16,
//   },
//   searchIcon: {
//     position: 'absolute',
//     left: 12,
//     top: '50%',
//     transform: [{ translateY: -12 }],
//   },
//   searchInput: {
//     paddingLeft: 40,
//     height: 48,
//     backgroundColor: '#f0f0f0',
//     borderRadius: 24,
//     fontSize: 16,
//     paddingHorizontal: 16,
//   },
//   card: {
//     marginBottom: 16,
//   },
//   cardTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   peopleContainer: {
//     marginTop: 8,
//   },
//   personContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   personInfo: {
//     flex: 1,
//     marginLeft: 12,
//   },
//   personName: {
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   personJob: {
//     fontSize: 12,
//     color: 'gray',
//   },
//   connectButton: {
//     marginTop: 8,
//     paddingVertical: 4,
//   },
//   topicsContainer: {
//     marginTop: 8,
//   },
//   topicContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   topicTitle: {
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   followButton: {
//     paddingVertical: 4,
//   },
// })
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const ExploreScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Explore Screen</Text>
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

export default ExploreScreen
