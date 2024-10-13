import { Check } from 'lucide-react-native';
import React from 'react';
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native';

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
  label?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange, label }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onChange}>
      <View style={[styles.box, checked && styles.checked]}>
        {checked && <Check color="white" size={16} />}
      </View>
      {label && <Text style={styles.label}>{label}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  box: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  label: {
    marginLeft: 8,
    fontSize: 16,
  },
});

export default Checkbox;
