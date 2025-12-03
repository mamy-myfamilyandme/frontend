import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
} from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

export type Screen = 'home' | 'medication' | 'medicationScan' | 'community' | 'all';

interface BottomNavProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

interface NavItem {
  id: Screen;
  icon: keyof typeof Feather.glyphMap | keyof typeof MaterialCommunityIcons.glyphMap;
  label: string;
  isCenter?: boolean;
  iconLibrary?: 'feather' | 'material';
}

export function BottomNav({ currentScreen, onNavigate }: BottomNavProps) {
  const indicatorAnim = useRef(new Animated.Value(0)).current;
  const [buttonLayouts, setButtonLayouts] = useState<Map<Screen, { x: number; width: number }>>(new Map());

  const navItems: NavItem[] = [
    { id: 'home', icon: 'home', label: '홈' },
    { id: 'medication', icon: 'pill', label: '복약', iconLibrary: 'material' },
    { id: 'medicationScan', icon: 'camera', label: '스캔', isCenter: true },
    { id: 'community', icon: 'users', label: '커뮤니티' },
    { id: 'all', icon: 'grid', label: '전체' },
  ];

  // 인디케이터 위치 업데이트
  useEffect(() => {
    if (currentScreen === 'medicationScan') return;

    const layout = buttonLayouts.get(currentScreen);
    if (layout) {
      const targetPosition = layout.x + layout.width / 2;
      Animated.spring(indicatorAnim, {
        toValue: targetPosition,
        useNativeDriver: true,
        tension: 50,
        friction: 7,
      }).start();
    }
  }, [currentScreen, buttonLayouts]);

  const handleLayout = (screen: Screen, event: any) => {
    const { x, width } = event.nativeEvent.layout;
    setButtonLayouts((prev) => new Map(prev).set(screen, { x, width }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.navContainer}>
        {/* 움직이는 인디케이터 */}
        {currentScreen !== 'medicationScan' && (
          <Animated.View
            style={[
              styles.indicator,
              {
                transform: [{ translateX: indicatorAnim }],
              },
            ]}
          >
            <View style={styles.indicatorOuter} />
            <View style={styles.indicatorInner} />
          </Animated.View>
        )}

        {/* 버튼들 */}
        <View style={styles.buttonsContainer}>
          {navItems.map((item) => {
            const isActive = currentScreen === item.id;

            // 중앙 스캔 버튼
            if (item.isCenter) {
              const IconComponent = item.iconLibrary === 'material' ? MaterialCommunityIcons : Feather;
              return (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => onNavigate(item.id)}
                  onLayout={(e) => handleLayout(item.id, e)}
                  style={styles.centerButton}
                  activeOpacity={0.8}
                >
                  <View
                    style={[
                      styles.centerIconContainer,
                      isActive && styles.centerIconContainerActive,
                    ]}
                  >
                    <IconComponent name={item.icon as any} size={32} color="#ffffff" />
                  </View>
                  <Text
                    numberOfLines={1}
                    adjustsFontSizeToFit
                    minimumFontScale={0.7}
                    style={styles.centerLabel}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            }

            // 일반 버튼
            const IconComponent = item.iconLibrary === 'material' ? MaterialCommunityIcons : Feather;
            return (
              <TouchableOpacity
                key={item.id}
                onPress={() => onNavigate(item.id)}
                onLayout={(e) => handleLayout(item.id, e)}
                style={styles.navButton}
                activeOpacity={0.7}
              >
                <IconComponent
                  name={item.icon as any}
                  size={28}
                  color={isActive ? '#111827' : '#9ca3af'}
                  strokeWidth={isActive ? 2.5 : 2}
                />
                <Text
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  minimumFontScale={0.7}
                  style={[
                    styles.navLabel,
                    isActive && styles.navLabelActive,
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 8,
    backgroundColor: 'transparent',
  },
  navContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#f3f4f6',
    position: 'relative',
    overflow: 'visible',
  },
  indicator: {
    position: 'absolute',
    top: 8,
    width: 64,
    height: 64,
    marginLeft: -32,
    zIndex: 0,
  },
  indicatorOuter: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#dbeafe',
    borderRadius: 32,
    opacity: 0.3,
  },
  indicatorInner: {
    position: 'absolute',
    top: 8,
    left: 8,
    right: 8,
    bottom: 8,
    backgroundColor: '#dbeafe',
    borderRadius: 24,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 8,
    paddingVertical: 8,
    position: 'relative',
    zIndex: 10,
  },
  navButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    paddingHorizontal: 16,
  },
  navLabel: {
    fontSize: 10,
    fontWeight: '500',
    color: '#6b7280',
    marginTop: 2,
  },
  navLabelActive: {
    color: '#111827',
    fontWeight: '600',
  },
  centerButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -32,
    paddingHorizontal: 16,
  },
  centerIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#06b6d4',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 12,
  },
  centerIconContainerActive: {
    backgroundColor: '#0891b2',
    transform: [{ scale: 1.1 }],
  },
  centerLabel: {
    fontSize: 10,
    fontWeight: '500',
    color: '#374151',
    marginTop: 4,
  },
});
