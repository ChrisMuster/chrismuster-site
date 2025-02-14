// utility functions

export const capitalize = (word: string) => word[0].toUpperCase() + word.slice(1);

export const scrollToSection = (id: string) => {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
};

export function cleanClassNames(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(" ");
}
