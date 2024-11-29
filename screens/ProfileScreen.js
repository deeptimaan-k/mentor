// import React from 'react'
// import { View, Text, StyleSheet, ScrollView, Image } from 'react-native'
// import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper'
// import { Ionicons } from 'react-native-vector-icons'

// import Layout from '../components/Layout'

// export default function Profile() {
//   return (
//     <Layout>
//       <ScrollView contentContainerStyle={styles.container}>
//         {/* Profile Card */}
//         <Card style={styles.card}>
//           <Card.Content style={styles.cardContent}>
//             <View style={styles.avatarContainer}>
//               <Avatar.Image source={require('../assets/placeholder-avatar.jpg')} size={96} />
//             </View>
//             <Text style={styles.name}>John Doe</Text>
//             <Text style={styles.jobTitle}>Software Engineer at TechCorp</Text>
//             <View style={styles.buttonContainer}>
//               <Button mode="contained" onPress={() => {}} style={styles.button}>
//                 Edit Profile
//               </Button>
//               <Button mode="outlined" onPress={() => {}} style={styles.button}>
//                 Share
//               </Button>
//             </View>
//           </Card.Content>
//         </Card>

//         {/* About Section */}
//         <Card style={styles.card}>
//           <Card.Title title="About" titleStyle={styles.cardTitle} />
//           <Card.Content>
//             <Text style={styles.text}>
//               Passionate software engineer with 5+ years of experience in full-stack development. Specializing in React, Node.js, and cloud technologies.
//             </Text>
//           </Card.Content>
//         </Card>

//         {/* Experience Section */}
//         <Card style={styles.card}>
//           <Card.Title title="Experience" titleStyle={styles.cardTitle} />
//           <Card.Content>
//             <View style={styles.experienceContainer}>
//               <View>
//                 <Text style={styles.experienceTitle}>Senior Software Engineer</Text>
//                 <Text style={styles.experienceSubTitle}>TechCorp • 2020 - Present</Text>
//               </View>
//               <View>
//                 <Text style={styles.experienceTitle}>Software Developer</Text>
//                 <Text style={styles.experienceSubTitle}>WebSolutions Inc. • 2017 - 2020</Text>
//               </View>
//             </View>
//           </Card.Content>
//         </Card>

//         {/* Skills Section */}
//         <Card style={styles.card}>
//           <Card.Title title="Skills" titleStyle={styles.cardTitle} />
//           <Card.Content>
//             <View style={styles.skillsContainer}>
//               {['React', 'Node.js', 'TypeScript', 'GraphQL', 'AWS', 'Docker', 'Kubernetes'].map((skill) => (
//                 <Text key={skill} style={styles.skill}>{skill}</Text>
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
//   card: {
//     marginBottom: 16,
//   },
//   cardContent: {
//     padding: 16,
//     alignItems: 'center',
//   },
//   avatarContainer: {
//     marginBottom: 16,
//   },
//   name: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 8,
//   },
//   jobTitle: {
//     fontSize: 14,
//     color: 'gray',
//     marginBottom: 16,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginTop: 8,
//   },
//   button: {
//     marginHorizontal: 8,
//   },
//   cardTitle: {
//     fontSize: 18,
//   },
//   text: {
//     fontSize: 14,
//     color: 'gray',
//   },
//   experienceContainer: {
//     marginTop: 8,
//   },
//   experienceTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   experienceSubTitle: {
//     fontSize: 12,
//     color: 'gray',
//   },
//   skillsContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     marginTop: 8,
//   },
//   skill: {
//     backgroundColor: '#f0f0f0',
//     paddingVertical: 4,
//     paddingHorizontal: 8,
//     marginRight: 8,
//     marginBottom: 8,
//     borderRadius: 12,
//     fontSize: 12,
//   },
// })
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Profile Screen</Text>
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

export default ProfileScreen
