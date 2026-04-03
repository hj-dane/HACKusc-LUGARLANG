import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ActivityIndicator, Alert, KeyboardAvoidingView, Platform
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../src/context/authContext';

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    setLoading(true);
    const result = await login(username, password);
    setLoading(false);
    if (!result.success) {
      Alert.alert('Login Failed', result.error);
      return;
    }
    switch (result.role) {
      case 'driver':
      case 'conductor': router.replace('/conductor/dashboard'); break;
      case 'operator':  router.replace('/operator/dashboard'); break;
      case 'admin':     router.replace('/admin/dashboard'); break;
    }
  };

  return (
    <View style={styles.container}>
      {/* Pink city background overlay */}
      <View style={styles.bgOverlay} />

      <KeyboardAvoidingView
        style={styles.inner}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.card}>
          <Text style={styles.logo}>LUGARLANG!</Text>
          <Text style={styles.subtitle}>Operator & Conductor Portal</Text>

          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="Value"
            placeholderTextColor="#999"
            autoCapitalize="none"
            value={username}
            onChangeText={setUsername}
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Value"
            placeholderTextColor="#999"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity
            style={styles.loginBtn}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading
              ? <ActivityIndicator color="#fff" />
              : <Text style={styles.loginBtnText}>LOGIN</Text>
            }
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/forgot-password')}>
            <Text style={styles.forgotText}>Forgot password?</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#d4a0b8' },
  bgOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(200, 150, 180, 0.5)',
  },
  inner: { flex: 1, justifyContent: 'center', padding: 24 },
  card: {
    backgroundColor: '#6B2D4E',
    borderRadius: 20,
    padding: 28,
  },
  logo: {
    fontSize: 46,
    fontWeight: '900',
    color: '#fff',
    textAlign: 'center',
    letterSpacing: 1,
    marginBottom: 4,
  },
  subtitle: {
    color: '#ffffff',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 24,
    fontWeight: '600',
  },
  label: { color: '#ddd', fontSize: 14, marginBottom: 8, fontWeight: 'bold'},
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: '#000000',
    marginBottom: 15,
  },
  loginBtn: {
    backgroundColor: '#d4a0b8',
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: 'center',
    alignSelf: 'flex-end',
    paddingHorizontal: 32,
    marginBottom: 15,
    marginTop: 15,
  },
  loginBtnText: { color: '#000000', fontWeight: '700', fontSize: 14 },
  forgotText: { color: '#ddd', fontSize: 14, textDecorationLine: 'underline', fontWeight: 'bold' },
});