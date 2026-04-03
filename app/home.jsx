import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  SafeAreaView, TextInput
} from 'react-native';
import { useRouter } from 'expo-router';
import LeafletMap from '../src/components/map/leafletMap';
import { useVehiclePolling } from '../src/hooks/useVehiclePolling';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const router = useRouter();
  const { vehicles } = useVehiclePolling();
  const [showNotif, setShowNotif] = useState(false);

  return (
    <View style={styles.container}>
      {/* Full screen map */}
      <LeafletMap vehicles={vehicles} />

      {/* Top bar */}
      <SafeAreaView style={styles.topBar}>
        <TouchableOpacity
          style={styles.searchBar}
          onPress={() => router.push('/search')}
        >
          <Text style={styles.searchText}>Search</Text>
          <Ionicons name="search" size={20} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.notifBtn}
          onPress={() => setShowNotif(!showNotif)}
        >
          <Ionicons name="notifications-outline" size={24} color="#1A1A1A" />
        </TouchableOpacity>
      </SafeAreaView>

      {/* Notification dropdown */}
      {showNotif && (
        <View style={styles.notifDropdown}>
          {['Just Now', '30 min ago', '5 hr ago', 'Yesterday', 'Yesterday'].map((time, i) => (
            <View key={i} style={styles.notifItem}>
              <Text style={styles.notifTitle}>Headline</Text>
              <Text style={styles.notifTime}>{time}</Text>
            </View>
          ))}
          <TouchableOpacity style={styles.markRead}>
            <Ionicons name="mail-outline" size={16} color="#1A1A1A" />
            <Text style={styles.markReadText}>Mark All As Read</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Bottom sheet — Select transportation */}
      <View style={styles.bottomSheet}>
        <Text style={styles.selectTitle}>Select your transportation</Text>
        <View style={styles.transportRow}>
          <TouchableOpacity
            style={styles.transportCard}
            onPress={() => router.push('/bus')}
          >
            <Text style={styles.transportIcon}>🚌</Text>
            <Text style={styles.transportLabel}>BUS</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.transportCard}
            onPress={() => router.push('/jeepney')}
          >
            <Text style={styles.transportIcon}>🚐</Text>
            <Text style={styles.transportLabel}>JEEPNEY</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom nav */}
      <View style={styles.bottomNav}>
        <View style={styles.navPill}>
          <TouchableOpacity style={[styles.navItem, styles.navActive]}>
            <Ionicons name="bus" size={22} color="#fff" />
            <Text style={styles.navTextActive}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => router.push('/search')}
          >
            <Ionicons name="search" size={22} color="#fff" />
            <Text style={styles.navText}>Search</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => router.push('/settings')}
          >
            <Ionicons name="settings-outline" size={22} color="#fff" />
            <Text style={styles.navText}>Settings</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#C4A0B8' },
  topBar: {
    position: 'absolute',
    top: 0, left: 0, right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 48,
    gap: 8,
    zIndex: 10,
  },
  searchBar: {
    flex: 1,
    top: 20,
    backgroundColor: '#fff',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 3,
  },
  searchText: { color: '#999', fontSize: 15 },
  notifBtn: {
    backgroundColor: '#fff',
    borderRadius: 20,
    top: 20,
    padding: 8,
    elevation: 3,
  },
  notifDropdown: {
    position: 'absolute',
    top: 130,
    left: 16,
    right: 16,
    backgroundColor: '#704a5a',
    borderRadius: 12,
    padding: 12,
    zIndex: 20,
    elevation: 10,
  },
  notifItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(255, 255, 255, 0.3)',
  },
  notifTitle: { color: '#fff', fontSize: 14 },
  notifTime: { color: '#fff', fontSize: 12, opacity: 0.8 },
  markRead: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    paddingTop: 15,
  },
  markReadText: { color: '#fff', fontSize: 13 },
  bottomSheet: {
    position: 'absolute',
    height: 340,
    bottom: 0,
    left: 0, right: 0,
    backgroundColor: '#C4A0B8',
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 8,
  },
  selectTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  transportRow: {
    flexDirection: 'row',
    gap: 15,
  },
  transportCard: {
    flex: 1,
    backgroundColor: '#D9D9D9',
    borderRadius: 12,
    paddingVertical: 20,
    alignItems: 'center',
    gap: 10,
    marginTop: 10,
     elevation: 4,
  },
  transportIcon: { fontSize: 40 },
  transportLabel: { fontSize: 20, fontWeight: '800', color: '#1A1A1A' },
  bottomNav: {
    position: 'absolute',
    bottom: 16,
    left: 16, right: 16,
  },
  navPill: {
    backgroundColor: '#C8177A',
    borderRadius: 40,
    bottom: 25,
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 16,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  navItem: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 30,
    gap: 2,
  },
  navActive: { backgroundColor: 'rgba(255,255,255,0.25)' },
  navText: { color: '#fff', fontSize: 11 },
  navTextActive: { color: '#fff', fontSize: 11, fontWeight: '700' },
});