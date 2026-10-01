import {
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
  type ReactNode,
  type Ref,
} from 'react';
import {
  Animated,
  PanResponder,
  Platform,
  StyleSheet,
  View,
  type AccessibilityProps,
} from 'react-native';

import { colors } from '@/constants/theme';

const useNativeDriver = Platform.OS !== 'web';

export type RequestsSheetHandle = {
  /** Animate the sheet up to full screen, e.g. when search opens. */
  expand: () => void;
};

type Props = {
  /** Top edge of the sheet when collapsed (below the dashboard). */
  collapsedTop: number;
  /** Top edge of the sheet when dragged up to full screen. */
  expandedTop: number;
  /** 0 when expanded, `collapsedTop - expandedTop` when collapsed. */
  offset: Animated.Value;
  /**
   * Drag handle (title and filters). Spread `titleA11y` onto the title so
   * screen readers can expand/collapse the sheet without dragging.
   */
  header: (titleA11y: AccessibilityProps) => ReactNode;
  /** Renders the list; `hiddenBelow` is how much of the sheet is off-screen. */
  children: (hiddenBelow: number) => ReactNode;
  ref?: Ref<RequestsSheetHandle>;
};

/**
 * Song Requests panel that can be dragged from below the QR card up to
 * nearly full screen (Figma: 170:1917 collapsed, 300:6105 expanded).
 */
export function RequestsSheet({
  collapsedTop,
  expandedTop,
  offset,
  header,
  children,
  ref,
}: Props) {
  const range = Math.max(0, collapsedTop - expandedTop);
  const [expanded, setExpanded] = useState(false);

  const snapTo = useCallback(
    (toExpanded: boolean) => {
      setExpanded(toExpanded);
      Animated.spring(offset, {
        toValue: toExpanded ? 0 : range,
        useNativeDriver,
        damping: 24,
        stiffness: 220,
        mass: 1,
        // Stop within half a point instead of creeping for the last pixels.
        restDisplacementThreshold: 0.5,
        restSpeedThreshold: 0.5,
      }).start();
    },
    [offset, range],
  );

  useImperativeHandle(ref, () => ({ expand: () => snapTo(true) }), [snapTo]);

  // If the dashboard's height changes while collapsed, move to the new
  // collapsed position. Runs on layout changes only, not on every snap.
  useEffect(() => {
    offset.stopAnimation((value) => {
      if (value !== 0) offset.setValue(range);
    });
  }, [offset, range]);

  // Rebuilt only when the range or snap target changes (on layout or release),
  // never mid-drag.
  const pan = useMemo(() => {
    let start = 0;
    const clamp = (value: number) => Math.min(range, Math.max(0, value));
    return PanResponder.create({
      // Only claim vertical drags, so taps on the filter chips still work.
      onMoveShouldSetPanResponder: (_, g) => Math.abs(g.dy) > 4 && Math.abs(g.dy) > Math.abs(g.dx),
      onPanResponderGrant: () => {
        offset.stopAnimation((value) => {
          start = value;
        });
      },
      onPanResponderMove: (_, g) => offset.setValue(clamp(start + g.dy)),
      onPanResponderRelease: (_, g) => {
        if (g.vy < -0.5) snapTo(true);
        else if (g.vy > 0.5) snapTo(false);
        else snapTo(clamp(start + g.dy) < range / 2);
      },
      onPanResponderTerminate: () => snapTo(expanded),
    });
  }, [expanded, offset, range, snapTo]);

  return (
    <Animated.View
      style={[styles.sheet, { top: expandedTop, transform: [{ translateY: offset }] }]}
    >
      <View style={styles.fill} pointerEvents="none" />
      <View {...pan.panHandlers}>
        {header({
          accessible: true,
          accessibilityRole: 'adjustable',
          accessibilityHint: expanded ? 'Swipe down to shrink the list' : 'Swipe up to expand the list',
          accessibilityValue: { text: expanded ? 'Expanded' : 'Collapsed' },
          accessibilityActions: [{ name: 'increment' }, { name: 'decrement' }],
          onAccessibilityAction: (e) => snapTo(e.nativeEvent.actionName === 'increment'),
        })}
      </View>
      {children(expanded ? 0 : range)}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  // Figma: full width, rounded top corners, faint border and inner glow.
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: colors.cardBorder,
    // Opaque, so the dashboard never shows through while the sheet is dragged
    // over it; the design's 2% white fill is layered on top.
    backgroundColor: colors.background,
    boxShadow: 'inset 0px 0px 20px 6px rgba(241, 241, 241, 0.04)',
  },
  fill: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    borderTopLeftRadius: 39,
    borderTopRightRadius: 39,
    backgroundColor: colors.cardFill,
  },
});
