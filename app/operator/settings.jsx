// app/operator/settings.jsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../src/context/authContext';
import { Ionicons } from '@expo/vector-icons';

export default function OperatorSettings() {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          await logout();
          router.replace('/login');
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Dimmed background */}
      <View style={styles.bgContent}>
        <Text style={styles.ghostTitle}>SCHEDULED BUS TRIPS</Text>
        {[1, 2, 3].map((i) => (
          <View key={i} style={styles.ghostCard}>
            {['Bus Code:', 'Terminal:', 'Departure Time:', 'Trip Status:'].map((l, j) => (
              <Text key={j} style={styles.ghostText}>{l}</Text>
            ))}
          </View>
        ))}
      </View>

      {/* Settings sheet */}
      <View style={styles.sheet}>
        <Text style={styles.sheetTitle}>SETTINGS</Text>

        {['Account', 'Display', 'Language'].map((item, i, arr) => (
          <View key={item}>
            <TouchableOpacity style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <Ionicons name="settings-outline" size={20} color="#1A1A1A" />
                <Text style={styles.settingText}>{item}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#999" />
            </TouchableOpacity>
            {i < arr.length - 1 && <View style={styles.divider} />}
          </View>
        ))}

        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutText}>LOGOUT</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom nav */}
      <View style={styles.bottomNav}>
        <View style={styles.navPill}>
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => router.replace('/operator/dashboard')}
          >
            <Ionicons name="bus" size={22} color="#fff" />
            <Text style={styles.navText}>Dashboard</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => router.push('/operator/bus-trip')}
          >
            <Ionicons name="location" size={22} color="#fff" />
            <Text style={styles.navText}>Bus Trip</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => router.push('/operator/fare')}
          >
            <Ionicons name="pencil" size={22} color="#fff" />
            <Text style={styles.navText}>Fare</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.navItem, styles.navActive]}>
            <Ionicons name="settings-outline" size={22} color="#fff" />
            <Text style={styles.navTextActive}>Settings</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#C4A0B8' },
  bgContent: { flex: 1, padding: 16, paddingTop: 48, opacity: 0.4 },
  ghostTitle: { fontSize: 18, fontWeight: '900', color: '#1A1A1A', marginBottom: 12 },
  ghostCard: {
    backgroundColor: '#D9D9D9', borderRadius: 12,
    padding: 14, marginBottom: 10, gap: 4,
  },
  ghostText: { fontSize: 12, color: '#999' },
  sheet: {
    backgroundColor: '#F5EEF2',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 100,
  },
  sheetTitle: {
    fontSize: 26, fontWeight: '900', color: '#fff',
    backgroundColor: '#6B2D4E',
    marginHorizontal: -24, marginTop: -24,
    paddingHorizontal: 24, paddingVertical: 16,
    borderTopLeftRadius: 24, borderTopRightRadius: 24,
    marginBottom: 8,
  },
  settingRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', paddingVertical: 16,
  },
  settingLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  settingText: { fontSize: 15, color: '#1A1A1A' },
  divider: { height: 1, backgroundColor: '#E0D0D8' },
  logoutBtn: {
    backgroundColor: '#E53935', borderRadius: 24,
    paddingVertical: 12, paddingHorizontal: 28,
    alignSelf: 'flex-end', marginTop: 24,
  },
  logoutText: { color: '#fff', fontWeight: '800', fontSize: 14 },
  bottomNav: { position: 'absolute', bottom: 16, left: 16, right: 16 },
  navPill: {
    backgroundColor: '#C8177A', borderRadius: 40,
    flexDirection: 'row', paddingVertical: 10,
    paddingHorizontal: 8, justifyContent: 'space-around', alignItems: 'center',
  },
  navItem: {
    alignItems: 'center', paddingHorizontal: 12,
    paddingVertical: 6, borderRadius: 30, gap: 2,
  },
  navActive: { backgroundColor: 'rgba(255,255,255,0.25)' },
  navText: { color: '#fff', fontSize: 11 },
  navTextActive: { color: '#fff', fontSize: 11, fontWeight: '700' },
});