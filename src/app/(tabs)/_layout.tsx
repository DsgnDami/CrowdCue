import { TabList, TabSlot, TabTrigger, Tabs } from 'expo-router/ui';
import { StyleSheet } from 'react-native';

import { TabBarButton } from '@/components/tab-bar-button';

// Floating tab bar from the home screen design (Figma node 333:14293).
export default function TabsLayout() {
  return (
    <Tabs>
      <TabSlot style={styles.slot} />
      <TabList style={styles.tabBar}>
        <TabTrigger name="home" href="/home" asChild>
          <TabBarButton
            label="Home"
            activeIcon={require('../../../assets/images/tab-home-active.svg')}
            icon={require('../../../assets/images/tab-home-inactive.svg')}
            iconHeight={24.5}
          />
        </TabTrigger>
        <TabTrigger name="live" href="/live" asChild>
          <TabBarButton
            label="Live"
            activeIcon={require('../../../assets/images/tab-live-active.svg')}
            icon={require('../../../assets/images/tab-live-inactive.svg')}
          />
        </TabTrigger>
        <TabTrigger name="profile" href="/profile" asChild>
          <TabBarButton
            label="Profile"
            activeIcon={require('../../../assets/images/tab-profile-active.svg')}
            icon={require('../../../assets/images/tab-profile-inactive.svg')}
            iconHeight={24.5}
          />
        </TabTrigger>
      </TabList>
    </Tabs>
  );
}

const styles = StyleSheet.create({
  // TabSlot's container defaults to flexShrink: 0, which lets a tall screen
  // grow past the window on web instead of scrolling inside it.
  slot: {
    flexShrink: 1,
    minHeight: 0,
  },
  // 351pt wide as in Figma; the three 88pt buttons + 40pt gaps overflow it
  // by 5pt in the design too, which is what places the last icon.
  tabBar: {
    position: 'absolute',
    bottom: 21.5,
    left: '50%',
    marginLeft: -176.5,
    width: 351,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 40,
    padding: 6,
    borderRadius: 48,
    backgroundColor: '#0b0b0c',
    boxShadow: 'inset 0px 0px 4px 0px rgba(0, 0, 0, 0.17)',
  },
});
