import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import LeafletMap from '../src/components/map/leafletMap';
import { Ionicons } from '@expo/vector-icons';

export default function SearchScreen() {
  const router = useRouter();
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');

  return (
    <View style={styles.container}>
      <LeafletMap vehicles={[]} />

      {/* Search overlay */}
      <SafeAreaView style={styles.searchOverlay}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
        </TouchableOpacity>

        <View style={styles.searchCard}>
          <View style={styles.searchRow}>
            <Ionicons name="radio-button-on" size={20} color="#1A1A1A" />
            <TextInput
              style={styles.searchInput}
              placeholder="ORIGIN"
              placeholderTextColor="#666"
              value={origin}
              onChangeText={setOrigin}
            />
          </View>
          <View style={styles.divider} />
          <View style={styles.searchRow}>
            <Ionicons name="location" size={20} color="#1A1A1A" />
            <TextInput
              style={styles.searchInput}
              placeholder="DESTINATION"
              placeholderTextColor="#666"
              value={destination}
              onChangeText={setDestination}
            />
          </View>
        </View>
      </SafeAreaView>

      {/* Bottom nav */}
      <View style={styles.bottomNav}>
        <View style={styles.navPill}>
          <TouchableOpacity style={styles.navItem} onPress={() => router.replace('/home')}>
            <Ionicons name="bus" size={22} color="#fff" />
            <Text style={styles.navText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.navItem, styles.navActive]}>
            <Ionicons name="search" size={22} color="#fff" />
            <Text style={styles.navTextActive}>Search</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => router.push('/settings')}>
            <Ionicons name="settings-outline" size={22} color="#fff" />
            <Text style={styles.navText}>Settings</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  searchOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0,
    paddingTop: 48,
    paddingHorizontal: 16,
    zIndex: 10,
  },
  backBtn: { marginBottom: 8, padding: 4, alignSelf: 'flex-start' },
  searchCard: {
    backgroundColor: '#D9D9D9',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    elevation: 4,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
  },
  searchInput: { flex: 1, fontSize: 15, fontWeight: '700', color: '#1A1A1A' },
  divider: { height: 1, backgroundColor: '#bbb', marginLeft: 30 },
  bottomNav: { position: 'absolute', bottom: 16, left: 16, right: 16 },
  navPill: {
    backgroundColor: '#C8177A',
    borderRadius: 40,
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 16,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  navItem: { alignItems: 'center', paddingHorizontal: 16, paddingVertical: 6, borderRadius: 30, gap: 2 },
  navActive: { backgroundColor: 'rgba(255,255,255,0.25)' },
  navText: { color: '#fff', fontSize: 11 },
  navTextActive: { color: '#fff', fontSize: 11, fontWeight: '700' },
});