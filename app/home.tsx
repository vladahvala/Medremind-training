import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Animated, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Svg, { Circle } from "react-native-svg";

const {width} = Dimensions.get('window');

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const QUICK_ACTIONS = [
    {
        icon: 'add-circle-outline' as const,
        label: 'Add \nMedication',
        route: '/medications/add' as const,
        color: "#2E7D32",
        gradient: ["#4CAF50", "#2E7D32"] as [string, string],
    },
    {
        icon: "calendar-outline" as const,
        label: "Calendar\nView",
        route: "/calendar" as const,
        color: "#1976D2",
        gradient: ["#2196F3", "#1976D2"] as [string, string],
      },
      {
        icon: "time-outline" as const,
        label: "History\nLog",
        route: "/history" as const,
        color: "#C2185B",
        gradient: ["#E91E63", "#C2185B"] as [string, string],
      },
      {
        icon: "medical-outline" as const,
        label: "Refill\nTracker",
        route: "/refills" as const,
        color: "#E64A19",
        gradient: ["#FF5722", "#E64A19"] as [string, string],
      },
];

interface CircularProgressProps{
    progress: number;
    totalDoses: number;
    completeDoses: number;
}

function CircularProgress({
    progress,
    totalDoses,
    completeDoses,
}: CircularProgressProps){
   const animationValue = useRef(new Animated.Value(0)).current;
   const size = width * 0.55
   const strokeWidth = 15
   const radius = (size - strokeWidth) / 2
   const circumference = 2 * Math.PI * radius

   useEffect (() => {
    Animated.timing(animationValue, {
        toValue: progress,
        duration: 1000,
        useNativeDriver: true,
    }).start();
   }, [progress]);

   const strokeDashoffset = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [circumference, 0],
   });

   const router = useRouter();

   return (
    <View style={styles.progressContainer}>
        <View style={styles.progressTextContainer}>
            <Text style={styles.progressPercentage}>{Math.round(progress)}%</Text>
            <Text style={styles.progressLabel}>{completeDoses} of {totalDoses} doeses</Text>
        </View>
        <Svg width={size} height={size} style={styles.progressRing}>
            <Circle
            cx={size/2}
            cy={size/2}
            r={radius}
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth={strokeWidth}
            fill="none"
            />
            <AnimatedCircle
            cx={size/2}
            cy={size/2}
            r={radius}
            stroke="white"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform={`rotate(-90 ${size/2} ${size/2})`}
            />
        </Svg>
    </View>
   )
}

export default function HomeScreen() {

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <LinearGradient colors={["#1A8E2D", "#146922"]} style={styles.header}>
                <View style={styles.headerContent}>
                    <View style={styles.headerTop}>
                        <View style={{flex: 1}}>
                            <Text style={styles.greeting}>Daily Progress</Text>
                        </View>
                        <TouchableOpacity style={styles.notificationButton}>
                            <Ionicons name="notifications-outline" size={24} color="white" />
                            {   <View style={styles.notificationBadge}>
                                    <Text style={styles.notificationCount}>
                                        1
                                    </Text>
                                </View>
                            }
                        </TouchableOpacity>
                    </View>
                    {/* circular progress*/}
                    <CircularProgress
                        progress={50}
                        totalDoses={10}
                        completeDoses={5}
                    />
                </View>
            </LinearGradient>
            <View style={styles.content} >
                <View style={styles.quickActionsContainer}>
                    <Text style={styles.sectionTitle}> Quick Actions </Text>
                    <View style={styles.quickActionsGrid}>
                           {QUICK_ACTIONS.map((action) => (
                            <Link href={action.route} key={action.label} asChild>
                                <TouchableOpacity style={styles.actionButton}>
                                    <LinearGradient colors={action.gradient} style={styles.actionGradient}>
                                        <View style={styles.actionContent}>
                                            <View style={styles.actionIcon}>
                                                <Ionicons name={action.icon} size={24} color="white" />
                                            </View>
                                            
                                            <Text style={styles.actionLabel}>{action.label}</Text>
                                        </View>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </Link>
                        ))} 
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    header: {
        paddingTop: 50,
        paddingBottom: 25,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30
    },
    headerContent:{
        alignItems: 'center',
        paddingHorizontal: 20
    },
    headerTop:{
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginBottom: 20,
    },

    greeting:{
        fontSize: 18,
        fontWeight: '600',
        color: 'white',
        opacity: 0.9,
    },
    content: {
        flex: 1,
        paddingTop: 20,
    },
    notificationButton:{
        position: 'relative',
        padding: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        borderRadius: 12,
        marginLeft: 8,
    },
    notificationBadge:{
        position: 'absolute',
        top: -4,
        right: -4,
        backgroundColor: '#ff5252',
        borderRadius: 10,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 4,
        borderWidth: 2,
        minWidth: 20,
        borderColor: '#146922',
    },
    notificationCount:{
        fontSize: 11,
        fontWeight: 'bold',
        color: 'white',
    },
    progressContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
    },
    progressTextContainer: {
        position: 'absolute',
        zIndex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    progressPercentage: {
        fontSize: 36,
        color: 'white',
        fontWeight: 'bold',
    },
    progressLabel: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.9)',
        fontWeight: 'bold',
    },
    progressDetails: {
        fontSize: 11,
        color: 'white',
        fontWeight: 'bold',
    },

    progressRing: {
        transform: [{ rotate: "-90deg"}],
    },

    quickActionsContainer: {
        paddingHorizontal: 20,
        marginBottom: 25,
    },
    quickActionsGrid: {
        flexDirection: "row",
        flexWrap: 'wrap',
        gap: 12,
        marginTop:15,
    },
    actionButton:{
        width:(width - 52) / 2,
        height: 110,
        borderRadius: 16,
        overflow: 'hidden',
    },
    actionGradient: {
        flex: 1,
        padding: 15,
    },
    actionContent: {
        flex: 1,
        justifyContent: "space-between",
      },
    actionIcon: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionLabel: {
        fontSize: 14,
        color: 'white',
        fontWeight: '600',
        marginTop: 8,
    },

    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1a1a1a',
        marginBottom: 5,
    }
})