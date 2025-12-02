import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
  Platform
} from 'react-native';
import { BlurView } from 'expo-blur';
import { Feather } from '@expo/vector-icons';
import { ProfileType, Profile, ProfileRole } from '../../types';

interface ProfileSwitcherProps {
  activeProfile: ProfileType;
  profiles: Profile[];
  onProfileChange: (profileId: ProfileType) => void;
}

// 프로필 역할별 아이콘 매핑
const getProfileIcon = (role?: ProfileRole): keyof typeof Feather.glyphMap => {
  switch (role) {
    case 'ME':
      return 'user';
    case 'SPOUSE':
      return 'heart';
    case 'KIDS':
      return 'smile';
    case 'PARENTS':
      return 'users';
    default:
      return 'user';
  }
};

export function ProfileSwitcher({
  activeProfile,
  profiles,
  onProfileChange,
}: ProfileSwitcherProps) {
  const scrollViewRef = useRef<ScrollView>(null);
  const scaleAnims = useRef(
    profiles.map(() => new Animated.Value(1))
  ).current;

  // 프로필이 없으면 표시하지 않음
  if (!profiles || profiles.length === 0) {
    return null;
  }

  // 활성 프로필이 변경될 때 스케일 애니메이션
  useEffect(() => {
    profiles.forEach((profile, index) => {
      const isActive = activeProfile === profile.id;
      Animated.spring(scaleAnims[index], {
        toValue: isActive ? 1 : 0.92,
        useNativeDriver: true,
        tension: 100,
        friction: 10,
      }).start();
    });
  }, [activeProfile, profiles]);

  const handlePress = (profile: Profile, index: number) => {
    onProfileChange(profile.id);

    // 탭 애니메이션
    Animated.sequence([
      Animated.spring(scaleAnims[index], {
        toValue: 0.88,
        useNativeDriver: true,
        tension: 120,
        friction: 6,
      }),
      Animated.spring(scaleAnims[index], {
        toValue: 1,
        useNativeDriver: true,
        tension: 100,
        friction: 10,
      }),
    ]).start();
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
        snapToInterval={108}
        decelerationRate="fast"
      >
        {profiles.map((profile, index) => {
          const isActive = activeProfile === profile.id;
          const icon = getProfileIcon(profile.role);

          return (
            <Animated.View
              key={profile.id}
              style={[
                { transform: [{ scale: scaleAnims[index] }] }
              ]}
            >
              <TouchableOpacity
                onPress={() => handlePress(profile, index)}
                style={styles.tabWrapper}
                activeOpacity={0.8}
              >
                {/* Frame with border radius */}
                <View style={[
                  styles.frame,
                  isActive && styles.activeFrame
                ]}>
                  {/* Glass effect for iOS, gradient for Android */}
                  {isActive && Platform.OS === 'ios' ? (
                    <BlurView
                      intensity={20}
                      tint="light"
                      style={styles.glassEffect}
                    >
                      {/* Bubble highlight (selected indicator) */}
                      <View style={styles.bubbleHighlight} />

                      {/* Content */}
                      <View style={styles.content}>
                        <Feather
                          name={icon}
                          size={16}
                          color="#6366f1"
                        />
                        <Text style={[styles.label, styles.activeLabel]}>
                          {profile.name}
                        </Text>
                      </View>
                    </BlurView>
                  ) : isActive ? (
                    <View style={styles.androidGlass}>
                      {/* Bubble highlight */}
                      <View style={styles.bubbleHighlight} />

                      {/* Content */}
                      <View style={styles.content}>
                        <Feather
                          name={icon}
                          size={16}
                          color="#6366f1"
                        />
                        <Text style={[styles.label, styles.activeLabel]}>
                          {profile.name}
                        </Text>
                      </View>
                    </View>
                  ) : (
                    <View style={styles.inactiveContent}>
                      <Feather
                        name={icon}
                        size={16}
                        color="#9ca3af"
                      />
                      <Text style={styles.label}>
                        {profile.name}
                      </Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            </Animated.View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'rgba(243, 244, 246, 0.6)',
    borderRadius: 24,
    padding: 6,
  },
  container: {
    flexDirection: 'row',
    gap: 6,
    paddingHorizontal: 2,
  },
  tabWrapper: {
    minWidth: 100,
  },
  // Rectangular frame with border radius
  frame: {
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  activeFrame: {
    // Bubble highlight border
    borderColor: Platform.OS === 'ios'
      ? 'rgba(99, 102, 241, 0.2)'
      : 'rgba(99, 102, 241, 0.3)',
    shadowColor: '#6366f1',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  // Glass effect (iOS)
  glassEffect: {
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.01)', // 1% opacity
  },
  // Android glass fallback
  androidGlass: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: 18,
  },
  // Bubble highlight rectangle
  bubbleHighlight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(99, 102, 241, 0.08)',
    borderRadius: 16,
    margin: 2,
  },
  // Content layout
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    gap: 6,
  },
  inactiveContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    gap: 6,
    backgroundColor: 'transparent',
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#9ca3af',
  },
  activeLabel: {
    color: '#6366f1',
    fontWeight: '700',
  },
});
