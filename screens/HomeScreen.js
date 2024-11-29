// import React, { useState, useEffect } from 'react';
// import { View, Text, Switch, TouchableOpacity, Image, FlatList, ScrollView, StyleSheet, Dimensions, TextInput } from 'react-native';
// import { Avatar, Button } from 'react-native-paper'; // Using React Native Paper for UI components
// import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons'; // For icons
// import { useTheme } from '@react-navigation/native'; // Assuming theme context is provided

// export default function ProfessionalNetworkingApp() {
//   const [activeTab, setActiveTab] = useState('home');
//   const [isDarkMode, setIsDarkMode] = useState(false);

//   const toggleTheme = () => setIsDarkMode((prev) => !prev);

//   const theme = isDarkMode ? darkTheme : lightTheme;

//   return (
//     <View style={[styles.container, { backgroundColor: theme.background }]}>
//       {/* Header */}
//       <View style={[styles.header, { backgroundColor: theme.headerBackground }]}>
//         <Text style={[styles.title, { color: theme.primaryText }]}>Tanza Mentor</Text>
//         <View style={styles.headerIcons}>
//           <Switch
//             value={isDarkMode}
//             onValueChange={toggleTheme}
//             thumbColor={isDarkMode ? theme.toggleActive : theme.toggleInactive}
//           />
//           <TouchableOpacity style={styles.iconButton}>
//             <FontAwesome5 name="bell" size={20} color={theme.icon} />
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.iconButton}>
//             <FontAwesome5 name="comments" size={20} color={theme.icon} />
//           </TouchableOpacity>
//           <Avatar.Image size={40} source={{ uri: 'https://via.placeholder.com/150' }} />
//         </View>
//       </View>

//       {/* Main Content */}
//       <View style={styles.mainContent}>
//         {/* Tabs */}
//         <View style={styles.tabs}>
//           {['home', 'explore', 'mentors', 'jobs', 'learn'].map((tab) => (
//             <TouchableOpacity
//               key={tab}
//               style={[
//                 styles.tab,
//                 activeTab === tab && { borderBottomColor: theme.primary, borderBottomWidth: 2 },
//               ]}
//               onPress={() => setActiveTab(tab)}
//             >
//               <Text
//                 style={[
//                   styles.tabText,
//                   { color: activeTab === tab ? theme.primary : theme.secondaryText },
//                 ]}
//               >
//                 {tab.charAt(0).toUpperCase() + tab.slice(1)}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>

//         {/* Content based on active tab */}
//         <ScrollView>
//           {activeTab === 'home' && (
//             <>
//               {/* Profile Section */}
//               <View style={styles.profileSection}>
//                 <Avatar.Image size={100} source={{ uri: 'https://via.placeholder.com/150' }} />
//                 <Text style={[styles.profileName, { color: theme.primaryText }]}>John Doe</Text>
//                 <Text style={[styles.profileRole, { color: theme.secondaryText }]}>
//                   Software Engineer
//                 </Text>
//                 <View style={styles.profileActions}>
//                   <Button
//                     mode="contained"
//                     style={[styles.actionButton, { backgroundColor: theme.primary }]}
//                     labelStyle={styles.actionButtonText}
//                   >
//                     Edit Profile
//                   </Button>
//                   <Button mode="outlined" style={styles.actionButton}>
//                     Find a Mentor
//                   </Button>
//                   <Button mode="outlined" style={styles.actionButton}>
//                     Message
//                   </Button>
//                 </View>
//               </View>

//               {/* Highlights Section */}
//               <View>
//                 <Text style={[styles.sectionTitle, { color: theme.primaryText }]}>Highlights</Text>
//                 <FlatList
//                   data={[1, 2, 3, 4, 5, 6]}
//                   horizontal
//                   renderItem={({ item }) => (
//                     <View style={[styles.highlightCard, { backgroundColor: theme.card }]}>
//                       <Text style={styles.highlightEmoji}>🏆</Text>
//                       <Text style={[styles.highlightText, { color: theme.primaryText }]}>
//                         Achievement {item}
//                       </Text>
//                     </View>
//                   )}
//                   keyExtractor={(item) => item.toString()}
//                   showsHorizontalScrollIndicator={false}
//                 />
//               </View>

//               {/* Professional Info */}
//               <View>
//                 <Text style={[styles.sectionTitle, { color: theme.primaryText }]}>
//                   Professional Info
//                 </Text>
//                 <View style={[styles.card, { backgroundColor: theme.card }]}>
//                   <Text style={[styles.cardTitle, { color: theme.primaryText }]}>Skills</Text>
//                   <View style={styles.skills}>
//                     {['React', 'Node.js', 'TypeScript', 'GraphQL', 'AWS'].map((skill) => (
//                       <Text
//                         key={skill}
//                         style={[styles.skillBadge, { backgroundColor: theme.primary }]}
//                       >
//                         {skill}
//                       </Text>
//                     ))}
//                   </View>
//                   <Text style={[styles.cardTitle, { color: theme.primaryText }]}>
//                     Work Experience
//                   </Text>
//                   <View>
//                     <Text style={[styles.experienceText, { color: theme.secondaryText }]}>
//                       • Senior Developer at TechCorp (2020 - Present)
//                     </Text>
//                     <Text style={[styles.experienceText, { color: theme.secondaryText }]}>
//                       • Full Stack Developer at WebSolutions (2017 - 2020)
//                     </Text>
//                   </View>
//                 </View>
//               </View>
//             </>
//           )}
//           {/* Other tabs can follow a similar structure */}
//         </ScrollView>
//       </View>
//     </View>
//   );
// }

