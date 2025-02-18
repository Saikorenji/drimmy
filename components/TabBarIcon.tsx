import { FontAwesome } from '@expo/vector-icons';

type TabBarIconProps = {
  name: keyof typeof FontAwesome.glyphMap;
  color: string;
};

export default function TabBarIcon({ name, color }: TabBarIconProps) {
  return <FontAwesome name={name} size={24} color={color} />;
}
