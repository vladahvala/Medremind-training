import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useRef } from 'react';
import { Animated, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Svg, { Circle } from "react-native-svg";

const {width} = Dimensions.get('window');

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

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

   return (
    <View>
        <View>
            <Text>{Math.round(progress)}%</Text>
            <Text>{completeDoses} of {totalDoses} doeses</Text>
        </View>
        <Svg width={size} height={size}>
            <Circle
            cx={size/2}
            cy={size/2}
            r={radius}
            stroke="rgba(255, 255, 55, 0.2)"
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
                        <TouchableOpacity>
                            <Ionicons name="notifications-outline" size={24} color="white" />
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
        justifyContent: 'space-between',
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
        backgroundColor: 'white',
        fontWeight: 'bold',
    },
    progressDetails: {
        fontSize: 11,
        color: 'white',
        fontWeight: 'bold',
    },
})