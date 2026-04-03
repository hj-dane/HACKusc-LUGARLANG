// app/settings.jsx
import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  SafeAreaView, Switch
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Dimmed background content */}
      <View style={styles.bgContent}>
        <View style={styles.ghostSearchCard}>
          <View style={styles.ghostRow}>
            <Ionicons name="radio-button-on" size={18} color="#bbb" />
            <Text style={styles.ghostText}>ORIGIN</Text>
          </View>
          <View style={styles.ghostDivider} />
          <View style={styles.ghostRow}>
            <Ionicons name="location" size={18} color="#bbb" />
            <Text style={styles.ghostText}>DESTINATION</Text>
          </View>
        </View>
        <View style={styles.ghostCard} />
        <View style={styles.ghostCard} />
      </View>

      {/* Settings bottom sheet */}
      <View style={styles.sheet}>
        <Text style={styles.sheetTitle}>SETTINGS</Text>

        <TouchableOpacity style={styles.settingRow}>
          <View style={styles.settingLeft}>
            <Ionicons name="settings-outline" size={20} color="#1A1A1A" />
            <Text style={styles.settingText}>Display</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#999" />
        </TouchableOpacity>

        <View style={styles.divider} />

        <TouchableOpacity style={styles.settingRow}>
          <View style={styles.settingLeft}>
            <Ionicons name="settings-outline" size={20} color="#1A1A1A" />
            <Text style={styles.settingText}>Language</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#999" />
        </TouchableOpacity>

        {/* Portal button */}
        <TouchableOpacity
          style={styles.portalBtn}
          onPress={() => router.push('/login')}
        >
          <Text style={styles.portalBtnText}>Operator & Conductor Portal</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom nav */}
      <View style={styles.bottomNav}>
        <View style={styles.navPill}>
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => router.replace('/home')}
          >
            <Ionicons name="bus" size={22} color="#fff" />
            <Text style={styles.navText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => router.push('/search')}
          >
            <Ionicons name="search" size={22} color="#fff" />
            <Text style={styles.navText}>Search</Text>
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
  bgContent: {
    flex: 1,
    padding: 16,
    opacity: 0.4,
    paddingTop: 48,
  },
  ghostSearchCard: {
    backgroundColor: '#D9D9D9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  ghostRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 8 },
  ghostText: { fontSize: 14, fontWeight: '700', color: '#999' },
  ghostDivider: { height: 1, backgroundColor: '#bbb', marginLeft: 28 },
  ghostCard: {
    backgroundColor: '#D9D9D9',
    borderRadius: 12,
    height: 80,
    marginBottom: 12,
  },
  sheet: {
    backgroundColor: '#F5EEF2',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 100,
  },
  sheetTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: '#fff',
    backgroundColor: '#6B2D4E',
    marginHorizontal: -24,
    marginTop: -24,
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginBottom: 8,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  settingLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  settingText: { fontSize: 15, color: '#1A1A1A' },
  divider: { height: 1, backgroundColor: '#E0D0D8' },
  portalBtn: {
    marginTop: 24,
    backgroundColor: '#F5EEF2',
    borderWidth: 1.5,
    borderColor: '#6B2D4E',
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignSelf: 'flex-start',
  },
  portalBtnText: {
    color: '#1A1A1A',
    fontSize: 14,
    fontWeight: '600',
  },
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
  navItem: {
    alignItems: 'center', paddingHorizontal: 16,
    paddingVertical: 6, borderRadius: 30, gap: 2,
  },
  navActive: { backgroundColor: 'rgba(255,255,255,0.25)' },
  navText: { color: '#fff', fontSize: 11 },
  navTextActive: { color: '#fff', fontSize: 11, fontWeight: '700' },
});