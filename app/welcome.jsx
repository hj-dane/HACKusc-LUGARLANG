import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  Dimensions, FlatList, SafeAreaView,
  ActivityIndicator, ImageBackground
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    title: 'WELCOME\nTO\nLUGARLANG!',
    subtitle: null,
  },
  {
    id: '2',
    title: 'Routes\nMade\nEasy',
    subtitle: 'See the available BUS & JEEPNEY routes in real-time here in Cebu',
  },
  {
    id: '3',
    title: "Not sure\nwhere\nyou're\nheaded?",
    subtitle: 'Let LUGARLANG show you the way!',
    isLast: true,
  },
];

function RouteLines() {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <View style={[styles.routeLine, {
        width: 3, height: 260,
        top: 80, left: '30%',
        transform: [{ rotate: '20deg' }]
      }]} />
      <View style={[styles.routeLine, {
        width: 3, height: 220,
        top: 60, left: '60%',
        transform: [{ rotate: '-15deg' }]
      }]} />
      <View style={[styles.routeLine, {
        width: width * 0.7, height: 3,
        top: '45%', left: '10%',
        transform: [{ rotate: '-5deg' }]
      }]} />
      <View style={[styles.routeLine, {
        width: 3, height: 280,
        top: '50%', left: '20%',
        transform: [{ rotate: '30deg' }]
      }]} />
      <View style={[styles.routeLine, {
        width: 3, height: 240,
        top: '55%', left: '65%',
        transform: [{ rotate: '-25deg' }]
      }]} />
      <View style={[styles.routeLine, {
        width: width * 0.6, height: 3,
        top: '75%', left: '15%',
        transform: [{ rotate: '5deg' }]
      }]} />
      <View style={[styles.routeArrow, { top: '20%', left: '28%' }]} />
      <View style={[styles.routeArrow, { top: '38%', left: '58%' }]} />
      <View style={[styles.routeArrow, { top: '62%', left: '18%' }]} />
      <View style={[styles.routeArrow, { top: '78%', left: '68%' }]} />
    </View>
  );
}

export default function WelcomeScreen() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFirstLaunch, setIsFirstLaunch] = useState(null); // null = still checking
  const flatListRef = useRef(null);

  useEffect(() => {
    checkFirstLaunch();
  }, []);

  const checkFirstLaunch = async () => {
    try {
      // ✅ Remove this line before final demo
      await AsyncStorage.removeItem('hasLaunched');

      const hasLaunched = await AsyncStorage.getItem('hasLaunched');
      if (hasLaunched === null) {
        setIsFirstLaunch(true);
        await AsyncStorage.setItem('hasLaunched', 'true');
      } else {
        setIsFirstLaunch(false);
        router.replace('/home');
      }
    } catch (error) {
      console.error('Error checking first launch:', error);
      setIsFirstLaunch(true);
    }
  };

  // ✅ Fix 1: Show loading while checking AsyncStorage
  if (isFirstLaunch === null) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#8B1A4A" />
      </View>
    );
  }

  // ✅ Fix 2: Don't render if redirecting to home
  if (!isFirstLaunch) return null;

  // ✅ Fix 3: skip function defined here
  const skip = () => router.replace('/home');

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
        renderItem={({ item }) => (
          <ImageBackground
            source={require('../assets/images/city-aerial.jpg')}
            style={styles.slide}
            resizeMode="cover"
          >
            {/* Pink tint overlay */}
            <View style={styles.pinkOverlay} />

            {/* Pink route lines */}
            <RouteLines />

            {/* Skip button */}
            {!item.isLast && (
              <TouchableOpacity style={styles.skipBtn} onPress={skip}>
                <Text style={styles.skipText}>SKIP ▶|</Text>
              </TouchableOpacity>
            )}

            {/* Content */}
            <View style={item.isLast ? styles.contentBottom : styles.contentMiddle}>
              <Text style={[styles.title, item.id === '1' && styles.titleSmall]}>
                {item.title}
              </Text>
              {item.subtitle && (
                <Text style={styles.subtitle}>{item.subtitle}</Text>
              )}
            </View>

            {/* Get Started button */}
            {item.isLast && (
              <View style={styles.bottomButtonContainer}>
                <TouchableOpacity
                  style={styles.startBtn}
                  onPress={() => router.replace('/home')}
                >
                  <Text style={styles.startBtnText}>▶  Let's Get Started</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Dots */}
            <View style={styles.dots}>
              {slides.map((_, i) => (
                <View
                  key={i}
                  style={[styles.dot, i === currentIndex && styles.dotActive]}
                />
              ))}
            </View>
          </ImageBackground>
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8b4cc',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e8b4cc',
  },
  slide: {
    width,
    height,
    position: 'relative',
  },
  pinkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(211, 125, 165, 0.55)',
    opacity: 0.98,
  },
  routeLine: {
    position: 'absolute',
    backgroundColor: '#FF69B4',
    borderRadius: 2,
    opacity: 0.85,
  },
  routeArrow: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FF1493',
    opacity: 0.9,
  },
  skipBtn: {
    position: 'absolute',
    top: 75,
    right: 30,
    zIndex: 10,
  },
  skipText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000000',
  },
  contentMiddle: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingTop: 70,
  },
  contentBottom: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 50,
    fontWeight: '900',
    color: '#1A1A1A',
    lineHeight: 55,
    marginBottom: 16,
    textShadowColor: 'rgba(255,255,255,0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  titleSmall: {
    fontSize: 45,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    lineHeight: 26,
    marginTop: 8,
  },
  bottomButtonContainer: {
    position: 'absolute',
    bottom: 140,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  startBtn: {
    backgroundColor: '#8B1A4A',
    paddingVertical: 15,
    paddingHorizontal: 28,
    borderRadius: 30,
    width: '80%',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  startBtnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
  dots: {
    position: 'absolute',
    bottom: 60,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  dot: {
    width: 40,
    height: 4.5,
    backgroundColor: '#1A1A1A',
    borderRadius: 3,
    opacity: 0.5,
  },
  dotActive: {
    opacity: 1,
    backgroundColor: '#8B1A4A',
  },
});