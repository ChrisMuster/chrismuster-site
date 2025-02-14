// Utility functions

// Capitalises words
export const capitalize = (word: string) => word[0].toUpperCase() + word.slice(1);

// function used to scroll to element with specific id
export const scrollToSection = (id: string) => {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
};

// helps to remove whitespace in classes when class variables are blank or undefined
export function cleanClassNames(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(" ");
}
