export function mobile() {
    if (typeof window !== "undefined") {
      const { innerWidth: width } = window;
      if (width < 991) {
        return true
      } else {
        return false
      }
    }
  
  }

  export const boxShadow = '0 0 30px 0 rgba(0, 0, 0, 0.15)'