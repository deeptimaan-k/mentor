// import React from 'react'
// import { View, Text, Image, TextInput, ScrollView, StyleSheet } from 'react-native'
// import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper'
// import { ImageIcon, VideoIcon, ThumbsUpIcon, MessageCircleIcon, RepeatIcon, SendIcon } from 'react-native-vector-icons/Feather' // Using Feather icons

// import Layout from './components/Layout'

// export default function Home() {
//   return (
//     <Layout>
//       <ScrollView contentContainerStyle={styles.container}>
//         {/* New Post Card */}
//         <Card style={styles.card}>
//           <Card.Content style={styles.cardContent}>
//             <View style={styles.header}>
//               <Avatar.Image source={require('./assets/placeholder-avatar.jpg')} size={40} />
//               <TextInput style={styles.input} placeholder="What's on your mind?" />
//             </View>
//             <View style={styles.buttonContainer}>
//               <Button mode="text" icon={() => <ImageIcon size={20} />} labelStyle={styles.buttonText}>
//                 Photo
//               </Button>
//               <Button mode="text" icon={() => <VideoIcon size={20} />} labelStyle={styles.buttonText}>
//                 Video
//               </Button>
//             </View>
//           </Card.Content>
//         </Card>

//         {/* Feed Posts */}
//         {[1, 2, 3].map((post) => (
//           <Card key={post} style={styles.card}>
//             <Card.Content style={styles.cardContent}>
//               <View style={styles.header}>
//                 <Avatar.Image source={require(`./assets/placeholder-avatar-${post}.jpg`)} size={40} />
//                 <View>
//                   <Title>John Doe {post}</Title>
//                   <Paragraph style={styles.subtitle}>Software Engineer at TechCorp</Paragraph>
//                 </View>
//               </View>
//               <Text style={styles.postText}>
//                 This is a sample post on your ProNet feed. It could be an update from a connection, a job posting, or an article shared by someone in your network.
//               </Text>
//               <Image source={require('./assets/placeholder.svg')} style={styles.postImage} />
//               <View style={styles.buttonRow}>
//                 <Button icon={() => <ThumbsUpIcon size={20} />} mode="text" labelStyle={styles.iconButton} />
//                 <Button icon={() => <MessageCircleIcon size={20} />} mode="text" labelStyle={styles.iconButton} />
//                 <Button icon={() => <RepeatIcon size={20} />} mode="text" labelStyle={styles.iconButton} />
//                 <Button icon={() => <SendIcon size={20} />} mode="text" labelStyle={styles.iconButton} />
//               </View>
//             </Card.Content>
//           </Card>
//         ))}
//       </ScrollView>
//     </Layout>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     padding: 16,
//   },
//   card: {
//     marginBottom: 16,
//   },
//   cardContent: {
//     padding: 16,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   input: {
//     flex: 1,
//     marginLeft: 8,
//     padding: 8,
//     borderRadius: 16,
//     backgroundColor: '#f0f0f0',
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 8,
//   },
//   buttonText: {
//     fontSize: 14,
//   },
//   subtitle: {
//     fontSize: 12,
//     color: 'gray',
//   },
//   postText: {
//     fontSize: 14,
//     marginBottom: 8,
//   },
//   postImage: {
//     width: '100%',
//     height: 200,
//     borderRadius: 8,
//     marginBottom: 8,
//   },
//   buttonRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 8,
//   },
//   iconButton: {
//     paddingHorizontal: 8,
//   },
// })
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
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

export default HomeScreen
