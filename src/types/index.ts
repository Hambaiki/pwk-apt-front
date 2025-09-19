export interface GenericCard {
  title: string;
  description: string;
  icon: React.ElementType;
}

export interface GenericNavigationItem<T> {
  title: string;
  description: string;
  href: string;
  tag?: T;
  icon: React.ElementType;
}