// const lightTheme = {
//   background: '#f9f9f9',
//   headerBackground: '#fff',
//   primaryText: '#222',
//   secondaryText: '#555',
//   primary: '#6b5b95',
//   card: '#fff',
//   icon: '#000',
//   toggleActive: '#6b5b95',
//   toggleInactive: '#ccc',
// };

// const darkTheme = {
//   background: '#121212',
//   headerBackground: '#1f1f1f',
//   primaryText: '#eee',
//   secondaryText: '#aaa',
//   primary: '#a682ff',
//   card: '#222',
//   icon: '#fff',
//   toggleActive: '#a682ff',
//   toggleInactive: '#555',
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   header: {
//     padding: 15,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     elevation: 4,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   headerIcons: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   iconButton: {
//     marginHorizontal: 10,
//   },
//   mainContent: {
//     flex: 1,
//     padding: 15,
//   },
//   tabs: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//   },
//   tab: {
//     flex: 1,
//     alignItems: 'center',
//     paddingVertical: 10,
//   },
//   tabText: {
//     fontSize: 14,
//   },
//   profileSection: {
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   profileName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginVertical: 5,
//   },
//   profileRole: {
//     fontSize: 14,
//     marginVertical: 5,
//   },
//   profileActions: {
//     flexDirection: 'row',
//     marginTop: 10,
//   },
//   actionButton: {
//     marginHorizontal: 5,
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginVertical: 10,
//   },
//   highlightCard: {
//     width: 100,
//     height: 100,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 10,
//     marginHorizontal: 5,
//   },
//   highlightEmoji: {
//     fontSize: 24,
//   },
//   highlightText: {
//     fontSize: 12,
//     textAlign: 'center',
//     marginTop: 5,
//   },
//   card: {
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 20,
//   },
//   cardTitle: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   skills: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//   },
//   skillBadge: {
//     paddingVertical: 5,
//     paddingHorizontal: 10,
//     borderRadius: 20,
//     color: '#fff',
//     margin: 5,
//     fontSize: 12,
//   },
//   experienceText: {
//     fontSize: 12,
//     marginVertical: 5,
//   },
// });
import React from 'react';
import { View, Text, TextInput, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For icons (using Expo's Ionicons here)

export default function Home() {
  return (
    <ScrollView style={styles.container}>
      {/* Create Post Card */}
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <View style={styles.header}>
            <Image
              source={{ uri: 'https://via.placeholder.com/150' }}
              style={styles.avatar}
            />
            <TextInput placeholder="What's on your mind?" style={styles.input} />
          </View>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={[styles.button, styles.photoButton]}>
              <Ionicons name="image" size={16} color="#3b82f6" style={styles.icon} />
              <Text style={styles.buttonText}>Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.videoButton]}>
              <Ionicons name="videocam" size={16} color="#10b981" style={styles.icon} />
              <Text style={styles.buttonText}>Video</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Posts List */}
      {[1, 2, 3].map((post) => (
        <View key={post} style={styles.card}>
          <View style={styles.cardContent}>
            <View style={styles.header}>
              <Image
                source={{ uri: `https://via.placeholder.com/150?text=User+${post}` }}
                style={styles.avatar}
              />
              <View>
                <Text style={styles.userName}>John Doe {post}</Text>
                <Text style={styles.userRole}>Software Engineer at TechCorp</Text>
              </View>
            </View>
            <Text style={styles.postText}>
              This is a sample post on your ProNet feed. It could be an update from a connection, a job posting, or an article shared by someone in your network.
            </Text>
            <Image
              source={{ uri: 'https://via.placeholder.com/400x200' }}
              style={styles.postImage}
            />
            <View style={styles.actionRow}>
              <TouchableOpacity style={styles.iconButton}>
                <Ionicons name="thumbs-up" size={16} color="#6b7280" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <Ionicons name="chatbubbles" size={16} color="#6b7280" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <Ionicons name="repeat" size={16} color="#6b7280" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <Ionicons name="send" size={16} color="#6b7280" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardContent: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 16,
  },
  input: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  photoButton: {
    backgroundColor: '#eff6ff',
  },
  videoButton: {
    backgroundColor: '#dcfce7',
  },
  icon: {
    marginRight: 8,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  postText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 16,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconButton: {
    padding: 8,
  },
  userName: {
    fontWeight: 'bold',
  },
  userRole: {
    fontSize: 12,
    color: '#6b7280',
  },
});
