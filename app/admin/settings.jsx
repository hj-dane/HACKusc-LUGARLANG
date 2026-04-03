// app/admin/settings.jsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../src/context/authContext';
import { Ionicons } from '@expo/vector-icons';

export default function AdminSettings() {
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
        <View style={styles.ghostHeader}>
          <Text style={styles.ghostHeaderText}>Employee Management</Text>
        </View>
        <View style={styles.ghostCard} />
        <View style={styles.ghostCard} />
        <View style={styles.ghostCard} />
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
            onPress={() => router.replace('/admin/dashboard')}
          >
            <Ionicons name="bus" size={22} color="#fff" />
            <Text style={styles.navText}>Dashboard</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => router.push('/admin/transportation')}
          >
            <Ionicons name="location" size={22} color="#fff" />
            <Text style={styles.navText}>Transportation</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => router.push('/admin/employee')}
          >
            <Ionicons name="people-outline" size={22} color="#fff" />
            <Text style={styles.navText}>Employee</Text>
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
  bgContent: { flex: 1, opacity: 0.4 },
  ghostHeader: {
    backgroundColor: '#6B2D4E',
    paddingHorizontal: 20, paddingTop: 48, paddingBottom: 20,
  },
  ghostHeaderText: { fontSize: 20, fontWeight: '800', color: '#fff' },
  ghostCard: {
    backgroundColor: '#D9D9D9', borderRadius: 12,
    height: 80, margin: 16, marginBottom: 0,
  },
  sheet: {
    backgroundColor: '#F5EEF2',
    borderTopLeftRadius: 24, borderTopRightRadius: 24,
    padding: 24, paddingBottom: 100,
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
    paddingHorizontal: 4, justifyContent: 'space-around', alignItems: 'center',
  },
  navItem: {
    alignItems: 'center', paddingHorizontal: 8,
    paddingVertical: 6, borderRadius: 30, gap: 2,
  },
  navActive: { backgroundColor: 'rgba(255,255,255,0.25)' },
  navText: { color: '#fff', fontSize: 10 },
  navTextActive: { color: '#fff', fontSize: 10, fontWeight: '700' },
});
