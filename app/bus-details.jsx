import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import LeafletMap from '../src/components/map/leafletMap';
import { Ionicons } from '@expo/vector-icons';

export default function BusDetailsScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <LeafletMap vehicles={[]} />

      {/* Top search area */}
      <SafeAreaView style={styles.topOverlay}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
        </TouchableOpacity>
        <View style={styles.searchCard}>
          <View style={styles.searchRow}>
            <Ionicons name="radio-button-on" size={18} color="#1A1A1A" />
            <Text style={styles.searchLabel}>ORIGIN TERMINAL</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.searchRow}>
            <Ionicons name="location" size={18} color="#1A1A1A" />
            <Text style={styles.searchLabel}>DESTINATION TERMINAL</Text>
          </View>
        </View>
      </SafeAreaView>

      {/* Details card */}
      <View style={styles.detailCard}>
        <View style={styles.routeHeader}>
          <Text style={styles.terminal}>Terminal 1</Text>
          <Ionicons name="chevron-forward" size={18} color="#C8177A" />
          <Text style={styles.terminal}>Terminal 2</Text>
        </View>
        <View style={styles.detailRows}>
          {[
            'Bus Code:',
            'Franchise:',
            'Departure Time:',
            'Estimated Time of Arrival:',
            'Status:',
            'Estimated Fare Price (w/o Discount):',
          ].map((label, i) => (
            <Text key={i} style={styles.detailRow}>{label}</Text>
          ))}
        </View>
      </View>

      {/* Bottom nav */}
      <View style={styles.bottomNav}>
        <View style={styles.navPill}>
          <TouchableOpacity style={styles.navItem} onPress={() => router.replace('/home')}>
            <Ionicons name="bus" size={22} color="#fff" />
            <Text style={styles.navText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.navItem, styles.navActive]} onPress={() => router.push('/search')}>
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
  topOverlay: {
    position: 'absolute', top: 0, left: 0, right: 0,
    paddingTop: 48, paddingHorizontal: 16, zIndex: 10,
  },
  backBtn: { marginBottom: 8, padding: 4, alignSelf: 'flex-start' },
  searchCard: {
    backgroundColor: '#D9D9D9', borderRadius: 12,
    paddingHorizontal: 16, paddingVertical: 8, elevation: 4,
  },
  searchRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 10 },
  searchLabel: { fontSize: 14, fontWeight: '700', color: '#1A1A1A' },
  divider: { height: 1, backgroundColor: '#bbb', marginLeft: 30 },
  detailCard: {
    position: 'absolute',
    bottom: 90, left: 0, right: 0,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderTopLeftRadius: 16, borderTopRightRadius: 16,
    padding: 20, elevation: 8,
  },
  routeHeader: {
    flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12,
  },
  terminal: { fontSize: 15, fontWeight: '700', color: '#1A1A1A' },
  detailRows: { gap: 6 },
  detailRow: { fontSize: 13, color: '#333', paddingVertical: 2 },
  bottomNav: { position: 'absolute', bottom: 16, left: 16, right: 16 },
  navPill: {
    backgroundColor: '#C8177A', borderRadius: 40,
    flexDirection: 'row', paddingVertical: 10,
    paddingHorizontal: 16, justifyContent: 'space-around', alignItems: 'center',
  },
  navItem: { alignItems: 'center', paddingHorizontal: 16, paddingVertical: 6, borderRadius: 30, gap: 2 },
  navActive: { backgroundColor: 'rgba(255,255,255,0.25)' },
  navText: { color: '#fff', fontSize: 11 },
  navTextActive: { color: '#fff', fontSize: 11, fontWeight: '700' },
});