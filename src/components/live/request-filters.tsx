import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, fonts } from '@/constants/theme';
import type { RequestStatus } from '@/context/session';

export type RequestFilter = 'all' | RequestStatus;

const FILTERS: { key: RequestFilter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'new', label: 'New' },
  { key: 'queued', label: 'Queue' },
  { key: 'played', label: 'Played' },
  { key: 'rejected', label: 'Rejected' },
];

type Props = {
  value: RequestFilter;
  onChange: (filter: RequestFilter) => void;
  onSearch: () => void;
};

export function RequestFilters({ value, onChange, onSearch }: Props) {
  return (
    <View style={styles.row} role="tablist">
      {FILTERS.map(({ key, label }) => {
        const selected = key === value;
        return (
          <Pressable
            key={key}
            onPress={() => onChange(key)}
            role="tab"
            aria-selected={selected}
            style={styles.chip}
          >
            <Text style={[styles.label, selected && styles.labelSelected]}>{label}</Text>
          </Pressable>
        );
      })}
      <Pressable onPress={onSearch} role="button" aria-label="Search requests" style={styles.chip}>
        <Image source={require('../../../assets/images/icon-search.svg')} style={styles.icon} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  // Figma: 8pt side padding, minus the 1pt border; 29pt tall.
  chip: {
    height: 29,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 7,
    borderRadius: 48,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    backgroundColor: colors.cardFill,
    boxShadow: 'inset 0px 0px 20px 0px rgba(241, 241, 241, 0.04)',
  },
  label: {
    fontFamily: fonts.medium,
    fontSize: 14,
    letterSpacing: 0.42,
    color: colors.textOnLight,
    textAlign: 'center',
  },
  labelSelected: {
    color: '#bcbebf',
  },
  icon: {
    width: 16,
    height: 16,
  },
});
